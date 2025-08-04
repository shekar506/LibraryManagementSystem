using Google.Apis.Auth;
using Library_API.Models;
using Library_DAL.Models;
using Library_REPO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUser _userRepository;

        private readonly JwtOption _options;

        private readonly IMember _memberRepository;


        public AuthController(IUser userRepository, IMember memberRepository, IOptions<JwtOption> options)
        {
            _userRepository = userRepository;
            _memberRepository = memberRepository;
            _options = options.Value;
        }
        [HttpPost("register-member")]
        public async Task<IActionResult> RegisterMember([FromBody] RegisterUserDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _userRepository.GetUserByUsernameAsync(dto.Username);
            if (existingUser != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }

            var user = new User
            {
                Username = dto.Username,
                Password = dto.Password, // In real apps, hash the password
                Role = dto.Role
            };

            await _userRepository.AddUserAsync(user);
            return Ok(new { message = "User registered successfully" });
        }
 



        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDto model)
        {
            var employee = await _userRepository.GetUserByUsernameAsync(model.Username);
            if (employee is null)
            {
                return BadRequest(new { error = "email does not exist" });
            }
            if (employee.Password != model.Password)
            {
                return BadRequest(new { error = "email/password is incorrect." });
            }

            var token = GetJWTToken(employee);
            return Ok(new { token = token });
        }
       

        [HttpPut("reset-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordRequest request)
        {
            var success = await _userRepository.UpdatePasswordAsync(request.Username, request.NewPassword);
            if (!success)
                return NotFound("User not found");

            return Ok("Password updated successfully");
        }


        private string GetJWTToken(User user)
        {
            var jwtKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Key));
            var credential = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role)

    };

            var token = new JwtSecurityToken(
                _options.Issuer,
                _options.Issuer,
                claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: credential
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }





    }
}
