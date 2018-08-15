using BOL_02;
using DAL_01;
using System.Collections.Generic;
using System.Linq;

namespace BLL_03
{
    public class CarManager : BaseLogic
    {

        // Get all cars: 
        public List<CarModel> GetAllCars()
        {
            return DB.Cars.Select(o =>
                new CarModel
                {
                    CarID = o.CarID,
                    CarTypeID = o.CarTypeID,
                    CarNumber = o.CarNumber,
                    CurrentKilometrage = o.CurrentKilometrage,
                    IsProperToRent = o.IsProperToRent,
                    Image = o.Image,
                    LocatedAtTheBranch = o.LocatedAtTheBranch


                }).ToList();
        }

        // Get one Car: 
        public CarModel GetOneCar(int CarTypeID)
        {
            var query = from o in DB.Cars
                        where o.CarTypeID == CarTypeID
                        select new CarModel
                        {
                            CarID = o.CarID,
                            CarTypeID = o.CarTypeID,
                            CarNumber = o.CarNumber,
                            CurrentKilometrage = o.CurrentKilometrage,
                            IsProperToRent = o.IsProperToRent,
                            Image = o.Image,
                            LocatedAtTheBranch = o.LocatedAtTheBranch
    };

            return query.SingleOrDefault();
        }

        public CarModel GetOneCarById(int CarID)
        {
            var query = from o in DB.Cars
                where o.CarID == CarID
                select new CarModel
                {
                    CarID = o.CarID,
                    CarTypeID = o.CarTypeID,
                    CarNumber = o.CarNumber,
                    CurrentKilometrage = o.CurrentKilometrage,
                    IsProperToRent = o.IsProperToRent,
                    Image = o.Image,
                    LocatedAtTheBranch = o.LocatedAtTheBranch
                };

            return query.SingleOrDefault();
        }

        public CarModel GetOneCarByCarNumber(int CarNumber)
        {
            var query = from o in DB.Cars
                where o.CarNumber == CarNumber
                        select new CarModel
                {
                    CarID = o.CarID,
                    CarTypeID = o.CarTypeID,
                    CarNumber = o.CarNumber,
                    CurrentKilometrage = o.CurrentKilometrage,
                    IsProperToRent = o.IsProperToRent,
                    Image = o.Image,
                    LocatedAtTheBranch = o.LocatedAtTheBranch
                };

            return query.SingleOrDefault();
        }

        // Add new Car: 
        public CarModel AddCar(CarModel carModel)
        {
            Car car = new Car
            {
                CarTypeID = DAL.GetCarTypeID(),
                CarNumber = carModel.CarNumber,
                CurrentKilometrage = carModel.CurrentKilometrage,
                IsProperToRent = carModel.IsProperToRent,
                Image = carModel.Image,
                LocatedAtTheBranch = DAL.GetBranchID()

            };

            DB.Cars.Add(car);
            DB.SaveChanges();
            return carModel; // Return the added car with all its fields.
        }

        // Update complete car: 
        public CarModel UpdateCar(CarModel carModel, int carNumber)
        {
            var query = from o in DB.Cars
                        where o.CarNumber == carNumber
                        select o;

            Car car = query.SingleOrDefault();
            if (car == null)
                return null;
            car.CarNumber = carModel.CarNumber;
            car.CurrentKilometrage = carModel.CurrentKilometrage;
            car.IsProperToRent = carModel.IsProperToRent;
            car.Image = carModel.Image;

            DB.SaveChanges();

            return carModel; // Return the updated model.
        }

        // Delete car:
        public bool DeleteCar(int id)
        {
            var query = from o in DB.Cars
                        where o.CarID == id
                        select o;

            Car car = query.SingleOrDefault();
            if (car == null)
                return false;

            DB.Cars.Remove(car);
            DB.SaveChanges();
            return true;
        }
    }
}
