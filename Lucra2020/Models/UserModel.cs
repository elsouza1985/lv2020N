using System;
using System.Collections.Generic;


namespace Lucra2020.Models
{
    public class UserModel
    {
        public Guid UidUsuario { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public List<Estabelecimento> Estabelecimentos { get; set; }
        public string  Perfil {get;set;}
        public List<Papel> Papeis {get;set;}
    }
}
