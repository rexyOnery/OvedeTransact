using System;
using System.Collections.Generic;

#nullable disable

namespace OvedeTransact.Models
{
    public partial class Account
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RecoveryCode { get; set; }
    }
}
