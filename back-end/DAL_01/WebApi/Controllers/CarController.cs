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
    [RoutePrefix("api/Car")]
    public class CarController : ApiController
    {
        CarManager logic;


        [AllowAnonymous]
        [HttpGet]
        [Route("all")]
        public HttpResponseMessage GetAllCars()
        {
            using (logic = new CarManager())
            {
                try
                {
                    var cars = logic.GetAllCars();
                    return Request.CreateResponse(HttpStatusCode.OK, cars);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }

        }
        [AllowAnonymous]
        [HttpGet]
        [Route("{CarTypeID}")]
        public HttpResponseMessage GetOneCar([FromUri]int CarTypeID)
        {
            using (logic = new CarManager())
            {
                try
                {
                    CarModel car = logic.GetOneCar(CarTypeID);
                    return Request.CreateResponse(HttpStatusCode.OK, car);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }
        
        [HttpGet]
        [AllowAnonymous]
        [Route("carId/{CarID}")]
        public HttpResponseMessage GetOneCarById([FromUri]int CarID)
        {
            using (logic = new CarManager())
            {
                try
                {
                    CarModel car = logic.GetOneCarById(CarID);
                    return Request.CreateResponse(HttpStatusCode.OK, car);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpGet]
        [AllowAnonymous]
        [Route("number/{carNumber}")]
        public HttpResponseMessage GetOneCarByCarNumber([FromUri]int CarNumber)
        {
            using (logic = new CarManager())
            {
                try
                {
                    CarModel car = logic.GetOneCarByCarNumber(CarNumber);
                    return Request.CreateResponse(HttpStatusCode.OK, car);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpPost]
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [Route("{add}")]
        public HttpResponseMessage AddCar([FromBody]CarModel carModel)
        {
            using (logic = new CarManager())
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
                    carModel = logic.AddCar(carModel);

                    return Request.CreateResponse(HttpStatusCode.Created, carModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [HttpPut]
        [Route("edit/{CarNumber}")]
        public HttpResponseMessage UpdateCar([FromBody]CarModel carModel, [FromUri]int CarNumber)
        {
            using (logic = new CarManager())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }


                    carModel = logic.UpdateCar(carModel, CarNumber);

                    return Request.CreateResponse(HttpStatusCode.OK, carModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [HttpDelete]
        [Route("delete/{id}")]
        public HttpResponseMessage DeleteCar([FromUri]int id)
        {
            using (logic = new CarManager())
            {
                try
                {
                    bool isDelete = logic.DeleteCar(id);
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
