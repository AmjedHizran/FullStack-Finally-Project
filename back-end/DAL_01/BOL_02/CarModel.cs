using System.ComponentModel.DataAnnotations;

namespace BOL_02
{
    public class CarModel
    {
        public int CarID { get; set; }


        public int CarTypeID { get; set; }

        [Required, RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public int CurrentKilometrage { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public bool IsProperToRent { get; set; }

        [Required, RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public int CarNumber { get; set; }

        //[Required, RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public int LocatedAtTheBranch { get; set; }


    }
}
