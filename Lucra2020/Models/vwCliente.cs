using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("Cliente", Schema ="dbo")]

    public class vwCliente
    {
        [Key]
        public Guid UidCliente { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public string NomeCliente { get; set; }
        public byte DDD { get; set; } 
        public long Telefone { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }

    }
}
