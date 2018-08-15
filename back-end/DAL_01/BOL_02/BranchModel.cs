using System.ComponentModel.DataAnnotations;

namespace BOL_02
{
    public class BranchModel
    {

        public int BranchID { get; set; }

        [Required,RegularExpression("^[a-zA-Z]*$", ErrorMessage = "Numbers or special characters are not allowed in the name field")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "The Branch Name must be 2 chars.")]
        public string Name { get; set; }

        // [Required, RegularExpression("^([0-9]+[\\ \\.])+[0-9]+$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        [Required]
        public double Latitude { get; set; }


        // [Required, RegularExpression("^([0-9]+[\\ \\.])+[0-9]+$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        [Required]
        public double Longitude { get; set; }

        [RegularExpression("^([a-zA-Z0-9\\s])+[\\ \\,]+[a-zA-Z0-9\\s]+$", ErrorMessage = "Numbers or special characters are not allowed in the name field")]
        [Required, MinLength(3)]
        public string Address { get; set; }
    }
}
