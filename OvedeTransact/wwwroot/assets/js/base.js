
///////////////////////////////////////////////////////////////////////////
// Loader
$(document).ready(function () {
    $("#phone_number").val(localStorage.getItem('phone'));
    setTimeout(() => {
        $("#loader").fadeToggle(250);
    }, 800); // hide delay when page load
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Go Back
$(".goBack").click(function () {
    window.history.go(-1);
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Input
$(".clear-input").click(function () {
    $(this).parent(".input-wrapper").find(".form-control").focus();
    $(this).parent(".input-wrapper").find(".form-control").val("");
    $(this).parent(".input-wrapper").removeClass("not-empty");
});
// active
$(".form-group .form-control").focus(function () {
    $(this).parent(".input-wrapper").addClass("active");
}).blur(function () {
    $(this).parent(".input-wrapper").removeClass("active");
})
// empty check
$(".form-group .form-control").keyup(function () {
    var inputCheck = $(this).val().length;
    if (inputCheck > 0) {
        $(this).parent(".input-wrapper").addClass("not-empty");
    }
    else {
        $(this).parent(".input-wrapper").removeClass("not-empty");
    }
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Searchbox Toggle
$(".toggle-searchbox").click(function () {
    $("#search").fadeToggle(200);
    $("#search .form-control").focus();
});
///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
// Owl Carousel
$('.carousel-full').owlCarousel({
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: false,
});
$('.carousel-single').owlCarousel({
    stagePadding: 30,
    loop: true,
    margin: 16,
    nav: false,
    items: 1,
    dots: false,
});
$('.carousel-multiple').owlCarousel({
    stagePadding: 32,
    loop: true,
    margin: 16,
    nav: false,
    items: 2,
    dots: false,
});
$('.carousel-small').owlCarousel({
    stagePadding: 32,
    loop: true,
    margin: 8,
    nav: false,
    items: 4,
    dots: false,
});
$('.carousel-slider').owlCarousel({
    loop: true,
    margin: 8,
    nav: false,
    items: 1,
    dots: true,
});
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
$('.custom-file-upload input[type="file"]').each(function () {
    // Refs
    var $fileUpload = $(this),
        $filelabel = $fileUpload.next('label'),
        $filelabelText = $filelabel.find('span'),
        filelabelDefault = $filelabelText.text();
    $fileUpload.on('change', function (event) {
        var name = $fileUpload.val().split('\\').pop(),
            tmppath = URL.createObjectURL(event.target.files[0]);
        if (name) {
            $filelabel
                .addClass('file-uploaded')
                .css('background-image', 'url(' + tmppath + ')');
            $filelabelText.text(name);
        } else {
            $filelabel.removeClass('file-uploaded');
            $filelabelText.text(filelabelDefault);
        }
    });
});
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
// Notification
// trigger notification
function notification(target, time) {
    var a = "#" + target;
    $(".notification-box").removeClass("show");
    setTimeout(() => {
        $(a).addClass("show");
    }, 300);
    if (time) {
        time = time + 300;
        setTimeout(() => {
            $(".notification-box").removeClass("show");
        }, time);
    }
};
// close button notification
$(".notification-box .close-button").click(function (event) {
    event.preventDefault();
    $(".notification-box.show").removeClass("show");
});
// tap to close notification
$(".notification-box.tap-to-close .notification-dialog").click(function () {
    $(".notification-box.show").removeClass("show");
});
///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////
// Toast
// trigger toast
function toastbox(target, time) {
    var a = "#" + target;
    $(".toast-box").removeClass("show");
    setTimeout(() => {
        $(a).addClass("show");
    }, 100);
    if (time) {
        time = time + 100;
        setTimeout(() => {
            $(".toast-box").removeClass("show");
        }, time);
    }
};
// close button toast
$(".toast-box .close-button").click(function (event) {
    event.preventDefault();
    $(".toast-box.show").removeClass("show");
});
// tap to close toast
$(".toast-box.tap-to-close").click(function () {
    $(this).removeClass("show");
});
///////////////////////////////////////////////////////////////////////////


var uri = "http://medicall-002-site7.ctempurl.com/api/ahhtapi";
//var uri = "http://localhost:49244/api/ahhtapi";


const showHidden = async () => {
    $("#btnVerify").addClass('hidden');
    $("#btnProgress").removeClass('hidden');
    if ($("#seller_transaction_code").val() != "") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const res = await fetch(uri + "/gettransaction?transactioncode=" + $("#seller_transaction_code").val(), requestOptions);
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();

            console.log(data);
            if (!Object.keys(data).length) {
                $("#no-item").removeClass('hidden');
                $("#btnVerify").removeClass('hidden');
                $("#btnProgress").addClass('hidden');
            }
            else {

                data.forEach(item => {
                    if (item.paid == true) {
                        $("#DialogIconedInfo").modal('show');
                    }
                    else {
                        $("#agreed_price").val(formatMoney(parseFloat(item.agreedPrice)));
                        $("#shipping").val(formatMoney(parseFloat(item.shippingCost)));
                        $("#commission").val(formatMoney(parseFloat(item.ahhtCommission)));
                        $("#transaction_cost").val(formatMoney(parseFloat(item.totalCost)));
                        document.getElementById('trans-id').value = item.id;

                        $("#showHidden").removeClass("hidden");
                        $("#hideSMS").addClass('hidden');
                        $("#btnVerify").removeClass('hidden');
                        $("#btnProgress").addClass('hidden');
                    }
                });
                $("#btnVerify").removeClass('hidden');
                $("#btnProgress").addClass('hidden');
            }


        } catch (error) {
            console.log(error);
            $("#btnVerify").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
    } else {
        $("#showHidden").addClass("hidden");
        $("#btnVerify").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}

if ($("#brighoShow").length != 0) {
    var _query = location.search.split('=');
    $("#seller_transaction_code").val(_query[1]);
    
    showHidden();
}

if ($("#brighoStatus").length != 0) {
    var _query = location.search.split('=');
    $("#smscode").val(_query[1]);
     
}

$("#btncancel").click(function () {
    $("#btnProgress").removeClass('hidden');
    $("#btnSat").addClass('hidden');
    declineAction($("#trans-id").val());
})


const declineAction = async (id) => {
    $("#btnProgress").removeClass('hidden');
    $("#btnAccept").addClass('hidden');
    $("#btnDecline").addClass('hidden');
    if ($("#seller_transaction_code").val() != "") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            //const res = await fetch(uri + "/decline?transactioncode=" + id, requestOptions);
            //if (!res.ok) {
            //    throw new Error(res.status);
            //}
            //const data = await res.json();

            $("#DialogIconedDangerDeclined").modal('show');


        } catch (error) {
            console.log(error);
            $("#btnProgress").addClass('hidden');
            $("#btnAccept").removeClass('hidden');
            $("#btnDecline").removeClass('hidden');
        }
    } else {
        $("#showHidden").addClass("hidden");
        $("#btnProgress").addClass('hidden');
        $("#btnAccept").removeClass('hidden');
        $("#btnDecline").removeClass('hidden');
    }
}
var doDecline = function () {
    
    decline($("#trans-id").val());
}

const decline = async (id) => {
    $("#btnProgress").removeClass('hidden');
    $("#btnAccept").addClass('hidden');
    $("#btnDecline").addClass('hidden');
    if ($("#seller_transaction_code").val() != "") {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        try {
            const res = await fetch(uri + "/decline?transactioncode=" + id, requestOptions);
            if (!res.ok) {
                throw new Error(res.status);
            }
            const data = await res.json();

            console.log(data);
            location.href = "/buyer";


        } catch (error) {
            console.log(error);
            $("#btnProgress").addClass('hidden');
            $("#btnAccept").removeClass('hidden');
            $("#btnDecline").removeClass('hidden');
        }
    } else {
        $("#showHidden").addClass("hidden");
        $("#btnProgress").addClass('hidden');
        $("#btnAccept").removeClass('hidden');
        $("#btnDecline").removeClass('hidden');
    }
}

function formatMoney(number, decPlaces, decSep, thouSep) {

    return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    //decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
    //    decSep = typeof decSep === "undefined" ? "." : decSep;
    //thouSep = typeof thouSep === "undefined" ? "," : thouSep;
    //var sign = number < 0 ? "-" : "";
    //var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
    //var j = (j = i.length) > 3 ? j % 3 : 0;

    //return sign +
    //    (j ? i.substr(0, j) + thouSep : "") +
    //    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    //    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}


var showButton = function () {
    if ($('#chkTOC').is(":checked")) {

        $('#btnSubmit').attr("disabled", false);
    } else {
        $('#btnSubmit').attr("disabled", true);
    }
}

var showSubmitButton = function () {
    if ($('#chkTOC').is(":checked")) {
        if ($("#transaction_cost").val() != "" && $("#transaction_cost").val() != "0") {
            $('#btnSubmit').attr("disabled", false);
        }
    } else {
        $('#btnSubmit').attr("disabled", true);
    }
}


$("#btnSubmit").click(function () {
    var commission = "";//parseFloat($("#commission").val().split('.')[0].replace(',', ''));//parseFloat($("#commission").val());
    var agreed_price = "";//parseFloat($("#agreed_price").val().split('.')[0].replace(',', ''));// parseFloat($("#agreed_price").val());
    var shipping = "";//parseFloat($("#shipping").val());
    var transactioncost = "";

    if ($("#account_number").val().length != 10) {
        $("#DialogIconedInvalidAccount").modal('show');
        $("#account_number").focus();
        return false;
    }
    if ($("#buyer_phone_number").val().length != 11) {
        $("#DialogIconedInvalidPhone").modal('show');
        $("#buyer_phone_number").focus();
        return false;
    }

    if ($("#shipping").val() != "0.00") {
        var ship_p = $("#shipping").val().split('.')[0];
        var split_s = ship_p.split(',');
        var s = "";
        split_s.forEach(sitem => {
            s += sitem;
        })
        shipping = parseFloat(s);
    }
    if ($("#agreed_price").val() != "0.00") {
        var agree_p = $("#agreed_price").val().split('.')[0];
        var split_p = agree_p.split(',');
        var n = "";
        split_p.forEach(item => {
            n += item;
        })
        agreed_price = parseFloat(n);
    }
    if ($("#commission").val() != "0.00") {
        var commission_p = $("#commission").val().split('.')[0];
        var split_c = commission_p.split(',');
        var c = "";
        split_c.forEach(citem => {
            c += citem;
        })
        commission = parseFloat(c);
    }
    if ($("#transaction_cost").val() != "0.00") {
        var transaction_p = $("#transaction_cost").val().split('.')[0];
        var split_t = transaction_p.split(',');
        var t = "";
        split_t.forEach(titem => {
            t += titem;
        })
        transactioncost = parseFloat(t);
    }

    var user = {
        SellerBankName: $("#bank_name").val(),
        SellerAccountName: $("#account_name").val(),
        SellerAccountNumber: $("#account_number").val(),
        SellerMobileNumber: $("#phone_number").val(),
        BuyerMobileNumber: $("#buyer_phone_number").val(),
        TransactionDescription: $("#transaction_description").val(),
        AgreedPrice: agreed_price.toString(),
        ShippingCost: shipping.toString(),
        AHHTCommission: commission.toString(),
        TotalCost: transactioncost.toString()
    };
    if (user.AgreedPrice == "") {
        $("#errMsg").html('Please enter the price you agreed with the Buyer');
        $("#agreed_price").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    }
    if (user.SellerAccountName == "") {
        $("#errMsg").html('Please enter the Seller Account Name');
        $("#account_name").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    }
    if (user.SellerBankName == "") {
        $("#errMsg").html('Please select the Seller Bank Name');
        $("#bank_name").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    }
    if (user.SellerAccountNumber == "") {
        $("#errMsg").html('Please enter the Seller Account Number');
        $("#account_number").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    }

    if (user.BuyerMobileNumber == "") {
        $("#errMsg").html('Please enter the Buyer Mobile Number');
        $("#buyer_phone_number").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    }
    if (user.TransactionDescription == "") {
        $("#errMsg").html('Please enter the transaction description');
        $("#transaction_description").focus();
        $("#DialogIconedAllFieldsDanger").modal('show');
        return false;
    } else {
        addTransaction(user);
    }
});

const addTransaction = async (user) => {
    try {
        $("#btnSubmit").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const res = await fetch(uri + "/post", options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnSubmit").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (!data.length > 0) {
            $("#DialogIconedDanger").modal('show');
            $("#btnSubmit").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            data.forEach(item => {
                document.getElementById('transCode').innerHTML = item.sellertTransactionCode;
            });
            location.href = "/seller";
            //$("#DialogIconedSuccess").modal('show');
            //$("#btnSubmit").addClass('hidden');
            //$("#btnProgress").addClass('hidden');
        }
    } catch (error) {
        console.log(error);
        $("#DialogIconedDanger").modal('show');
        $("#btnSubmit").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}


var showAccept = function () {
    if ($("#seller_transaction_code").val() != "") {
        if ($('#chkTOC').is(":checked")) {

            $('#btnAccept').attr("disabled", false);
        } else {
            $('#btnAccept').attr("disabled", true);
            $("#btnProgress").addClass('hidden');
            $("#btnAccept").removeClass('hidden');
        }
    } else {
        let inputs = document.getElementById('chkTOC');
        inputs.checked = false;
    }
}

$("#btnRefundMe").click(function () {
    if (document.getElementById('smscode').value != "") {
        if ($("#bank_name").val() == "") {
            $("#errMsg").html('Please select your bank');
            $("#bank_name").focus();
            $("#actionSheetAlertError").modal('show');
            return false;
        }
        if ($("#account_name").val() == "") {
            $("#errMsg").html('Please enter your bank account name');
            $("#account_name").focus();
            $("#actionSheetAlertError").modal('show');
            return false;
        }
        if ($("#account_number").val().length != 10) {
            $("#errMsg").html('Please enter a valid bank account number');
            $("#account_number").focus();
            $("#actionSheetAlertError").modal('show');
            return false;
        }
        if ($("#email_address").val() == "") {
            $("#errMsg").html('Please enter an email address for payment receipt');
            $("#email_address").focus();
            $("#actionSheetAlertError").modal('show');
            return false;
        }

        //validate on server 


        var user = {
            BuyerBankName: $("#bank_name").val(),
            BuyerAccountName: $("#account_name").val(),
            BuyerAccountNumber: $("#account_number").val(),
            //BuyerMobileNumber: $("#phone_number").val(),
            BuyerEmailAddress: $("#email_address").val(),
            TransactionCode: $("#smscode").val(),
            TotalCost: $("#transaction_cost").val()
        };
        showRefund(user);

    }
})

const showRefund = async (user) => {
    $("#btnAccept").addClass('hidden');
    $("#btnProgress").removeClass('hidden');
    $("#btnDecline").addClass('hidden');
    const options = {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(uri + "/buyerrequestrefund", options);
    if (!res.ok) {
        $("#ErrorDialogIconedInfo").modal('show');
        $("#btnProgress").addClass('hidden');
        $("#btnSat").removeClass('hidden');
    }
    const data = await res.json();

    console.log(data);
    if (!data) {
        $("#ErrorDialogIconedInfo").modal('show');
        $("#btnProgress").addClass('hidden');
        $("#btnSat").removeClass('hidden');
    }
    else {

        $("#RefundDialogIconedSuccess").modal('show');
    }

}


$("#btnAccept").click(function () {
    if ($("#seller_transaction_code").val() != "") {

        //if ($("#bank_name").val() == "") {
        //    $("#errMsg").html('Please select your bank');
        //    $("#bank_name").focus();
        //    $("#DialogIconedInvalidAccount").modal('show');
        //    return false;
        //}
        //if ($("#account_name").val() == "") {
        //    $("#errMsg").html('Please enter your bank account name');
        //    $("#account_name").focus();
        //    $("#DialogIconedInvalidAccount").modal('show');
        //    return false;
        //}
        //if ($("#account_number").val().length != 10) {
        //    $("#errMsg").html('Please enter a valid bank account number');
        //    $("#account_number").focus();
        //    $("#DialogIconedInvalidAccount").modal('show');
        //    return false;
        //}
        //if ($("#email_address").val() == "") {
        //    $("#errMsg").html('Please enter an email address for payment receipt');
        //    $("#email_address").focus();
        //    $("#DialogIconedInvalidAccount").modal('show');
        //    return false;
        //}

        //validate on server 


        var user = {
            //BuyerBankName: $("#bank_name").val(),
            //BuyerAccountName: $("#account_name").val(),
            //BuyerAccountNumber: $("#account_number").val(),
            //BuyerMobileNumber: $("#phone_number").val(),
            BuyerEmailAddress: $("#email_address").val(),
            TransactionCode: $("#seller_transaction_code").val(),
            TotalCost: $("#transaction_cost").val()
        };

        showPayment(user);

    }
})

const showPayment = async (user) => {
    $("#btnAccept").addClass('hidden');
    $("#btnProgress").removeClass('hidden');
    $("#btnDecline").addClass('hidden');
    const options = {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const res = await fetch(uri + "/buyeracceptpayment", options);
    if (!res.ok) {
        throw new Error(res.status);
    }
    const data = await res.json();

    console.log(data);
    if (!data) {
        $("#no-item").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
        $("#btnAccept").removeClass('hidden');
        $("#btnDecline").removeClass('hidden');
    }
    else {

        location.href = '/buyer/transverification?transcode=' + $("#seller_transaction_code").val() + "&account_name=" + user.BuyerAccountName + "&email_address=" + user.BuyerEmailAddress + "&bank_name=" + user.BuyerBankName + "&transaction_cost=" + user.TotalCost.split('.')[0].replace(',', '');
    }

}


var calcCommission = function () {
    if ($("#agreed_price").val() != "") {
        var agreed_price = "";//parseFloat($("#agreed_price").val());
        var agree_p = $("#agreed_price").val().split('.')[0];
        var split_p = agree_p.split(',');
        var n = "";
        split_p.forEach(item => {
            n += item;
        })
        agreed_price = parseFloat(n);

        var percentage = 2.5 / 100;
        var commission = parseFloat(agreed_price * percentage);
        $("#commission").val(formatMoney(commission));
        $("#agreed_price").val(formatMoney(agreed_price));
        var shipping = "0.00";
        if ($("#shipping").val() != "") {
            //shipping = parseFloat($("#shipping").val());
            var ship_p = $("#shipping").val().split('.')[0];
            var split_s = ship_p.split(',');
            var s = "";
            split_s.forEach(sitem => {
                s += sitem;
            })
            shipping = parseFloat(s);
        }
        if (shipping == "0.00")
            $("#transaction_cost").val(formatMoney(commission + agreed_price));
        else
            $("#transaction_cost").val(formatMoney(commission + agreed_price + shipping));
    } else {
        $("#commission").val("0.00");
        $("#transaction_cost").val("0.00");
        $("#shipping").val("0.00");
        $('#btnSubmit').attr("disabled", true);
        let inputs = document.getElementById('chkTOC');
        inputs.checked = false;
    }
}

var addShipping = function () {
    if ($("#shipping").val() != "") {
        if ($("#agreed_price").val() != "") {
            var commission = "";//parseFloat($("#commission").val().split('.')[0].replace(',', ''));//parseFloat($("#commission").val());
            var agreed_price = "";//parseFloat($("#agreed_price").val().split('.')[0].replace(',', ''));// parseFloat($("#agreed_price").val());
            var shipping = "";//parseFloat($("#shipping").val());

            var ship_p = $("#shipping").val().split('.')[0];
            var split_s = ship_p.split(',');
            var s = "";
            split_s.forEach(sitem => {
                s += sitem;
            })
            shipping = parseFloat(s);

            var agree_p = $("#agreed_price").val().split('.')[0];
            var split_p = agree_p.split(',');
            var n = "";
            split_p.forEach(item => {
                n += item;
            })
            agreed_price = parseFloat(n);

            var commission_p = $("#commission").val().split('.')[0];
            var split_c = commission_p.split(',');
            var c = "";
            split_c.forEach(citem => {
                c += citem;
            })
            commission = parseFloat(c);

            var transaction_cost = parseFloat(commission + agreed_price + shipping);
            $("#transaction_cost").val(formatMoney(transaction_cost));
            $("#shipping").val(formatMoney(shipping));
        }
    } else {
        var commission = "";//parseFloat($("#commission").val().split('.')[0].replace(',', ''));
        var agreed_price = "";//parseFloat($("#agreed_price").val().split('.')[0].replace(',', ''));

        var commission_p = $("#commission").val().split('.')[0];
        var split_c = commission_p.split(',');
        var c = "";
        split_c.forEach(citem => {
            c += citem;
        })
        commission = parseFloat(c);

        var agree_p = $("#agreed_price").val().split('.')[0];
        var split_p = agree_p.split(',');
        var n = "";
        split_p.forEach(item => {
            n += item;
        })
        agreed_price = parseFloat(n);

        var transaction_cost = parseFloat(commission + agreed_price);
        $("#transaction_cost").val(formatMoney(transaction_cost));
        $("#shipping").val("0.00");
    }
}

const _key = "pk_test_eda062a81ed9102f087935cbf3d78dbbe5297105";

function payWithPaystack() {
    // e.preventDefault();
    var transcode = localStorage.getItem('TransCode');
    var name_splitter = localStorage.getItem('account_name').split('%20');

    var first = name_splitter[0];
    var last = name_splitter[1];

    var email = localStorage.getItem('email_address');
    var price = localStorage.getItem('transaction_cost');

    var handler = PaystackPop.setup({
        key: _key, // Replace with your public key
        email: email,//document.getElementById("email-address").value,
        amount: price * 100,
        //firstname: first,//document.getElementById("first-name").value,
        //lastname: last,//document.getElementById("first-name").value,
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        // label: "Optional string that replaces customer email"
        onClose: function () {
            $("#btnAccept").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        },
        callback: function (response) {
            processPayment(transcode);
        }
    });

    handler.openIframe();
}

function reProcessPayment() {
    var code = localStorage.getItem("TransCode");
    processPayment(code);
}

var processPayment = async (_transcode) => {

    const option = {
        method: 'PUT',
        redirect: 'follow'
    }


    const res = await fetch(uri + "/setbuyerpayment?id=" + _transcode, option);
    if (!res.ok) {
        console.log(res.status);
    }
    const data = await res.json();

    if (!data) {
        $("#no-item").removeClass('hidden');
        $("#veriSpinner").addClass('hidden');
    }
    else {
        location.href = "/buyer/success?id=" + _transcode;
    }
}


$("#btnVerify").click(function () {
    if ($("#smscode").val() != "") {

        veriCheck($("#smscode").val());

    } else {
        $("#DialogIconedDanger").modal('show');
    }

})

var veriCheck = async (_transcode) => {
    $("#btnVerify").addClass('hidden');
    $("#btnSat").addClass('hidden');
    $("#veriSpinner").removeClass('hidden');
    $("#btnProgress").removeClass('hidden');

    try {
        const option = {
            method: 'GET',
            redirect: 'follow'
        }


        const res = await fetch(uri + "/confirm?confirmcode=" + _transcode, option);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
        }
        const data = await res.json();

        console.log(data);

        if (data.length == 0) {
            $("#DialogIconedDanger").modal('show');
            $("#btnVerify").removeClass('hidden');
            $("#btnSat").removeClass('hidden');
            $("#veriSpinner").addClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            data.forEach(item => {
                document.getElementById('transDec').innerHTML = item.transactionDescription;
                if (item.sellerCodeConfirmed == true) {
                    document.getElementById('transStatus').innerHTML = 'PAID';
                } else {
                    document.getElementById('transStatus').innerHTML = 'NOT PAID';
                }

            });
            $("#DialogIconedSuccess").modal('show');
            $("#btnVerify").removeClass('hidden');
            $("#btnSat").removeClass('hidden');
            $("#veriSpinner").addClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnVerify").removeClass('hidden');
        $("#btnSat").removeClass('hidden');
        $("#veriSpinner").addClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}



$("#btnVerifyStatus").click(function () {
    if ($("#smscode").val() != "") {

        veriCheckStatus($("#smscode").val());

    } else {
        $("#DialogIconedDanger").modal('show');
    }

})

var veriCheckStatus = async (_transcode) => {
    $("#btnVerifyStatus").addClass('hidden');
    $("#btnProgress").removeClass('hidden');

    try {
        const option = {
            method: 'GET',
            redirect: 'follow'
        }


        const res = await fetch(uri + "/status?confirmcode=" + _transcode, option);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
        }
        const data = await res.json();
         

        if (data.length == 0) {
            $("#DialogIconedDanger").modal('show');
        }
        else {
            data.forEach(item => {
                document.getElementById('transDec').innerHTML = item.transactionDescription;
                if (item.paid == true) {
                    document.getElementById('transStatus').innerHTML = 'PAID';

                }
                else {
                    document.getElementById('transStatus').innerHTML = 'NOT PAID';
                }
                if (item.transactionStatus == 'danger') {
                    document.getElementById('picked').innerHTML = 'TRANSACTION CANCELED';
                } else {
                    if (item.sellerCodeConfirmed == true) {
                        document.getElementById('picked').innerHTML = 'ITEM PICKED';
                    } else {
                        document.getElementById('picked').innerHTML = 'ITEM NOT PICKED';
                    }
                }
            });
            $("#DialogIconedSuccess").modal('show');
            $("#btnVerifyStatus").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnVerifyStatus").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}

$("#btnRegister").click(function () {
    var user = {
        Username: $("#ephone").val(),
        Password: $("#password1").val(),
        Password2: $("#password2").val()
    };
    if (user.Username == "" || user.Password == "" || (user.Password != user.Password2)) {
        $("#DialogIconedAllFieldsDanger").modal('show');
    } else {
        addUser(user);
    }
})

const addUser = async (user) => {
    try {
        $("#btnRegister").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri + "/newuser", options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnRegister").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (data != true) {
            $("#DialogIconedExist").modal('show');
            $("#btnRegister").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            location.href = "/admin/";
        }
    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnRegister").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}



$("#btnLogin").click(function () {
    var user = {
        Username: $("#ephone").val(),
        Password: $("#password").val()
    };
    if (user.Username == "" || user.Password == "") {
        $("#DialogIconedAllFieldsDanger").modal('show');
    } else {
        UserLogin(user);
    }
})

const UserLogin = async (user) => {
    try {
        $("#btnLogin").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri + "/login", options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnLogin").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);

        if (data == true) {
            localStorage.setItem('phone', user.Username)
            location.href = "/seller";
        } else {
            $("#DialogIconedIvalid").modal('show');
            $("#btnLogin").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }

    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnLogin").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}


$("#btnForgot").click(function () {
    var user = {
        Username: $("#ephone").val()
    };
    if (user.Username == "") {
        $("#DialogIconedAllFieldsDanger").modal('show');
    } else {
        UserForgot(user);
    }
})

const UserForgot = async (user) => {
    try {
        $("#btnForgot").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'GET',
            redirect: 'follow'
        }

        const res = await fetch(uri + "/forgot?username=" + user.Username, options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnForgot").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (!data) {
            $("#DialogIconedDanger").modal('show');
            $("#btnForgot").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            location.href = "/admin/pin";
        }
    } catch (error) {
        console.log(error);
        $("#DialogIconedDanger").modal('show');
        $("#btnForgot").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}


$("#btnVerifyPin").click(function () {
    var user = {
        RecoveryCode: $("#smscode").val()
    };
    if (user.RecoveryCode == "") {
        $("#DialogIconedAllFieldsDanger").modal('show');
    } else {
        VerifyResetPin(user);
    }
})

const VerifyResetPin = async (user) => {
    try {
        $("#btnVerifyPin").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'GET',
            redirect: 'follow'
        }

        const res = await fetch(uri + "/recovery?code=" + user.RecoveryCode, options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnVerifyPin").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (!data) {
            $("#DialogIconedDanger").modal('show');
            $("#btnVerifyPin").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            if (data.length > 0)
                location.href = "/admin/resetpassword";
            else {
                $("#DialogIconedDanger").modal('show');
                $("#btnVerifyPin").removeClass('hidden');
                $("#btnProgress").addClass('hidden');
            }
        }
    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnVerifyPin").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }
}

$("#btnClearReset").click(function () {
    $("#btnProgress").addClass('hidden');
    $("#btnSat").removeClass('hidden');
});
$("#btnClearCancel").click(function () {
    $("#btnProgress").addClass('hidden');
    $("#btnSat").removeClass('hidden');
});


$("#btnReset").click(function () {
    var user = {
        Username: $("#ephone").val(),
        Password: $("#password").val(),
        Password2: $("#password2").val()
    };
    if (user.Username == "" || user.Password == "" && (user.Password != user.Password2)) {
        $("#DialogIconedAllFieldsDanger").modal('show');
    } else {
        PasswordReset(user);
    }
})

const PasswordReset = async (user) => {
    try {
        $("#btnReset").addClass('hidden');
        $("#btnProgress").removeClass('hidden');

        const options = {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await fetch(uri + "/reset", options);
        if (!res.ok) {
            $("#DialogIconedDanger").modal('show');
            $("#btnReset").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        const data = await res.json();
        console.log(data);
        if (!data) {
            $("#DialogIconedDanger").modal('show');
            $("#btnReset").removeClass('hidden');
            $("#btnProgress").addClass('hidden');
        }
        else {
            location.href = "/admin/";
        }
    } catch (error) {

        $("#DialogIconedDanger").modal('show');
        $("#btnReset").removeClass('hidden');
        $("#btnProgress").addClass('hidden');
    }

   

}