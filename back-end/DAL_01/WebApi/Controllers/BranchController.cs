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
    [RoutePrefix("api/Branch")]
    public class BranchController : ApiController
    {
        BranchManager logic;

       
        [HttpGet]
        [Route("all")]   // access link : http://localhost:53093/api/order/orders
        public HttpResponseMessage GetAllBranches()
        {
            using (logic = new BranchManager())
            {
                try
                {
                    List<BranchModel> branches = logic.GetAllBranches();
                    return Request.CreateResponse(HttpStatusCode.OK, branches);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }

        }
        [AllowAnonymous]
        [HttpGet]
        [Route("{BranchID}")]
        public HttpResponseMessage GetOneBranch([FromUri]int BranchID)
        {
            using (logic = new BranchManager())
            {
                try
                {
                    BranchModel Branch = logic.GetOneBranch(BranchID);
                    return Request.CreateResponse(HttpStatusCode.OK, Branch);
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
        public HttpResponseMessage AddBranch([FromBody]BranchModel branchModel)
        {
            using (logic = new BranchManager())
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
                    branchModel = logic.AddBranch(branchModel);

                    return Request.CreateResponse(HttpStatusCode.Created, branchModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpPut]
        [Route("edit/{branchName}")]
        public HttpResponseMessage Updatebranch([FromBody]BranchModel branchModel, [FromUri]string branchName)
        {
            using (logic = new BranchManager())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        string error = ModelState.Where(ms => ms.Value.Errors.Any()).Select(ms => ms.Value.Errors[0].ErrorMessage).FirstOrDefault();
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, error);
                    }


                    branchModel = logic.UpdateBranch(branchModel, branchName);

                    return Request.CreateResponse(HttpStatusCode.OK, branchModel);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ExceptionHelper.GetInnerMessage(ex));
                }
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public HttpResponseMessage Deletebranch([FromUri]int id)
        {
            using (logic = new BranchManager())
            {
                try
                {
                    bool isDelete = logic.DeleteBranch(id);
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
    
