using Lucra2020.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Security
{
    public class User
    {
        public string UserID { get; set; }
        public string Password { get; set; }
        public Guid UidEstabelecimento { get; set; }
    }

    public static class Roles
    {
        public const string ROLE_API_PRODUTOS = "Acesso-APIProdutos";
    }

    public class TokenConfigurations
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public int Seconds { get; set; }
        public string Teste { get; set; }
    }

    public class Token
    {
        public bool Authenticated { get; set; }
        public string Created { get; set; }
        public string Expiration { get; set; }
        public string AccessToken { get; set; }
        public string Message { get; set; }
        public string UserName { get; set; }
        public Guid Estabelecimento { get; set; }
        public Guid UidUsuario { get; internal set; }
    }
}
