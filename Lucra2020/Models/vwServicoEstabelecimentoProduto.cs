using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lucra2020.Models
{
    [Table("ServicoEstabelecimentoProduto", Schema = "dbo")]
    public class vwServicoEstabelecimentoProduto
    {
        [Key]
        public Guid UidServicoEstabelecimentoProduto { get; set; }
        [ForeignKey("UidServicoEstabelecimento")]
        public Guid UidServicoEstabelecimento { get; set; }
        public Guid UidProdutoEstabelecimento { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal QtdProdutoServico { get; set; }
        public decimal ValorProdutoServico { get; set; }
       // public virtual vwServicoEstabelecimento Servico { get; set; }
    }
}
