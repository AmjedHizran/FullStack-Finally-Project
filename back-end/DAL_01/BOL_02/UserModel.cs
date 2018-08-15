using System;
using System.ComponentModel.DataAnnotations;

namespace BOL_02
{
    public class UserModel
    {
        public int UserID { get; set; }


        [RegularExpression(@"^([a-zA-Z]+[\s])+[a-zA-Z]+$", ErrorMessage = "Numbers or special characters are not allowed in the name field")]
        [Required, StringLength(20, MinimumLength = 3, ErrorMessage = "The FullName must be 3 chars.")]
        public string FullName { get; set; }


        [Required]
        public int IdCard { get; set; }

        //[RegularExpression("^[a-zA-Z0-9@.]*$", ErrorMessage = "Numbers or special characters are not allowed in the name field")]
        [Required, StringLength(20, MinimumLength = 3, ErrorMessage = "The user Name must be 3 chars.")]
        public string UserName { get; set; }

        [Required, DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        public bool Gender { get; set; }

        
        public string Image { get; set; }


        [Required , DataType(DataType.EmailAddress, ErrorMessage = "E-mail is not valid"), StringLength(50, MinimumLength = 3, ErrorMessage = "The Email must be 3 chars.")]
        public string Email { get; set; }

        [Required, StringLength(150, MinimumLength = 3, ErrorMessage = "The Password must be 3 chars.")]
        public string Password { get; set; }   //Hashed

        public string RoleName { get; set; }   //Seller/Buyer/Administrator
    }
}
