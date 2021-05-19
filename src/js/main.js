import Swiper from "swiper/bundle";
import Masonry from "masonry-layout";
import imagesloaded from "imagesloaded";

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
  var boton = document.getElementById("botonDisponibilidad");
  var resultado = boton.addEventListener("click", disponibilidad);

  function disponibilidad() {
    if (document.getElementById("entrada")) {
      var x = document.getElementById("entrada").value;

      let fechaEntrada = document.getElementById("entrada").value;
      let fechaSalida = document.getElementById("salida").value;
      let cantidad = document.getElementById("cantidad").value;
      fechaEntrada = fechaEntrada.split("/").reverse().join("-");
      fechaSalida = fechaSalida.split("/").reverse().join("-");
      let entrada = new Date(fechaEntrada).getTime();

      let salida = new Date(fechaSalida).getTime();
      let diffTime = Math.abs(salida - entrada);
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      document.getElementById("demo").innerHTML = diffDays;
    }

    
    if (document.querySelector("input[name = regimen]:checked") && document.getElementById("entrada").value!=="" && document.getElementById("salida").value!=="" && document.getElementById("cantidad").value!=="") {
      var regimen = document.querySelector("input[name = regimen]:checked").value;
    
    let params = {
      hab:document.getElementById("habitacion").textContent,
      fechaE: document.getElementById("entrada").value,
      fechaS: document.getElementById("salida").value,
      n_P: document.getElementById("cantidad").value,
      reg: regimen,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    window.location.href = "http://localhost:8080/datospersonalesReserva?" + query;

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
      alert("Introduzca todos los campos por favor");
    }






  }
} 

if (document.getElementById("fechaSalida")) {
  document.getElementById("fechaSalida").innerHTML =
    document.getElementById("salida").value;
  console.log(document.getElementById("fechaSalida"));
}

/*if (document.getElementById("entrada")) {
  let fechaEntrada = document.getElementById("entrada").value;
  let fechaSalida = document.getElementById("salida").value;
  fechaEntrada = fechaEntrada.split("/").reverse().join("-");
  fechaSalida = fechaSalida.split("/").reverse().join("-");
  let entrada = new Date(fechaEntrada).getTime();
  console.log(fechaEntrada)
  console.log(entrada)
  let salida = new Date(fechaSalida).getTime();
  let diffTime = Math.abs(salida - entrada);
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  console.log(diffDays + " days");
}
function disponibilidad(){
  var x = document.getElementById("entrada").value;
  document.getElementById("demo").innerHTML = x;
}*/

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
