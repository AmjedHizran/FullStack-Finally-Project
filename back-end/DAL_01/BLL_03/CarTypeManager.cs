using BOL_02;
using DAL_01;
using System.Collections.Generic;
using System.Linq;
namespace BLL_03
{
    public class CarTypeManager : BaseLogic
    {

        // Get all CarType: 
        public List<CarTypeModel> GetAllCarTypes()
        {
            return DB.CarTypes.Select(o =>
                new CarTypeModel
                {
                    CarTypeID = o.CarTypeID,
                    MakerName = o.MakerName,
                    Model = o.Model,
                    DailyCost = o.DailyCost,
                    CostOfDayOverdue = o.CostOfDayOverdue,
                    YearOfProduction = o.yearOfProduction,
                    Gear = o.Gear

                }).ToList();
        }

        // Get one CarType: 
        public CarTypeModel GetOneCarType(int CarTypeID)
        {
            var query = from o in DB.CarTypes
                        where o.CarTypeID == CarTypeID
                        select new CarTypeModel
                        {
                            CarTypeID = o.CarTypeID,
                            MakerName = o.MakerName,
                            Model = o.Model,
                            DailyCost = o.DailyCost,
                            CostOfDayOverdue = o.CostOfDayOverdue,
                            YearOfProduction = o.yearOfProduction,
                            Gear = o.Gear
                        };

            return query.SingleOrDefault();
        }

        // Add new CarType: 
        public CarTypeModel AddCarType(CarTypeModel carTypeModel)
        {
            CarType carType = new CarType
            {
                MakerName = carTypeModel.MakerName,
                Model = carTypeModel.Model,
                DailyCost = carTypeModel.DailyCost,
                CostOfDayOverdue = carTypeModel.CostOfDayOverdue,
                yearOfProduction = carTypeModel.YearOfProduction,
                Gear = carTypeModel.Gear
            };

            DB.CarTypes.Add(carType);
            DB.SaveChanges();
            return carTypeModel; // Return the added carType with all its fields.
        }

        // Update complete CarType: 
        public CarTypeModel UpdateCarType(CarTypeModel carTypeModel, int CarTypeID)
        {
            var query = from o in DB.CarTypes
                        where o.CarTypeID == CarTypeID
                        select o;

            CarType carType = query.SingleOrDefault();
            if (carType == null)
                return null;

            carType.MakerName = carTypeModel.MakerName;
            carType.Model = carTypeModel.Model;
            carType.DailyCost = carTypeModel.DailyCost;
            carType.CostOfDayOverdue = carTypeModel.CostOfDayOverdue;
            carType.yearOfProduction = carTypeModel.YearOfProduction;
            carType.Gear = carTypeModel.Gear;

            DB.SaveChanges();

            return carTypeModel; // Return the updated model.
        }

        // Delete CarType:
        public bool DeleteCarType(int id)
        {
            var query = from o in DB.CarTypes
                        where o.CarTypeID == id
                        select o;

            CarType carType = query.SingleOrDefault();
            if (carType == null)
                return false;

            DB.CarTypes.Remove(carType);
            DB.SaveChanges();
            return true;
        }
    }
}
