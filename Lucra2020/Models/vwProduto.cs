
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lucra2020.Models
{
    [Table("Produto", Schema ="dbo")]
    public class vwProduto
    {
        [Key]
        public Guid UidProduto { get; set; }
        public string NomeProduto { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal QuantidadeProdutoEmbalagem { get; set; }
        public long EANProduto { get; set; }
    }
}
