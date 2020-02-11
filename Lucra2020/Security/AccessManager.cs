using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using Lucra2020.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace Lucra2020.Security
{
    public class AccessManager
    {
       
        private SigningConfigurations _signingConfigurations;
        private TokenConfigurations _tokenConfigurations;
        private AppDbContext _context;

        public AccessManager(
           AppDbContext context,
            SigningConfigurations signingConfigurations,
            TokenConfigurations tokenConfigurations)
        {
            _context = context;
            _signingConfigurations = signingConfigurations;
            _tokenConfigurations = tokenConfigurations;
        }

        public async System.Threading.Tasks.Task<bool> ValidateCredentialsAsync(User user)
        {
            bool credenciaisValidas = false;
            if (user != null && !String.IsNullOrWhiteSpace(user.UserID))
            {
                try
                {

                StringBuilder query = new StringBuilder();
                query.Append(@"SELECT TOP(1) *
                FROM[sec].[UsuarioPerfilPapel] AS[a]
                WHERE([a].[EmailUsuario] = '");
                query.Append(user.UserID);
                query.Append("') AND(PWDCOMPARE('");
                query.Append(user.Password);
                query.Append("', [a].[SenhaUsuario]) = 1)");
                var usuario = await _context.VwUsuario.FromSql<vwUsuario>(query.ToString()).SingleAsync();
               
                if (usuario == null)
                {
                    return false;
                }
                credenciaisValidas = true;

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    credenciaisValidas = false;
                }
              
            }

            return credenciaisValidas;
        }

        public Token GenerateToken(User user)
        {
            



            vwUsuario userInfo = _context.VwUsuario.Where(a => a.EmailUsuario == user.UserID).FirstOrDefault();
            var roles = userInfo.Papeis.Split(";");

            ClaimsIdentity identity = new ClaimsIdentity(
                 new GenericIdentity(user.UserID, "Login"),
                 new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.UserID)
                 }
             );
            identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, "Admin"));

            userInfo.Estabelecimentos = _context.UsuarioEstabelecimento.Where(a => a.UidUsuario == userInfo.UidUsuario).ToList();
            DateTime dataCriacao = DateTime.Now;
            DateTime dataExpiracao = dataCriacao +
                TimeSpan.FromSeconds(_tokenConfigurations.Seconds);

            var handler = new JwtSecurityTokenHandler();
            var securityToken = handler.CreateToken(new SecurityTokenDescriptor
            {
                Issuer = _tokenConfigurations.Issuer,
                Audience = _tokenConfigurations.Audience,
                SigningCredentials = _signingConfigurations.SigningCredentials,
                Subject =identity,
                NotBefore = dataCriacao,
                Expires = dataExpiracao,
                
            });
            var token = handler.WriteToken(securityToken);
            
            return new Token()
            {
                Authenticated = true,
                Created = dataCriacao.ToString("yyyy-MM-dd HH:mm:ss"),
                Expiration = dataExpiracao.ToString("yyyy-MM-dd HH:mm:ss"),
                AccessToken = token,
                Message = "OK",
                Estabelecimentos = userInfo.Estabelecimentos
            };
        }
    }
}

