using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("VendaServicoProduto", Schema ="dbo")]
    public class vwVenda
    {
        [Key]
        public Guid UidVenda { get; set; }
           public DateTime DataHoraVenda { get; set; }
           public Guid UidEstabelecimento { get; set; }
           public Guid UidUsuario { get; set; }
           public Guid UidCliente { get; set; }
           public int IdMeioPagamento { get; set; }
           public string NomeMeioPagamento { get; set; }
           public int IdFormaPagamento { get; set; }
           public string NomeFormaPagamento { get; set; }
           public decimal ValorVenda { get; set; }
           public int QuantidadeParcelas { get; set; }
           public byte VendaFinalizada { get; set; }
           public virtual ICollection<vwVendaProdutoItem> Produtos { get; set; }
           public virtual ICollection<vwVendaServicoItem> Servicos { get; set; }

    }
}
