using Library_DAL.Models;
using Library_REPO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_API.Controllers
{
  //  [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBook _bookRepository;

        public BookController(IBook bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public IActionResult GetAllBooks()
        {
            var books = _bookRepository.GetAllBooks();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = _bookRepository.GetBookById(id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            _bookRepository.AddBook(book);
            return Ok(new { message = "Book added successfully" });
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book book)
        {
            var existingBook = _bookRepository.GetBookById(id);
            if (existingBook == null)
                return NotFound();

            _bookRepository.UpdateBook(id, book);
            return Ok(new { message = "Book updated successfully" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var existingBook = _bookRepository.GetBookById(id);
            if (existingBook == null)
                return NotFound();

            _bookRepository.DeleteBook(id);
            return Ok(new { message = "Book deleted successfully" });
        }
    }
}
