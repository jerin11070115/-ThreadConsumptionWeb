$(document).ready(function () {
    CustomerLoad();
    SeasonLoad();
    PlannedLineLoad();
    SitePlantLoad();
    stitchTypeLoad();
    FabricWeightLoad();
});
function CustomerLoad() {
    var route = apiPath + "api/customer/getallactivecustomer";
    var input = "";

    var responseGetCustomer = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Please Select Customer' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].BuyerId + '>' + data[loop].BuyerName + '</option>';
        }
        $('#customerSelect').empty();
        $('#customerSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', responseGetCustomer);
}

function CustomerWiseDevision() {
    var buyerId = $("#customerSelect").val();

    var DivisionBodyModel = {
        BuyerId: buyerId
    };

    var route = apiPath + "api/customer/getcustomerwisedivision";
    var input = JSON.stringify(DivisionBodyModel);


    var responseGetDivision = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Customer Division' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].DevisionId + '>' + data[loop].DevisionName + '</option>';
        }
        $('#customerDivisionSelect').empty();
        $('#customerDivisionSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', responseGetDivision);
}

function SeasonLoad() {
    var route = apiPath + "api/entry/getallactiveseasons";
    var input = "";

    var responseGetSeason = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Buy/Season' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].SeasonId + '>' + data[loop].Season + '</option>';
        }
        $('#seasonSelect').empty();
        $('#seasonSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', responseGetSeason);
}

function PlannedLineLoad() {
    var route = apiPath + "api/entry/getallactiveplanlines";
    var input = "";

    var responseGetPlannedLine = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Planned Lines' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].PlannedLinesId + '>' + data[loop].PlannedLines + '</option>';
        }
        $('#plannedLinestSelect').empty();
        $('#plannedLinestSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', responseGetPlannedLine);
}

function SitePlantLoad() {
    var route = apiPath + "api/entry/getallactivesite";
    var input = "";

    var responseGetSitePlant = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Site/Plant' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].SiteId + '>' + data[loop].SiteName + '</option>';
        }
        $('#sitePlantSelect').empty();
        $('#sitePlantSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', responseGetSitePlant);
}

function stitchTypeLoad() {
    var route = apiPath + "api/entry/getallstitchtype";
    var input = "";

    var stitchTypeResponse = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Stitch Type Select' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].StitchTypeId + '>' + data[loop].MachineCode+' - '+ data[loop].StitchType + '</option>';
        }
        $('#stitchTypeSelect').empty();
        $('#stitchTypeSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', stitchTypeResponse);
}



function FabricWeightLoad() {
    var route = apiPath + "api/entry/getallfabricweight";
    var input = "";

    var fabricweightResponse = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Fabric Weight' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].FabricId + '>' + data[loop].FabricWeight + '</option>';
        }
        $('#fabricWeightSelect').empty();
        $('#fabricWeightSelect').append(output);
    };
    var responseData = CallServerMethod('Post', route, input, 'false', fabricweightResponse);

}



function BrandLoad(rowNumber) {
    var route = apiPath + "api/entry/getallbrand";
    var input = "";

    var brandResponse = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Brand' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].BrandId + '>' + data[loop].Brand + '</option>';
        }

        if (rowNumber > 0) {
            for (var i = 0; i < rowNumber; i++) {
                $('#brandSelect'+i).empty();
                $('#brandSelect'+i).append(output);
            }
        }
        
    };
    var responseData = CallServerMethod('Post', route, input, 'false', brandResponse);

}