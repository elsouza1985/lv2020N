using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Lucra2020.Models
{
    [Table("Estabelecimento",Schema ="dbo")]
    public class vwEstabelecimento
    {
        [Key]
        public Guid UidEstabelecimento { get; set; }
      public string NomeEstabelecimento { get; set; }
      public long CPF_CNPJ { get; set; }
      public byte CodigoTipoDocumento { get; set; }
      public string TipoEstabelecimento { get; set; }
      public string CEP { get; set; }
      public string Endereco { get; set; }
      public string EnderecoNumero { get; set; }
      public string EnderecoComplemento { get; set; }
      public string Cidade { get; set; }
      public string Bairro { get; set; }
      public string UF { get; set; }
     //public virtual ICollection<vwUsuarioEstabelecimento> EstabelecimentosUsuarios { get; set; }

    }
}
