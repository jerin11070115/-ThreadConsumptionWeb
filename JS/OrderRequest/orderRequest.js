

$(document).ready(function () {
    getbuyer();
    getSeason();
    getColours();
    getSite();
    getPlanLines();
    var inqueryNo = makeid(10);
    $('#inqueryNoText').val(inqueryNo);
});

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getbuyer() {
    var url = apiPath + "api/customer/getallactivecustomer";
    var input = "";
    var getBuyerResponse = function (data) {

        var output = '';
        output = '<option value="0">Please select a customer</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].BuyerId + '>' + data[loop].BuyerName + '</option>';
        }

        $('#customerSelect').empty();
        $('#customerSelect').append(output);
    };

    CallServerMethod('Post', url, input, 'false', getBuyerResponse);
}

function getDivision() {
    var BuyerId = $("#customerSelect").val();

    var divisionBodyModel = {
        BuyerId: BuyerId
    };

    var input = JSON.stringify(divisionBodyModel);
    var route = apiPath + "api/customer/getcustomerwisedivision";

    var divisionResponse = function (data) {
        var output = '';
        output = '<option value="0">Please select a customer division</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].DevisionId + '>' + data[loop].DevisionName + '</option>';
        }

        $('#customerDivisionSelect').empty();
        $('#customerDivisionSelect').append(output);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', divisionResponse);
}


function getSeason() {
    
    var route = apiPath + "api/entry/getallactiveseasons";
    var input = "";
    var seasonResponse = function (data) {
        var output = '';
        output = '<option value="0">Please select a season</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].SeasonId + '>' + data[loop].Season + '</option>';
        }

        $('#seasonSelect').empty();
        $('#seasonSelect').append(output);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', seasonResponse);
}

function getColours() {
    var route = apiPath + "api/entry/getallactivecolours";
    var input = "";
    var colourResponse = function (data) {
        var output = '';
        output = '<option value="0">Please select a colour</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].ColourId + '>' + data[loop].Colour + '</option>';
        }

        $('#colourSelect').empty();
        $('#colourSelect').append(output);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', colourResponse);
}

function getSite() {

    var route = apiPath + "api/entry/getallactivesite";
    var input = "";
    var siteResponse = function (data) {
        var output = '';
        output = '<option value="0">Please select a Site/Plant</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].SiteId + '>' + data[loop].SiteName + '</option>';
        }

        $('#sitePlantSelect').empty();
        $('#sitePlantSelect').append(output);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', siteResponse);
}

function getPlanLines() {

    var route = apiPath + "api/entry/getallactiveplanlines";
    var input = "";
    var plannedResponse = function (data) {
        var output = '';
        output = '<option value="0">Please select a Planned Line</option>';

        for (var loop = 0; loop < data.length; loop++) {
            output += '<option value=' + data[loop].PlannedLinesId + '>' + data[loop].PlannedLines + '</option>';
        }

        $('#plannedLinestSelect').empty();
        $('#plannedLinestSelect').append(output);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', plannedResponse);
}
