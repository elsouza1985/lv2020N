using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lucra2020.Models
{
    [Table("UsuarioPerfilPapel", Schema ="sec")]
    public class vwUsuario
    {
        [Key]
        public Guid UidUsuario { get; set; }
        public string NomeUsuario { get; set; }
        public string EmailUsuario { get; set; }
        public byte[] SenhaUsuario { get; set; }
        public string Papeis { get; set; }
        public string Perfil { get; set; }
     
        public ICollection<vwUsuarioEstabelecimento> Estabelecimentos { get; set; }
    }
}
