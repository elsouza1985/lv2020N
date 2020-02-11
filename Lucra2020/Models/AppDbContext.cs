using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Lucra2020.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

  
        public virtual DbSet<vwCliente> VwCliente { get; set; }
        public virtual DbSet<vwUsuario> VwUsuario { get; set; }
        public virtual DbSet<vwAgenda> VwAgenda { get; set; }
        public virtual DbSet<vwProdutoEstabelecimento> ProdutoEstabelecimento { get; set; }
        public virtual DbSet<vwProduto> Produto { get; set; }
        public virtual DbSet<vwServicoEstabelecimento> Servico { get; set; }
        public virtual DbSet<vwServicoEstabelecimentoProduto> ServicoProdutos { get; set; }
        public virtual DbSet<vwVenda> Vendas { get; set; }
        public virtual DbSet<vwVendaProdutoItem> VendaProdutoItems { get; set; }
        public virtual DbSet<vwVendaServicoItem> VendaServicoItems { get; set; }
        public virtual DbSet<vwUsuarioEstabelecimento> UsuarioEstabelecimento { get; set; }
        public virtual DbSet<vwEstabelecimento> Estabelecimento { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
////#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlServer("Data Source=Localhost;Initial Catalog=TR_ValorNove;Integrated Security=True");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");
            modelBuilder.Entity<vwEstabelecimento>()
                   .HasKey(x => x.UidEstabelecimento);
            modelBuilder.Entity<vwUsuarioEstabelecimento>()
                .HasKey(x => x.UidUsuarioEstabelecimento);
            //modelBuilder.Entity<vwUsuarioEstabelecimento>()
            //    .HasOne(a=> a.UidEstabelecimento)
            //    .WithMany(m => m.)
            //    .


        }
    }
}
