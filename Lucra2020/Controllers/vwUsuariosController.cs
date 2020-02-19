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
    public class vwUsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public vwUsuariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwUsuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwUsuario>>> GetVwUsuario()
        {
            return await _context.VwUsuario.ToListAsync();
        }

        // GET: api/vwUsuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwUsuario>> GetvwUsuario(Guid id)
        {
            var vwUsuario = await _context.VwUsuario.FindAsync(id);

            if (vwUsuario == null)
            {
                return NotFound();
            }
            vwUsuario.Estabelecimentos = _context.UsuarioEstabelecimento.Where(a => a.UidUsuario == vwUsuario.UidUsuario && a.NomeUsuario == vwUsuario.NomeUsuario).ToList();

            return vwUsuario;
        }

        // PUT: api/vwUsuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwUsuario(Guid id, vwUsuario vwUsuario)
        {
            if (id != vwUsuario.UidUsuario)
            {
                return BadRequest();
            }

            _context.Entry(vwUsuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwUsuarioExists(id))
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

        // POST: api/vwUsuarios
        [HttpPost]
        public async Task<ActionResult<vwUsuario>> PostvwUsuario(vwUsuario vwUsuario)
        {
            _context.VwUsuario.Add(vwUsuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetvwUsuario", new { id = vwUsuario.UidUsuario }, vwUsuario);
        }

        // DELETE: api/vwUsuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwUsuario>> DeletevwUsuario(Guid id)
        {
            var vwUsuario = await _context.VwUsuario.FindAsync(id);
            if (vwUsuario == null)
            {
                return NotFound();
            }

            _context.VwUsuario.Remove(vwUsuario);
            await _context.SaveChangesAsync();

            return vwUsuario;
        }

        private bool vwUsuarioExists(Guid id)
        {
            return _context.VwUsuario.Any(e => e.UidUsuario == id);
        }
    }
}
