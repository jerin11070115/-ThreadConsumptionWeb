function addRegistrationInfo() {
    var UserName = $('#userNameText').val();
    var LoginId = $('#loginIdText').val();
    var Password = $('#passwordText').val();
    var UserType = $('#userTypeText').val();
    var IsActive = '0';

    if (UserName == '') {
        Swal("Please enter your full name.. ");
    }
    else if (LoginId == '') {
        Swal("Please enter your login id.. ");
    }
    else if (Password == '') {
        Swal("Please enter your password .. ");
    }
    else if (UserType == '0') {
        Swal("Please select your user type .. ");
    }
    else {
        var UserModel = {
            UserName: UserName,
            LoginId: LoginId,
            Password: Password,
            UserType: UserType,
            IsActive: IsActive
        };

        var input = JSON.stringify(UserModel);
        var route = apiPath + "api/user/userregistration";

        var registrationResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title:' Please wait for registration approval',
                showConfirmButton: false,
                timer: 2000
            });

            $('#userNameText').val('');
            $('#loginIdText').val('');
            $('#passwordText').val('');
            $('#userTypeText').val('0');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', registrationResponse);
    }

}

