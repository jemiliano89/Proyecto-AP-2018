//control de botón "atrás" en teléfono  *** falta actualizar ***
function onDeviceReady() {
    document.addEventListener("backbutton", handleBackButton, true);
}
function handleBackButton() {
    if ($.mobile.activePage.attr('id') === '#salidas'
            || $.mobile.activePage.attr('id') === '#salidas') {
        navigator.app.exitApp();
    } else if ($.mobile.activePage.attr('id') === '#terminal') {
        $.mobile.changePage('#salidas');
    } else {
        navigator.app.backHistory();
    }
}
document.addEventListener("deviceready", onDeviceReady, false);
//fin 





$(document).on("pageinit", function () {
    //instancio panel panel_lateral
    $("#panel_lateral").panel().enhanceWithin();
});

//quitar del DOM al contenedor de video, evito que continue solicitando imágenes
$(document).on("pagebeforeshow", "#pista2", function () {
    $("#divVideo").empty();
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
});
$(document).on("pagebeforeshow", "#pista3", function () {
    $("#divVideo").empty();
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
});
$(document).on("pagebeforeshow", "#pista4", function () {
    $("#divVideo").empty();
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
});
$(document).on("pagebeforeshow", "#subsuelo", function () {
    $("#divVideo").empty();
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
});
$(document).on("pagebeforeshow", "#bandinf", function () {
    $("#divVideo").empty();
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
});


$(document).on("click", ".detalles", function () {
    $("#refTerminal").attr("data-id", "");
    $("#refTerminal").attr("data-num", "");
    $("#btn_confirm").attr("data-num", "");

    var num = $(this).data("num");
    $("#titulo").empty();
    $("#titulo").append($(this).data("nombre"));

    $("#refTerminal").attr("data-id", $(this).data("id"));
    $("#refTerminal").attr("data-num", num);
    $("#refTerminal").attr("data-nombre", $(this).data("nombre"));
    $("#btn_confirm").attr("data-num", num);

//  *** carga video ***
    $("#divVideo").append("<img name='imagename' id='videoImg' alt='* sin video *' class='coveredImage' src='http://125.125.10.1" + num + "/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1" + num + "/api/lastframe.cgi?\\'+new Date().getMilliseconds()\',200)\">");

    $(":mobile-pagecontainer").pagecontainer("change", "#terminal");
    
});

//$(document).on("click", ".funcion", function () {
//    $("#btn_confirm").attr("data-num", $("#refTerminal").data("num"));
//});


//apertura
$(document).on("pageinit", "#confirmReini", function () {
    $("#btn_abrir").click(function(){
        $.ajax({
            url: "http://125.125.10." + $("#refTerminal").data("num") + "/pdv",
            data: {abrirCancela: $("#refTerminal").data("id")},
            type: "GET",
            dataType: "text/xml",
            timeout: 2500,
            sucess: function () {
                $.mobile.toast({
                    message: "Abrió la barrera",
                    classOnOpen: "success_msg"
                });
            },
            error: function (response) { //code 412, "precondition failed", sin presencia de vehículo
                $.mobile.toast({
                    message: "Sin presencia de vehículo",
                    classOnOpen: "error_msg"
                });
            }
        });
    });
});

$(document).on("pageinit", "#terminal", function(){
    $("#btn_reini").click(function () {
        $.mobile.changePage("#confirmReini", {role: "dialog"});
    });
});

$(document).on("pagebeforeshow", "#confirmReini", function(){
    $("#btn_confirm").attr("data-num", $("#refTerminal").data("num"));
//    $.mobile.activePage.trigger("refresh");
});


$(document).on("click", "#btn_confirm", function() {
//    $("#btn_confirm").click(function () {
        $.mobile.loading("show", {
            text: "conectando..",
            textVisible: true
        });
        
        $.ajax({
            url: "http://125.125.10." + $("#btn_confirm").data("num") + "?ReiniciarComp",
            type: "POST",
            timeout: 3000,
            success: function () {
                $.mobile.loading("hide");
                $.mobile.toast({
                    message: "terminal reiniciando...",
                    classOnOpen: "success_msg"
                });
            },
            error: function () {
                $.mobile.loading("hide");
                $.mobile.toast({
                    message: "no se pudo reiniciar",
                    classOnOpen: "error_msg"
                });
            },
            complete: function(){
//                
//                $.mobile.toast({
//                    message: mensaje,
//                    classOnOpen: clase
//                });
//                $(".confirmReini").dialog("close");
            }
        });
//    });
});



//$(document).on("#terminal", "pagebeforeshow", function () {
//    $("#btn_cancel").click(function () {
//        $("#confirmReini").dialog("close");
//    });
//});

// http://<IP da máquina>/pdv?abrirCancela=<IDCancela>
//http://125.125.10.34/pvd?abrirCancela=15


// $(document).on("pagebeforeshow", "#historial", function(){
// var num = $("#numTerminal").val();
// var registros = document.getElementsByName("lblEventos").val();
// $("#info").empty();
// $("#info").append("http://125.125.10."+num+"#lbEventos");
// });

//reiniciar terminal
//?ReiniciarComp


//https://code.tutsplus.com/es/tutorials/http-headers-for-dummies--net-8039
//https://jqmtricks.wordpress.com/2014/12/01/detect-back-navigation/#more-553

//https://ctrlzapps.wordpress.com/2013/05/13/controlar-el-boton-volver-atras-en-phonegap/