
//<editor-fold defaultstate="collapsed" desc="INICIALIZA PANEL">
$(document).on("pageinit", function(){
  //instancio panel panel_lateral
  $("#panel_lateral").panel().enhanceWithin();
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="LOGIN">

$(document).on("pageinit", "#sign_in", function(){
    $("#btn_sign_in").click(function(){
        var url = "http://api.marcelocaiafa.com/signin";
        var estudiante = $("#input_alumno").val();
        var password = $("#input_pwd").val();
        $.post(url, JSON.stringify({estudiante:estudiante,password:password}), function(response){
          var alumno = response.descripcion;
          alumno      = JSON.stringify(alumno);
          sessionStorage.setItem("alumno",alumno);
          $(":mobile-pagecontainer").pagecontainer("change","#listado_alumnos");
        });
    });
});
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="LISTADO Y DETALLE">
$(document).on("pageshow", "#listado_alumnos", function(){
    $.mobile.loading("show",{
      text:"Cargando alumnos",
      textVisible:true
    });
});

//cuando me hacen click en un link con la misma clase
$(document).on("click", ".ver_detalle", function(){
  var id = $(this).data("id_alumno");
  var url = "http://api.marcelocaiafa.com/alumno/"+id;
  $.get(url, function(response){
      $("#id_alumno").val(response.descripcion.id);
      $("#nombre").val(response.descripcion.nombre);
      $("#apellido").val(response.descripcion.apellido);
      $(":mobile-pagecontainer").pagecontainer("change","#detalle_alumno");
  });
});

$(document).on("pagebeforeshow", "#listado_alumnos", function(){
  //string alumno con formato JSON.
  var alumno = sessionStorage.getItem("alumno");
  //vuelvo a convertir objeto.
  //{nombre:juan,apellido:perez}
  alumno     = JSON.parse(alumno);
  $("#saludo").text("Hola "+alumno.nombre+" "+alumno.apellido);
  //cargo lista de Alumnos
  var url = "http://api.marcelocaiafa.com/alumno";
  $("#ul_list_view").empty();
  $.get(url, function(response){
      $.each(response.descripcion, function(key,alumno){
          $("#ul_list_view").append('<li><a href="#" class="ver_detalle" data-id_alumno='+alumno.id+'><h2>'+alumno.nombre+' '+alumno.apellido+'</h2><p>'+alumno.estudiante+'</p></a></li>');
      });
      $("#ul_list_view").listview("refresh");
  }).always(function(){
    $.mobile.loading("hide");
  });
});



$(document).on("pageinit", "#detalle_alumno", function(){
  $("#grabar_favorito").click(function(){
      //grabo formulario en db.
      grabar_alumno_favorito($("#frm_id_alumno"),$("#id_alumno").val());
  });
});
//</editor-fold>



//cuando me hacen click en un link con la misma clase
$(document).on("click", ".detalles", function(){
  var id = $(this).data("num");
  var url = "http://125.125.10."+id;
  
  $("#videoImg").setAttribute("src", "http://125.125.10.1"+id+"/api/lastframe.cgi");
  $("#videoImg").setAttribute("onload", "setTimeout('document.getElementById(\'videoImg\').src=\'http://125.125.10.1"+id+"/api/lastframe.cgi?\'+new Date().getMilliseconds()', 800)");
  
  $(":mobile-pagecontainer").pagecontainer("change","#teminal");
  
  $.get(url, function(response){
      $("#id_alumno").val(response.descripcion.id);
      $("#nombre").val(response.descripcion.nombre);
      $("#apellido").val(response.descripcion.apellido);
      $(":mobile-pagecontainer").pagecontainer("change","#detalle_alumno");
  });
});