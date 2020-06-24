var loginUserInfo = localStorage.getItem("LoginUserInfo");
$(document).ready(function () {
    LoadAllMachineCodeValue();
    ThreadBrandLoad();
    LoadForExcell();

});

function LoadAllMachineCodeValue() {
    var route = apiPath + "api/threadorder/LoadAllMachineCodeValue";
    var input = "";

    var machineValueResponse = function (data) {
        //console.log(data);
        let count = 1;
        var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
        //console.log(threadOrderRequestModel);
        var htmldesign = '';
        var DiscriptionTable = [];
        var today = new Date();
        var currentdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        if (threadOrderRequestModel != null && data != null) {
            htmldesign = `<div class='card-header'>
                            <h3>Single Garment Consumption: <button type="button" class="btn btn-danger" data-toggle='modal' data-target='#initialModal' onClick="InitialChange()">Changer Buyer Info</button> </h3>
                          </div>`;
            htmldesign += `<div class='card-body'>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Date : ${currentdate}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Customer Name : ${threadOrderRequestModel.CustomerName} (${threadOrderRequestModel.CustomerDivisionName})`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Season : ${threadOrderRequestModel.SeasonName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Style Number : ${threadOrderRequestModel.StyleNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Category : ${threadOrderRequestModel.ProductCategory}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Qtn : ${threadOrderRequestModel.OrderQuantity}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Date : ${threadOrderRequestModel.SampleDate}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Stage : ${threadOrderRequestModel.SampleStage}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Site Plant : ${threadOrderRequestModel.SitePlantName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Fabric Weight : ${threadOrderRequestModel.FabricWeightName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `So Number: ${threadOrderRequestModel.SalesNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Size: ${threadOrderRequestModel.Size}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Color: ${threadOrderRequestModel.Color}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Inquery No: ${threadOrderRequestModel.InqueryNo}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Wastage: ${threadOrderRequestModel.Wastage / 100}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<input type="text" class="form-control" id="productQtnText" placeholder="Product Quantity">`;
            htmldesign += `</div>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<button type="button" class="btn btn-primary"  onclick="LoadOrderQtnWiseThreadValue(document.getElementById('productQtnText').value)" data-dismiss="modal">Calculate</button>`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;
            htmldesign += `</div>`;


            htmldesign += `<div class='row'>`;
            if (threadOrderRequestModel.OperationModel.length > 0) {

                htmldesign += `<table class='table table-bordered' border=1><thead><tr>
                    <th> No.</th >
                        <th>Operation</th>
                        <th>Length(cm)</th>
                        <th>SP(3cm)</th>
                        <th>Bight</th>
                        <th>Bartack Quantity</th>
                        <th>Stitch</th>
                        <th>Machine Qtn</th>
                        <th>Row</th>
                        <th>Brand</th>
                        <th>Tkt/Tex</th>
                        <th>Package</th>
                        <th>Shade</th>
                        <th>Thread(cm)</th>
                        <th>Per Garments Thread(m) </th>
                        <th>Thread(m) With Wastage</th>
                        <th>Actual Cone</th>
                        <th>Actual Round Cone</th>
                        <th>Line Feeding Cone</th>
                        <th>Unused Thread</th>
                        <th>Action</th>
        </tr></thead> <tbody>`;
                for (var i = 0; threadOrderRequestModel.OperationModel.length > i; i++) {

                    htmldesign += `<tr>
                    <td><b>${count++}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].OperationDescription}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].SeamLength}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRate}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].Bight}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchQtn}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchTypeName}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].MachineQuantity}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRow}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span class='btn btn-success' data-toggle='modal' data-target='#fullHeightModalRight' onclick='OperationChange(${i})'>Edit</span></td>
                    </tr>`;



                    if (threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > 0) {
                        for (var j = 0; threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > j; j++) {
                            htmldesign += `<tr>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationName}</td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].BrandName}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].TktValue}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Shade}</td>`;

                            for (var k = 0; data.length > k; k++) {


                                if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].SPI == threadOrderRequestModel.OperationModel[i].StitchRate
                                    && data[k].Bight == threadOrderRequestModel.OperationModel[i].Bight
                                    
                                    && data[k].MachineCode != '3015'
                                ) {
                                    var coneQtn = 0;
                                    var actualCone = parseFloat(0);
                                    var threadMeter = parseFloat(0);
                                    var threadWithWastage = parseFloat(0);
                                    var WastagePrecentage = parseFloat(threadOrderRequestModel.Wastage / 100);

                                    if (threadOrderRequestModel.OperationModel[i].StitchRate > 0 && threadOrderRequestModel.OperationModel[i].StitchQtn == 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength).toFixed(3)}</td>`;

                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength) / 100).toFixed(3));
                                        htmldesign += `<td>${(threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);


                                        htmldesign += `<td>${actualCone * threadOrderRequestModel.OperationModel[i].StitchRow}</td>`;


                                        //Cone calculation
                                      
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        
                                        coneQtn = data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity * threadOrderRequestModel.OperationModel[i].StitchRow;

                                        threadMeter = threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow;
                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow)).toFixed(3)}</td>`;

                                        htmldesign += `<td><span class='btn btn-info' data-toggle='modal' data-target='#descriptionModal' onclick='descriptionChange(${i},${j})'>Edit</span></td>`;

                                    }
                                    else if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        

                                        ////Cone calculation
                      
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        coneQtn = cone * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;
                                        htmldesign += `<td><span class='btn btn-success' data-toggle='modal' data-target='#descriptionModal' onclick='descriptionChange(${i},${j})'>Edit</span></td>`;

                                    }

                                    else {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        //Cone calculation
                                       
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        
                                        coneQtn = data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;
                                        
                                        htmldesign += `<td><span class='btn btn-success' data-toggle='modal' data-target='#descriptionModal' onclick='descriptionChange(${i},${j})'>Edit</span></td>`;
                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(0);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;

                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);

                                }
                                else if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].MachineCode == '3015'
                                ) {
                                    if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        
                                        coneQtn = cone * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((coneQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;
                                        htmldesign += `<td><span class='btn btn-success' data-toggle='modal' data-target='#descriptionModal' onclick='descriptionChange(${i},${j})'>Edit</span></td>`;

                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(0);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;
                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);

                                }


                            }


                            htmldesign += `</tr>`;

                        }

                    }


                }

                htmldesign += `</tbody></table>`;
                htmldesign += `</div>`;

            }
            htmldesign += `</div>`;


            htmldesign += `</div>`;

        }
        $('#showdatadiv').empty();
        $('#showdatadiv').html(htmldesign);



        var finaldata = JSON.stringify(threadOrderRequestModel);
        localStorage.setItem('ThreadOrderRequestModel', finaldata);


        var discriptionData = BrandThreadCalculation(DiscriptionTable);




        //console.log(discriptionData);
        discriptionData = MargeBrandCalculatedData(discriptionData);

        if (discriptionData != null) {
            let count = 1;
            let html = "";


            html += `<table class='table table-bordered' border=1><thead><tr>
                         <th colspan="1">No.</th>
                         <th colspan="1">Operation Description</th>
                         <th colspan="1">Brand</th>
                         <th colspan="1">Tkt/Tex</th>
                         <th colspan="1">Shade</th>
                         <th colspan="1">Thread(m)</th>
                         <th colspan="1">Required Cone</th>
                         </tr></thead><tbody>`;
            for (let i = 0; i < discriptionData.length; i++) {
                html += `<tr>
                    <td colspan="1">${count++}</td>
                    <td colspan="1">${discriptionData[i].OperationDescription}</td>
                    <td colspan="1">${discriptionData[i].BrandName}</td>
                    <td colspan="1">${discriptionData[i].TktValue}</td>
                    <td colspan="1">${discriptionData[i].Shade}</td>
                    <td colspan="1">${discriptionData[i].ThreadMeter.toFixed(3)}</td>
                    <td colspan="1">${discriptionData[i].RequredCone}</td>
                    </tr>`;
            }
            html += `<tr><td colspan="5"> <b>Total</b></td>
                    <td colspan="1"><b>${(GetTotalThreadMeter(discriptionData)).toFixed(3)}</b></td>
                    <td colspan="1"><b>${GetTotalRequredCone(discriptionData)}</b></td>
                    </tr>`;

            html += `</tbody></table>`;

            html += '<div class="row" style="text-align:center">';
            html += '<input id ="submitButton" type="button" value="Store Thread" class="btn btn-primary" onclick="InsertThreadOrderInfo()"/>';
            html += '<input id ="pdfButton" type="button" value="pdf Generate" class="btn btn-primary" onclick="GeneratePdfFile()"/>';
            html += '<input id="downloadLink" onclick="exportF()" type="button" value="Export to excel" class="btn btn-primary"/>';
            html += '</div >';

            $('#showBrandDiv').empty();
            $("#showBrandDiv").html(html);

        }
    };

    var responseData = CallServerMethod('Get', route, input, 'false', machineValueResponse);
}

function InsertThreadOrderInfo() {

    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
    var input = JSON.stringify(threadOrderRequestModel);
    //console.log(input);
    var route = apiPath + "api/threadorder/InsertThreadOrderInfo";

    var threadResponse = function (data) {
        Swal({
            position: 'center',
            type: 'success',
            title: 'Success',
            showConfirmButton: false,
            timer: 2000
        });
    };
    var responseData = CallServerMethod('Post', route, input, 'false', threadResponse);
}




function LoadOrderQtnWiseThreadValue(orderQtn) {
    $('#showBrandDiv').empty();
    var route = apiPath + "api/threadorder/LoadAllMachineCodeValue";
    var input = "";

    var machineValueResponse = function (data) {
        //console.log(data);
        let count = 1;
        var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
        if (orderQtn == '') {
            orderQtn = '1';
        }
        var productQtn = parseInt(orderQtn);
        console.log(threadOrderRequestModel);
        var htmldesign = '';
        var DiscriptionTable = [];
        var today = new Date();
        var currentdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        if (threadOrderRequestModel != null && data != null) {
            htmldesign = `<div class='col-md-12'><h3>Garment Consumption:</h3></div>`;
            htmldesign += `<div class='col-md-12'>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Date : ${currentdate}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Customer Name : ${threadOrderRequestModel.CustomerName} (${threadOrderRequestModel.CustomerDivisionName})`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Season : ${threadOrderRequestModel.SeasonName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Style Number : ${threadOrderRequestModel.StyleNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Category : ${threadOrderRequestModel.ProductCategory}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Qtn : ${productQtn}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Date : ${threadOrderRequestModel.SampleDate}`;
            htmldesign += `</div>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Stage : ${threadOrderRequestModel.SampleStage}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Site Plant : ${threadOrderRequestModel.SitePlantName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Fabric Weight : ${threadOrderRequestModel.FabricWeightName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `So Number: ${threadOrderRequestModel.SalesNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Size: ${threadOrderRequestModel.Size}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Color: ${threadOrderRequestModel.Color}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Inquery No: ${threadOrderRequestModel.InqueryNo}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Wastage : ${threadOrderRequestModel.Wastage / 100}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<button type="button" class="btn btn-primary"  onclick="reloadfunction()">Refresh</button>`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;


            htmldesign += `<div class='row'>`;
            if (threadOrderRequestModel.OperationModel.length > 0) {

                htmldesign += `<table width='600' id="sig" cellspacing='0' cellpadding='0' border-spacing='0' style="margin:0;padding:0;" class='table table-bordered' border=1><thead><tr>
                    <th> No.</th >
                        <th>Operation</th>
                        <th>Length(cm)</th>
                        <th>SP(3cm)</th>
                        <th>Bight</th>
                        <th>Bartack Quantity</th>
                        <th>Stitch</th>
                        <th>Machine Qtn</th>
                        <th>Row</th>
                        <th>Brand</th>
                        <th>Tkt/Tex</th>
                        <th>Package</th>
                        <th>Shade</th>
                        <th>Thread(cm)</th>
                        <th>Thread(m)</th>
                        <th>Thread(m) With Quantity</th>
                        <th>Thread(m) With Wastage</th>
                        <th>Actual Cone</th>
                        <th>With Quantity Cone</th>
                        <th>Actual Round Cone</th>
                        <th>Line Feeding Cone</th>
                        <th>Line Feeding With Quantity Cone</th>
                        <th>Unused Thread</th>
        </tr></thead> <tbody>`;
                for (var i = 0; threadOrderRequestModel.OperationModel.length > i; i++) {

                    htmldesign += `<tr>
                    <td><b>${count++}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].OperationDescription}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].SeamLength}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRate}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].Bight}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchQtn}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchTypeName}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].MachineQuantity}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRow}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>`;

                    if (threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > 0) {
                        for (var j = 0; threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > j; j++) {
                            htmldesign += `<tr>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationName}</td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].BrandName}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].TktValue}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Shade}</td>`;
                            for (var k = 0; data.length > k; k++) {
                                if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].SPI == threadOrderRequestModel.OperationModel[i].StitchRate
                                    && data[k].Bight == threadOrderRequestModel.OperationModel[i].Bight
                                    && data[k].MachineCode != '3015'
                                ) {
                                    var coneQtn = 0;
                                    var threadWithProductQtnConeQtn = 0;
                                    var actualCone = parseFloat(0);
                                    var threadMeter = parseFloat(0);
                                    var threadWithWastage = parseFloat(0);
                                    var WastagePrecentage = parseFloat(threadOrderRequestModel.Wastage / 100);

                                    if (threadOrderRequestModel.OperationModel[i].StitchRate > 0 && threadOrderRequestModel.OperationModel[i].StitchQtn == 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength).toFixed(3)}</td>`;


                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow}</td>`;
                                        htmldesign += `<td>${(threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow * productQtn).toFixed(2)}</td>`;

                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow * productQtn).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package);



                                        htmldesign += `<td>${(actualCone * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(6)} </td>`;
                                        var testingvalue = (actualCone * productQtn * threadOrderRequestModel.OperationModel[i].StitchRow);

                                        htmldesign += `<td>${(actualCone * productQtn * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(3)}</td>`;
                                        //Cone calculation
                                        ////with productQtn
                                        
                                        var threadWithProductQtn = ((threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow * productQtn) / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package);

                                        var threadWithProductQtnCone = Math.ceil(threadWithProductQtn);
                                        
                                        threadWithProductQtnConeQtn = threadWithProductQtnCone * data[k].MachineWiseConeReq;

                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;

                                        
                                        coneQtn = data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity * threadOrderRequestModel.OperationModel[i].StitchRow;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${threadWithProductQtnConeQtn}</td>`;
                                        htmldesign += `<td>${((threadWithProductQtnConeQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * productQtn * threadOrderRequestModel.OperationModel[i].StitchRow)).toFixed(3)}</td>`;
                                        threadMeter = threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow;
                                        htmldesign += `</tr>`;

                                    }
                                    else if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        
                                        ////Cone calculation
                                        
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter}</td>`;
                                        htmldesign += `<td>${(threadMeter * productQtn).toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * productQtn).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        htmldesign += `<td>${actualCone * productQtn}</td>`;
                                        var cone = Math.ceil(actualCone);

                                        var threadWithProductQtn = actualCone * productQtn;

                                        var threadWithProductQtnCone = Math.ceil(threadWithProductQtn);
                                        threadWithProductQtnConeQtn = threadWithProductQtnCone;


                                        htmldesign += `<td>${cone}</td>`;
                                        
                                        coneQtn = cone * data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${threadWithProductQtnConeQtn} </td>`;
                                        
                                        htmldesign += `<td>${((threadWithProductQtnConeQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * productQtn)).toFixed(3)}</td>`;
                                        htmldesign += `</tr>`;

                                    }
                                    else {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter}</td>`;
                                        htmldesign += `<td>${threadMeter * productQtn}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * productQtn).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        htmldesign += `<td>${actualCone * productQtn}</td>`;


                                        //Cone calculation
                                        
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;

                                        var threadWithProductQtn = actualCone * productQtn;

                                        var threadWithProductQtnCone = Math.ceil(threadWithProductQtn);
                                        threadWithProductQtnConeQtn = threadWithProductQtnCone;
                                        
                                        coneQtn = cone * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${threadWithProductQtnConeQtn}</td>`;
                                        
                                        htmldesign += `<td>${((threadWithProductQtnConeQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * productQtn)).toFixed(3)}</td>`;
                                        htmldesign += `</tr>`;
                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadWithProductQtnCone = threadWithProductQtnConeQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(threadMeter * productQtn);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;
                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);
                                }
                                else if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].MachineCode == '3015'
                                ) {
                                    var coneQtn = 0;
                                    var threadWithProductQtnConeQtn = 0;
                                    var actualCone = parseFloat(0);
                                    var threadMeter = parseFloat(0);
                                    var threadWithWastage = parseFloat(0);
                                    var WastagePrecentage = parseFloat(threadOrderRequestModel.Wastage / 100);

                                    if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter}</td>`;
                                        htmldesign += `<td>${(threadMeter * productQtn).toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * productQtn).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        htmldesign += `<td>${actualCone * productQtn}</td>`;
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        
                                        var threadWithProductQtn = actualCone * productQtn;

                                        var threadWithProductQtnCone = Math.ceil(threadWithProductQtn);
                                        threadWithProductQtnConeQtn = threadWithProductQtnCone;

                                        coneQtn = cone * data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${threadWithProductQtnConeQtn}</td>`;
                                        htmldesign += `<td>${((threadWithProductQtnConeQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * productQtn)).toFixed(3)}</td>`;
                                        htmldesign += `</tr>`;

                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadWithProductQtnCone = threadWithProductQtnConeQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(threadMeter * productQtn);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;
                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);

                                }

                            }

                        }

                    }


                }

                htmldesign += `</tbody></table>`;
                htmldesign += `</div>`;

            }
            htmldesign += `</div>`;


            htmldesign += `</div>`;
        }
        $('#showdatadiv').empty();
        $('#showdatadiv').html(htmldesign);


        var discriptionData = BrandThreadCalculation(DiscriptionTable);
        discriptionData = MargeBrandCalculatedData(discriptionData);

        if (discriptionData != null) {
            let count = 1;
            let html = "";


            html += `<table class='table table-bordered' border=1><thead><tr>
                         <th colspan="1">No.</th>
                         <th colspan="1">Operation Description</th>
                         <th colspan="1">Brand</th>
                         <th colspan="1">Tkt/Tex</th>
                         <th colspan="1">Shade</th>
                         <th colspan="1">Thread(m)</th>
                         <th colspan="1">Thread(m) With Qtn</th>
                         <th colspan="1">Required Cone</th>
                         <th colspan="1">Thread With Product Qtn Cone</th>
                         </tr></thead><tbody>`;
            for (let i = 0; i < discriptionData.length; i++) {
                html += `<tr>
                    <td colspan="1">${count++}</td>
                    <td colspan="1">${discriptionData[i].OperationDescription}</td>
                    <td colspan="1">${discriptionData[i].BrandName}</td>
                    <td colspan="1">${discriptionData[i].TktValue}</td>
                    <td colspan="1">${discriptionData[i].Shade}</td>
                    <td colspan="1">${discriptionData[i].ThreadMeter.toFixed(3)}</td>
                    <td colspan="1">${discriptionData[i].ThreadMeterWithQtn.toFixed(3)}</td>
                    <td colspan="1">${discriptionData[i].RequredCone}</td>
                    <td colspan="1">${discriptionData[i].ThreadWithProductQtnCone}</td>
                    
                    </tr>`;
            }
            html += `<tr><td colspan="5"> <b>Total</b></td>
                    <td colspan="1"><b>${(GetTotalThreadMeter(discriptionData)).toFixed(3)}</b></td>
                    <td colspan="1"><b>${GetTotalThreadMeterWithQtn(discriptionData)}</b></td>
                    <td colspan="1"><b>${GetTotalRequredCone(discriptionData)}</b></td>
                    <td colspan="1"><b>${GetTotalThreadWithProductQtnCone(discriptionData)}</b></td></tr>`;

            html += `</tbody></table>`;
            html += '<div class="row" style="text-align:center">';
            html += '<input id ="pdfButton" type="button" value="pdf Generate" class="btn btn-primary" onclick="GeneratePdfFile()"/>';
            html += '<input id="downloadLink" onclick="exportF2()" type="button" value="Export to excel" class="btn btn-primary"/>';
            html += '</div >';

            $('#showBrandDiv').empty();
            $("#showBrandDiv").html(html);

        }
    };

    var responseData = CallServerMethod('Get', route, input, 'false', machineValueResponse);
}

function GetTotalThreadMeter(discriptionData) {
    var totalThreadMeter = parseFloat(0);
    for (let i = 0; i < discriptionData.length; i++) {
        totalThreadMeter = parseFloat(totalThreadMeter) + parseFloat(discriptionData[i].ThreadMeter.toFixed(3));
    }
    return totalThreadMeter;
}
function GetTotalThreadMeterWithQtn(discriptionData) {
    var threadMeterWithQtn = parseFloat(0);
    for (let i = 0; i < discriptionData.length; i++) {
        threadMeterWithQtn = parseFloat(threadMeterWithQtn) + parseFloat(discriptionData[i].ThreadMeterWithQtn.toFixed(3));
    }
    return threadMeterWithQtn;
}
function GetTotalRequredCone(discriptionData) {
    var totalRequredCone = parseFloat(0);
    for (let i = 0; i < discriptionData.length; i++) {
        totalRequredCone = parseFloat(totalRequredCone) + parseFloat(discriptionData[i].RequredCone);
    }
    return totalRequredCone;
}
function GetTotalThreadWithProductQtnCone(discriptionData) {
    var ThreadWithProductQtnCone = parseFloat(0);
    for (let i = 0; i < discriptionData.length; i++) {
        ThreadWithProductQtnCone = parseFloat(ThreadWithProductQtnCone) + parseFloat(discriptionData[i].ThreadWithProductQtnCone);
    }
    return ThreadWithProductQtnCone;
}

function reloadfunction() {
    location.reload();
}

function GeneratePdfFile() {
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };

    doc.fromHTML($('#pdfDiv').html(), 15, 15, {
        'width': 170,
        'elementHandlers': specialElementHandlers
    });
    doc.save('sample-file.pdf');
}

function exportF() {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#excellDiv').html()));
    e.preventDefault();
}
function exportF2() {
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent($('#pdfDiv').html()));
    e.preventDefault();
}

function InitialChange() {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));

    var customerId = threadOrderRequestModel.CustomerId;

    $('#customerSelect').val(customerId);
    $('#customerDivisionSelect').val('0');
    $('#seasonText').val(threadOrderRequestModel.SeasonName);
    $('#styleNumberText').val(threadOrderRequestModel.StyleNumber);
    $('#sitePlantSelect').val(threadOrderRequestModel.SitePlant);
    $('#fabricWeightSelect').val(threadOrderRequestModel.FabricWeight);
    $('#soNumberText').val(threadOrderRequestModel.SalesNumber);
    $('#sampleDateText').val(threadOrderRequestModel.SampleDate);
    $('#sizeText').val(threadOrderRequestModel.Size);
    $('#colorText').val(threadOrderRequestModel.Color);
    $('#wastagePercentageText').val(threadOrderRequestModel.Wastage);
    $('#productCategoryText').val(threadOrderRequestModel.ProductCategory);
    $('#inqueryNoText').val(threadOrderRequestModel.InqueryNo);
    $('#sampleStageText').val(threadOrderRequestModel.SampleStage);


}

function SaveNewInitialValue() {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));


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
    if ($("#wastagePercentageText").val() != '') {
        wastagePercentage = $("#wastagePercentageText").val();
    }

    let orderQuantity = 1;

    let customerName = $("#customerSelect option:selected").text();
    let customerDivisionName = $("#customerDivisionSelect option:selected").text();
    let sitePlantName = $("#sitePlantSelect option:selected").text();
    let fabricWeightName = $("#fabricWeightSelect option:selected").text();


    threadOrderRequestModel.CustomerId = parseInt(customerId),
        threadOrderRequestModel.CustomerName = customerName,
        threadOrderRequestModel.CustomerDivision = parseInt(customerDivision),
        threadOrderRequestModel.CustomerDivisionName = customerDivisionName,
        threadOrderRequestModel.SeasonName = seasonName,
        threadOrderRequestModel.StyleNumber = styleNumber.toUpperCase(),
        threadOrderRequestModel.SampleStage = sampleStage,
        threadOrderRequestModel.SampleDate = sampleDate,
        threadOrderRequestModel.SitePlant = parseInt(sitePlant),
        threadOrderRequestModel.SitePlantName = sitePlantName,
        threadOrderRequestModel.FabricWeight = parseInt(fabricWeight),
        threadOrderRequestModel.FabricWeightName = fabricWeightName,
        threadOrderRequestModel.SalesNumber = salesNumber,
        threadOrderRequestModel.Size = size.toUpperCase(),
        threadOrderRequestModel.Color = color,
        threadOrderRequestModel.ProductCategory = productCategory,
        threadOrderRequestModel.OrderQuantity = parseInt(orderQuantity),
        threadOrderRequestModel.InqueryNo = inqueryNo.toUpperCase(),
        threadOrderRequestModel.Wastage = parseInt(wastagePercentage)

    let requestModel = JSON.stringify(threadOrderRequestModel);
    localStorage.setItem('ThreadOrderRequestModel', requestModel);

    $('#customerSelect').val('0');
    $('#customerDivisionSelect').val('0');
    $('#seasonText').val('');
    $('#styleNumberText').val('');
    $('#sitePlantSelect').val('0');
    $('#fabricWeightSelect').val('0');
    $('#soNumberText').val('');
    $('#sizeText').val('');
    $('#colorText').val('');
    $('#productCategoryText').val('');
    $('#inqueryNoText').val('');
    $('#sampleDateText').val('');
    $('#sampleStageText').val('');
    $('#wastagePercentageText').val('');

    LoadAllMachineCodeValue();

}


function OperationChange(index) {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
   
    $('#indexHiddenValue').val(index);
    $('#operationDescriptionText').val(threadOrderRequestModel.OperationModel[index].OperationDescription);
    $('#machineQuantityText').val(threadOrderRequestModel.OperationModel[index].MachineQuantity);
    $('#rowText').val(threadOrderRequestModel.OperationModel[index].StitchRow);
    $('#stitchQtnText').val(threadOrderRequestModel.OperationModel[index].StitchQtn);
    $('#bightText').val(threadOrderRequestModel.OperationModel[index].Bight);
    $('#stitchRateText').val(threadOrderRequestModel.OperationModel[index].StitchRate);
    $('#seamLengthText').val(threadOrderRequestModel.OperationModel[index].SeamLength);
    
}

function descriptionChange(i, j) {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
    

    $('#operationIndexHiddenValue').val(i);
    $('#descriptionIndexHiddenValue').val(j);

    $('#brandSelect').val(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].BrandId);
    $('#tktSelect').val(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].TktValue);
    $('#packageSelect').val(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package);
    $('#shadeText').val(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Shade);

  

}

function setNewdescriptionValue() {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));

    var operationindex = $('#operationIndexHiddenValue').val();
    var descriptionindex = $('#descriptionIndexHiddenValue').val();
    let brandId = $('#brandSelect').val();
    let brandName = $('#brandSelect option:selected').text();
    let tktValue = $('#tktSelect').val();
    let packageValue = $('#packageSelect').val();
    let shade = $('#shadeText').val();

    threadOrderRequestModel.OperationModel[operationindex].DiscriptionModel[descriptionindex].BrandId = parseInt(brandId);
    threadOrderRequestModel.OperationModel[operationindex].DiscriptionModel[descriptionindex].BrandName = brandName;
    threadOrderRequestModel.OperationModel[operationindex].DiscriptionModel[descriptionindex].TktValue = parseInt(tktValue);
    threadOrderRequestModel.OperationModel[operationindex].DiscriptionModel[descriptionindex].Package = parseInt(packageValue);
    threadOrderRequestModel.OperationModel[operationindex].DiscriptionModel[descriptionindex].Shade = shade;


    let requestModel = JSON.stringify(threadOrderRequestModel);
    localStorage.setItem('ThreadOrderRequestModel', requestModel);

    $('#operationIndexHiddenValue').val('');
    $('#descriptionIndexHiddenValue').val('');
    $('#brandSelect').val('0');
    $('#tktSelect').val('0');
    $('#packageSelect').val('0');
    $('#shadeText').val('');

    LoadAllMachineCodeValue();

}


function SetNewOperationValue() {
    var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
    var index = $('#indexHiddenValue').val();
    var MachineQuantity = $('#machineQuantityText').val();
    var StitchRow = $('#rowText').val();
    var StitchQtn = $('#stitchQtnText').val();
    var Bight = $('#bightText').val();
    var StitchRate = $('#stitchRateText').val();
    var SeamLength = $('#seamLengthText').val();
    var OperationDescription = $('#operationDescriptionText').val();

    threadOrderRequestModel.OperationModel[index].OperationDescription = OperationDescription;
    threadOrderRequestModel.OperationModel[index].MachineQuantity = MachineQuantity;
    threadOrderRequestModel.OperationModel[index].StitchRow = StitchRow;
    threadOrderRequestModel.OperationModel[index].StitchQtn = StitchQtn;
    threadOrderRequestModel.OperationModel[index].StitchRate = StitchRate;
    threadOrderRequestModel.OperationModel[index].Bight = Bight;
    threadOrderRequestModel.OperationModel[index].SeamLength = SeamLength;
    if (threadOrderRequestModel.OperationModel[index].DiscriptionModel.length > 0) {
        for (var j = 0; threadOrderRequestModel.OperationModel[index].DiscriptionModel.length > j; j++) {

            threadOrderRequestModel.OperationModel[index].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[index].Bight;
            threadOrderRequestModel.OperationModel[index].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[index].StitchRate;
            threadOrderRequestModel.OperationModel[index].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[index].StitchQtn;
        }
    }


    
    let requestModel = JSON.stringify(threadOrderRequestModel);
    localStorage.setItem('ThreadOrderRequestModel', requestModel);

    $('#indexHiddenValue').val('');
    $('#machineQuantityText').val('');
    $('#rowText').val('');
    $('#stitchQtnText').val('');
    $('#bightText').val('');
    $('#stitchRateText').val('');
    $('#seamLengthText').val('');
    $('#operationDescriptionText').val('');
    LoadAllMachineCodeValue();
}

function ThreadBrandLoad() {
    var route = apiPath + "api/entry/getallbrand";
    var input = "";

    var brandResponse = function (data) {
        var output = '';
        output += '<option value= 0 >' + 'Select Brand' + '</option>';
        for (var loop = 0; loop < data.length; loop++) {

            output += '<option value=' + data[loop].BrandId + '>' + data[loop].Brand + '</option>';
        }



        $('#brandSelect').empty();
        $('#brandSelect').append(output);



    };
    var responseData = CallServerMethod('Post', route, input, 'false', brandResponse);

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



function LoadForExcell() {
    var route = apiPath + "api/threadorder/LoadAllMachineCodeValue";
    var input = "";

    var machineValueResponse = function (data) {
        
        let count = 1;
        var threadOrderRequestModel = JSON.parse(localStorage.getItem('ThreadOrderRequestModel'));
       
        var htmldesign = '';
        var DiscriptionTable = [];
        var today = new Date();
        var currentdate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

        if (threadOrderRequestModel != null && data != null) {
            htmldesign = `<div class='card-header'>
                            <h3>Single Garment Consumption</h3>
                          </div>`;
            htmldesign += `<div class='card-body'>`;
            htmldesign += `<div class='row'>`;
            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Date : ${currentdate}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Customer Name : ${threadOrderRequestModel.CustomerName} (${threadOrderRequestModel.CustomerDivisionName})`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Season : ${threadOrderRequestModel.SeasonName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Style Number : ${threadOrderRequestModel.StyleNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Category : ${threadOrderRequestModel.ProductCategory}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Product Qtn : ${threadOrderRequestModel.OrderQuantity}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Date : ${threadOrderRequestModel.SampleDate}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Sample Stage : ${threadOrderRequestModel.SampleStage}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Site Plant : ${threadOrderRequestModel.SitePlantName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Fabric Weight : ${threadOrderRequestModel.FabricWeightName}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `So Number: ${threadOrderRequestModel.SalesNumber}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Size: ${threadOrderRequestModel.Size}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Color: ${threadOrderRequestModel.Color}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Inquery No: ${threadOrderRequestModel.InqueryNo}`;
            htmldesign += `</div>`;

            htmldesign += `<div class='row'>`;
            htmldesign += `Wastage: ${threadOrderRequestModel.Wastage / 100}`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;

            htmldesign += `<div class='col-md-4'>`;
            htmldesign += `</div>`;

            htmldesign += `</div>`;
            htmldesign += `</div>`;


            htmldesign += `<div class='row'>`;
            if (threadOrderRequestModel.OperationModel.length > 0) {

                htmldesign += `<table class='table table-bordered' border=1><thead><tr>
                    <th> No.</th >
                        <th>Operation</th>
                        <th>Length(cm)</th>
                        <th>SP(3cm)</th>
                        <th>Bight</th>
                        <th>Bartack Quantity</th>
                        <th>Stitch</th>
                        <th>Machine Qtn</th>
                        <th>Row</th>
                        <th>Brand</th>
                        <th>Tkt/Tex</th>
                        <th>Package</th>
                        <th>Shade</th>
                        <th>Thread(cm)</th>
                        <th>Per Garments Thread(m) </th>
                        <th>Thread(m) With Wastage</th>
                        <th>Actual Cone</th>
                        <th>Actual Round Cone</th>
                        <th>Line Feeding Cone</th>
                        <th>Unused Thread</th>
                        
        </tr></thead> <tbody>`;
                for (var i = 0; threadOrderRequestModel.OperationModel.length > i; i++) {

                    htmldesign += `<tr>
                    <td><b>${count++}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].OperationDescription}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].SeamLength}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRate}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].Bight}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchQtn}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchTypeName}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].MachineQuantity}</b></td>
                    <td><b>${threadOrderRequestModel.OperationModel[i].StitchRow}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    
                    </tr>`;

                    if (threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > 0) {
                        for (var j = 0; threadOrderRequestModel.OperationModel[i].DiscriptionModel.length > j; j++) {
                            htmldesign += `<tr>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationName}</td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td></td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].BrandName}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].TktValue}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package}</td>
                                           <td>${threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Shade}</td>`;

                            for (var k = 0; data.length > k; k++) {


                                if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].SPI == threadOrderRequestModel.OperationModel[i].StitchRate
                                    && data[k].Bight == threadOrderRequestModel.OperationModel[i].Bight
                                    && data[k].MachineCode != '3015'
                                ) {
                                    var coneQtn = 0;
                                    var actualCone = parseFloat(0);
                                    var threadMeter = parseFloat(0);
                                    var threadWithWastage = parseFloat(0);
                                    var WastagePrecentage = parseFloat(threadOrderRequestModel.Wastage / 100);

                                    if (threadOrderRequestModel.OperationModel[i].StitchRate > 0 && threadOrderRequestModel.OperationModel[i].StitchQtn == 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength).toFixed(3)}</td>`;

                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].SeamLength) / 100).toFixed(3));
                                        htmldesign += `<td>${(threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${(threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow).toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);


                                        htmldesign += `<td>${actualCone * threadOrderRequestModel.OperationModel[i].StitchRow}</td>`;


                                        //Cone calculation
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                       
                                        coneQtn = data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity * threadOrderRequestModel.OperationModel[i].StitchRow;

                                        threadMeter = threadMeter * threadOrderRequestModel.OperationModel[i].StitchRow;
                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - (threadWithWastage * threadOrderRequestModel.OperationModel[i].StitchRow)).toFixed(3)}</td>`;



                                    }
                                    else if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        

                                        ////Cone calculation
                                        
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                       
                                        coneQtn = cone * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;


                                    }

                                    else {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;



                                        //Cone calculation
                                        
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        coneQtn = data[k].MachineWiseConeReq * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((cone * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;
                                        

                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(0);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;
                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);

                                }
                                else if (data[k].MachineCode == threadOrderRequestModel.OperationModel[i].MachineCode
                                    && data[k].StitchTypeId == threadOrderRequestModel.OperationModel[i].StitchType
                                    && data[k].OperationId == threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationId
                                    && data[k].MachineCode == '3015'
                                ) {
                                    if (threadOrderRequestModel.OperationModel[i].StitchRate == 0 && threadOrderRequestModel.OperationModel[i].StitchQtn > 0) {
                                        htmldesign += `<td>${(data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn).toFixed(3)}</td>`;
                                        threadMeter = parseFloat(((data[k].UnitValuePerCm * threadOrderRequestModel.OperationModel[i].StitchQtn * threadOrderRequestModel.OperationModel[i].StitchRow) / 100).toFixed(3));
                                        htmldesign += `<td>${threadMeter.toFixed(2)}</td>`;
                                        WastagePrecentage = WastagePrecentage * threadMeter;
                                        threadWithWastage = parseFloat(threadMeter + WastagePrecentage);
                                        htmldesign += `<td>${threadWithWastage.toFixed(2)}</td>`;

                                        //ActualCone
                                        actualCone = (threadWithWastage / threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package).toFixed(5);

                                        htmldesign += `<td>${actualCone}</td>`;
                                        var cone = Math.ceil(actualCone);
                                        htmldesign += `<td>${cone}</td>`;
                                        coneQtn = cone * threadOrderRequestModel.OperationModel[i].MachineQuantity;

                                        htmldesign += `<td>${coneQtn}</td>`;
                                        htmldesign += `<td>${((coneQtn * threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Package) - threadMeter).toFixed(3)}</td>`;


                                    }
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].UnitValuePerCm = data[k].UnitValuePerCm;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].RequredCone = coneQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ActualCone = actualCone.toString();
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].Bight = threadOrderRequestModel.OperationModel[i].Bight;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchRate = threadOrderRequestModel.OperationModel[i].StitchRate;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].StitchQtn = threadOrderRequestModel.OperationModel[i].StitchQtn;
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeter = parseFloat(threadMeter);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].ThreadMeterWithQtn = parseFloat(0);
                                    threadOrderRequestModel.OperationModel[i].DiscriptionModel[j].OperationDescription = threadOrderRequestModel.OperationModel[i].OperationDescription;
                                    DiscriptionTable.push(threadOrderRequestModel.OperationModel[i].DiscriptionModel[j]);

                                }


                            }


                            htmldesign += `</tr>`;

                        }

                    }


                }

                htmldesign += `</tbody></table>`;
                htmldesign += `</div>`;

            }
            htmldesign += `</div>`;


            htmldesign += `</div>`;

            htmldesign += `</br></br></br>`;

        }
        $('#showExcellDataDiv').empty();
        $('#showExcellDataDiv').html(htmldesign);



        var finaldata = JSON.stringify(threadOrderRequestModel);
        localStorage.setItem('ThreadOrderRequestModel', finaldata);


        var discriptionData = BrandThreadCalculation(DiscriptionTable);
        discriptionData = MargeBrandCalculatedData(discriptionData);

        if (discriptionData != null) {
            let count = 1;
            let html = "";


            html += `<table class='table table-bordered' border=1><thead><tr>
                         <th colspan="1">No.</th>
                         <th colspan="1">Operation Description</th>
                         <th colspan="1">Brand</th>
                         <th colspan="1">Tkt/Tex</th>
                         <th colspan="1">Shade</th>
                         <th colspan="1">Thread(m)</th>
                         <th colspan="1">Required Cone</th>
                         </tr></thead><tbody>`;
            for (let i = 0; i < discriptionData.length; i++) {
                html += `<tr>
                    <td colspan="1">${count++}</td>
                    <td colspan="1">${discriptionData[i].OperationDescription}</td>
                    <td colspan="1">${discriptionData[i].BrandName}</td>
                    <td colspan="1">${discriptionData[i].TktValue}</td>
                    <td colspan="1">${discriptionData[i].Shade}</td>
                    <td colspan="1">${discriptionData[i].ThreadMeter.toFixed(3)}</td>
                    <td colspan="1">${discriptionData[i].RequredCone}</td>
                    </tr>`;
            }
            html += `<tr><td colspan="5"> <b>Total</b></td>
                    <td colspan="1"><b>${(GetTotalThreadMeter(discriptionData)).toFixed(3)}</b></td>
                    <td colspan="1"><b>${GetTotalRequredCone(discriptionData)}</b></td>
                    </tr>`;

            html += `</tbody></table>`;



            $('#showExcellBrandDiv').empty();
            $("#showExcellBrandDiv").html(html);

        }
    };

    var responseData = CallServerMethod('Get', route, input, 'false', machineValueResponse);
}


function BrandThreadCalculation(DiscriptionTable) {

    for (var innerloop = 0; innerloop < DiscriptionTable.length; innerloop++) {

        var nameObjectList = Enumerable.From(DiscriptionTable).Where(function (x) {
            return x.OperationDescription === DiscriptionTable[innerloop].OperationDescription
                && x.BrandName === DiscriptionTable[innerloop].BrandName
                && x.TktValue === DiscriptionTable[innerloop].TktValue
                && x.Shade === DiscriptionTable[innerloop].Shade;
        }).Select(function (y) { return y.OperationName; }).ToArray();

        var newOperationName = nameObjectList.join();
        if (DiscriptionTable[innerloop]['OperationName'] != '' && DiscriptionTable[innerloop]['OperationName'] != undefined)
            DiscriptionTable[innerloop]['NewName'] = DiscriptionTable[innerloop]['OperationDescription'] + '(' + newOperationName+ ')';
    }
    
    console.log(DiscriptionTable);
    var discriptionData = Enumerable.From(DiscriptionTable)
        .Where("$.BrandName != null")
        .GroupBy(
            "{ BrandName: $.BrandName , TktValue: $.TktValue, Shade: $.Shade,NewName:$.NewName }",
            null,
            "{ BrandName: $.BrandName, TktValue: $.TktValue,Shade: $.Shade,NewName:$.NewName, ThreadMeter: $$.Sum('$.ThreadMeter'), RequredCone: $$.Sum('$.RequredCone'),ThreadWithProductQtnCone:$$.Sum('$.ThreadWithProductQtnCone'),ThreadMeterWithQtn:$$.Sum('$.ThreadMeterWithQtn') }",
            "$.BrandName + ' ' + $.TktValue+ ' ' + $.Shade + ' ' + $.NewName") // this must be included
        .ToArray();

    
    return discriptionData;
}



function MargeBrandCalculatedData(requestData) {
    

    var newRequestData = [];
    if (requestData.length > 0) {
        for (var i = 0; i < requestData.length; i++) {

            var newDiscriptionData = {
                slNO: 0,
                BrandName: '',
                TktValue: parseInt(0),
                Shade: '',
                OperationDescription: '',
                ThreadMeter: parseFloat(0.00),
                RequredCone: parseInt(0),
                ThreadWithProductQtnCone: parseInt(0),
                ThreadMeterWithQtn: parseInt(0)
            };

            newDiscriptionData.slNO = i + 1;
            newDiscriptionData.BrandName = requestData[i].BrandName;
            newDiscriptionData.TktValue = requestData[i].TktValue;
            newDiscriptionData.Shade = requestData[i].Shade
            newDiscriptionData.OperationDescription = requestData[i].NewName;
            newDiscriptionData.ThreadMeter = requestData[i].ThreadMeter;
            newDiscriptionData.RequredCone = requestData[i].RequredCone;
            newDiscriptionData.ThreadWithProductQtnCone = requestData[i].ThreadWithProductQtnCone;
            newDiscriptionData.ThreadMeterWithQtn = requestData[i].ThreadMeterWithQtn;

            newRequestData.push(newDiscriptionData);
        }
    }


    let responseData = [];

    if (newRequestData.length > 0)
        responseData.push(newRequestData[0]);
    for (var loop = 1; loop < newRequestData.length; loop++) {
        var checkFlag = 0;

        var check = Enumerable.From(responseData).Where(function (x) {
            return x.BrandName === newRequestData[loop].BrandName
                && x.TktValue === newRequestData[loop].TktValue
                && x.Shade === newRequestData[loop].Shade;
        }).ToArray();


        //slNO ay name  e ekta property list push korar push niye asis .db  thake dorkar nay just c# push kore hobe client e check er jonno. oita eikhanei kora jabe 



        for (var checkLoop = 0; checkLoop < responseData.length; checkLoop++) {
            if (check && check.length > 0 && responseData[checkLoop].slNO === check[0].slNO) {
                responseData[checkLoop].OperationDescription += ',<br/>' + newRequestData[loop].OperationDescription;
                responseData[checkLoop].ThreadMeter += newRequestData[loop].ThreadMeter;
                responseData[checkLoop].RequredCone += newRequestData[loop].RequredCone;
                responseData[checkLoop].ThreadWithProductQtnCone += newRequestData[loop].ThreadWithProductQtnCone;
                responseData[checkLoop].ThreadMeterWithQtn += newRequestData[loop].ThreadMeterWithQtn;
                break;
            }
        }
       
        if (check.length === 0) {
            responseData.push(newRequestData[loop]);
        }

    }

    return responseData;
}