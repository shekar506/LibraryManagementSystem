using Library_DAL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Library_REPO
{
    public class MemberRepository : IMember
    {
        private readonly LibraryDbContext _context;

        public MemberRepository(LibraryDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Member> GetAllMembers()
        {
            return _context.Members.ToList();
        }

        public Member GetMemberById(int id)
        {
            return _context.Members.SingleOrDefault(m => m.MemberId == id);
        }

        public void AddMember(Member member)
        {
            _context.Members.Add(member);
            _context.SaveChanges();
        }

        public void UpdateMember(int id, Member updatedMember)
        {
            var member = _context.Members.FirstOrDefault(m => m.MemberId == id);
            if (member != null)
            {
                member.Name = updatedMember.Name;
                member.Email = updatedMember.Email;
                member.Phone = updatedMember.Phone;

                _context.SaveChanges();
            }
        }

        public void DeleteMember(int id)
        {
            var member = _context.Members.SingleOrDefault(m => m.MemberId == id);
            if (member != null)
            {
                _context.Members.Remove(member);
                _context.SaveChanges();
            }
        }

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }
    }
}
