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



function MachineWiseStitchType() {
    var MachineCode = $("#machineCodeSelect").val();

 

    var route = apiPath + "api/entry/GetAllStitchTypesByMachineCode/" + MachineCode;
    var input = '';


    var responseGetStitchType = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Stitch Type' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].StitchTypeId + '>' + data[loop].StitchType + '</option>';
        }
        $('#stitchTypeSelect').empty();
        $('#stitchTypeSelect').append(output);
    };
    var responseData = CallServerMethod('Get', route, input, 'false', responseGetStitchType);
}

function StitchTypeWiseOperation() {
    var StitchTypeId = $("#stitchTypeSelect").val();



    var route = apiPath + "api/entry/GetStitchOperationByStitchType/" + StitchTypeId;
    var input = '';


    var responseGetOperation = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Stitch Operation' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].OperationId + '>' + data[loop].OperationName + '</option>';
        }
        $('#stitchOperationSelect').empty();
        $('#stitchOperationSelect').append(output);
    };
    var responseData = CallServerMethod('Get', route, input, 'false', responseGetOperation);
}


function AddMachineCodeValue() {
    var machineCode = $('#machineCodeSelect').val();
    var stitchTypeId = $('#stitchTypeSelect').val();
    var OperationId = $('#stitchOperationSelect').val();
    var spi = $('#spiText').val();
    var bight = $('#bightText').val();
    var quantity = $('#quantityText').val();
    var unitValuePerCm = $('#uniteValueText').val();
    var IsActive = $('#isActiveSelect').val();

    var UserInfo = JSON.parse(localStorage.getItem("LoginUserInfo"));

    var PostedBy = UserInfo[0].UserId;
   // var PostedBy = '2';

     if (spi == '') {
        spi = '0';
    }

     if (bight == '') {
        bight = '0';
    }
     if (quantity == '') {
        quantity = '0';
    }

    if (machineCode == '0') {
        Swal("Please Select MachineCode ");
    } 

    else if (stitchTypeId == '0') {
        Swal("Please select stitch Type ");
    }
    else if (OperationId == '0') {
        Swal("Please select Operation ");
    }
    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    

    else if (unitValuePerCm == '') {
        Swal("Please enter value For Stitch per cm. ");
    }


    else if (IsActive == '-1') {
        Swal("Please select isActive ");
    }

    else {
        var machineCodeValueBodyModel = {
            MachineCode: machineCode,
            StitchTypeId: parseInt(stitchTypeId),
            OperationId: parseInt(OperationId),
            SPI: parseInt(spi),
            Bight: parseInt(bight),
            Quantity: parseInt(quantity),
            UnitValuePerCm: parseFloat(unitValuePerCm),
            IsActive: parseInt(IsActive),
            PostedBy: parseInt(PostedBy)
        };

        var input = JSON.stringify(machineCodeValueBodyModel);
        var route = apiPath + "api/entry/InsertMachineCodeValue";

        var machineCodeValueResponse = function (data) {
            Swal({
                position: 'center',
                type: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 2000
            });

             $('#machineCodeSelect').val('0');
             $('#stitchTypeSelect').val('0');
             $('#stitchOperationSelect').val('0');
             $('#spiText').val('');
             $('#bightText').val('');
             $('#quantityText').val('');
             $('#uniteValueText').val('');
             $('#isActiveSelect').val('-1');

        }
        var responseData = CallServerMethod('Post', route, input, 'false', machineCodeValueResponse);
    }
}




