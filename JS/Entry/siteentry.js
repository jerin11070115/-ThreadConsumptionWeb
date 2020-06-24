function siteentry() {
    var SiteName = $('#siteNameTextBox').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (SiteName == '') {
        Swal("Please enter site name ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var siteModel = {
            SiteName: SiteName,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(siteModel);
        var route = apiPath + "api/entry/insertsite";

        var siteResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#siteTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', siteResponse);
    }
}
function LoadGetAllSiteInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallactivesite";

    var siteInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Site Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Site</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].SiteName}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', siteInfoResponse);
}
