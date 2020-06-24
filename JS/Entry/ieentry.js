var loginUserInfo = localStorage.getItem("LoginUserInfo");
$(document).ready(function () {   
    //if (loginUserInfo[0].UserId == '0' || loginUserInfo[0].UserId == null || loginUserInfo[0].UserId == '') {
    //    window.location.href = sitePath + "login.html";
    //}
});


let OperationModel = [];

function dynamicThread() {
    var stitchTypeId = parseInt($('#stitchTypeSelect').val());

    let stitchTypeName = $('#stitchTypeSelect option:selected').text();
    let machineCode = stitchTypeName.substring(
        0,
        stitchTypeName.lastIndexOf(' -')
    );

    loadStitchValueType(machineCode);

    var route = apiPath + "api/entry/GetStitchOperationByStitchType/" + stitchTypeId;
    var input = "";
    $('#threadDiv').empty();
    var htmlDesign = '';

    var operationResponse = function (data) {
        var rowNumber = data.length;
        //console.log(data);

        if (rowNumber > 0) {
            htmlDesign = '<div class="card-header">';
            htmlDesign += '<h3 class="title">Operational data</h3>';
            htmlDesign += '</div>';
            htmlDesign += '<div class="card-body">';
            for (var i = 0; i < rowNumber; i++) {
                htmlDesign += '<div class="row">';

                htmlDesign += '<input id="operationHidden' + i + '" type="hidden" value="' + data[i].OperationId + '"/>';
                htmlDesign += '<input id="operationNameHidden' + i + '" type="hidden" value="' + data[i].OperationName + '"/>';

                htmlDesign += '<div class="col-lg-3">';
                htmlDesign += data[i].OperationName + ' :';
                htmlDesign += '</div>';
                htmlDesign += '<div class="col-lg-3">';
                htmlDesign += '<select class="form-control" id="brandSelect' + i + '"><option value="0">Brand</option></select>';
                htmlDesign += '</div>';

                htmlDesign += '<div class="col-lg-2">';
                htmlDesign += '<select class="form-control" id="tktSelect' + i + '">';
                htmlDesign += '<option value="0">Tkt/Tex</option>';
                htmlDesign += '<option value="10">10</option>';
                htmlDesign += '<option value="25">25</option>';
                htmlDesign += '<option value="30">30</option>';
                htmlDesign += '<option value="36">36</option>';
                htmlDesign += '<option value="40">40</option>';
                htmlDesign += '<option value="50">50</option>';
                htmlDesign += '<option value="75">75</option>';
                htmlDesign += '<option value="80">80</option>';
                htmlDesign += '<option value="180">180</option>';
                htmlDesign += '</select>';
                htmlDesign += '</div>';

                htmlDesign += '<div class="col-lg-2">';
                htmlDesign += '<select class="form-control" id="packageSelect' + i + '">';
                htmlDesign += '<option value="0">Package</option>';
                htmlDesign += '<option value="500">500</option>';
                htmlDesign += '<option value="1000">1000</option>';
                htmlDesign += '<option value="1500">1500</option>';
                htmlDesign += '<option value="2000">2000</option>';
                htmlDesign += '<option value="2500">2500</option>';
                htmlDesign += '<option value="3000">3000</option>';
                htmlDesign += '<option value="3500">3500</option>';
                htmlDesign += '<option value="4000">4000</option>';
                htmlDesign += '<option value="4500">4500</option>';
                htmlDesign += '<option value="5000">5000</option>';
                htmlDesign += '</select>';
                htmlDesign += '</div>';

                htmlDesign += '<div class="col-lg-2">';
                htmlDesign += '<input class="form-control" id="shadeText' + i + '" type="text" placeholder="Shade" />';
                htmlDesign += '</div>';
                htmlDesign += '</div>';
                htmlDesign += '<br />';

            }
            htmlDesign += '<div class="row" style="text-align:center">';
            htmlDesign += '<input id ="submitButton" type="button" value="Add Operation" class="btn btn-primary" onclick="addOperation(' + rowNumber+')"/>';
            htmlDesign += '</div >';
            htmlDesign += '</div>';
            //htmlDesign += '<div class="form-group"><hr/></div>';
            
            $('#threadDiv').html(htmlDesign);

            BrandLoad(rowNumber);

            

        }
    };


    var responseData = CallServerMethod('Get', route, input, 'false', operationResponse);

}

function addOperation(rowNumber){
    let operationDescription = $('#opDescriptionText').val();
    let stitchType = $('#stitchTypeSelect').val();

    let stitchTypeName = $('#stitchTypeSelect option:selected').text();

    let machineCode = stitchTypeName.substring(
        0,
        stitchTypeName.lastIndexOf(' -') 
    );

    let machineQuantity = '1';
    if ($('#machineQuantityText').val() != '') {
        machineQuantity = $('#machineQuantityText').val();
    }    

    let row = '1';
    if ($('#rowText').val() != '') {
        row = $('#rowText').val();
    }

    let group = $('#groupText').val();

    if (group == '') {
        group = '0';
    }

    
    let seamLength = '0';//float
    let stitchRate = '0'; //int
    let bight = '0';//int
    let stitchQtn = '0';//int
    //let stitchSize = '0';//string
    if ($('#seamLengthText').val() == '') {
        seamLength = '0';
    }
    else {
        seamLength = $('#seamLengthText').val();
    }
    
    if ($('#stitchRateText').val() == '') {
        stitchRate = '0';
    }
    else {
        stitchRate = $('#stitchRateText').val();
    }

    if ($('#bightText').val() == '') {
        bight = '0';
    }
    else {
        bight = $('#bightText').val();
    }

    if ($('#stitchQtnText').val() == '') {
        stitchQtn = '0';
    }
    else {
        stitchQtn = $('#stitchQtnText').val();
    }

    //if ($('#stitchSizeSelect').val() == '0') {
    //    stitchSize = '0';
    //}
    //else {
    //    stitchSize = $('#stitchSizeSelect').val();
    //}
    
    let DiscriptionDataModel = [];

    if (rowNumber > 0) {
        //brandId
        for (var i = 0; i < rowNumber; i++)
        {
            let operationId = $('#operationHidden' + i + '').val();
            let operationName = $('#operationNameHidden' + i + '').val();
            let brandId = $('#brandSelect' + i + '').val();
            let brandName = $('#brandSelect' + i + ' option:selected').text();
            let tktValue = $('#tktSelect' + i + '').val();
            let packageValue = $('#packageSelect' + i + '').val();
            let shade = $('#shadeText' + i + '').val();

            let DiscriptionModel = {
                ThreadOrderId: parseInt(0),
                OperationId: parseInt(operationId),
                OperationName: operationName,
                StitchType: parseInt(stitchType),
                BrandId: parseInt(brandId),
                BrandName: brandName,
                TktValue: parseInt(tktValue),
                Package: parseInt(packageValue),
                Shade: shade,
                MachineCode: machineCode,
                StitchRate: parseInt(0),
                Bight: parseInt(0),
                StitchQtn: parseInt(0),
                UnitValuePerCm: parseFloat(0),
                ThreadMeter: parseFloat(0),
                RequredCone: parseInt(0),
                ThreadWithProductQtnCone: parseInt(0),
                ActualCone: '0',
                GuidString:'',
                MachineWiseConeReq: parseInt(0),
                PostedBy: 2,
                ThreadMeterWithQtn: parseFloat(0),
                OperationDescription:''
            };
            DiscriptionDataModel.push(DiscriptionModel);
            $('#operationHidden' + i + '').val('');
            $('#brandSelect' + i + '').val('0');
            $('#tktSelect' + i + '').val('0');
            $('#packageSelect' + i + '').val('0');
            $('#shadeText' + i + '').val('');
        }

        $('#opDescriptionText').val('');
        $('#stitchTypeSelect').val('0');
        $('#machineQuantityText').val('');
        $('#rowText').val('');
        $('#groupText').val('');
        $('#seamLengthText').val('');
        $('#stitchRateText').val('');
        $('#bightText').val('');
        $('#stitchQtnText').val('');
        //$('#stitchSizeSelect').val('0');
        //$('#stitchSizeDiv').css("display", "none");
        $('#stitchQtnDiv').css("display", "none");
        $('#bightDiv').css("display", "none");
        $('#stitchRateDiv').css("display", "none");
        $('#seamLengthDiv').css("display", "none");
        $('#rowQuantityDiv').css("display", "none");

    }

    let operationData = {
        ThreadOrderId: parseInt(0),
        OperationDescription: operationDescription.trim(),
        StitchType: parseInt(stitchType),
        StitchTypeName: stitchTypeName,
        MachineQuantity: parseInt(machineQuantity),
        StitchRow: parseInt(row),
        Group: parseInt(group),
        SeamLength: parseInt(seamLength),
        StitchRate: parseInt(stitchRate),
        Bight: parseInt(bight),
        StitchQtn: parseInt(stitchQtn),
        GuidString: '',
        MachineCode: machineCode,
        PostedBy: 2,
        DiscriptionModel: DiscriptionDataModel

    };

    OperationModel.push(operationData);
    OperationDataTable(OperationModel);

    //console.log(rowNumber);
    //console.log(OperationModel);
    $('#threadDiv').empty();
    $('#stitchTypeSelect').val(0);
    
    
}


function OperationDataTable(OperationModel) {

    $('#operationDataDiv').empty();
    var htmlDesign = '';
    let count = 1;


    
    if (OperationModel.length > 0) {
        htmlDesign = '<div class="card-body">';
        htmlDesign += '<table class="table table-bordered" style="background-color:#d3d6d2;">';
        htmlDesign += '<thead>';
        htmlDesign += '<tr>';
        htmlDesign += '<th scope="col">#</th>';
        htmlDesign += '<th scope="col">Description</th>';
        htmlDesign += '<th scope="col">Stitch Type</th>';
        htmlDesign += '<th scope="col">Seam Length (cm.)</th>';
        htmlDesign += '<th scope="col">Machine Quantity</th>';
        htmlDesign += '<th scope="col">Stitch Rate(per 3cm.)</th>';
        htmlDesign += '<th scope="col">Group</th>';
        htmlDesign += '</tr>';
        htmlDesign += '</thead >';
        htmlDesign += '<tbody>';
        for (var i = 0; i < OperationModel.length; i++) {
            htmlDesign += '<tr>';
            htmlDesign += '<th scope="row">' + count++ + '</th>';
            htmlDesign += '<td>' + OperationModel[i].OperationDescription+ '</td>';
            htmlDesign += '<td>' + OperationModel[i].StitchTypeName+ '</td>';
            htmlDesign += '<td>' + OperationModel[i].SeamLength+ '</td>';
            htmlDesign += '<td>' + OperationModel[i].MachineQuantity+ '</td>';
            htmlDesign += '<td>' + OperationModel[i].StitchRate+ '</td>';
            htmlDesign += '<td>' + OperationModel[i].Group+ '</td>';
            htmlDesign += '</tr>';
        }
        htmlDesign += '</tbody>';
        htmlDesign += '</table>';
        htmlDesign += '</div>';

        $('#operationDataDiv').html(htmlDesign);

    }



    //console.log(OperationModel);
}




function SaveAllInfo() {
    let customerId = $('#customerSelect').val();
    let customerDivision = $('#customerDivisionSelect').val();
    let seasonName = $('#seasonText').val();
    let styleNumber = $('#styleNumberText').val();
    let sitePlant = $('#sitePlantSelect').val();
    let fabricWeight = $('#fabricWeightSelect').val();
    let salesNumber = $('#soNumberText').val();
    let size = $('#sizeText').val();
    let color = $('#colorText').val();
    let productCategory = $('#productCategoryText').val();
    let inqueryNo = $('#inqueryNoText').val();
    let sampleDate = $("#sampleDateText").val();
    let sampleStage = $("#sampleStageText").val();

    let wastagePercentage = 0
    if( $("#wastagePercentageText").val() !='')
    {
        wastagePercentage = $("#wastagePercentageText").val();
    }

    let orderQuantity = 1;
    
    let customerName = $("#customerSelect option:selected").text();
    let customerDivisionName = $("#customerDivisionSelect option:selected").text();
    let sitePlantName = $("#sitePlantSelect option:selected").text();
    let fabricWeightName = $("#fabricWeightSelect option:selected").text();

    

    let InitialData = {
        ThreadOrderId: parseInt(0),
        CustomerId: parseInt(customerId),
        CustomerName: customerName,
        CustomerDivision: parseInt(customerDivision),
        CustomerDivisionName: customerDivisionName,
        SeasonName: seasonName,
        StyleNumber: styleNumber.toUpperCase(),
        SampleStage: sampleStage,
        SampleDate: sampleDate,
        SitePlant: parseInt(sitePlant),
        SitePlantName: sitePlantName,
        FabricWeight: parseInt(fabricWeight),
        FabricWeightName: fabricWeightName,
        SalesNumber: salesNumber,
        Size: size.toUpperCase(),
        Color: color,
        
        ProductCategory: productCategory,
        OrderQuantity: parseInt(orderQuantity),
        InqueryNo: inqueryNo.toUpperCase(),
        
        Wastage: parseInt(wastagePercentage),
        PostedBy: 2,

        OperationModel: OperationModel
    };


    let requestModel = JSON.stringify(InitialData);
    console.log(requestModel);

    localStorage.setItem('ThreadOrderRequestModel', requestModel);
    window.location.href = sitePath + 'Merchant/Request/orderrequest.html';
}

function inqueryNoGenerate() {

    let customerName = $("#customerSelect option:selected").text();
    let customerDivision = $("#customerDivisionSelect option:selected").text();
    let styleNumber = $('#styleNumberText').val();

    let inqueryNo = customerName + customerDivision + styleNumber;

    if (styleNumber == '') {
        $('#inqueryNoText').val('');
    }
    else {
        $('#inqueryNoText').val(inqueryNo);
    }
}

function loadStitchValueType(machineId) {
   

    if (machineId == '') {
        //$('#stitchSizeDiv').css("display", "none");
        $('#stitchQtnDiv').css("display", "none");
        $('#bightDiv').css("display", "none");
        $('#stitchRateDiv').css("display", "none");
        $('#seamLengthDiv').css("display", "none");
        $('#rowQuantityDiv').css("display", "none");

    }
    else {
        var route = apiPath + "api/entry/GetAllStitchValueTypesByMachineId/" + machineId;
        var input = "";


        var stitchValuTypeResponse = function (data) {
            if (data.length > 0) {
                if (data[0].RowQuantity == '1') {
                    $('#rowQuantityDiv').css("display", "block");
                }
                else {
                    $('#rowQuantityDiv').css("display", "none");
                }

                //if (data[0].StitchSize == '1') {
                //    $('#stitchSizeDiv').css("display", "block");
                //}
                //else {
                //    $('#stitchSizeDiv').css("display", "none");
                //}

                if (data[0].StitchQuantity == '1') {
                    $('#stitchQtnDiv').css("display", "block");
                }
                else {
                    $('#stitchQtnDiv').css("display", "none");
                }

                if (data[0].Bight == '1') {
                    $('#bightDiv').css("display", "block");
                }
                else {
                    $('#bightDiv').css("display", "none");
                }
                if (data[0].StitchRate == '1') {
                    $('#stitchRateDiv').css("display", "block");
                }
                else {
                    $('#stitchRateDiv').css("display", "none");
                }

                if (data[0].SeamLength == '1') {
                    $('#seamLengthDiv').css("display", "block");
                }
                else {
                    $('#seamLengthDiv').css("display", "none");
                }
                
            }
            else {
                //$('#stitchSizeDiv').css("display", "none");
                $('#stitchQtnDiv').css("display", "none");
                $('#bightDiv').css("display", "none");
                $('#stitchRateDiv').css("display", "none");
                $('#seamLengthDiv').css("display", "none");
                $('#rowQuantityDiv').css("display", "none");
            }
        };


        var responseData = CallServerMethod('Get', route, input, 'false', stitchValuTypeResponse);
    }

    



}





