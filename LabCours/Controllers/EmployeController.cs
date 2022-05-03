using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LabCours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeController : ControllerBase
    {

        private readonly DataContext context;

        public EmployeController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employe>>> Get()
        {
            return Ok(await context.Employes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employe>> Get(int id)
        {
           var employe = await context.Employes.FindAsync(id);
            if(employe == null)
                return BadRequest("Employe not found");
            return Ok(employe);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employe>>> AddEmplye(Employe employe)
        {
            context.Employes.Add(employe);
            await context.SaveChangesAsync();
            return Ok("employe added successfuly");
            //return Ok(await context.Employes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Employe>>> UpdateEmploye(Employe request)
        {
            var dbEmploye = await context.Employes.FindAsync(request.Id);
            if (dbEmploye == null)
                return BadRequest("Employe not found");

            dbEmploye.Emri = request.Emri;
            dbEmploye.Mbiemri= request.Mbiemri;
            dbEmploye.NrTel = request.NrTel;
            dbEmploye.Adresa = request.Adresa;
            dbEmploye.Emaili = request.Emaili;
            dbEmploye.Passwordi= request.Passwordi;

            await context.SaveChangesAsync();  

            return Ok(await context.Employes.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employe>>> Delete(int id)
        {
            var dbEmploye = await context.Employes.FindAsync(id);
            if (dbEmploye == null)
                return BadRequest("Employe not found");

           context.Employes.Remove(dbEmploye);
            await context.SaveChangesAsync();
            return Ok("employe deleted successfuly");
            //return Ok(await context.Employes.ToListAsync());
        }
    }
}
