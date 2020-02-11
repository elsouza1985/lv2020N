using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("VendaServicoItem", Schema = "dbo")]
    public class vwVendaServicoItem
    {
        [Key]
        public Guid UidVendaServicoItem { get; set; }
        [ForeignKey("UidVenda")]
        public Guid UidVenda { get; set; }
        public Guid UidUsuario { get; set; }
        public Guid UidServicoEstabelecimento { get; set; }
        public string NomeServico { get; set; }
        public decimal ValorServico { get; set; }
        public decimal ValorDesconto { get; set; }
        public decimal ValorAcrescimo { get; set; }
        public decimal ValorComissao { get; set; }
        public string DescricaoItemServico { get; set; }
      
    }
}
