using BOL_02;
using DAL_01;
using System.Collections.Generic;
using System.Linq;
using BLL_03.Definitions;

namespace BLL_03
{
    public class UserManager : BaseLogic
    {
        // Get all Users: 
        public List<UserModel> GetAllUsers()
        {
            return DB.Users1.Select(o =>
                new UserModel
                {
                    UserID = o.UserID,
                    FullName = o.FullName,
                    DateOfBirth = o.DateOfBirth,
                    Email = o.Email,
                    Gender = o.Gender,
                    IdCard = o.IdCard,
                    UserName = o.UserName,
                    Password = o.Password,
                    RoleName = o.Role.Name

                }).ToList();
        }

        // Get one User: 
        public UserModel GetOneUser(string UserName)
        {
            var query = from o in DB.Users1
                        where o.UserName == UserName
                        select new UserModel
                        {
                            UserID = o.UserID,
                            FullName = o.FullName,
                            DateOfBirth = o.DateOfBirth,
                            Email = o.Email,
                            Gender = o.Gender,
                            IdCard = o.IdCard,
                            UserName = o.UserName,
                            Password = o.Password,
                            RoleName = o.Role.Name
                        };

            return query.SingleOrDefault();
        }

        // Add new order: 
        /// <summary>
        /// Only supports addition of a buyer or a seller.
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        public UserModel AddUser(UserModel userModel)
        {
            User1 user = new User1();
            user.FullName = userModel.FullName;
            user.DateOfBirth = userModel.DateOfBirth;
            user.Email = userModel.Email;
            user.Gender = userModel.Gender;
            user.IdCard = userModel.IdCard;
            user.Image = userModel.Image;
            user.UserName = userModel.UserName;
            user.Password = userModel.Password;
            user.Role_Id = Consts.BuyerRoleId;// userModel.RoleName.ToLower() == "Buyer".ToLower() ? Consts.BuyerRoleId : Consts.SellerRoleId;

            DB.Users1.Add(user);
            DB.SaveChanges();
            return userModel; // Return the added user with all its fields.
        }

        // Update complete user: 
        public UserModel UpdateUser(UserModel userModel, string UserName)
        {
            var query = from o in DB.Users1
                        where o.UserName == UserName
                        select o;

            User1 user = query.SingleOrDefault();
            if (user == null)
                return null;

            user.FullName = userModel.FullName;
            user.DateOfBirth = userModel.DateOfBirth;
            user.Email = userModel.Email;
            user.Gender = userModel.Gender;
            user.IdCard = userModel.IdCard;
            user.UserName = userModel.UserName;
            user.Password = userModel.Password;

            DB.SaveChanges();

            return userModel; // Return the updated model.
        }

        // Delete user:
        public bool DeleteUser(int id)
        {
            var query = from o in DB.Users1
                        where o.UserID == id
                        select o;

            User1 user = query.SingleOrDefault();
            if (user == null)
                return false;

            DB.Users1.Remove(user);
            DB.SaveChanges();
            return true;
        }
    }
}
