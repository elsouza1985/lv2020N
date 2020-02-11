
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lucra2020.Models
{
    [Table("UsuarioEstabelecimento", Schema ="dbo")]
    public class vwUsuarioEstabelecimento
    {
        [Key]
        public Guid UidUsuarioEstabelecimento { get; set; }
        [ForeignKey("UidUsuario")]
        public Guid UidUsuario { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public string NomeTipoRelacionamento { get; set; }
        public string NomeUsuario { get; set; }
        public string NomeEstabelecimento { get; set; }
        public virtual ICollection<vwEstabelecimento> Estabelecimentos { get; set; }
        
    }
}
