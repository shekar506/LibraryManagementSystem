using Library_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public class BookIssueRepository : IBookIssue
    {
        private readonly LibraryDbContext _context;

        public BookIssueRepository(LibraryDbContext context)
        {
            _context = context;
        }
        public void IssueBook(BookIssue issue)
        {
            _context.BookIssues.Add(issue);

            var book = _context.Books.Find(issue.BookId);
            if (book != null)
            {
                book.AvailabilityStatus = "Issued";
                _context.Books.Update(book);
            }

            _context.SaveChanges();
        }
        public BookIssue GetIssueById(int id)
        {
            return _context.BookIssues.SingleOrDefault(b => b.IssueId == id);
        }

        public IEnumerable<BookIssue> GetAllIssues()
        {
            return _context.BookIssues.ToList();
        }

        public void ReturnBook(int id, BookIssue bookIssue)
        {
            var issue = _context.BookIssues.Find(id);
            if (issue != null)
            {
                issue.ReturnDate = DateOnly.FromDateTime(DateTime.Now);
                _context.BookIssues.Update(issue);

                var book = _context.Books.Find(issue.BookId);
                if (book != null)
                {
                    book.AvailabilityStatus = "Available";
                    _context.Books.Update(book);
                }

                _context.SaveChanges();
            }
        }
        public void DeleteIssue(int id)
        {
            var issue = _context.BookIssues.SingleOrDefault(b => b.IssueId == id);
            if (issue != null)
            {
                _context.BookIssues.Remove(issue);
                _context.SaveChanges();
            }
        }


    }
}
