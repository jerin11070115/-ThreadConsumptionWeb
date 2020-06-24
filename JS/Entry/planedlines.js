function planedlinesentry() {
    var PlannedLines = $('#planedLinesTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (PlannedLines == '') {
        Swal("Please enter planed lines ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var planedlinesModel = {
            PlannedLines: PlannedLines,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(planedlinesModel);
        var route = apiPath + "api/entry/insertplannedlines";

        var siteResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#planedLinesTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', planedlinesResponse);
    }
}
function LoadGetAllPlanLinesInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallactiveplanlines";

    var planlinesInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Plan Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Plan Lines</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].PlannedLines}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', planlinesInfoResponse);
}
