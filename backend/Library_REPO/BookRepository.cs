using Library_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public class BookRepository : IBook
    {

        private readonly LibraryDbContext _context;

        public BookRepository(LibraryDbContext context)
        {
            _context = context;
        }
        public void AddBook(Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
        }

        public void DeleteBook(int id)
        {
            var book = _context.Books.SingleOrDefault(b => b.BookId == id);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
            }

        }

        public IEnumerable<Book> GetAllBooks()
        {
            return _context.Books.ToList();
        }

        public Book GetBookById(int id)
        {
            return _context.Books.SingleOrDefault(b => b.BookId == id);
        }

        public void UpdateBook(int id, Book book)
        {
            var existingBook = _context.Books.FirstOrDefault(b => b.BookId == id);
            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Isbn = book.Isbn;
                existingBook.AvailabilityStatus = book.AvailabilityStatus;
                _context.SaveChanges();
            }
        }
    }
}
