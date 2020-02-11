using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("VendaProdutoItem", Schema ="dbo")]
    public class vwVendaProdutoItem
    {
        [Key]
        public Guid UidVendaProdutoItem { get; set; }
            [ForeignKey("UidVenda")]
           public Guid UidVenda { get; set; }
           public Guid UidProdutoEstabelecimento { get; set; }
           public string NomeProduto { get; set; }
           public decimal ValorUnitario { get; set; }
          public decimal Quantidade { get; set; }
           public decimal ValorDesconto { get; set; }
           public decimal ValorAcrescimo { get; set; }
           public string DescricaoItemProduto { get; set; }
    }
}
