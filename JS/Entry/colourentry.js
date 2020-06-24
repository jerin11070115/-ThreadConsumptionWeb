function colourentry() {
    var Colour = $('#colourTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (Colour == '') {
        Swal("Please enter season name ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var colourModel = {
            Colour: Colour,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(colourModel);
        var route = apiPath + "api/entry/insertcolour";

        var colourResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#colourTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', colourResponse);
    }
}
function LoadGetAllColoursInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallactivecolours";

    var colourInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Colour Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Colour Name</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].Colour}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', colourInfoResponse);
}
