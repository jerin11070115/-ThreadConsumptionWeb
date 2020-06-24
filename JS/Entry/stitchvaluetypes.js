$(document).ready(function () {
    MachineCodeLoad();
});

function MachineCodeLoad() {
    var route = apiPath + "api/entry/GetAllUniqueMachineCode";
    var input = "";

    var GetMachineCoderesponse = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Please Select Machine Code' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].MachineCode + '>' + data[loop].MachineCode + '</option>';
        }
        $('#machineCodeSelect').empty();
        $('#machineCodeSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', GetMachineCoderesponse);
}

function AddStitchValuesType() {

    let machineId = $('#machineCodeSelect').val();
    let seamLength = $('#seamLengthSelect').val();
    let stitchRate = $('#stitchRateSelect').val();
    let stitchQuantity = $('#stitchQuantitySelect').val();
    let stitchSize = $('#stitchSizeSelect').val();
    let bight = $('#bightSelect').val();

    if (machineId == '0') {
        Swal("Please Machine Code");
    }
    else if (seamLength == '-1') {
        Swal("Please Select Seam Length");
    }
    else if (stitchRate == '-1') {
        Swal("Please Select Stitch Rate");
    }
    else if (stitchQuantity == '-1') {
        Swal("Please Select Stitch Quantity");
    }
    else if (bight == '-1') {
        Swal("Please Select Bight");
    }
    else if (seamLength == '-1') {
        Swal("Please Select Seam Length");
    }

    else {
        let StitchValueModel = {
            MachineId: machineId,
            SeamLength: parseInt(seamLength),
            StitchRate: parseInt(stitchRate),
            StitchQuantity: parseInt(stitchQuantity),
            StitchSize: parseInt(stitchSize),
            Bight: parseInt(bight)
        };

        var input = JSON.stringify(StitchValueModel);
        var route = apiPath + "api/entry/insertStitchValueType";

        var StitchValueResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

            $('#machineCodeSelect').val('0');
            $('#seamLengthSelect').val('-1');
            $('#stitchRateSelect').val('-1');
            $('#stitchQuantitySelect').val('-1');
            $('#stitchSizeSelect').val('-1');
            $('#bightSelect').val('-1');
        };
        var responseData = CallServerMethod('Post', route, input, 'false', StitchValueResponse);



    }


}
