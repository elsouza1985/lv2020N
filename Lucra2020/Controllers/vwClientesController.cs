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
    public class vwClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public vwClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwClientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwCliente>>> GetVwCliente()
        {
            return await _context.VwCliente.ToListAsync();
        }

        // GET: api/vwClientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwCliente>> GetvwCliente(Guid id)
        {
            var vwCliente = await _context.VwCliente.FindAsync(id);

            if (vwCliente == null)
            {
                return NotFound();
            }

            return vwCliente;
        }

        // PUT: api/vwClientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwCliente(Guid id, vwCliente vwCliente)
        {
            if (id != vwCliente.UidCliente)
            {
                return BadRequest();
            }
            vwCliente.UidEstabelecimento = new Guid("0CB0E46F-6F9D-483E-8494-3DA10347D9C3");

            _context.Entry(vwCliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwClienteExists(id))
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

        // POST: api/vwClientes
        [HttpPost]
        public async Task<ActionResult<vwCliente>> PostvwCliente(vwCliente vwCliente)
        {
            vwCliente.UidEstabelecimento = new Guid("0CB0E46F-6F9D-483E-8494-3DA10347D9C3");
            _context.VwCliente.Add(vwCliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwCliente", new { id = vwCliente.UidCliente }, vwCliente);
        }

        // DELETE: api/vwClientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwCliente>> DeletevwCliente(Guid id)
        {
            var vwCliente = await _context.VwCliente.FindAsync(id);
            if (vwCliente == null)
            {
                return NotFound();
            }

            _context.VwCliente.Remove(vwCliente);
            await _context.SaveChangesAsync();

            return vwCliente;
        }

        private bool vwClienteExists(Guid id)
        {
            return _context.VwCliente.Any(e => e.UidCliente == id);
        }
    }
}
