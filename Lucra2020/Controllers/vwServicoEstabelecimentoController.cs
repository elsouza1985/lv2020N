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
    public class vwServicoEstabelecimentoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly Guid estab = new Guid("B7882E07-56A3-478E-A4C2-51125E471CAC");
        public vwServicoEstabelecimentoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwServicoEstabelecimento
        [HttpGet]
        public async Task<ActionResult<IEnumerable<vwServicoEstabelecimento>>> GetServico()
        {
            return await _context.Servico.ToListAsync();
        }
       

        // GET: api/vwServicoEstabelecimento/5
        [HttpGet("{id}")]
        public async Task<ActionResult<vwServicoEstabelecimento>> GetvwServicoEstabelecimento(Guid id)
        {
            var vwServicoEstabelecimento = await _context.Servico.FindAsync(id);

            if (vwServicoEstabelecimento == null)
            {
                return NotFound();
            }
            vwServicoEstabelecimento.Produtos = await _context
                .ServicoProdutos
                .Where(a => a.UidServicoEstabelecimento == vwServicoEstabelecimento.UidServicoEstabelecimento).ToListAsync();
            return vwServicoEstabelecimento;
        }

        // PUT: api/vwServicoEstabelecimento/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwServicoEstabelecimento(Guid id, vwServicoEstabelecimento vwServicoEstabelecimento)
        {
            vwServicoEstabelecimento.UidEstabelecimento = estab;
            if (id != vwServicoEstabelecimento.UidServicoEstabelecimento)
            {
                return BadRequest();
            }

            _context.Entry(vwServicoEstabelecimento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!vwServicoEstabelecimentoExists(id))
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

        // POST: api/vwServicoEstabelecimento
        [HttpPost]
        public async Task<ActionResult<vwServicoEstabelecimento>> PostvwServicoEstabelecimento(vwServicoEstabelecimento vwServicoEstabelecimento)
        {
            vwServicoEstabelecimento.UidEstabelecimento = estab;
            _context.Servico.Add(vwServicoEstabelecimento);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/vwServicoEstabelecimento/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<vwServicoEstabelecimento>> DeletevwServicoEstabelecimento(Guid id)
        {
            var vwServicoEstabelecimento = await _context.Servico.FindAsync(id);
            if (vwServicoEstabelecimento == null)
            {
                return NotFound();
            }
            //_context.ServicoProdutos.RemoveRange(vwServicoEstabelecimento.Produtos);
            _context.Servico.Remove(vwServicoEstabelecimento);
            await _context.SaveChangesAsync();

            return vwServicoEstabelecimento;
        }

        private bool vwServicoEstabelecimentoExists(Guid id)
        {
            return _context.Servico.Any(e => e.UidServicoEstabelecimento == id);
        }
    }
}
