using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Filters
{
    public class AvgPriceValidationAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            string result = Convert.ToString(value);
            const string LookupTable = "0123456789";
            int charValue;
            char c;
            int total = 0;
            int index = 0;
            while (index < result.Length)
            {
                c = result[index];
                if (c < 48 || c > 57)
                {
                    return false;
                }
                charValue = LookupTable.IndexOf(c);
                total = (total * 10) + charValue;
                index++;
            }
            return true;
            //return (int)(value) >= 5 && (int)(value) <= 150;
        }
    }
}