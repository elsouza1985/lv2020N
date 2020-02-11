using System.Collections.Generic;
using System;

namespace Lucra2020.Models
{
    public class ServicosProdutos
    {
        public Guid UidServicoEstabelecimento { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public string NomeServico { get; set; }
        public string UnidadeMedida { get; set; }
        public string TipoUnidadeMedida { get; set; }
        public Byte QtdTempo { get; set; }
        public decimal ValorServico { get; set; }
        public List<Produto> Produtos { get; set; }
    }
    public class Produto
    {
        public Guid UidServicoEstabelecimentoProduto { get; set; }
        public Guid UidServicoEstabelecimento { get; set; }

        public Guid UidProdutoEstabelecimento { get; set; }
        public string UnidadeMedida { get; set; }
        public decimal QtdProdutoServico { get; set; }
        public decimal ValorProdutoServico { get; set; }
    }
}
