using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lucra2020.Models;
using Microsoft.AspNetCore.Authorization;

namespace Lucra2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize("Bearer")]

    public class vwProdutosController : ControllerBase
    {
        private readonly AppDbContext _context;
       
        public vwProdutosController(AppDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet("LoadProdList")]
        public async Task<ActionResult<IEnumerable<vwProdutoEstabelecimento>>> LoadProduto(Guid estab)
        {
            return await _context.ProdutoEstabelecimento.Where(x => x.UidEstabelecimento == estab).ToListAsync();
        }
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpPost("ProdEstab")]
        public async Task<ActionResult<vwProdutoEstabelecimento>> ProdEstab(vwProdutoEstabelecimento Produto)
        {
       
            _context.Entry(Produto).State = EntityState.Added;
           
            await _context.SaveChangesAsync();

            return Ok();
        }
        // GET: api/vwProdutos/5
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet("GetvwProdutoEstab/{id}")]
        public async Task<ActionResult<vwProdutoEstabelecimento>> GetvwProdutoEstab(Guid id)
        {
            var vwProduto = await _context.ProdutoEstabelecimento.FindAsync(id);

            if (vwProduto == null)
            {
                return NotFound();
            }

            return vwProduto;
        }

        // GET: api/vwProdutos
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwProduto>>> GetProduto()
        {
            return await _context.Produto.ToListAsync();
        }
        // GET: api/vwProdutos
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet("listarProd")]
        public async Task<ActionResult<IEnumerable<vwProduto>>> GetProduto(string produtoNome)
        {
            return await _context.Produto.Where(a=> a.NomeProduto.Contains(produtoNome)).ToListAsync();
        }
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet("produtoNome")]
        public async Task<ActionResult<IEnumerable<vwProdutoEstabelecimento>>> GetProdutoNome(string produtoNome, Guid estab)
        {
            return await _context.ProdutoEstabelecimento
                                .Where(a=> a.NomeProduto.Contains(produtoNome)&& a.UidEstabelecimento == estab)
                                .ToListAsync();
        }
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        // GET: api/vwProdutos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwProduto>> GetvwProduto(Guid id)
        {
            var vwProduto = await _context.Produto.FindAsync(id);

            if (vwProduto == null)
            {
                return NotFound();
            }

            return vwProduto;
        }
        [Authorize(Roles = "V9Admin")]
        // PUT: api/vwProdutos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwProduto(Guid id, vwProduto vwProduto)
        {
            if (id != vwProduto.UidProduto)
            {
                return BadRequest();
            }

            _context.Entry(vwProduto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        // PUT: api/vwProdutos/5
        [HttpPut("Prodestab/{id}")]
        public async Task<IActionResult> Prodestab(Guid id, vwProdutoEstabelecimento Produto)
        {
            if (id != Produto.uidProdutoEstabelecimento)
            {
                return BadRequest();
            }

            _context.Entry(Produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwProdutoEstabExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }
        [Authorize(Roles = "V9Admin")]
        // POST: api/vwProdutos
        [HttpPost]
        public async Task<ActionResult<vwProduto>> PostvwProduto(vwProduto Prod)
        {
            try
            {
                _context.Entry<vwProduto>(Prod).State = EntityState.Added;
                //_context.Produto.Add(Produto);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {

                return NotFound();
            }
            //Prod.UidProduto = 1;
         
        }
        [Authorize(Roles = "V9Admin")]
        // DELETE: api/vwProdutos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwProduto>> DeletevwProduto(Guid id)
        {
            var Produto = await _context.Produto.FindAsync(id);
            if (Produto == null)
            {
                var ProdutoEstab = await _context.ProdutoEstabelecimento.FindAsync(id);
                if (ProdutoEstab != null)
                {
                    _context.ProdutoEstabelecimento.Remove(ProdutoEstab);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }

            _context.Produto.Remove(Produto);
            await _context.SaveChangesAsync();

            return Ok();
        }
   
        private bool vwProdutoExists(Guid id)
        {
            return _context.Produto.Any(e => e.UidProduto == id);
        }
        private bool vwProdutoEstabExists(Guid id)
        {
            return _context.ProdutoEstabelecimento.Any(e => e.uidProdutoEstabelecimento == id);
        }
    }
}
