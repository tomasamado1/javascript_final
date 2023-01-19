let urlDolar = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

$('#dolar').ready(function(){
    $.get(urlDolar, function(posts){      
  $('#dolar').html(`<div><p id="p1"> Cotización dolar oficial: compra ${posts[0].casa.compra} / Venta: ${posts[0].casa.venta} </p></div>`)
  $("#p1").css("color", "#00008d")
                .css("background-color", "#c4c4c0");
  });
  });
  
  $(document).ready(function(){
    $('.texto1').hide();

    $('.titulo1').on('click', function(){
        $('.texto1').slideToggle();
    });
});