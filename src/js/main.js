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
      if (document.getElementById("regimenes")) {
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
                (k) =>
                  encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
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
      }
    }
  });
}

if (document.getElementById("botonReserva")) {
  var boton = document.querySelectorAll(".botonReserva");
  boton.forEach((element) => {
    var resultado = element.addEventListener("click", reservarAhora);

    function reservarAhora() {
      if (
        document.getElementById("entrada").value !== "" &&
        document.getElementById("salida").value !== "" &&
        document.getElementById("n_P").value!==""
      ) {
        if (
          document.getElementById("salida").value >
          document.getElementById("entrada").value
        ) {
          let params = {
            fechaE: document.getElementById("entrada").value,
            fechaS: document.getElementById("salida").value,
            n_P: document.getElementById("n_P").value,

          };

          let query = Object.keys(params)
            .map(
              (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
            )
            .join("&");

          window.location.href = "/reserva?" + query;
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

console.log(queryStrings);
//variables que se cogen por parametros
let fechaEntrada;
let fechaSalida;
if (urlParametros.get("fechaE")) {
  fechaEntrada = urlParametros.get("fechaE").split("/").reverse().join("-");
}
if (urlParametros.get("fechaS")) {
  fechaSalida = urlParametros.get("fechaS").split("/").reverse().join("-");
}
let entrada = new Date(fechaEntrada).getTime();
let salida = new Date(fechaSalida).getTime();
let diffTime = Math.abs(salida - entrada);
let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

let apellidosConfirmacionFinal = urlParametros.get("apel");

var prodHab = urlParametros.get("hab");
var prodNP = urlParametros.get("n_P");
var prodR = urlParametros.get("reg");
var parNomCon = document.getElementById("nombrePersona");

var precio = document.getElementById("precioFinal");
var precioFinal =
  parseInt(prodHab) * diffDays + parseInt(prodNP * prodR) * diffDays + "€";

if (document.getElementById("precioFinal")) {
  precio.innerHTML = precioFinal;
  document.getElementById("precioFinal").dataset.preciof = precioFinal;
}
//cojo valor de la anterior ventana
if (parNomCon) {
  parNomCon = document.getElementById("nombrePersona").value;
  var parApellCon = document.getElementById("apellidosPersona").value;
  var parEmailCon = document.getElementById("emailPersona").value;
  var parTfnoCon = document.getElementById("telefonoPersona").value;
  var parTarCon = document.getElementById("numeroTarjeta").value;
  var parNomTitCon = document.getElementById("titularTarjeta").value;
  var parCadCon = document.getElementById("caducidadTarjeta").value;
  var precioo = document.getElementById("precioFinal").dataset.preciof;
}

var parImgCon = urlParametros.get("img");
var parHabCon = urlParametros.get("tipoH");

//guardo los datos en un json clave
datosConfirmacion = {
  nom: parNomCon || "",
  apel: parApellCon || "",
  mail: parEmailCon || "",
  tfno: parTfnoCon || "",
  tar: parTarCon || "",
  tit: parNomTitCon || "",
  cad: parCadCon || "",
  fechaE: fechaEntrada || "",
  fechaS: fechaSalida || "",
  imgConfirmacion: parImgCon || "",
  textoHabConfirmacion: parHabCon || "",
  prodNP: prodNP || "",
  prodR: prodR || "",
  precioConfirmacion: precioo || "",
  prodHab: prodHab || "",

  //precioFinal: document.getElementById("precioFinal").dataset.preciof || "",
};

var fechaE = document.getElementById("fechaEntrada");
if (document.getElementById("fechaEntrada")) {
  fechaE.innerHTML = fechaEntrada;
}

var fechaS = document.getElementById("fechaSalida");
if (document.getElementById("fechaSalida")) {
  fechaS.innerHTML = fechaSalida;
}

var tipoUrl = urlParametros.get("tipoH");
var tipo = document.getElementById("textoHab");

if (document.getElementById("textoHab")) {
  tipo.innerHTML = tipoUrl;
  document.getElementById("textoHab").dataset.hab = tipoUrl;
}

if (document.getElementById("botonFinalizar")) {
  var botonF = document.getElementById("botonFinalizar");
  botonF.addEventListener("click", datosPSiguiente);

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
        regexTelefono.test(document.getElementById("telefonoPersona").value) &&
        dateformat.test(document.getElementById("caducidadTarjeta").value)
      ) {
        fetch("https://hook.integromat.com/7qb0lx3apf31u51eykiz5wtt88qsyqo6", {
          method: "POST",
          body: JSON.stringify(datosConfirmacion),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(
          (x) =>
            new Promise((resolve) =>
              setTimeout(() => resolve(loadURL("/confirmacionReserva")), 0)
            )
        );
      } else {
        alert("Revise los datos,hay datos incorrectos");
      }
    } else {
      alert("Los campos están vacíos, por favor revise");
    }
  }
}

function loadURL(url) {
  let query = Object.keys(datosConfirmacion)
    .map(
      (key) =>
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(datosConfirmacion[key])
    )

    .join("&");

  window.location.href = url + "?" + query;
}

let datosConfirmacion;
if (document.getElementById("referenciaTomaDatosConfirmacion")) {
  document.getElementById("nombreConfirmacion").innerHTML =
    urlParametros.get("nom");

  document.getElementById("apellidosConfirmacion").innerHTML =
    urlParametros.get("apel");

  document.getElementById("emailConfirmacion").innerHTML =
    urlParametros.get("mail");

  document.getElementById("telefonoConfirmacion").innerHTML =
    urlParametros.get("tfno");

  document.getElementById("num_tarjetaConfirmacion").innerHTML =
    urlParametros.get("tar");

  document.getElementById("nombreTitularConfirmacion").innerHTML =
    urlParametros.get("tit");

  document.getElementById("caducidadConfirmacion").innerHTML =
    urlParametros.get("cad");

  document.getElementById("fechaSalidaConfirmacion").innerHTML =
    urlParametros.get("fechaS");

  document.getElementById("fechaEntradaConfirmacion").innerHTML =
    urlParametros.get("fechaE");

  document.getElementById("textoHabConfirmacion").innerHTML = urlParametros.get(
    "textoHabConfirmacion"
  );

  document.getElementById("precioFinalConfirmacion").innerHTML =
    urlParametros.get("precioConfirmacion");
  if (document.getElementById("imgConfirmacion")) {
    var imgCon = document
      .getElementById("imgConfirmacion")
      .setAttribute("src", urlParametros.get("imgConfirmacion"));
  }
}

var entradaParameter = document.getElementById("entrada");
var salidaParameter = document.getElementById("salida");
var numero_p = document.getElementById("cantidad");

const datos_reserva = {
  entradaParameter: fechaEntrada,
  salidaParameter: fechaSalida,
  numero_p: prodNP,
};


if (document.getElementById("botonSalir")) {
  var botonSalir = document.getElementById("botonSalir");
}
if (entradaParameter) {
  entradaParameter.value = datos_reserva.entradaParameter;
}
if (salidaParameter) {
  salidaParameter.value = datos_reserva.salidaParameter;
}
if (numero_p) {
  numero_p.value = datos_reserva.numero_p;
}

if (document.getElementById("botonConsulta")) {
  fetch("https://hook.integromat.com/kds3xiy2g5mrjk14sb2v4qkpr1q7qw9b", {
    method: "POST",
    body: JSON.stringify(datosConfirmacion),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data + "DATA");
      document
        .querySelectorAll(".habitacionesDisponibles")
        .forEach((element) => {
          console.log(element)
          let tipoHabitacion = element.dataset.tipo;
          console.log(tipoHabitacion)
          if(data.includes(tipoHabitacion)){
            element.classList.remove("hidden");
            element.classList.add("flex");
          }
        });
    });
  if (document.getElementById("botonConsulta")) {
    document
      .getElementById("botonConsulta")
      .addEventListener("click", consultar);
    function consultar() {
      if (
        document.getElementById("entrada").value !== "" &&
        document.getElementById("salida").value !== "" &&
        document.getElementById("cantidad").value !== ""
      ) {
        fetch("https://hook.integromat.com/kds3xiy2g5mrjk14sb2v4qkpr1q7qw9b", {
          method: "POST",
          body: JSON.stringify(datosConfirmacion),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data + "DATA");
            document
              .querySelectorAll(".habitacionesDisponibles")
              .forEach((element) => {
                console.log(element)
                let tipoHabitacion = element.dataset.tipo;
                console.log(tipoHabitacion)
                if(data.includes(tipoHabitacion)){
                  element.classList.remove("hidden");
                  element.classList.add("flex");
                }
              });
          });
      } else {
        alert("Faltan datos");
      }
      
    }
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
