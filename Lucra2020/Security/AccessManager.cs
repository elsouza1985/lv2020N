using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
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

        public async Task<UserModel> ValidateCredentialsAsync(User user)
        {
            UserModel retUser = new UserModel(); 
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
                    var credenciaisValidas = await _context.VwUsuario.FromSql<vwUsuario>(query.ToString()).SingleAsync();


                    if (credenciaisValidas == null)
                    {
                        retUser.Authenticated = false;
                        return retUser;
                    }
                    retUser.Authenticated = true;
                    retUser.EmailUsuario = credenciaisValidas.EmailUsuario;
                    retUser.Perfil = credenciaisValidas.Perfil;
                    retUser.UidUsuario = credenciaisValidas.UidUsuario;
                    retUser.NomeUsuario = credenciaisValidas.NomeUsuario;
                    if (user.UidEstabelecimento != Guid.Empty)
                    {
                        retUser.Estabelecimentos = _context.UsuarioEstabelecimento.Where(a => a.UidEstabelecimento == user.UidEstabelecimento && a.UidUsuario == credenciaisValidas.UidUsuario && a.NomeUsuario == credenciaisValidas.NomeUsuario).ToList();
                    }
                    else
                    {
                        retUser.Estabelecimentos = _context.UsuarioEstabelecimento.Where(a => a.UidUsuario == retUser.UidUsuario && a.NomeUsuario == retUser.NomeUsuario).ToList();

                       
                    }

                    return retUser;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return new UserModel { Authenticated = false };
                }

            }
            else
            {
                return new UserModel { Authenticated = false };
            }
           
        }
        public bool ValidateGuid(Guid UidFind)
        {
            return false;
        }
        public async Task<bool> UpdatePass(Guid UserId, string NewPass)
        {
            vwUsuario user = await _context.VwUsuario.FindAsync(UserId);
            byte[] bytePass = UTF8Encoding.UTF8.GetBytes(NewPass);
            user.SenhaUsuario = bytePass;
            try
            {
                _context.Entry(user).State = EntityState.Modified;
                _context.SaveChanges();

            }
            catch (Exception ex)
            {

                return false;
            }
            return true;
        }
        public Token GenerateToken(UserModel user)
        {
            



            //vwUsuario userInfo = _context.VwUsuario.Where(a => a.EmailUsuario == user.UserID).FirstOrDefault();
            //var roles = userInfo.Papeis.Split(";");

            ClaimsIdentity identity = new ClaimsIdentity(
                 new GenericIdentity(user.EmailUsuario, "Login"),
                 new[] {
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                        new Claim(JwtRegisteredClaimNames.UniqueName, user.EmailUsuario)
                 }
             );
            vwUsuarioEstabelecimento estabInfo = _context.UsuarioEstabelecimento.Where(a => a.UidEstabelecimento == user.UidEstabelecimento && a.UidUsuario == user.UidUsuario).First();
            identity.AddClaim(new Claim(ClaimsIdentity.DefaultRoleClaimType, estabInfo.NomeTipoRelacionamento));

            //userInfo.Estabelecimentos = _context.UsuarioEstabelecimento.Where(a => a.UidUsuario == userInfo.UidUsuario).ToList();
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
                UserName = user.NomeUsuario,
                Estabelecimento = user.UidEstabelecimento,
                UidUsuario = user.UidUsuario
            };
        }
    }
}

