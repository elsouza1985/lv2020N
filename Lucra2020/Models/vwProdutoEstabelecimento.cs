using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("ProdutoEstabelecimento", Schema = "dbo")]
    public class vwProdutoEstabelecimento
    {
        [Key]
        public Guid uidProdutoEstabelecimento { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public Guid UidProduto { get; set; }
        public long EANProduto { get; set; }
        public string NomeProduto { get; set; }
        public decimal PrecoProdutoCompra { get; set; }
        public decimal PrecoProdutoVenda { get; set; }
        public decimal QtdEstoque { get; set; }
    }
}
