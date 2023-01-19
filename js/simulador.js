class persona {
    constructor(nombre, edad) {
this.nombre = nombre;
this.edad   = edad;
    }
}

console.log('Calculo de cuota');
function calculaCuota(){
    const forma = document.getElementById('forma');

    const nombre = forma['nombre'];
    var inputNombre= document.getElementById("nombre");
    localStorage.setItem("nombre", inputNombre.value);
    
    const salario = forma['salario'];
    var inputSalario= document.getElementById("salario");
    localStorage.setItem("salario", inputSalario.value);

    const edad = forma['edad'];
    var inputEdad= document.getElementById("edad");
    localStorage.setItem("edad", inputEdad.value);

    const monto = forma['monto'];
    var inputMonto= document.getElementById("monto");
    localStorage.setItem("monto", inputMonto.value);

    const plazo = forma['plazo'];
    var inputPlazo= document.getElementById("plazo");
    localStorage.setItem("plazo", inputPlazo.value);

    
    const condicionNombre = (nombre.value != null && nombre.value != "");
    
    const condicionSalario = (salario.value != null && salario.value != 0 && salario.value != "");
    
    const condicionEdad = (edad.value != null  && edad.value != 0 && edad.value != "");

    const condicionMonto = (monto.value != null && monto.value != 0 && monto.value != "");

    const condicionPlazo = (plazo.value != null && plazo.value != 0 && plazo.value != "");
    
    if (condicionSalario == null || condicionSalario == 0 || condicionSalario == "" || condicionEdad == null || condicionEdad == 0 || condicionEdad == "" || condicionMonto == null || condicionMonto == 0 || condicionMonto == "" || condicionPlazo == null || condicionPlazo == 0 || condicionPlazo == "" || condicionNombre == null || condicionNombre == "") {
        swal("Ingrese todos los datos solicitados por favor!!");
        return
                
    } else if (salario.value >= 520 && edad.value >= 18 && edad.value <40) {
        tasaInteres = 12;
    
    } else if (salario.value >= 1300 && edad.value >= 40 && edad.value <55) {
        tasaInteres = 15;
    
    } else if (salario.value >= 2600 && edad.value >= 55 && edad.value <70) {
        tasaInteres = 17;
    
    } else if (salario.value >= 5200 && edad.value >= 70) {
        tasaInteres = 20;
    
    } else {
        swal("Lo sentimos, no califica para el prestamo");
        tasaInteres = 0;                
    }
    
    let CalculoInteres = ((tasaInteres/100)/12);

    let cuota= (monto.value * CalculoInteres) / (1 - Math.pow( (1+CalculoInteres) , (-plazo.value)));
    

    if (tasaInteres != 0) {
        cuota= (Math.round(cuota*100) /100).toFixed(2);
        
    } else {
        cuota = 0;
    }
    
    var valorCuota = (JSON.stringify(cuota))
    localStorage.setItem("cuota", valorCuota);
        
    /* Uso de jQuery para el DOM*/ 

    $("#cuota").html(`<section id="p1"><h2><strong> El valor de la cuota es de: ${cuota} <strong></h2>
        <ul><li class="listaDos"> La tasa de interés otorgada es de: ${tasaInteres}% </li>
        <li class="listaDos"> El crédito se pagará en: ${plazo.value} cuotas iguales </li></ul>
        <hr>
        <h2 class="tituloH2">Muchas gracias por cotizar con nosotros estimado(a) ${nombre.value}</h2></section>
        <hr>
        <div><button class="btn1">Mostrar</button>
        <button class="btn2">Ocultar</button></div>`);
               
        $("#p1").css("color", "#00008d")
                .css("background-color", "#c4c4c0");

        $(".tituloH2").css("font-size", "20px")
                      .css("font-weight", "bold");

        $(".listaDos").css("font-size", "20px");

        $(".btn1").css("color", "white")
                  .css("background-color", "#E5BA73")
                  .css("border-radius", "0.2em")
                  .css("font-size", "0.4em");

        $(".btn2").css("color", "white")
                  .css("background-color", "#E5BA73")
                  .css("border-radius", "0.2em")
                  .css("font-size", "0.4em");
                
                $(document).ready(function(){
                    $(".btn1").click(function(){
                      $("section").slideDown();
                    });
                    $(".btn2").click(function(){
                      $("section").slideUp();
                    });
                });
        

    onclick= () => console.log(`cuota: ${cuota}`);
}

/*Uso de Trigger para vaciar formulario*/

$('#limpiarFormulario').click(function(){
    $("#forma").trigger("reset");
    $("#cuota").html("");
    $("#lista-tabla tr>td").remove();
});

/*Ocultar texto con slideToggle*/

$(document).ready(function(){
    $('.texto1').hide();

    $('.titulo1').on('click', function(){
        $('.texto1').slideToggle();
    });
});

/*Tabla amortización del crédito*/

const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');
var tasaInteres = 0

btnCalcular.addEventListener('click', () => {
    calcularCuota(monto.value, tasaInteres, plazo.value);
})

function calcularCuota(monto, tasaInteres, plazo) {

    

    if (salario.value >= 520 && edad.value >= 18 && edad.value <40) {
        tasaInteres = 12;
    
    } else if (salario.value >= 1300 && edad.value >= 40 && edad.value <55) {
        tasaInteres = 15;
    
    } else if (salario.value >= 2600 && edad.value >= 55 && edad.value <70) {
        tasaInteres = 17;
    
    } else if (salario.value >= 5200 && edad.value >= 70) {
        tasaInteres = 20;
    
    } else {
            tasaInteres = 0;                
    }

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    mes_actual.add(1, 'month');    

    let pagoInteres=0, pagoCapital = 0, cuota = 0;

    cuota = (monto * (tasaInteres/100/12)) / (1 - Math.pow( (1+tasaInteres/100/12) , (-plazo)));

    for(let i = 1; i <= plazo; i++) {

        pagoInteres = parseFloat(monto*(tasaInteres/100/12));
        pagoCapital = cuota - pagoInteres;
        monto = parseFloat(monto-pagoCapital);

        //Formato fechas
        fechas[i] = mes_actual.format('DD-MM-YYYY');
        mes_actual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML =
        `<td>${fechas[i]}</td>
        <td>${cuota.toFixed(2)}</td>
        <td>${pagoCapital.toFixed(2)}</td>
        <td>${pagoInteres.toFixed(2)}</td>
        <td>${monto.toFixed(2)}</td>`;
        llenarTabla.appendChild(row)
    }
}