using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using BLL_03;
using BLL_03.Definitions;
using WebApi.Managers;

namespace WebApi.Filters.JWT
{
    public class JwtAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        public string Realm { get; set; }
        public bool AllowMultiple => false;

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization == null || authorization.Scheme != "Bearer")
                return;

            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing Jwt Token", request);
                return;
            }

            var token = authorization.Parameter;
            var principal = await AuthenticateJwtToken(token);

            if (principal == null)
                context.ErrorResult = new AuthenticationFailureResult("Invalid token", request);

            else
                context.Principal = principal;
        }



        private static bool ValidateToken(string token, out string username, out Enums.UserType role)
        {
            username = null;
            role = Enums.UserType.Unspecified;

            var simplePrinciple = JwtManager.GetPrincipal(token);
            var identity = simplePrinciple?.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            var roleClaim = identity.FindFirst(ClaimTypes.Role);
            username = usernameClaim?.Value;
            role = roleClaim?.Value != null ?
                            (Enums.UserType)Enum.Parse(typeof(Enums.UserType), roleClaim?.Value) :
                            Enums.UserType.Unspecified;

            if (string.IsNullOrEmpty(username))
                return false;

            // More validate to check whether username exists in system
            UserManager usersBL = new UserManager();
            var dbUser = usersBL.GetOneUser(username);
            if (dbUser == null)
                return false;

            //if (dbUser.Password != password)
            //    return false;

            //role = (Enums.UserType)Enum.Parse(typeof(Enums.UserType), dbUser.RoleName);


            return true;
        }

        protected Task<IPrincipal> AuthenticateJwtToken(string token)
        {
            string username;
            Enums.UserType role;

            if (ValidateToken(token, out username, out role))
            {
                // based on username to get more information from database in order to build local identity
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, username),
                    new Claim(ClaimTypes.Role,role.ToString())
                    // Add more claims if needed: Roles, ...
                };

                var identity = new ClaimsIdentity(claims, "Jwt");
                IPrincipal user = new ClaimsPrincipal(identity);

                return Task.FromResult(user);
            }

            return Task.FromResult<IPrincipal>(null);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            Challenge(context);
            return Task.FromResult(0);
        }

        private void Challenge(HttpAuthenticationChallengeContext context)
        {
            string parameter = null;

            if (!string.IsNullOrEmpty(Realm))
                parameter = "realm=\"" + Realm + "\"";

            context.ChallengeWith("Bearer", parameter);
        }
    }
}
