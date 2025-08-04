using Library_DAL.Models;
using Library_REPO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class BookIssueController : ControllerBase
    {
        private readonly IBookIssue _issueRepository;

        public BookIssueController(IBookIssue issueRepository)
        {
            _issueRepository = issueRepository;
        }

        [HttpGet]
        public IActionResult GetAllIssues() => Ok(_issueRepository.GetAllIssues());

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetIssue(int id)
        {
            var issue = _issueRepository.GetIssueById(id);
            return issue == null ? NotFound() : Ok(issue);
        }
        [HttpPut("return/{bookId}")]
        public async Task<IActionResult> ReturnBook(int bookId)
        {
            var result = await _issueRepository.ReturnBookAsync(bookId);
            if (!result)
                return NotFound("Book not found");

            return Ok("Book returned successfully");
        }

        [HttpPost]
        public IActionResult IssueBook(BookIssue issue)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _issueRepository.IssueBook(issue);
            return CreatedAtAction(nameof(GetIssue), new { id = issue.IssueId }, issue);
        }
        [HttpGet("member/{memberId}")]
        public IActionResult GetIssuesByMember(int memberId)
        {
            var issues = _issueRepository
                .GetAllIssues()
                .Where(i => i.MemberId == memberId)
                .ToList();
            return Ok(issues);
        }

        [HttpPut("{id}")]
        public IActionResult ReturnBook(int id, BookIssue issue)
        {
            if (id != issue.IssueId)
                return BadRequest("ID mismatch");

            var existing = _issueRepository.GetIssueById(id);
            if (existing == null)
                return NotFound();

            _issueRepository.ReturnBook(id, issue);
            return NoContent();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteIssue(int id)
        {
            _issueRepository.DeleteIssue(id);
            return NoContent();
        }
    }
}
