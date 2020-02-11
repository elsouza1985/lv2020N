using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lucra2020.Models;

namespace Lucra2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class vwVendasController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Guid estab = new Guid("B7882E07-56A3-478E-A4C2-51125E471CAC");
        private readonly Guid user = new Guid("82FDA5CE-DF83-41F7-AE29-2158CBBA2DB4");

        public vwVendasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwVendas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwVenda>>> GetVendas()
        {
            return await _context.Vendas.ToListAsync();
        }

        // GET: api/vwVendas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwVenda>> GetvwVenda(Guid id)
        {
            var vwVenda = await _context.Vendas.FindAsync(id);

            if (vwVenda == null)
            {
                return NotFound();
            }

            return vwVenda;
        }

        // PUT: api/vwVendas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwVenda(Guid id, vwVenda vwVenda)
        {
            if (id != vwVenda.UidVenda)
            {
                return BadRequest();
            }

            _context.Entry(vwVenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwVendaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/vwVendas
        [HttpPost]
        public async Task<ActionResult<vwVenda>> PostvwVenda(vwVenda Venda)
        {
            Venda.UidEstabelecimento = estab;
            Venda.UidUsuario = user;
            _context.Vendas.Add(Venda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwVenda", new { id = Venda.UidVenda }, Venda);
        }

        // DELETE: api/vwVendas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwVenda>> DeletevwVenda(Guid id)
        {
            var vwVenda = await _context.Vendas.FindAsync(id);
            if (vwVenda == null)
            {
                return NotFound();
            }

            _context.Vendas.Remove(vwVenda);
            await _context.SaveChangesAsync();

            return vwVenda;
        }

        private bool vwVendaExists(Guid id)
        {
            return _context.Vendas.Any(e => e.UidVenda == id);
        }
    }
}
