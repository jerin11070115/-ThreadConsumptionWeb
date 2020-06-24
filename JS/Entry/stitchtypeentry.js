function StitchTypeInsert() {
    var StitchType = $('#stitchTypeTextBox').val();
    var IsActive = $('#isActiveSelect').val();
    var MachineCode = $('#machineCodeTextBox').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (StitchType == '') {
        Swal("Please enter stitch type ");
    }
    else if (MachineCode == '') {
        Swal("Please Enter Machine Code ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }


    else {
        var StitchTypeModel = {
            StitchType: StitchType,
            MachineCode: MachineCode,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(StitchTypeModel);
        var route = apiPath + "api/entry/insertstitchtypeinfo";

        var stitchTypeResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#stitchTypeTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', stitchTypeResponse);
    }
}
function LoadGetAllStitchTypeInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallstitchtype";

    var stitchInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Stitch Type Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Stitch</th>
         <th>Machine Code</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].StitchType}</td>
                    <td>${data[i].MachineCode}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', stitchInfoResponse);
}
