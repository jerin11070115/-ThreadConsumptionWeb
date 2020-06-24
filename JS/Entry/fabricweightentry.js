function fabricweightentry() {
    var FabricWeight = $('#fabricWeightTextBox').val();
    

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;

    if (FabricWeight == '') {
        Swal("Please enter fabric weight ");
    }
    //else if (IsActive == '-1') {
    //    Swal("Please select isActive ");
    //}

    else {
        var fabricweightModel = {
            FabricWeight: FabricWeight,
            
            PostedBy: PostedBy
        };

        var input = JSON.stringify(fabricweightModel);
        var route = apiPath + "api/entry/insertfabricweight";

        var fabricweightResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#fabricWeightTextBox').val('');
            //$('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', fabricweightResponse);
    }
}
function LoadGetAllFabricWeightInfo() {

    var input = '';
    var route = apiPath + "api/entry/getallfabricweight";

    var fabricweightInfoResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        html += `<div class='col-md-12'><h3>Fabric Weight Info:</h3></div>`;
        html += `<div class='col-md-12'>`;
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Fabric Weight</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].FabricWeight}</td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;
        $("#showDetails").html(html);
        $("#loadButton").css('display', 'none');


    };
    var responseData = CallServerMethod('Post', route, input, 'false', fabricweightInfoResponse);
}
