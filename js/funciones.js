
$(document).on("pageinit", function(){
  //instancio panel panel_lateral
  $("#panel_lateral").panel().enhanceWithin();
});

//quitar del DOM al contenedor de video
$(document).on("pagebeforeshow", "#entradas", function(){
	$("#divVideo").empty();
});
$(document).on("pagebeforeshow", "#salidas", function(){
	$("#divVideo").empty();
});

// $(document).on("pagebeforeshow", "#terminal", function(){
	// var id = $("#btn_hist").data("num");
	// var nombre = $("#btn_hist").data("nombre");
// });

$(document).on("click", ".detalles", function(){
  var id = $(this).data("id");
  var nombre = $(this).data("nombre");
  var num = $(this).data("num");
  
  $("#titulo").empty();
  $("#titulo").append(nombre);
  
  $("#btn_hist").attr("data-num", num);
  $("#btn_hist").attr("data-nombre", nombre);
  $("#btn_abrir").attr("data-id", id);
  $("#btn_abrir").attr("data-num", num);
  
//  $.get("http://125.125.10.1"+num, function(response){
//		if(response.m)
//  })
  
  //*** funca ***
  $("#divVideo").append("<img name='imagename' id='videoImg' alt='video no disponible' class='coveredImage' src='http://125.125.10.1"+num+"/api/lastframe.cgi?' width=80% height=auto onload=\"setTimeout('document.getElementById(\\'videoImg\\').src=\\'http://125.125.10.1"+num+"/api/lastframe.cgi?\\'+new Date().getMilliseconds()\', 150)\">");
  

  $(":mobile-pagecontainer").pagecontainer("change","#terminal");
});

$(document).on("pageinit", "#terminal", function(){
	$("#btn_hist").click(function(){
		var num = $(this).data("num");
		var url = "http://125.125.10."+num;
		// toast = Toast.makeText(this,"Mensaje 2", Toast.LENGTH_SHORT);
        // toast.setGravity(Gravity.CENTER_VERTICAL, 0, 0);
        // toast.show();
		$.post(url, function(response){
			console.log("ffdfdf");
		});
		$.mobile.toast({
            message:"Abrió la barrera",
            classOnOpen:"success_msg"
		})
		
		$(":mobile-pagecontainer").pagecontainer("change", url);
	});
});



// $(document).on("pageinit", "#terminal", function(){
	// $("#btn_abrir").click(function(){
		// $.post("http://125.125.10.20/pdv?abrirCancela=10", function(response){
			
		// })
	// })	
// });




// http://<IP da máquina>/pdv?abrirCancela=<IDCancela>
//http://125.125.10.34/pvd?abrirCancela=15

//para solicitud
// $("#btn_sign_in").click(function(){
        // var url = "http://api.marcelocaiafa.com/signin";
        // var estudiante = $("#input_alumno").val();
        // var password = $("#input_pwd").val();
        // $.post(url, JSON.stringify({estudiante:estudiante,password:password}), function(response){
          // var alumno = response.descripcion;
          // alumno      = JSON.stringify(alumno);
          // sessionStorage.setItem("alumno",alumno);
          // $(":mobile-pagecontainer").pagecontainer("change","#listado_alumnos");
        // });
    // });


// $(document).on("pagebeforeshow", "#historial", function(){
	// var num = $("#numTerminal").val();
	// var registros = document.getElementsByName("lblEventos").val();
	// $("#info").empty();
	// $("#info").append("http://125.125.10."+num+"#lbEventos");
// });
// function cargarVideo(var id){
	
// }
//reiniciar terminal
//?ReiniciarComp
