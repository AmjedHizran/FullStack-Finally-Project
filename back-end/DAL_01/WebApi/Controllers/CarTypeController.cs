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
    [RoutePrefix("api/CarType")]
    public class CarTypeController : ApiController
    {
        CarTypeManager logic;

        [AllowAnonymous]
        [HttpGet]
        [Route("all")]   // access link : http://localhost:53093/api/order/orders
        public HttpResponseMessage GetAllCarTypes()
        {
            using (logic = new CarTypeManager())
            {
                try
                {
                    List<CarTypeModel> CarTypes = logic.GetAllCarTypes();
                    return Request.CreateResponse(HttpStatusCode.OK, CarTypes);
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
        public HttpResponseMessage GetOneCarType([FromUri]int CarTypeID)
        {
            using (logic = new CarTypeManager())
            {
                try
                {
                    CarTypeModel CarType = logic.GetOneCarType(CarTypeID);
                    return Request.CreateResponse(HttpStatusCode.OK, CarType);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        [Route("{add}")]
        public HttpResponseMessage AddCarType([FromBody]CarTypeModel carTypeModel)
        {
            using (logic = new CarTypeManager())
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
                    carTypeModel = logic.AddCarType(carTypeModel);

                    return Request.CreateResponse(HttpStatusCode.Created, carTypeModel);
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
        [Route("edit/{CarTypeID}")]
        public HttpResponseMessage UpdateCarType([FromBody]CarTypeModel CarTypeModel, [FromUri]int CarTypeID)
        {
            using (logic = new CarTypeManager())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }


                    CarTypeModel = logic.UpdateCarType(CarTypeModel, CarTypeID);

                    return Request.CreateResponse(HttpStatusCode.OK, CarTypeModel);
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
        public HttpResponseMessage DeleteCarType([FromUri]int id)
        {
            using (logic = new CarTypeManager())
            {
                try
                {
                    bool isDelete = logic.DeleteCarType(id);
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
