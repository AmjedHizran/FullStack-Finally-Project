using System;
using System.ComponentModel.DataAnnotations;

namespace BOL_02
{
    public class OrderModel
    {
        public int OrderId { get; set; }
        public int UserID { get; set; }
        public int CarID { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime RentedDate { get; set; }

        [Required, DataType(DataType.DateTime)]
        public DateTime ReturnDate { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime ActualReturnDate { get; set; }
    }
}
