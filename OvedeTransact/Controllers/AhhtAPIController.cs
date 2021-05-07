using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OvedeTransact.Models;
using OvedeTransact.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OvedeTransact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AhhtAPIController : ControllerBase
    {
        [HttpPost]
        [Route("newuser")]
        public async Task<bool> AddUser(Account account)
        {

            return await Server.AddUser<Account>(account);
        }

        [HttpPost]
        [Route("login")]
        public async Task<bool> Login(Account account)
        {

            return await Server.Login<Account>(account);
        }

        [HttpGet]
        [Route("forgot")]
        public async Task<ActionResult<IEnumerable<Account>>> Forgot(string username)
        {

            return await Server.Forgot<Account>(username);
        }

        [HttpGet]
        [Route("recovery")]
        public async Task<ActionResult<IEnumerable<Account>>> RecoveryCode(string code)
        {

            return await Server.RecoveryCode<Account>(code);
        }

        [HttpPut]
        [Route("reset")]
        public async Task<ActionResult<bool>> Reset(Account account)
        {

            return await Server.Reset<Account>(account);
        }


        [HttpPost]
        [Route("post")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> PostTransaction(Ahhttransaction ahhttransaction)
        {
            
            return await Server.PostTransaction<Ahhttransaction>(ahhttransaction);
        }

        [HttpGet]
        [Route("getsellerconfirmation")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetSellerConfirmation(string confirmation)
        {
            return await Server.GetSellerConfirmation(confirmation);
        }

        [HttpGet]
        [Route("gettransaction")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetBuyerTransaction(string transactioncode)
        {
            return await Server.GetBuyerTransaction(transactioncode);
        }


        [HttpGet]
        [Route("decline")]
        public async Task<bool> DeclineTransaction(int transactioncode)
        {
            return await Server.DeclineTransaction(transactioncode);
        }

        [HttpPut]
        [Route("buyeracceptpayment")]
        public async Task<ActionResult<bool>> BuyerAcceptPayment(Ahhttransaction ahhttransaction)
        {
            return await Server.BuyerAcceptPayment(ahhttransaction);
        }

        [HttpPut]
        [Route("buyerrequestrefund")]
        public async Task<ActionResult<bool>> BuyerRequestRefund(Ahhttransaction ahhttransaction)
        {
            return await Server.BuyerRequestRefund(ahhttransaction);
        }

        [HttpPut]
        [Route("setbuyerpayment")]
        public async Task<ActionResult<bool>> SetBuyerPayment(string id)
        {
            return await Server.SetBuyerPayment(id);
        }

        [HttpGet]
        [Route("getdeliverycode")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetDeliveryCode(string transcode)
        {
            return await Server.GetDeliveryCode(transcode);
        }

        [HttpGet]
        [Route("confirm")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> ConfirmDeliveryCode(string confirmcode)
        {
            return await Server.ConfirmDeliveryCode(confirmcode);
        }


        [HttpGet]
        [Route("status")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> ConfirmStatus(string confirmcode)
        {
            return await Server.ConfirmStatus(confirmcode);
        }

        [HttpGet]
        [Route("getsellertransactions")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetSellerTransactions(string phone)
        {
            return await Server.GetSellerTransactions(phone);
        }


        [HttpGet]
        [Route("getbuyertransactions")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetBuyerTransactions(string phone)
        {
            return await Server.GetBuyerTransactions(phone);
        }


        [HttpGet]
        [Route("sellertransactiondetails")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> SellerTransactionDetails(int id)
        {
            return await Server.SellerTransactionDetails(id);
        }

        [HttpGet]
        [Route("buyertransactiondetails")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> BuyerTransactionDetails(int id)
        {
            return await Server.BuyerTransactionDetails(id);
        }

        [HttpPost]
        [Route("sendmessage")]
        public async Task<bool> SendMessage(Message message)
        {
            return Server.SendMail(message);
        }

        [HttpGet]
        [Route("getrefundinfo")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetRefundInfo(string transcode)
        {
            return await Server.GetRefundInfo(transcode);
        }

        [HttpGet]
        [Route("getcurrentdashboard")]
        public async Task<ActionResult<IEnumerable<Ahhttransaction>>> GetCurrentDasboad()
        {
            return await Server.GetCurrentDasboad();
        }

    }
}
