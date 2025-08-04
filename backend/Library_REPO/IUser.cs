using Library_DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library_REPO
{
    public interface IUser
    {
        IEnumerable<User> GetAllUsers();
        User GetUserById(int id);
        void DeleteUser(int id);
        User ValidateUser(string username, string password);
        Task<bool> UpdatePasswordAsync(string username, string newPassword);


        Task<User?> GetUserByUsernameAsync(string username);
        Task AddUserAsync(User user);


    }
}
