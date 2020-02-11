using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Lucra2020.Models
{
    [Table("Agendamento", Schema = "dbo")]
    public class vwAgenda
    {
  
        [Key]
        public Guid UidAgendamento { get; set; }
        public Guid UidEstabelecimento { get; set; }
        public Guid UidCliente { get; set; }
        public string NomeCliente { get; set; }
        public string NomeServico { get; set; }
        public Guid UidUsuario { get; set; }
        public string NomeAtendente { get; set; }
        public DateTime  DataHoraAgendamento { get; set; }
        public int QtdBlocos { get; set; }
        public DateTime DataHoraAtendimento { get; set; }
    }
}
