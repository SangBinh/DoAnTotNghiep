using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace APIProject.Models.Web.User
{
    public class UserModels
    {
        public long ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Role { get; set; }
    }
}