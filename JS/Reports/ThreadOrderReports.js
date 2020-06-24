function getThreadOrderReport() {
    let customerId = 0;
    let customerDivitionId = 0;
    let styleNumber = '';
    let fromDate = '';
    let toDate = '';

    customerId = $('#customerSelect').val();
    customerDivitionId = $('#customerDivisionSelect').val();
    styleNumber = $('#styleNumberText').val();
    fromDate = $('#fromDateText').val();
    toDate = $('#toDateText').val();

    let threadOrderReportBodyModel = {
        CustomerId: parseInt(customerId),
        CustomerDivision: parseInt(customerDivitionId),
        StyleNumber: styleNumber.toUpperCase(),
        FromDate: fromDate,
        ToDate: toDate
    };


    var input = JSON.stringify(threadOrderReportBodyModel);
    var route = apiPath + "api/reports/GetThreadOrderReport";

    var threadReportResponse = function (data) {
        //console.log(data);
        let count = 1;
        let html = "";
        
        html += `<table class='table table-bordered' border=1><thead><tr>
        <th>No.</th>
        <th>Customer Name</th>
        <th>Customer Division</th>
        <th>Season Name</th>
        <th>Style Number</th>
        <th>Sample Stage</th>
        <th>Sample Date</th>
        <th>Site Plant</th>
        <th>Fabric Weight</th>
        <th>Sales Number</th>
        <th>Size</th>
        <th>Color</th>
        <th>Product Category</th>
        <th>Wastage</th>
        <th>Posted On</th>
        <th>Posted By</th>
        <th>Action</th>
        </tr></thead><tbody>`;
        for (let i = 0; i < data.length; i++) {
            html += `<tr>
                    <td>${count++}</td>
                    <td>${data[i].CustomerName}</td>
                    <td>${data[i].CustomerDivisionName}</td>
                    <td>${data[i].SeasonName}</td>
                    <td>${data[i].StyleNumber}</td>
                    <td>${data[i].SampleStage}</td>
                    <td>${data[i].SampleDate}</td>
                    <td>${data[i].SitePlantName}</td>
                    <td>${data[i].FabricWeightName}</td>
                    <td>${data[i].SalesNumber}</td>
                    <td>${data[i].Size}</td>
                    <td>${data[i].Color}</td>
                    <td>${data[i].ProductCategory}</td>
                    <td>${data[i].Wastage}</td>
                    <td>${data[i].PostedOn}</td>
                    <td>${data[i].PostedBy}</td>
                    <td><span class='btn btn-info' onclick='getThreadOrderDetailsReport(${data[i].ThreadOrderId})'>View Details</span></td>
                    </tr>`;
        }

        html += `</tbody></table></div>`;

        $("#reportDiv").empty();
        $("#reportDiv").html(html);

    };
    var responseData = CallServerMethod('Post', route, input, 'false', threadReportResponse);

}

function getThreadOrderDetailsReport(threadOrderId) {
    console.log(threadOrderId);
}