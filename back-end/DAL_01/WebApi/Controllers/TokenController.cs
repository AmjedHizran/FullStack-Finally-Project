using System;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL_03;
using BLL_03.Definitions;
using WebApi.Managers;

namespace WebApi.Controllers
{
    [AllowAnonymous]
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/token")]
    public class TokenController : ApiController
    {

        // THis is naive endpoint for demo, it should use Basic authentication to provide token or POST request
        //[AllowAnonymous]
        //public string Get(string username, string password)
        //{
        //    Enums.UserType role;
        //    if (CheckUser(username, password, out role))
        //    {
        //        return JwtManager.GenerateToken(username, role.ToString());
        //    }

        //    throw new HttpResponseException(HttpStatusCode.Unauthorized);
        //}
        [Route("GenerateToken")]
        [AllowAnonymous]
        [HttpGet]
        public string GenerateToken(string username, string password)
        {
            Enums.UserType role;
            if (CheckUser(username, password, out role))
            {
                return JwtManager.GenerateToken(username, role.ToString());
            }

            throw new HttpResponseException(HttpStatusCode.Unauthorized);
        }

        public bool CheckUser(string username, string password, out Enums.UserType role)
        {
            role = Enums.UserType.Unspecified;

            var usersBL = new UserManager();
            var dbUser = usersBL.GetOneUser(username);
            if (dbUser == null)
                return false;

            if (dbUser.Password != password)
                return false;

            role = (Enums.UserType) Enum.Parse(typeof(Enums.UserType), dbUser.RoleName);
            return true;
        }
    }
}
