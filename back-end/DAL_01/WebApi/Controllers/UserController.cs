using BLL_03;
using BOL_02;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using WebApi.Filters;
using WebApi.Filters.JWT;
using WebApi.Helper;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        UserManager logic;

        [HttpGet]
        [Route("all")]   // access link : http://localhost:53093/api/order/orders
        public HttpResponseMessage GetAllUsers()
        {
            using (logic = new UserManager())
            {
                try
                {
                    List<UserModel> Users = logic.GetAllUsers();
                    return Request.CreateResponse(HttpStatusCode.OK, Users);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }

        }

      
        
        [HttpGet]
        [JwtAuthentication]
        [Authorize(Roles = "Administrator")]
        [Route("{UserName}")]
        public HttpResponseMessage GetOneUser([FromUri]string UserName)
        {
            using (logic = new UserManager())
            {
                try
                {
                    UserModel user = logic.GetOneUser(UserName);
                    return Request.CreateResponse(HttpStatusCode.OK, user);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("{add}")]
        public HttpResponseMessage AddUser([FromBody]UserModel userModel)
        {
            using (logic = new UserManager())
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
                    userModel = logic.AddUser(userModel);

                    return Request.CreateResponse(HttpStatusCode.Created, userModel);
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
        [Route("edit/{UserName}")]
        public HttpResponseMessage UpdateUser([FromBody]UserModel userModel, [FromUri]string UserName)
        {
            using (logic = new UserManager())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }


                    userModel = logic.UpdateUser(userModel, UserName);

                    return Request.CreateResponse(HttpStatusCode.OK, userModel);
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
        public HttpResponseMessage DeleteUser([FromUri]int id)
        {
            using (logic = new UserManager())
            {
                try
                {
                    bool isDelete = logic.DeleteUser(id);
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
