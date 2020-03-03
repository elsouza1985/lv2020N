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
    public class vwVendasController : ControllerBase
    {
        private readonly AppDbContext _context;
 

        public vwVendasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwVendas
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwVenda>>> GetVendas()
        {
            return await _context.Vendas.ToListAsync();
        }

        // GET: api/vwVendas/5
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
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
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
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
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpPost]
        public async Task<ActionResult<vwVenda>> PostvwVenda(vwVenda Venda)
        {
       
            _context.Vendas.Add(Venda);
        
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwVenda", new { id = Venda.UidVenda }, Venda);
        }

        // DELETE: api/vwVendas/5
        [Authorize(Roles = "V9Admin,Proprietário")]
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
