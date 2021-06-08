
// Carga parámetros URL datos reserva
function getParams() {
    const queryStrings = window.location.search;
    const urlParametros = new URLSearchParams(queryStrings);
    const fechaEntrada = urlParametros.get("fechaERes");
    const pax = urlParametros.get("numPersona");
    
    dastosReserva = {
        fechaSalida: fechaSalida || "",
        fechaEntrada: fechaEntrada || "",
        pax: pax || "",
        campo4: pax || "",
        campo5: pax || "",
        campo6: pax || "",
    }
}

// Carga nueva URL añadiendo parámetros de la reserva 
function loadURL(url) {

    let query = Object.keys(datosReserva)
        .map(
        (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(datosReserva[key])
        )
        .join("&");

    window.location.href = url + "?" + query;
}

function integromat() {
    let response = fetch('http', {})
}

// Validación formulario de entrada datos personales
function formValidate() {
    let campo4 = document.getElementById("campo4").value;
    let campo5 = document.getElementById("campo5").value;
    let campo6 = document.getElementById("campo6").value;

    if (!campo4) alert("Error");

    datosReserva.campo4 = campo4;
    datosReserva.campo5 = campo5;
    datosReserva.campo6 = campo6; 
}

if(document.getElementById("boton")) {
    // Definir objeto con datos reserva de forma global
    let datosReserva;

    // Carga parámetros en URL
    getParams()

    // Validación de parámetros URL
    if (!dastosReserva.fechaSalida) alert("Error");

    // Cargar valores en formulario resumen de reserva
    document.getElementById("campo1").value = datosReserva.fechaEntrada;
    document.getElementById("campo2").value = datosReserva.fechaSalida;
    document.getElementById("campo3").value = datosReserva.pax;

    // Programación botón siguiente
    let botonEnviar = document.getElementById("botonenviar").addEventListener('click', function (event) {
        formValidate()
        integromat()
        loadURL('/paso3')
    })

}

