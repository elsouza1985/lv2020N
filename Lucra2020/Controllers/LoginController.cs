using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Lucra2020.Models;
using Lucra2020.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Lucra2020.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration _config;
        private readonly AppDbContext _context;

        public LoginController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;

        }
        [AllowAnonymous]
        [HttpPost]
        public async Task<object> PostAsync(
              [FromBody]User usuario,
              [FromServices]AccessManager accessManager)
        {
            if (await accessManager.ValidateCredentialsAsync(usuario))
            {
                return accessManager.GenerateToken(usuario);
            }
            else
            {
                return new
                {
                    Authenticated = false,
                    Message = "Falha ao autenticar"
                };
            }
        }
        [Authorize(Roles ="Admin")]
        [HttpGet]
        public async Task<ActionResult<vwEstabelecimento>> getEstabelecimento(Guid id)
        {
            var vwEstabelecimento = await _context.Estabelecimento.FindAsync(id);

            if (vwEstabelecimento == null)
            {
                return NotFound();
            }

            return vwEstabelecimento;
        }
    }

}
