﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OvedeTransact.Controllers
{
    public class BuyerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FollowUp()
        {
            return View();
        }

        public IActionResult TransactionDetails()
        {
            return View();
        }

        public IActionResult Verify()
        {
            return View();
        }

        public IActionResult TransVerification()
        {
            return View();
        }

        public IActionResult Success()
        {
            return View();
        } 
    }
}
