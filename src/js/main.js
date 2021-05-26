import Swiper from "swiper/bundle";
import Masonry from "masonry-layout";
import imagesloaded from "imagesloaded";
import { data } from "autoprefixer";

var swiper = new Swiper(".swiper-container", {
  pagination: {
    el: ".swiper-pagination",
  },
});
if (document.getElementById("boton")) {
  var boton = document.getElementById("boton");
  var validar = document.getElementById("validarCampo");
  var resultado = boton.addEventListener("click", res);

  function res() {
    if (validar.value.length > 0) {
      alert("Hemos recibido sus datos,muchas gracias");
    }
  }
}

var galleryThumbs = new Swiper(".gallery-thumbs", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper(".gallery-top", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: galleryThumbs,
  },
});

var galleryThumbsDos = new Swiper(".gallery-thumbsDos", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTopDos = new Swiper(".gallery-topDos", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-nextDos",
    prevEl: ".swiper-button-prevDos",
  },
  thumbs: {
    swiper: galleryThumbsDos,
  },
});

// const menuMobile = document.getElementById('menuMobile')
// const menuMobileBox = document.getElementById('menu-box-mobile')
if (document.getElementById("menuMobile") != null) {
  document.getElementById("menuMobile").addEventListener("click", () => {
    document.getElementById("menu-box-mobile").classList.toggle("hidden");
    document.getElementById("svgPrimero").classList.toggle("hidden");
    document.getElementById("svgSegundo").classList.toggle("hidden");
    //pasar el active al bloque menú
    document.getElementById("menu").classList.toggle("active");
  });
}



if (document.getElementById("botonDisponibilidad")) {
  var boton = document.querySelectorAll(".botonDisponibilidad");
  boton.forEach((element) => {
    var resultado = element.addEventListener("click", disponibilidad);
   
   
    
    function disponibilidad() {
      if( document.getElementById("regimenes")){
      if (
        document.querySelector("input[name = regimen]:checked") &&
        document.getElementById("entrada").value !== "" &&
        document.getElementById("salida").value !== "" &&
        document.getElementById("cantidad").value !== ""
      ) {
        if (
          document.getElementById("salida").value >
          document.getElementById("entrada").value
        ) {
          var regimen = document.querySelector(
            "input[name = regimen]:checked"
          ).value;
          
          let params = {
            hab: element.dataset.precio,
            fechaE: document.getElementById("entrada").value,
            fechaS: document.getElementById("salida").value,
            n_P: document.getElementById("cantidad").value,
            reg: regimen,
            tipoH: element.dataset.nombre,
            img: element.dataset.img,

            // dif: document.getElementById("demo").value
          };

          let query = Object.keys(params)
            .map(
              (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

          window.location.href = "/datospersonalesReserva?" + query;

          fetch(window.location.href)
            .then((data) => data.text())
            .then((text) => {
              console.log("request succeeded with JSON response", text);
            })
            .then((params) => {
              console.log("Debe introducir los datos", params);
            })
            .catch(function (error) {
              console.log("request failed", error);
            });
        } else {
          alert(
            "Introdujo la Fecha de Salida menor que de Entrada, por favor introduzcalo de nuevo"
          );
        }
      } else {
        alert("Introduzca todos los campos por favor");
      }
    }}
  });
}



if (document.getElementById("botonReserva")) {
  var boton = document.querySelectorAll(".botonReserva");
  boton.forEach((element) => {
    var resultado = element.addEventListener("click", reservarAhora);

    function reservarAhora() {
      if (
        document.getElementById("entrada").value !== "" &&
        document.getElementById("salida").value !== ""
      ) {
        if (
          document.getElementById("salida").value >
          document.getElementById("entrada").value
        ) {
          let params = {
            fechaE: document.getElementById("entrada").value,
            fechaS: document.getElementById("salida").value,
            n_P: document.getElementById("n_P").value,

            // dif: document.getElementById("demo").value
          };

          let query = Object.keys(params)
            .map(
              (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

          window.location.href = "/reserva?" + query;

          fetch(window.location.href)
            .then((data) => data.text())
            .then((text) => {
              console.log("request succeeded with JSON response", text);
            })
            .then((params) => {
              console.log("Debe introducir los datos", params);
            })
            .catch(function (error) {
              console.log("request failed", error);
            });
        } else {
          alert(
            "Introdujo la Fecha de Salida menor que de Entrada, por favor introduzcalo de nuevo"
          );
        }
      } else {
        alert("Introduzca todos los campos por favor");
      }
    }
  });
}
const queryStrings = window.location.search;
const urlParametros = new URLSearchParams(queryStrings);
const productos = urlParametros.get(urlParametros);
const pt=urlParametros.get('fechaSRes');
console.log(queryStrings);

let fechaEntrada = urlParametros.get("fechaE");
let fechaSalida = urlParametros.get("fechaS");

fechaEntrada = fechaEntrada.split("/").reverse().join("-");
fechaSalida = fechaSalida.split("/").reverse().join("-");
let entrada = new Date(fechaEntrada).getTime();

let salida = new Date(fechaSalida).getTime();

let diffTime = Math.abs(salida - entrada);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


var prodIdE = urlParametros.get("fechaE");
var fechaE = document.getElementById("fechaEntrada");
if (document.getElementById("fechaEntrada")) {
  fechaE.innerHTML = prodIdE;
}


var prodIdS = urlParametros.get("fechaS");
var fechaS = document.getElementById("fechaSalida");
if (document.getElementById("fechaSalida")) {
  fechaS.innerHTML = prodIdS;
}

var prodHab = urlParametros.get("hab");

var prodNP =  urlParametros.get("n_P");

var prodR =  urlParametros.get("reg");

var precio = document.getElementById("precioFinal");
var precioFinal =
  parseInt(prodHab) * diffDays + parseInt(prodNP * prodR) * diffDays + "€";
  console.log(precioFinal)
if (document.getElementById("precioFinal")) {
  precio.innerHTML = precioFinal;
  document.getElementById("precioFinal").dataset.preciof = precioFinal;
}


var tipoUrl = urlParametros.get("tipoH");
var tipo = document.getElementById("textoHab");

if (document.getElementById("textoHab")) {
  tipo.innerHTML = tipoUrl;
  document.getElementById("textoHab").dataset.hab = tipoUrl;
}

if (document.getElementById("botonFinalizar")) {
  var botonF = document.querySelectorAll(".botonFinalizar");
  

  botonF.forEach((element) => {
    var resFinal = element.addEventListener("click", datosPSiguiente);
    
    function datosPSiguiente() {
      var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
      var regexTelefono =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{3}$/;
      var dateformat = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
      if (
        document.getElementById("nombrePersona").value !== "" &&
        document.getElementById("apellidosPersona").value !== "" &&
        document.getElementById("emailPersona").value !== "" &&
        document.getElementById("telefonoPersona").value !== "" &&
        document.getElementById("numeroTarjeta").value !== "" &&
        document.getElementById("titularTarjeta").value !== "" &&
        document.getElementById("caducidadTarjeta").value !== ""
      ) {
        if (
          regex.test(document.getElementById("emailPersona").value) &&
          regexTelefono.test(
            document.getElementById("telefonoPersona").value
          ) &&
          dateformat.test(document.getElementById("caducidadTarjeta").value)
        ) {
          let params = {
            nom: document.getElementById("nombrePersona").value,
            apel: document.getElementById("apellidosPersona").value,
            mail: document.getElementById("emailPersona").value,
            tfno: document.getElementById("telefonoPersona").value,
            tar: document.getElementById("numeroTarjeta").value,
            tit: document.getElementById("titularTarjeta").value,
            cad: document.getElementById("caducidadTarjeta").value,
            precioFinal: document.getElementById("precioFinal").dataset.preciof,
            fechaE: prodIdE,
            fechaS: urlParametros.get("fechaS"),
            tipoHCon: urlParametros.get("tipoH"),
            img: urlParametros.get("img"),
            
           
          };

          let query = Object.keys(params)
            .map(
              (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

          window.location.href = "/confirmacionReserva?" + query;

          fetch(window.location.href)
            .then((data) => data.text())
            .then((text) => {
              console.log("request succeeded with JSON response", text);
            })
            .then((params) => {
              console.log("Debe introducir los datos", params);
            })
            .catch(function (error) {
              console.log("request failed", error);
            });
        } else {
          alert("Revise los datos,hay datos incorrectos");
        }
      } else {
        alert("Los campos están vacíos, por favor revise");
      }
    }
  });
}


var parNomCon = urlParametros.get("nom");
var nombreC = document.getElementById("nombreConfirmacion");
if (document.getElementById("nombreConfirmacion")) {
  nombreC.innerHTML = parNomCon;
}

var parApellCon = urlParametros.get("apel");
var apellC = document.getElementById("apellidosConfirmacion");
if (document.getElementById("apellidosConfirmacion")) {
  apellC.innerHTML = parApellCon;
}


var parEmailCon = urlParametros.get("mail");
var emailC = document.getElementById("emailConfirmacion");
if (document.getElementById("emailConfirmacion")) {
  emailC.innerHTML = parEmailCon;
}


var parTfnoCon = urlParametros.get("tfno");
var tfnoC = document.getElementById("telefonoConfirmacion");
if (document.getElementById("telefonoConfirmacion")) {
  tfnoC.innerHTML = parTfnoCon;
}

var parTarCon = urlParametros.get("tar");
var tarjetaC = document.getElementById("num_tarjetaConfirmacion");
if (document.getElementById("num_tarjetaConfirmacion")) {
  tarjetaC.innerHTML = parTarCon;
}


var parNomTitCon = urlParametros.get("tit");
var nombreTitC = document.getElementById("nombreTitularConfirmacion");
if (document.getElementById("nombreTitularConfirmacion")) {
  nombreTitC.innerHTML = parNomTitCon;
}


var parCadCon = urlParametros.get("cad");
var caducidadC = document.getElementById("caducidadConfirmacion");
if (document.getElementById("caducidadConfirmacion")) {
  caducidadC.innerHTML = parCadCon;
}


var parSalidaCon = urlParametros.get("fechaS");
var salidaCon = document.getElementById("fechaSalidaConfirmacion");
if (document.getElementById("fechaSalidaConfirmacion")) {
  salidaCon.innerHTML = parSalidaCon;
}


var parEntradaCon = urlParametros.get("fechaE");
var entradaCon = document.getElementById("fechaEntradaConfirmacion");
if (document.getElementById("fechaEntradaConfirmacion")) {
  entradaCon.innerHTML = parEntradaCon;
}


var parHabCon = urlParametros.get("tipoHCon");
var habCon = document.getElementById("textoHabConfirmacion");
if (document.getElementById("textoHabConfirmacion")) {
  habCon.innerHTML = parHabCon;
}



var precioConf = document.getElementById("precioFinalConfirmacion");

if (document.getElementById("precioFinalConfirmacion")) {
  precioConf.innerHTML = urlParametros.get("precioFinal");
}

if (document.getElementById("imgConfirmacion")) {
  var parImgCon = urlParametros.get("img");
  var imgCon = document
    .getElementById("imgConfirmacion")
    .setAttribute("src", parImgCon);
}

var entradaParameter = document.getElementById("entrada");
var salidaParameter = document.getElementById("salida");
var numero_p = document.getElementById("cantidad");

var nombreConfirmacionJSON=document.getElementById("nombreConfirmacion");
var apellidosConfirmacionJSON=document.getElementById("apellidosConfirmacion");
var emailConfirmacionJSON=document.getElementById("emailConfirmacion");
var telefonoConfirmacionJSON=document.getElementById("telefonoConfirmacion");
var num_tarjetaConfirmacionJSON=document.getElementById("num_TarjetaConfirmacion");
var nombreTitularConfirmacionJSON=document.getElementById("nombreTitularConfirmacion");
var caducidadConfirmacionJSON=document.getElementById("caducidadConfirmacion");
var fechaEntradaConfirmacionJSON=document.getElementById("fechaEntradaConfirmacion");
var fechaSalidaConfirmacionJSON=document.getElementById("fechaSalidaConfirmacion");
var imgConfirmacionJSON=document.getElementById("imgConfirmacion");
var textoHabConfirmacionJSON=document.getElementById("textoHabConfirmacion");
var precioConfirmacionJSON=document.getElementById("precioFinalConfirmacion");


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const entradaRes = urlParams.get("fechaE");
const salidaRes = urlParams.get("fechaS");
const numeroRes = urlParams.get("n_P");

const nombreCJSON=urlParams.get("nom");
const apellidosCJSON=urlParams.get("apel");
const mailResJSON = urlParams.get("mail");
const tfnoResJSON = urlParams.get("tfno");
const tarResJSON = urlParams.get("tar");
const nomTitResJSON = urlParams.get("tit");
const cadResJSON = urlParams.get("cad");
const imgResJSON = urlParams.get("img");
const tipoHJSON = urlParams.get("tipoHCon");
const precioJSON = urlParams.get("precioFinal");


const datos_reserva = {
  entradaParameter: entradaRes,
  salidaParameter: salidaRes,
  numero_p: numeroRes,
  
 
};
const datosConfirmacion={
  nombreConfirmacionJSON:nombreCJSON,
  apellidosConfirmacionJSON:apellidosCJSON,
  emailConfirmacionJSON:mailResJSON,
  telefonoConfirmacionJSON:tfnoResJSON,
  num_tarjetaConfirmacionJSON:tarResJSON,
  nombreTitularConfirmacionJSON:nomTitResJSON,
  caducidadConfirmacionJSON:cadResJSON,
  fechaEntradaConfirmacionJSON:entradaRes,
  fechaSalidaConfirmacionJSON:salidaRes,
  imgConfirmacionJSON:imgResJSON,
  textoHabConfirmacionJSON:tipoHJSON,
  precioConfirmacionJSON:precioJSON
}


if(entradaParameter){
entradaParameter.value = datos_reserva.entradaParameter;}
if(salidaParameter){
salidaParameter.value = datos_reserva.salidaParameter;}
if(numero_p){
numero_p.value = datos_reserva.numero_p;}

if(document.getElementById("botonConsulta")){
document.getElementById("botonConsulta").addEventListener("click", consultar);
function consultar() {
  location.reload();
}
}
if (document.querySelector(".gridPanel")) {
  var grid = document.querySelector(".gridPanel");

  var msnry = new Masonry(grid, {
    itemSelector: ".gridPanel-item",
    columnWidth: ".gridPanel-sizer",
    percentPosition: true,
  });

  imagesloaded(grid).on("progress", function () {
    // layout Masonry after each image loads
    msnry.layout();
  });
}
