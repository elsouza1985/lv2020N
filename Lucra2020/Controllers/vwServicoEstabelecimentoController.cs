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
    public class vwServicoEstabelecimentoController : ControllerBase
    {
        private readonly AppDbContext _context;
   
        public vwServicoEstabelecimentoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/vwServicoEstabelecimento
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpGet("LoadServices")]
        public async Task<ActionResult<IEnumerable<vwServicoEstabelecimento>>> GetServico(Guid estab)
        {
            return await _context.Servico.Where(a=> a.UidEstabelecimento == estab).ToListAsync();
        }


        // GET: api/vwServicoEstabelecimento/5
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
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
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutvwServicoEstabelecimento(Guid id, vwServicoEstabelecimento vwServicoEstabelecimento)
        {
          
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
        [Authorize(Roles = "V9Admin,Proprietário,Funcionário")]
        [HttpPost]
        public async Task<ActionResult<vwServicoEstabelecimento>> PostvwServicoEstabelecimento(vwServicoEstabelecimento vwServicoEstabelecimento)
        {
            _context.Servico.Add(vwServicoEstabelecimento);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // DELETE: api/vwServicoEstabelecimento/5
        [Authorize(Roles = "V9Admin,Proprietário")]
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
