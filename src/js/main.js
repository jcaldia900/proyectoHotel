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



/*

var grid = document.querySelector('.gridPanel');
var msnry = new Masonry( grid, {
  itemSelector: '.gridPanel-item',
  columnWidth: '.gridPanel-sizer',
  percentPosition: true
});

window.onload = function() {
  msnry.layout();
  

};*/

/*
if(document.querySelector('.gridPanel')){
const imgloaded = require('imagesloaded')
const elem = document.querySelector('.gridPanel')
var imgLoad = imgloaded( elem )
    function onAlways() {
        const msnry = new Masonry( elem, {
            // options
            columnWidth: '.gridPanel-sizer',
            // do not use .grid-sizer in layout
            itemSelector: '.gridPanel-item',
            percentPosition: true,
            gutter: 10
        })
    console.log('all images are loaded')
}
if (elem) {
    // bind with .on()
    imgLoad.on( 'always', onAlways )
    // unbind with .off()
    // imgLoad.off( 'always', onAlways )
}
}
*/
// init Masonry
var grid = document.querySelector('.gridPanel');

var msnry = new Masonry( grid, {
  itemSelector: '.gridPanel-item',
  columnWidth: '.gridPanel-sizer',
  percentPosition: true
});

imagesLoaded( grid ).on( 'progress', function() {
  // layout Masonry after each image loads
  msnry.layout();
});