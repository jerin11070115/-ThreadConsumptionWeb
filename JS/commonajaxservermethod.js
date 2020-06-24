function CallServerMethod(methodType, url, dataInput, boolAsync, callBack) {


    $.ajax({
        type: methodType,
        url: url.toLowerCase(),
        beforeSend: function () {
            //$('.loader').show();
            //$('#page-blur').show();
        },
        contentType: "application/json; charset=utf-8",
      //  crossDomain: true,
        dataType: "json",
        data: dataInput,
        complete: function () {
            //$('.loader').hide();
            //$('#page-blur').hide();
        },
        success: callBack,
        error: function (xhr, textStatus, errorThrown) {
            //$('.loader').hide();
            //$('#page-blur').hide();
            if (xhr.status == 401) {
                window.location.replace("adminhome.html");
            }
        }
    });
}
