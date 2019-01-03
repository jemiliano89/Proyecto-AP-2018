//control de botón "atrás" en teléfono
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
$(document).on("pagebeforeshow", "#entradas", function () {
    $("#divVideo").empty();
    $("#btn_abrir").attr("data-id", "");
    $("#btn_abrir").attr("data-num", "");
});
$(document).on("pagebeforeshow", "#salidas", function () {
    $("#divVideo").empty();
    $("#btn_abrir").attr("data-id", "");
    $("#btn_abrir").attr("data-num", "");
});


$(document).on("click", ".detalles", function () {
    $("#btn_abrir").attr("data-id", "");
    $("#btn_abrir").attr("data-num", "");
    var id = $(this).data("id");
    var nombre = $(this).data("nombre");
    var num = $(this).data("num");

    $("#titulo").empty();
    $("#titulo").append(nombre);

//  $("#btn_hist").attr("data-num", num);
//  $("#btn_hist").attr("data-nombre", nombre);
    $("#btn_abrir").attr("data-id", id);
    $("#btn_abrir").attr("data-num", num);

//  $.ajax({
//    url:"http://125.125.10.1"+num+"/api/lastframe.cgi?",
//    type:'GET',
//    dataType:'image/jpeg',
//    timeout: 1500,
//    success: function(status){
//        $("#divVideo").append("<img name='imagename' id='videoImg' alt='* sin video *' class='coveredImage' src='http://125.125.10.1"+num+"/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1"+num+"/api/lastframe.cgi?\\'+new Date().getMilliseconds()\', 200)\">");
//    },
//    error: function(status){
//        $("#divVideo").append("<p>* sin video *</p>");
//    }
////    complete: function(){
////        $.mobile.loading("hide");
////    }
//  });

//  //*** funca ***
    $("#divVideo").append("<img name='imagename' id='videoImg' alt='* sin video *' class='coveredImage' src='http://125.125.10.1" + num + "/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1" + num + "/api/lastframe.cgi?\\'+new Date().getMilliseconds()\',200)\">");


    $(":mobile-pagecontainer").pagecontainer("change", "#terminal");
});

//$(document).on("pageinit", "#terminal", function(){
//    $.mobile.loading("show",{
//        text:"cargando...",
//        textVisible:true,
//        theme: "z",
//        html:""
//    });
//});


//apertura
$(document).on("pageinit", "#terminal", function () {
    $("#btn_abrir").click(function () {
        var num = $(this).data("num");
        var id = $(this).data("id");
        var url = "http://125.125.10." + num + "/pdv";

        $.ajax({
            url: url,
            data: {abrirCancela: id},
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



        // $.ajax({
        // url:url,
        // data:{abrirCancela : id},
        // type:'connect',
        // dataType:'text/xml',
        // timeout: 2500,
        // success: function(xml){

        // var res = $("res",xml).text();

        // console.log("resultado success:"+res);
        // console.log(XMLHttpRequest.readyState);

        // $.mobile.toast({
        // message:"Abrió la barrera",
        // classOnOpen:"success_msg"
        // });
        // },
        // error: function(xmlrequest, status, response){ 

        // console.log("resultado error: "+ status);
        // console.log(status);

        // if(status ==="error") {
        // $.mobile.toast({
        // message:"no hay vehículo",
        // classOnOpen:"error_msg"
        // });
        // } else {
        // $.mobile.toast({
        // message:"terminal sin conexión",
        // classOnOpen:"error_msg"
        // });
        // }
        // }
        // });
    });
});




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