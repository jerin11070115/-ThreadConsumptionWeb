function brandentry() {
    var Brand = $('#brandTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (Brand == '') {
        Swal("Please enter brand ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var brandModel = {
            Brand: Brand,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(brandModel);
        var route = apiPath + "api/entry/insertbrand";

        var brandResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#brandTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', brandResponse);
    }
}

function LoadAllBrandInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallbrand";

    var brandInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Brand Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Brand Name</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].Brand}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', brandInfoResponse);
}
