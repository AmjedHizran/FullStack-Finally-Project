using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Helper
{
    public static class ExceptionHelper
    {
        public static string GetInnerMessage(Exception ex)
        {
            return ex.InnerException == null ? ex.Message : GetInnerMessage(ex.InnerException);
        }
    }
}