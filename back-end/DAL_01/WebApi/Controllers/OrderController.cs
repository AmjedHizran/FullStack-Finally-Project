using BLL_03;
using BOL_02;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Filters;
using WebApi.Filters.JWT;
using WebApi.Helper;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/Order")]
    public class OrderController : ApiController
    {
        OrderManager logic;


        [HttpGet]
        [Route("all")]   // access link : http://localhost:53093/api/order/orders
        public HttpResponseMessage GetAllOrders()
        {
            using (logic = new OrderManager())
            {
                try
                {
                    List<OrderModel> Orders = logic.GetAllOrders();
                    return Request.CreateResponse(HttpStatusCode.OK, Orders);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }

        }
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage GetOneOrder([FromUri]int id)
        {
            using (logic = new OrderManager())
            {
                try
                {
                    OrderModel order = logic.GetOneOrder(id);
                    return Request.CreateResponse(HttpStatusCode.OK, order);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [JwtAuthentication]
        [Authorize(Roles = "Seller")]
        [HttpGet]
        [Route("car/{CarId}")]
        public HttpResponseMessage GetOrderByCarId([FromUri]int CarId)
        {
            using (logic = new OrderManager())
            {
                try
                {
                    OrderModel order = logic.GetOrderByCarId(CarId);
                    return Request.CreateResponse(HttpStatusCode.OK, order);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }
        [JwtAuthentication]
        [Authorize(Roles = "Buyer, Administrator")]
        [HttpPost]
        [Route("{add}")]
        public HttpResponseMessage AddOrder([FromBody]OrderModel OrderModel)
        {
            using (logic = new OrderManager())
            {
                try
                {
                    //בדיקה האם הפרמטר שעבר לפונקציה בתור מודל עומד בדרישות הואלידציה
                    //BOהגדרות הואלידציה מוגדרות בתוך ה
                    //Data annotation בתור 
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }

                    // הולידציה עברה בהצלחה
                    OrderModel = logic.AddOrder(OrderModel);

                    return Request.CreateResponse(HttpStatusCode.Created, OrderModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpPut]
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [Route("edit/{OrderId}")]
        public HttpResponseMessage UpdateOrder([FromBody]OrderModel orderModel, [FromUri]int OrderId)
        {
            using (logic = new OrderManager())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }


                    orderModel = logic.UpdateOrder(orderModel, OrderId);

                    return Request.CreateResponse(HttpStatusCode.OK, orderModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpDelete]
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [Route("delete/{id}")]
        public HttpResponseMessage DeleteOrder([FromUri]int id)
        {
            using (logic = new OrderManager())
            {
                try
                {
                    bool isDelete = logic.DeleteOrder(id);
                    return Request.CreateResponse(HttpStatusCode.OK, isDelete);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

    }

}
