using System.ComponentModel.DataAnnotations;

namespace BOL_02
{
    public class CarTypeModel
    {

        public int CarTypeID { get; set; }

        [RegularExpression("^[a-zA-Z]*$", ErrorMessage = "Numbers or special characters are not allowed in the name field")]
        [Required,StringLength(20, MinimumLength = 3, ErrorMessage = "The Maker Name must be 3 chars.")]
        public string MakerName { get; set; }

        [RegularExpression("^([a-zA-Z0-9\\s])+[a-zA-Z0-9\\s]+$", ErrorMessage = "special characters are not allowed in the name Model field")]
        [Required,StringLength(20, MinimumLength = 3, ErrorMessage = "The Model Name must be 3 chars.")]
        public string Model { get; set; }

        [Required,RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public decimal DailyCost { get; set; }

        [Required, RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public decimal CostOfDayOverdue { get; set; }

        [Required, RegularExpression("^[0-9]*$", ErrorMessage = "characters and special characters are not allowed in the name Model field")]
        public int YearOfProduction { get; set; }

        [Required]
        public bool Gear { get; set; }

    }
}
