using System;
using System.Collections.Generic;


namespace Lucra2020.Models
{
    public class UserModel : vwUsuario
    {
        public string NomeEstabelecimento { get; set; }
        public string NomeTipoRelacionamento { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public bool Authenticated { get; set; }
    }
}
