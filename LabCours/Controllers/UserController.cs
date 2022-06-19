using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LabCours.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }
/*
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await context.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user == null)
                return BadRequest("Employe not found");
            return Ok(user);
        }*/

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegistration request)
        {
            if (_context.Users.Any(u => u.Email == request.Email))
            {
                return BadRequest("User already exists.");
            }

        

            var user = new User
            {
                Emri = request.Emri,
                Mbiemri = request.Mbiemri, 
                Location = request.Location, 
                Email = request.Email,
                Password = request.Password,

                
                
                
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User successfully created!");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLogin request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            if (request.Password != user.Password)
            {
                return BadRequest("Password is incorrect.");
            }

 
    
            return Ok($"Welcome back, {user.Emri}! :)");
        }       
    }
}
