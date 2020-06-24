function unitentry() {
    var Unit = $('#unitTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (Unit == '') {
        Swal("Please enter unit ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var unitModel = {
            Unit: Unit,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(unitModel);
        var route = apiPath + "api/entry/insertunit";

        var siteResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#unitTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', unitResponse);
    }
}
