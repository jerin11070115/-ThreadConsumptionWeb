$(document).ready(function () {
    getbuyer();    
});









function getbuyer() {
    var url = apiPath + "api/customer/getallactivecustomer";
    var input = "";
    var getBuyerResponse = function (data) {

        var output = '';
        output = '<option value="0">Please select a buyer</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].BuyerId + '>' + data[loop].BuyerName + '</option>';
        }

        $('#buyerSelect').empty();
        $('#buyerSelect').append(output);
    };

    CallServerMethod('Post', url, input, 'false', getBuyerResponse);
}




function addCustomerDivisionInfo() {
    var DevisionName = $('#divisionNameText').val();
    var IsActive = $('#isActiveSelect').val();
    var BuyerId = $('#buyerSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (DevisionName == '') {
        Swal("Please enter customer division name ");
    }
    else if (BuyerId == "0") {
        Swal("Please select a buyer ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var customerDivisionModel = {
            DevisionName: DevisionName,
            BuyerId: BuyerId,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(customerDivisionModel);
        var route = apiPath + "api/customer/insertcustomerdivisioninfo";

        var customerdivisionResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#divisionNameText').val('');
            $('#isActiveSelect').val('-1');
            $('#buyerSelect').val(0);

        }
        var responseData = CallServerMethod('Post', route, input, 'false', customerdivisionResponse);
    }

}