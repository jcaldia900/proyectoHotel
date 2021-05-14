import Swiper from "swiper/bundle";
import Masonry from "masonry-layout";
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
if (document.querySelector(".msnry-grid")) {
  var grid = document.querySelector(".msnry-grid");
  var msnry = new Masonry(grid, {
    itemSelector: ".msnry-grid-item",
    columnWidth: 160,
    stagger: 30,
  });

  grid.addEventListener("click", function (event) {
    // don't proceed if item was not clicked on
    if (!matchesSelector(event.target, ".grid-item")) {
      return;
    }
    // change size of item via class
    event.target.classList.toggle("grid-item--gigante");
    // trigger layout
    msnry.layout();
  });
}
if (document.getElementById("entrada")) {
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
  alert("holaaa")
}
