//control de botón "atrás" en teléfono 
function onDeviceReady() {
    document.addEventListener("backbutton", handleBackButton, true);
}
function handleBackButton() {
    if ($.mobile.activePage.attr('id') === '#pista2'
            || $.mobile.activePage.attr('id') === '#pista3' || $.mobile.activePage.attr('id') === '#pista4' || $.mobile.activePage.attr('id') === '#creden' || $.mobile.activePage.attr('id') === '#bandinf') {
        navigator.app.exitApp();
    } else if ($.mobile.activePage.attr('id') === '#confirmReini') {
        $.mobile.changePage('#terminal');
    } else {
        navigator.app.backHistory();
    }
}
document.addEventListener("deviceready", onDeviceReady, false);
//fin 

//limpiar cache
document.addEventListener('deviceready', function() {
    var success = function(status) {
        alert('Message: ' + status);
    };
    var error = function(status) {
        alert('Error: ' + status);
    };
    window.CacheClear(success, error);
    
//    cordova plugin add cordova-plugin-cache-clear
});


var numTerm = null;
var idTerm = null;
var nombreTerm = "*";

$(document).on("pageinit", function () {
    //instancio panel panel_lateral
    $("#panel_lateral").panel().enhanceWithin();
});

//quitar del DOM al contenedor de video, evito que continue solicitando imágenes
$(document).on("pagebeforeshow", ".menuItem", function () {
    $("#divVideo").empty();
});

$(document).on("click", ".detalles", function () {
    numTerm = $(this).data("num");
    idTerm = $(this).data("id");
    nombreTerm = $(this).data("nombre");

    $("#titulo").empty();
    $("#titulo").append(nombreTerm);


//  *** carga de video ***
    $("#divVideo").append("<img name='imagename' id='videoImg' alt='* sin video *' class='coveredImage' src='http://125.125.10.1" + numTerm + "/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1" + numTerm + "/api/lastframe.cgi?\\'+new Date().getMilliseconds()\',300)\">");

    $(":mobile-pagecontainer").pagecontainer("change", "#terminal");

});

//apertura
$(document).on("click", "#btn_abrir", function () {
    $.mobile.loading("show", {
        text: "conectando..",
        textVisible: true
    });

    $.ajax({
        url: "http://125.125.10." + numTerm + "/pdv",
        data: {abrirCancela: idTerm},
        type: "GET",
        dataType: "text/xml",
        timeout: 2500,
        sucess: function () {
            $.mobile.loading("hide");
            $.mobile.toast({
                message: "Abrió la barrera",
                classOnOpen: "success_msg"
            });
        },
        error: function (response) { //code 412, "precondition failed", sin presencia de vehículo
            $.mobile.loading("hide");
            $.mobile.toast({
                message: "No hay vehículo",
                classOnOpen: "error_msg"
            });
        }
    });
});

$(document).on("pageinit", "#terminal", function () {
    $("#btn_reini").click(function () {
        $.mobile.changePage("#confirmReini", {role: "dialog"});
    });
});

$(document).on("pagebeforeshow", "#confirmReini", function () {
    $("#spanReini").empty();
    $("#spanReini").append("desea reiniciar " + nombreTerm + "?");
});

$(document).on("pageinit", "#confirmReini", function () {
    $("#btn_confirm").click(function () {
        $.mobile.loading("show", {
            text: "conectando..",
            textVisible: true
        });

        $.ajax({
            url: "http://125.125.10." + numTerm + "?ReiniciarComp",
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
            complete: function () {
//                
//                $.mobile.toast({
//                    message: "",
//                    classOnOpen: ""
//                });
//                $(".confirmReini").dialog("close");
            }
        });
    });
});

//$(document).on("click", ".toHome", function(){
//   $(":mobile-pagecontainer").pagecontainer("change", "#pista4"); 
//});


//$(document).on("#terminal", "pagebeforeshow", function () {
//    $("#btn_cancel").click(function () {
//        $("#confirmReini").dialog("close");
//    });
//});


// $(document).on("pagebeforeshow", "#historial", function(){
// var num = $("#numTerminal").val();
// var registros = document.getElementsByName("lblEventos").val();
// $("#info").empty();
// $("#info").append("http://125.125.10."+num+"#lbEventos");
// });


//https://code.tutsplus.com/es/tutorials/http-headers-for-dummies--net-8039
//https://jqmtricks.wordpress.com/2014/12/01/detect-back-navigation/#more-553

//https://ctrlzapps.wordpress.com/2013/05/13/controlar-el-boton-volver-atras-en-phonegap/