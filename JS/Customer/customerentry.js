

function addCustomerInfo() {
    var BuyerName = $('#cuntomerNameText').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (BuyerName == '') {
        Swal("Please enter customer name ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }
   
    else {
        var customerModel = {
            BuyerName: BuyerName,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(customerModel);
        var route = apiPath + "api/customer/insertcustomerinfo";

        var customerResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#cuntomerNameText').val('');
            $('#isActiveSelect').val('-1');

        };
        var responseData = CallServerMethod('Post', route, input, 'false', customerResponse);
    }

}

function LoadAllCustomerInfo() {

    var input = '';
    var route = apiPath + "api/customer/getallcustomerinfo";

    var customerInfoResponse = function (data) {
        console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Customer Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Buyer Name</th>
        <th>Posted By</th>
        <th>IsActive</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].BuyerName}</td>
                    <td>${data[i].UserName}</td>
                    <td>${data[i].IsActive}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', customerInfoResponse);
}