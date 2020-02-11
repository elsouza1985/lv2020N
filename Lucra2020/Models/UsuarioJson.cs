using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    public class Papeis
    {
        public string Papel { get; set; }
    }

    public class TPRE
    {
        public string TipoRelacionamento { get; set; }
    }

    public class Estabelecimento
    {
        public string UidEstabelecimento { get; set; }
        public string NomeEstabelecimento { get; set; }
        public List<TPRE> TPRE { get; set; }
    }

    public class UsuarioJson
    {
        public string UidUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public bool Validado { get; set; }
        public string Mensagem { get; set; }
        public string Perfil { get; set; }
        public List<Papeis> Papeis { get; set; }
        public List<Estabelecimento> Estabelecimento { get; set; }
    }

}
