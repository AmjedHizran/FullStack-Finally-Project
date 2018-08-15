using DAL_01;
using System;

namespace BLL_03
{
    public abstract class BaseLogic : IDisposable
    {
        protected CarRentDBEntities DB = new CarRentDBEntities();


        //because we are not using the ef inside a "USING" BLOCK
        //WE HAVE TO DISPOSE THE EF OBJECT WITH THE Dispose FUNCTION
        //Dispose הפונקציה של 
        //Dispose תקרא באופן אוטומטי כאשר נבצע פעולת 
        //על אובייקט ממחלקה נגזרת של המחלקה הזו
        public void Dispose()
        {
            DB.Dispose();
        }
    }
}
