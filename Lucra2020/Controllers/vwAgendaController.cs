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
    public class vwAgendaController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Guid estab = new Guid("0CB0E46F-6F9D-483E-8494-3DA10347D9C3");

        public vwAgendaController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwAgenda
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwAgenda>>> GetVwAgenda(DateTime date)
        {
            if(date == null)
            {
                date = DateTime.Now;
            }

            return await _context.VwAgenda.Where(a=> a.DataHoraAgendamento >= date && a.DataHoraAgendamento < date.AddDays(1)&& a.UidEstabelecimento == estab).ToListAsync();
        }

        // GET: api/vwAgenda/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwAgenda>> GetvwAgenda(Guid id)
        {
            var vwAgenda = await _context.VwAgenda.FindAsync(id);

            if (vwAgenda == null)
            {
                return NotFound();
            }

            return vwAgenda;
        }

        // PUT: api/vwAgenda/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwAgenda(Guid id, vwAgenda vwAgenda)
        {
            if (id != vwAgenda.UidAgendamento)
            {
                return BadRequest();
            }

            _context.Entry(vwAgenda).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwAgendaExists(id))
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

        // POST: api/vwAgenda
        [HttpPost]
        public async Task<ActionResult<vwAgenda>> PostvwAgenda(vwAgenda vwAgenda)
        {
            vwAgenda.UidEstabelecimento = estab;
            _context.VwAgenda.Add(vwAgenda);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwAgenda", new { id = vwAgenda.UidAgendamento }, vwAgenda);
        }

        // DELETE: api/vwAgenda/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwAgenda>> DeletevwAgenda(Guid id)
        {
            var vwAgenda = await _context.VwAgenda.FindAsync(id);
            if (vwAgenda == null)
            {
                return NotFound();
            }

            _context.VwAgenda.Remove(vwAgenda);
            await _context.SaveChangesAsync();

            return vwAgenda;
        }

        private bool vwAgendaExists(Guid id)
        {
            return _context.VwAgenda.Any(e => e.UidAgendamento == id);
        }
    }
}
