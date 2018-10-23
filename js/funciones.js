
$(document).on("pageinit", function(){
  //instancio panel panel_lateral
  $("#panel_lateral").panel().enhanceWithin();
});

//quitar del DOM al contenedor de video, evito que continue solicitando imágenes
$(document).on("pagebeforeshow", "#entradas", function(){
	$("#divVideo").empty();
});
$(document).on("pagebeforeshow", "#salidas", function(){
	$("#divVideo").empty();
});


$(document).on("click", ".detalles", function(){
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
  
  //*** funca ***
  $("#divVideo").append("<img name='imagename' id='videoImg' alt='* sin video *' class='coveredImage' src='http://125.125.10.1"+num+"/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1"+num+"/api/lastframe.cgi?\\'+new Date().getMilliseconds()\', 300)\">");
  

  $(":mobile-pagecontainer").pagecontainer("change","#terminal");
});

//$(document).on("pageinit", "#terminal", function(){
//    $.mobile.loading("show",{
//        text:"cargando...",
//        textVisible:true,
//        theme: "z",
//        html:""
//    });
//});

//$(document).on("pageinit", "#terminal", function(){    
//    $("#btn_hist").click(function(){
//            var num = $(this).data("num");
//            var url = "http://125.125.10."+num;
//
//            $.mobile.toast({
//                message:"acción correcta",
//                classOnOpen:"success_msg"
//            });
////		$(":mobile-pagecontainer").pagecontainer("change", url);
//    });
//});

//apertura
$(document).on("pageinit", "#terminal", function(){
    $("#btn_abrir").click(function(){
        var num = $(this).data("num");
        var id = $(this).data("id");
        var url = "http://125.125.10."+num+"/pdv";

        $.ajax({
            url:url,
            data:{abrirCancela : id},
            type:'GET',
            dataType:'text/xml',
            timeout: 2000,
            success: function(status){
                $.mobile.toast({
                    message:"Abrió la barrera",
                    classOnOpen:"success_msg"
                });
            },
            error: function(response, status){
                console.log(status);
                if(status==="timeout") {
                    $.mobile.toast({
                        message:status,
                        classOnOpen:"error_msg"
                    });
                } else {
                    if(status==="error") {
                        $.mobile.toast({
                            message:"no hay vehículo",
                            classOnOpen:"error_msg"
                        });
                    }
                }
            }
        });
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
