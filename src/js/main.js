import Swiper from "swiper/bundle";

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
window.nav = {
  status: true,
  menu: function () {
    if (nav.status) {
      // here put class when menu is open - eg:
      document.getElementById("menu-box").className = "menu-box menuopen";
      nav.status = false;
      var res = document.getElementById("menuMobile");
      var men = document.getElementById("menu");
      console.log(res);
      var parrafo = document.createElement("p");

      var exit = document.createTextNode("SALIR");
      res.removeChild(men);
      res.appendChild(parrafo);
      parrafo.appendChild(exit);
      console.log(res);
    } else {
      // here put class when menu is closed - eg:
      document.getElementById("menu-box").className = "menu-box";
      nav.status = true;
    }
  },
};
window.navMobile = {
  status: true,
  menuMobile: function () {
    if (navMobile.status) {
      // here put class when menu is open - eg:
      document.getElementById("menu-box-mobile").className =
        "menu-box menuopen";
      navMobile.status = false;
    } else {
      // here put class when menu is closed - eg:
      document.getElementById("menu-box-mobile").className = "menu-box";
      navMobile.status = true;
    }
  },
};
