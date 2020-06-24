function seasonentry() {
    var Season = $('#seasonTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (Season == '') {
        Swal("Please enter season name ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var seasonModel = {
            Season: Season,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(seasonModel);
        var route = apiPath + "api/entry/insertseason";

        var seasonResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#seasonTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', seasonResponse);
    }
}
function LoadGetAllSeasonsInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallactiveplanlines";

    var seasonInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Season Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Season</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].Season}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', seasonInfoResponse);
}
