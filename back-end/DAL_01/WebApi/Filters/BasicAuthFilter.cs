//using System;
//using System.Collections.Generic;
//using System.Net.Http.Headers;
//using System.Security.Claims;
//using System.Threading;
//using System.Threading.Tasks;
//using System.Web.Http.Filters;
//using System.Web.Http.Results;

//namespace WebApi.Filters
//{
//    public class BasicAuthFilter : Attribute, IAuthenticationFilter
//    {
//        public bool AllowMultiple { get { return false; } }

//        public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
//        {
//            var authHead = context.Request.Headers.Authorization;

//            if (authHead != null && authHead.Scheme == "Basic")
//            {
//                if (authHead.Parameter == "Approved")
//                {
//                    var claims = new List<Claim>(){ new Claim(ClaimTypes.Name,"JBH"),
//                                                 new Claim(ClaimTypes.Role,"admin")};
//                    var id = new ClaimsIdentity(claims, "Token");
//                    context.Principal = new ClaimsPrincipal(new[] { id });
//                }
//                else
//                {
//                    context.ErrorResult = new UnauthorizedResult(
//                        new AuthenticationHeaderValue[0], context.Request);

//                }
//            }
//            return Task.FromResult(0);
//        }

//        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
//        {
//            return Task.FromResult(0);
//        }
//    }
//}