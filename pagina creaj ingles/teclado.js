let seleccion = [];
let textoFinal = "";
let vocesDisponibles = [];
function cargarVoces(){
    vocesDisponibles = speechSynthesis.getVoices();
}
speechSynthesis.onvoiceschanged = cargarVoces;
cargarVoces();
document.querySelectorAll(".boton").forEach(boton => {
    boton.addEventListener("click",()=>{
        let punto = boton.dataset.dot;
        if(seleccion.includes(punto)){
            seleccion = seleccion.filter(
                item => item !== punto
            );
            boton.classList.remove("activo");
        }else{
            seleccion.push(punto);
            boton.classList.add("activo");
        }
    });
});
document.addEventListener("keydown",(e)=>{
    if(e.repeat) return;
    let tecla = e.key;
    if(tecla >= "1" && tecla <= "6"){
        let boton = document.querySelector(
            `.boton[data-dot="${tecla}"]`
        );
        if(boton){
            boton.click();
        }
    }
    if(tecla === "Enter"){
        e.preventDefault();
        agregar();
    }
    if(tecla === " "){
        e.preventDefault();
        if(
            textoFinal.length === 0 ||
            textoFinal.endsWith(" ")
        ){
            return;
        }
        textoFinal += " ";
        actualizarTexto();
        hablar("espacio");
    }
    if(tecla === "Backspace"){
        borrar();
    }
});
function mapaBraille(){
return {
    "1":"a",
    "12":"b",
    "14":"c",
    "145":"d",
    "15":"e",
    "124":"f",
    "1245":"g",
    "125":"h",
    "24":"i",
    "245":"j",
    "13":"k",
    "123":"l",
    "134":"m",
    "1345":"n",
    "135":"o",
    "1234":"p",
    "12345":"q",
    "1235":"r",
    "234":"s",
    "2345":"t",
    "136":"u",
    "1236":"v",
    "2456":"w",
    "1346":"x",
    "13456":"y",
    "1356":"z"
};
}
function agregar(){
    seleccion.sort();
    let codigo = seleccion.join("");
    let letra = mapaBraille()[codigo];
    if(!letra){
        hablar("combinación no válida");
        alert("Combinación Braille no válida");
        return;
    }
    textoFinal += letra;
    actualizarTexto();
    hablar(letra);
    limpiarPuntos();
}
function actualizarTexto(){
    document.getElementById("texto").textContent =
    textoFinal;
}
function hablar(texto){
    if(!("speechSynthesis" in window)){
        alert(
        "Tu navegador no permite lectura por voz"
        );
        return;
    }
    speechSynthesis.cancel();
    let voz =
    new SpeechSynthesisUtterance(texto);
    voz.lang = "es-ES";
    voz.rate = 1;
    voz.pitch = 1;
    voz.volume = 1;
    let vozEspanol =
    vocesDisponibles.find(voz =>
        voz.lang.toLowerCase()
        .includes("es")
    );
    if(vozEspanol){
        voz.voice = vozEspanol;
    }
    speechSynthesis.speak(voz);
}
function borrar(){
    textoFinal =
    textoFinal.slice(0,-1);
    actualizarTexto();
}
function limpiar(){
    textoFinal = "";
    actualizarTexto();
    limpiarPuntos();
}
function limpiarPuntos(){
    seleccion = [];
    document.querySelectorAll(".boton")
    .forEach(boton=>{
        boton.classList.remove("activo");
    });
}
function contraste(){
    document.body.classList.toggle("alto");
}
document.getElementById("agregar")
.addEventListener("click", agregar);
document.getElementById("borrar")
.addEventListener("click", borrar);
document.getElementById("limpiar")
.addEventListener("click", limpiar);
document.getElementById("contraste")
.addEventListener("click", contraste);
window.addEventListener("DOMContentLoaded",()=>{
    const contenedor =
    document.getElementById("estrellas");
    if(contenedor){
        for(let i=0;i<150;i++){
            let estrella =
            document.createElement("div");
            estrella.classList.add("estrella");
            let tamaño =
            Math.random()*3+1;
            estrella.style.width =
            tamaño+"px";
            estrella.style.height =
            tamaño+"px";
            estrella.style.left =
            Math.random()*100+"%";
            estrella.style.animationDuration =
            (Math.random()*6+4)+"s";
            estrella.style.animationDelay =
            Math.random()*10+"s";
            contenedor.appendChild(estrella);
        }
    }
});