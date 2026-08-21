/* ============================================
   comentarios.js — zona de comentarios (requiere sesión)
   depende de auth.js (usa usuarioActual())
   ============================================ */

function claveComentarios(pagina){
  return "sinlimites_comentarios_" + pagina;
}

function getComentarios(pagina){
  try{
    return JSON.parse(localStorage.getItem(claveComentarios(pagina))) || [];
  }catch(e){
    return [];
  }
}

function guardarComentarios(pagina, comentarios){
  localStorage.setItem(claveComentarios(pagina), JSON.stringify(comentarios));
}

function formatearFecha(iso){
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", { day:"2-digit", month:"short", year:"numeric" }) +
         " · " + d.toLocaleTimeString("es-ES", { hour:"2-digit", minute:"2-digit" });
}

function escaparHTML(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function renderComentarios(pagina){
  const lista = document.getElementById("listaComentarios");
  if(!lista) return;

  const comentarios = getComentarios(pagina).slice().reverse();

  if(comentarios.length === 0){
    lista.innerHTML = '<p class="sin-comentarios">Todavía no hay comentarios. ¡Sé el primero!</p>';
    return;
  }

  lista.innerHTML = comentarios.map(function(c){
    return (
      '<div class="comentario">' +
        '<div class="comentario-avatar"><i class="fas fa-circle-user"></i></div>' +
        '<div class="comentario-body">' +
          '<div class="comentario-cabecera">' +
            '<span class="comentario-autor">' + escaparHTML(c.autor) + '</span>' +
            '<span class="comentario-fecha">' + formatearFecha(c.fecha) + '</span>' +
          '</div>' +
          '<p class="comentario-texto">' + escaparHTML(c.texto) + '</p>' +
        '</div>' +
      '</div>'
    );
  }).join("");
}

// pagina: string que identifica en qué página estamos (ej: "teclado")
// para que cada página tenga sus propios comentarios
function iniciarZonaComentarios(pagina){
  const form = document.getElementById("formComentario");
  const textarea = document.getElementById("textoComentario");
  const bloqueado = document.getElementById("comentariosBloqueado");
  const usuario = usuarioActual();

  renderComentarios(pagina);

  if(!usuario){
    if(form) form.style.display = "none";
    if(bloqueado) bloqueado.style.display = "flex";
    return;
  }

  if(form) form.style.display = "flex";
  if(bloqueado) bloqueado.style.display = "none";

  if(!form) return;

  form.addEventListener("submit", function(e){
    e.preventDefault();
    const texto = textarea.value.trim();
    if(!texto) return;

    const comentarios = getComentarios(pagina);
    comentarios.push({
      id: Date.now().toString(36),
      autor: usuario.nombre,
      texto: texto,
      fecha: new Date().toISOString()
    });
    guardarComentarios(pagina, comentarios);
    textarea.value = "";
    renderComentarios(pagina);
  });
}