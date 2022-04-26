using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LabCours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeController : ControllerBase
    {

        private static List<Employe> employes = new List<Employe>
           {
               new Employe{
                   Id = 1,
                   Emri = "Albin",
                   Mbiemri="Smajli",
                   Adresa="Maxhunav, Vushtrri",
                   NrTel="045-579-712",
                   Emaili="as@gmail.com",
                   Passwordi="123456"
               },
                  new Employe{
                   Id = 2,
                   Emri = "Erjon",
                   Mbiemri="Karaça",
                   Adresa="Vushtrri",
                   NrTel="045-111-222",
                   Emaili="ek@gmail.com",
                   Passwordi="123456"
                }
           };

        [HttpGet]
        public async Task<ActionResult<List<Employe>>> Get()
        {
            return Ok(employes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employe>> Get(int id)
        {
           var employe = employes.Find(e => e.Id == id);
            if(employe == null)
                return BadRequest("Employe not found");
            return Ok(employe);
        }

        [HttpPost]
        public async Task<ActionResult<List<Employe>>> AddEmplye(Employe employe)
        {
            employes.Add(employe);
            return Ok(employes);
        }

        [HttpPut]
        public async Task<ActionResult<List<Employe>>> UpdateEmploye(Employe request)
        {
            var employe = employes.Find(h => h.Id == request.Id);
            if (employe == null)
                return BadRequest("Employe not found.");
            
            employe.Emri = request.Emri;
            employe.Mbiemri= request.Mbiemri;
            employe.Emaili= request.Emaili;
            employe.NrTel= request.NrTel;
            employe.Adresa= request.Adresa;
            employe.Passwordi= request.Passwordi;

            return Ok(employes);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Employe>>> Delete(int id)
        {
            var employe = employes.Find(e => e.Id == id);
            if (employe == null)
                return BadRequest("Employe not found");

            employes.Remove(employe);
            return Ok(employes);
        }
    }
}
