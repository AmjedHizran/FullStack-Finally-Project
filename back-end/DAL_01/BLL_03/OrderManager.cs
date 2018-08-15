using System;
using BOL_02;
using DAL_01;
using System.Collections.Generic;
using System.Linq;

namespace BLL_03
{
    public class OrderManager : BaseLogic
    {
        // Get all Orders: 
        public List<OrderModel> GetAllOrders()
    {
        return DB.Orders.Select(o =>
            new OrderModel
            {
                UserID = o.UserID,
                CarID = o.CarID,
                RentedDate = o.RentedDate,
                ReturnDate = o.ReturnDate,
                ActualReturnDate = o.ActualReturnDate ?? DateTime.MinValue

            }).ToList();
    }

    // Get one Order: 
    public OrderModel GetOneOrder(int orderId)
    {
        var query = from o in DB.Orders
                    where o.OrderID == orderId
                    select new OrderModel
                    {
                        CarID = o.CarID,
                        UserID = o.UserID,
                        RentedDate = o.RentedDate,
                        ReturnDate = o.ReturnDate,
                        ActualReturnDate = o.ActualReturnDate ?? DateTime.MinValue
                    };

        return query.SingleOrDefault();
    }

    // Add new order: 
    public OrderModel AddOrder(OrderModel orderModel)
    {
        Order order = new Order
        {
            CarID = orderModel.CarID,
            UserID = orderModel.UserID,
            RentedDate = orderModel.RentedDate,
            ReturnDate = orderModel.ReturnDate,
            ActualReturnDate =  DateTime.MinValue
        };

        DB.Orders.Add(order);
        DB.SaveChanges();
        return orderModel; // Return the added order with all its fields.
    }

        public OrderModel GetOrderByCarId(int CarId)
        {
            var query = from o in DB.Orders
                where o.CarID == CarId && o.ActualReturnDate == DateTime.MinValue
                        select new OrderModel
                {
                    OrderId = o.OrderID,
                    CarID = o.CarID,
                    UserID = o.UserID,
                    RentedDate = o.RentedDate,
                    ReturnDate = o.ReturnDate,
                    ActualReturnDate = o.ActualReturnDate ?? DateTime.MinValue
                };

            return query.SingleOrDefault();
        }
        
    // Update complete order: 
    public OrderModel UpdateOrder(OrderModel orderModel, int OrderId)
    {
        var query = from o in DB.Orders
                    where o.OrderID == OrderId
                    select o;

        Order order = query.SingleOrDefault();
        if (order == null)
            return null;
        order.RentedDate = orderModel.RentedDate;
        order.ReturnDate = orderModel.ReturnDate;
        order.ActualReturnDate = orderModel.ActualReturnDate;

        DB.SaveChanges();

        return orderModel; // Return the updated model.
    }

    // Delete order:
    public bool DeleteOrder(int id)
    {
        var query = from o in DB.Orders
                    where o.OrderID == id
                    select o;

        Order order = query.SingleOrDefault();
        if (order == null)
            return false;

        DB.Orders.Remove(order);
        DB.SaveChanges();
        return true;
    }
}
}
