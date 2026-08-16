const menu = document.getElementById("menu");
const boton = document.getElementById("menu-btn");
boton.addEventListener("click", () => {
    menu.classList.toggle("activo");
});
const slides = document.querySelectorAll(".slide");
let indice = 0;
function mostrarSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove("activo");
    });
    slides[n].classList.add("activo");
}
function siguiente() {
    indice++;
    if (indice >= slides.length) {
        indice = 0;
    }
    mostrarSlide(indice);
}
function anterior() {
    indice--;
    if (indice < 0) {
        indice = slides.length - 1;
    }
    mostrarSlide(indice);
}
setInterval(siguiente, 3000);
let contador = 0;
function agregarCarrito() {
    contador++;
    document.getElementById("contador").textContent = contador;
}