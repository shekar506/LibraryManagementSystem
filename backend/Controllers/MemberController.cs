using Library_API.Models;
using Library_DAL.Models;
    using Library_REPO;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

    namespace Library_API.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        //[Authorize]
        public class MemberController : ControllerBase
        {
            private readonly IMember _memberRepository;

            public MemberController(IMember memberRepository)
            {
                _memberRepository = memberRepository;
            }

            // GET: api/Member
            [HttpGet]
            public ActionResult<IEnumerable<Member>> GetAllMembers()
            {
                var members = _memberRepository.GetAllMembers();
                return Ok(members);
            }

            // GET: api/Member/5
            [HttpGet("{id}")]
            public ActionResult<Member> GetMemberById(int id)
            {
                var member = _memberRepository.GetMemberById(id);
                if (member == null)
                {
                    return NotFound();
                }
                return Ok(member);
            }

        [HttpPost("register-member")]
        public async Task<IActionResult> AddMember([FromBody] MemberDto dto)
        {
            if (dto == null) return BadRequest("Invalid data");

            var member = new Member
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone
            };

            _memberRepository.AddMember(member);
            await _memberRepository.SaveChangesAsync();

            return Ok(new { message = "Member added successfully" });
        }



        // PUT: api/Member/5
        [HttpPut("{id}")]
        public IActionResult UpdateMember(int id, [FromBody] MemberDto dto)
        {
            var existing = _memberRepository.GetMemberById(id);
            if (existing == null) return NotFound();

            var updated = new Member
            {
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone
            };

            _memberRepository.UpdateMember(id, updated);
            return Ok(new { message = "Member updated successfully" });
        }

        [HttpGet("get-member-id")]
        [Authorize(Roles = "Member")]
        public async Task<IActionResult> GetMemberId()
        {
            var username = User.Identity?.Name;
            if (username == null)
                return Unauthorized();

            var member = await _memberRepository.GetMemberByUsernameAsync(username);
            if (member == null)
                return NotFound("Member not found");

            return Ok(new { memberId = member.MemberId });
        }


        // DELETE: api/Member/5
        [HttpDelete("{id}")]
            public ActionResult DeleteMember(int id)
            {
                var existing = _memberRepository.GetMemberById(id);
                if (existing == null)
                {
                    return NotFound();
                }
                _memberRepository.DeleteMember(id);
                return Ok(new { message = "Member deleted successfully" });
            }
        }
    }
