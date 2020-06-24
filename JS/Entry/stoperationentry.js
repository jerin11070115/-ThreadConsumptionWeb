function stoperationentry() {
    var OperationName = $('#stitchOperationTextBox').val();
    var IsActive = $('#isActiveSelect').val();
    var StitchType = $('#stitchTypeSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (OperationName == '') {
        Swal("Please enter stitch type operation ");
    }
    else if (StitchType == '0') {
        Swal("Please select Stitch Type ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var stoperationModel = {
            StitchTypeId: parseInt(StitchType),
            OperationName: OperationName,
            IsActive: IsActive,
            PostedBy: PostedBy
        };

        var input = JSON.stringify(stoperationModel);
        var route = apiPath + "api/entry/inserstoperation";

        var stoperationResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#stitchOperationTextBox').val('');
            $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', stoperationResponse);
    }
}

//function LoadAllStOpInfo() {

//    var input = '';
//    var route = apiPath + "api/entry/getallstitchtype";
//    //var route = apiPath + "api/entry/getall"

//    var stopInfoResponse = function (data) {
//        //console.log(data);
//        let count = 1;
//        let html = "";
//        html += `<div class='col-md-12'><h3>Stitch Type:</h3></div>`;
//        html += `<div class='col-md-12'><h3>Operation Name:</h3></div>`;
//        html += `<div class='col-md-12'>`;
//        html += `<table class='table table-bordered' border=1><thead><tr>
//        <th>No.</th>
//        <th>Stitch Type</th>
//        <th>Operation Name</th>
//        </tr></thead><tbody>`;
//        for (let i = 0; i < data.length; i++) {
//            html += `<tr>
//                    <td>${count++}</td>
//                    <td>${data[i].StitchTypeId}</td>
//                     <td>${data[i].OperationName}</td>
//                    </tr>`;
//        }

//        html += `</tbody></table></div>`;
//        $("#showDetails").html(html);
//        $("#loadButton").css('display', 'none');


//    };
//    var responseData = CallServerMethod('Post', route, input, 'false', stopInfoResponse);
//}





