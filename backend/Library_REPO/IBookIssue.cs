using Library_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public interface IBookIssue
    {
        IEnumerable<BookIssue> GetAllIssues();
        BookIssue GetIssueById(int id);
        void IssueBook(BookIssue issue);
        void ReturnBook(int id, BookIssue updatedIssue);
        void DeleteIssue(int id);
    }
}
