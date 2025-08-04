using Library_DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public class UserRepository : IUser
    {
        private readonly LibraryDbContext _context;

        public UserRepository(LibraryDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }
   
        public async Task<bool> UpdatePasswordAsync(string username, string newPassword)
        {
            var user = await GetUserByUsernameAsync(username);
            if (user == null) return false;

            user.Password = newPassword;
            await _context.SaveChangesAsync();
            return true;
        }


        public User GetUserById(int id)
        {
            return _context.Users.SingleOrDefault(u => u.UserId == id);
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public void DeleteUser(int id)
        {
            var user = _context.Users.SingleOrDefault(u => u.UserId == id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }
        public User ValidateUser(string username, string password)
        {
            return _context.Users.FirstOrDefault(u => u.Username == username && u.Password == password);
        }

     
    }
}
