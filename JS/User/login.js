function getLogin() {
    var LoginId = $('#loginIdText').val();
    var Password = $('#passwordText').val();

    if (LoginId == '') {
        Swal("Please enter your login id.. ");
    }

    else if (Password == '') {
        Swal("Please enter your password .. ");
    }
    else {
        var LoginModel = {
            LoginId: LoginId,
            Password: Password
        };


        var input = JSON.stringify(LoginModel);
        var route = apiPath + "api/user/login";

        var loginResponse = function (data) {
            var response = JSON.stringify(data);
            console.log(response);
            localStorage.clear();
            localStorage.setItem("LoginUserInfo", response);
            
            if (data[0].UserType == "ie") {
                //window.location.href = sitePath + "ie/profile.html";
                window.location.href = sitePath + "merchant/entry/ieentry_new.html";
            }
            if (data[0].UserType == "merchan") {
                window.location.href = sitePath + "merchant/entry/ieentry_new.html";
            }
            if (data[0].UserType == "store") {
                //window.location.href = sitePath + "store/profile.html";
                window.location.href = sitePath + "merchant/entry/ieentry_new.html";
            }
            if (data[0].UserType == "superadmin") {
                //window.location.href = sitePath + "ie/profile.html";
                window.location.href = sitePath + "merchant/entry/ieentry_new.html";
            }

        };
        var responseData = CallServerMethod('Post', route, input, 'false', loginResponse);
    }


}