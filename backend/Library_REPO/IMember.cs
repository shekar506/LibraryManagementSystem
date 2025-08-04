using Library_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public interface IMember
    {
        IEnumerable<Member> GetAllMembers();
        Member GetMemberById(int id);
        void AddMember(Member member);
        void UpdateMember(int id, Member member);
        void DeleteMember(int id);
        Task SaveChangesAsync();
    }
}
