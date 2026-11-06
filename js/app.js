// Para cambiar una frase, edita el texto de "frase" en la foto que quieras.
const FOTO_PORTADA = {
  id: "foto-08",
  ancho: 1186,
  alto: 1509,
  recorte: 0.76, // parte visible de la foto en el recorrido; se quita pared vacía de arriba
  frase: "Entra a cada lugar sabiendo que mereces estar ahí.",
  paleta: { base: "#3d0612", halo: "#a3122d", halo2: "#b8492c", acento: "#ffd28a", texto: "#fff4ec" },
  alt: "Mirely con un vestido rojo de lentejuelas frente a una pared blanca."
};

const CAPITULOS = [
  {
    id: "aire-libre",
    titulo: "Al aire libre",
    entrada: "Montañas, agua y flores.",
    fotos: [
      { id: "foto-04", ancho: 1200, alto: 1600, frase: "Mira lejos: el mundo es grande, y tus sueños también.", paleta: { base: "#0f2a1f", halo: "#2f6b47", halo2: "#4f7690", acento: "#d6ecb4", texto: "#f6fbf0" }, alt: "Mirely de espaldas, sentada en una red frente a un valle verde con montañas." },
      { id: "foto-12", ancho: 960, alto: 1280, frase: "Detente cuando lo necesites: la calma también es avanzar.", paleta: { base: "#0e2421", halo: "#2a5c52", halo2: "#1f4a66", acento: "#d7e6b8", texto: "#f3f8ee" }, alt: "Mirely sentada sobre una roca a la orilla de un estanque rodeado de palmeras." },
      { id: "foto-13", ancho: 720, alto: 980, frase: "Florece a tu propio ritmo: lo bonito no se apura.", paleta: { base: "#3a1240", halo: "#b03a7e", halo2: "#2f6b3a", acento: "#f9c3e6", texto: "#fff3fa" }, alt: "Mirely con un vestido rosado junto a una gran escultura de orquídea." }
    ]
  },
  {
    id: "espejo",
    titulo: "Frente al espejo",
    entrada: "Ella, el celular y un buen reflejo.",
    fotos: [
      { id: "foto-05", ancho: 1086, alto: 1448, frase: "Elige quererte cada mañana, empezando por el espejo.", paleta: { base: "#3f1d2c", halo: "#a9506c", halo2: "#a97b3a", acento: "#ffdca8", texto: "#fff5ea" }, alt: "Mirely se toma una foto en un espejo de marco colorido, con blusa blanca y botas rojas." },
      { id: "foto-02", ancho: 720, alto: 1280, frase: "Hasta en los días grises hay algo que te saca una sonrisa.", paleta: { base: "#141414", halo: "#565656", halo2: "#2e2e2e", acento: "#e6e6e6", texto: "#ffffff" }, alt: "Foto en blanco y negro de Mirely en el espejo, con el sticker de un perrito." },
      { id: "foto-03", ancho: 720, alto: 1280, frase: "Regálate flores a ti misma: tu cariño también cuenta.", paleta: { base: "#2a1f45", halo: "#7461ad", halo2: "#b8426f", acento: "#ffc0da", texto: "#fbf5ff" }, alt: "Mirely reflejada en el espejo de un armario, con ramos de flores encima." },
      { id: "foto-09", ancho: 1536, alto: 1545, frase: "Cada día es una página en blanco: escríbela a tu manera.", paleta: { base: "#33190c", halo: "#8a4a24", halo2: "#9c7a58", acento: "#ffe3bd", texto: "#fff8ef" }, alt: "Mirely vestida de blanco se toma una foto en un espejo con luces." },
      { id: "foto-10", ancho: 1200, alto: 1600, frase: "Sé tu propia luz, incluso donde todavía nadie te conoce.", paleta: { base: "#2a170c", halo: "#a2611a", halo2: "#2a3a55", acento: "#ffc46b", texto: "#fff7ea" }, alt: "Mirely con jeans y blusa negra se toma una foto en un espejo, bajo lámparas colgantes." }
    ]
  },
  {
    id: "color",
    titulo: "Rojo y rosa",
    entrada: "Dos colores que se repiten en sus fotos.",
    fotos: [
      { id: "foto-14", ancho: 1186, alto: 1509, recorte: 0.76, frase: "Levanta la cara: lo mejor de ti todavía está por brillar.", paleta: { base: "#2f0510", halo: "#7f0f2a", halo2: "#8a1f5e", acento: "#ffb3a8", texto: "#fff1ef" }, alt: "Mirely posa de perfil con un vestido rojo de lentejuelas." },
      { id: "foto-07", ancho: 1186, alto: 1509, recorte: 0.76, frase: "Ser tímida también es valiente: lo grande empieza en silencio.", paleta: { base: "#421423", halo: "#a93a58", halo2: "#b5697a", acento: "#ffe0e6", texto: "#fff5f6" }, alt: "Mirely con un conjunto rosado y blanco se cubre la cara con una mano." }
    ]
  },
  {
    id: "ciudad",
    titulo: "En la ciudad",
    entrada: "De día en la calle y de noche en el balcón.",
    fotos: [
      { id: "foto-06", ancho: 912, alto: 1600, frase: "Mira hacia arriba: ninguna reja es más alta que tus ganas.", paleta: { base: "#121b2b", halo: "#2f4a73", halo2: "#6d6152", acento: "#b9d2f2", texto: "#f2f7ff" }, alt: "Mirely con blusa negra y jeans mira hacia arriba junto a una reja." },
      { id: "foto-15", ancho: 960, alto: 1280, frase: "Aun de noche hay luces en el camino: sigue adelante.", paleta: { base: "#0c0a1c", halo: "#2b2a66", halo2: "#8a1f3d", acento: "#ff9ec0", texto: "#f8f5ff" }, alt: "Mirely de espaldas en un balcón sobre una avenida iluminada, con una flor en el pelo." }
    ]
  },
  {
    id: "de-cerca",
    titulo: "De cerca",
    entrada: "Sin pose de portada, solo ella.",
    fotos: [
      { id: "foto-01", ancho: 720, alto: 1280, frase: "No pierdas tu chispa: alegra los días de quien te rodea.", paleta: { base: "#4a0f2b", halo: "#b93a5f", halo2: "#a0475e", acento: "#ffe3ea", texto: "#fff5f7" }, alt: "Mirely recostada sobre una manta rosada de lunares, con un gesto divertido." },
      { id: "foto-11", ancho: 1280, alto: 720, frase: "Sigue tu propia música, aunque nadie más la escuche todavía.", paleta: { base: "#1d1526", halo: "#6d4a7d", halo2: "#94636e", acento: "#f3c9d6", texto: "#fbf4f8" }, alt: "Mirely recostada con audífonos, guiñando un ojo." }
    ]
  }
];

const PALETA_FIN = { base: "#1b0a24", halo: "#7a1f4f", halo2: "#2b2a66", acento: "#ffd28a", texto: "#fff4ec" };

const DISTANCIA = 900; // separación entre planos en el espacio 3D
const $ = (id) => document.getElementById(id);
const limitar = (valor, min, max) => Math.min(max, Math.max(min, valor));
const rutaDe = (foto) => `img/${foto.id}.jpg`;
const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const todas = [FOTO_PORTADA, ...CAPITULOS.flatMap((capitulo) => capitulo.fotos)];

/* ---------- Recorrido: una lista ordenada de planos ---------- */
function armarRecorrido() {
  const planos = [{ tipo: "foto", foto: FOTO_PORTADA, capitulo: "Portada" }];
  CAPITULOS.forEach((capitulo, i) => {
    planos.push({ tipo: "capitulo", capitulo: capitulo.titulo, datos: capitulo, numero: i + 1 });
    capitulo.fotos.forEach((foto) => planos.push({ tipo: "foto", foto, capitulo: capitulo.titulo }));
  });
  planos.push({ tipo: "fin", capitulo: "Fin" });

  let lado = 1;
  planos.forEach((plano) => {
    if (plano.tipo === "foto") {
      plano.lado = lado;
      plano.numero = todas.indexOf(plano.foto) + 1;
      lado = -lado;
    } else {
      plano.lado = 0;
    }
  });
  return planos;
}

function crearPlanoFoto(plano) {
  const figura = document.createElement("figure");
  figura.className = "plano plano-foto";

  const boton = document.createElement("button");
  boton.type = "button";
  boton.dataset.foto = plano.foto.id;
  boton.setAttribute("aria-label", `Ampliar foto ${plano.numero}`);

  const imagen = document.createElement("img");
  imagen.src = rutaDe(plano.foto);
  imagen.alt = plano.foto.alt;
  imagen.width = plano.foto.ancho;
  imagen.height = plano.foto.alto;
  imagen.decoding = "async";
  const paleta = plano.foto.paleta;
  figura.style.setProperty("--marco", paleta.acento);
  figura.style.setProperty("--brillo", paleta.halo);
  if (sinMovimiento) figura.style.background = fondoDe(paleta, 0);
  if (plano.foto.recorte) imagen.style.objectPosition = "center bottom";
  boton.append(imagen);

  const pie = document.createElement("figcaption");
  pie.textContent = plano.foto.frase;

  figura.append(boton, pie);
  return figura;
}

function crearPlanoCapitulo(plano) {
  const carta = document.createElement("section");
  carta.className = "plano plano-carta";
  carta.innerHTML = `<p class="rotulo">Capítulo ${plano.numero} de ${CAPITULOS.length}</p><h2></h2><p class="entradilla"></p>`;
  carta.querySelector("h2").textContent = plano.datos.titulo;
  carta.querySelector(".entradilla").textContent = plano.datos.entrada;
  return carta;
}

function crearPlanoFin() {
  const carta = document.createElement("section");
  carta.className = "plano plano-carta plano-fin";
  carta.innerHTML = `<h2>Quince fotos, y todavía faltan muchas por tomar.</h2><div class="fin-botones"><button class="boton principal" id="abrir-galaxia" type="button">Entrar a la galaxia 3D</button><button class="boton" id="volver" type="button">Volver al inicio</button></div>`;
  return carta;
}

const planos = armarRecorrido();
const elementos = planos.map((plano) => {
  if (plano.tipo === "foto") return crearPlanoFoto(plano);
  if (plano.tipo === "capitulo") return crearPlanoCapitulo(plano);
  return crearPlanoFin();
});
const escena = $("escena");
escena.append(...elementos);

const tramos = planos.map(() => {
  const tramo = document.createElement("div");
  tramo.className = "tramo";
  $("tramos").append(tramo);
  return tramo;
});

// Permite abrir la página directo en una foto, por ejemplo index.html#foto-04
planos.forEach((plano, i) => {
  if (plano.tipo === "foto") tramos[i].id = plano.foto.id;
  if (plano.tipo === "capitulo") tramos[i].id = plano.datos.id;
});

/* ---------- Medidas ---------- */
let esCelular = false;
let anchoVentana = 0;

function medir() {
  anchoVentana = window.innerWidth;
  const altoVentana = window.innerHeight;
  esCelular = anchoVentana <= 760;
  const anchoMax = esCelular ? anchoVentana * 0.82 : anchoVentana * 0.42;
  const altoMax = esCelular ? altoVentana * 0.5 : altoVentana * 0.76;

  planos.forEach((plano, i) => {
    if (plano.tipo !== "foto") return;
    const altoVisible = plano.foto.alto * (plano.foto.recorte || 1);
    const escala = Math.min(anchoMax / plano.foto.ancho, altoMax / altoVisible);
    plano.w = Math.round(plano.foto.ancho * escala);
    plano.h = Math.round(altoVisible * escala);
    elementos[i].style.width = `${plano.w}px`;
    elementos[i].style.height = `${plano.h}px`;
  });
  objetivo = leerObjetivo();
}

/* ---------- Cámara ---------- */
let camara = 0;
let objetivo = 0;
let activo = -1;
let ratonX = 0;
let ratonY = 0;
let origenX = 0;
let origenY = 0;
const maximo = (planos.length - 1) * DISTANCIA;

function leerObjetivo() {
  const alto = tramos[0].offsetHeight || window.innerHeight;
  return limitar((window.scrollY / alto) * DISTANCIA, 0, maximo);
}

function pintarPlano(plano, el, i) {
  const rel = camara - i * DISTANCIA; // negativo: todavía adelante; positivo: ya pasó
  const t = rel / DISTANCIA;
  const adelante = Math.max(0, -t);
  const pasado = Math.max(0, t);
  const caida = plano.tipo === "foto" ? 0.72 : 1.6; // los títulos aparecen más tarde, para no cruzarse con las frases
  const opacidad = t <= 0 ? 1 - adelante * caida : 1 - pasado / 0.55;

  if (opacidad <= 0.01) {
    el.style.visibility = "hidden";
    return;
  }

  let x = 0;
  let y = 0;
  let giro = 0;
  if (plano.tipo === "foto") {
    // Adelante espera detrás de la foto activa, sin tapar la frase; en reposo va a su lado
    const cerca = 1 - Math.min(adelante, 1);
    const reposo = esCelular ? anchoVentana * 0.3 * (1 - cerca) : anchoVentana * 0.17 * cerca;
    x = plano.lado * (reposo + pasado * anchoVentana * 0.5);
    y = esCelular ? -window.innerHeight * 0.08 : 0;
    giro = plano.lado * limitar(t, -1.2, 0.8) * -14;
  }

  el.style.visibility = "visible";
  el.style.opacity = opacidad.toFixed(3);
  el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${rel.toFixed(1)}px) rotateY(${giro.toFixed(2)}deg)`;
  el.style.pointerEvents = Math.abs(t) < 0.35 ? "auto" : "none";
}

function pintar() {
  elementos.forEach((el, i) => pintarPlano(planos[i], el, i));

  const cercano = limitar(Math.round(camara / DISTANCIA), 0, planos.length - 1);
  const distancia = Math.abs(camara / DISTANCIA - cercano);
  $("frase").style.opacity = planos[cercano].tipo === "foto" ? limitar(1 - distancia / 0.32, 0, 1) : 0;
  $("progreso-linea").style.transform = `scaleX(${camara / maximo})`;
  if (cercano !== activo) cambiarActivo(cercano);
}

let cuadroAnterior = 0;

function animar(ahora) {
  if (document.documentElement.classList.contains("en-galaxia")) {
    requestAnimationFrame(animar);
    return;
  }
  objetivo = leerObjetivo();
  const dt = Math.min(0.25, (ahora - cuadroAnterior) / 1000 || 0);
  cuadroAnterior = ahora;
  camara += (objetivo - camara) * (1 - Math.exp(-dt * 5.3));
  if (Math.abs(objetivo - camara) < 0.05) camara = objetivo;

  // La sala se inclina apenas con el movimiento del ratón
  origenX += (ratonX - origenX) * 0.06;
  origenY += (ratonY - origenY) * 0.06;
  $("escenario").style.perspectiveOrigin = `${50 + origenX * 7}% ${50 + origenY * 7}%`;

  pintar();
  requestAnimationFrame(animar);
}

/* ---------- Lo que cambia con cada plano ---------- */
let capaVisible = "a";

// Fondo propio de cada foto: el color principal rodea la foto y el segundo la acompaña
function fondoDe(paleta, lado) {
  if (window.innerWidth <= 760) {
    return `radial-gradient(95% 55% at 50% 32%, ${paleta.halo}, transparent 72%), radial-gradient(90% 40% at 50% 104%, ${paleta.halo2}aa, transparent 75%), ${paleta.base}`;
  }
  const x = lado > 0 ? 68 : lado < 0 ? 32 : 50;
  return `radial-gradient(58% 85% at ${x}% 45%, ${paleta.halo}, transparent 72%), radial-gradient(45% 70% at ${100 - x}% 92%, ${paleta.halo2}aa, transparent 72%), ${paleta.base}`;
}

function aplicarColores(paleta, lado) {
  const siguiente = capaVisible === "a" ? "b" : "a";
  const entra = $(`ambiente-${siguiente}`);
  entra.style.background = fondoDe(paleta, lado);
  entra.style.opacity = 1;
  $(`ambiente-${capaVisible}`).style.opacity = 0;
  capaVisible = siguiente;

  const raiz = document.documentElement.style;
  raiz.setProperty("--acento", paleta.acento);
  raiz.setProperty("--texto", paleta.texto);
  document.querySelector('meta[name="theme-color"]').content = paleta.base;
}

function paletaDe(i) {
  if (planos[i].tipo === "foto") return planos[i].foto.paleta;
  const proxima = planos.slice(i).find((plano) => plano.tipo === "foto");
  return proxima ? proxima.foto.paleta : PALETA_FIN;
}

function escribirFrase(plano) {
  const frase = $("frase");
  frase.classList.toggle("izquierda", plano.lado > 0);
  frase.classList.toggle("derecha", plano.lado < 0);
  $("frase-numero").textContent = `Nº ${String(plano.numero).padStart(2, "0")}`;
  const texto = $("frase-texto");
  texto.textContent = "";
  plano.foto.frase.split(" ").forEach((palabra, i) => {
    const span = document.createElement("span");
    span.style.setProperty("--i", i);
    span.textContent = palabra;
    texto.append(span, " ");
  });
}

function cambiarActivo(i) {
  activo = i;
  const plano = planos[i];
  if (plano.tipo === "foto") escribirFrase(plano);

  aplicarColores(paletaDe(i), plano.lado);

  $("ubicacion-capitulo").textContent = plano.capitulo;
  $("ubicacion-numero").textContent = plano.tipo === "foto" ? `${plano.numero} de ${todas.length}` : "";
  elementos.forEach((el, n) => {
    el.querySelectorAll("button").forEach((boton) => { boton.tabIndex = n === i ? 0 : -1; });
  });
  if (i > 0) $("pista").classList.add("oculta");
}

function irA(i, suave = true) {
  const destino = limitar(i, 0, planos.length - 1);
  tramos[destino].scrollIntoView({ behavior: suave && !sinMovimiento ? "smooth" : "auto" });
}

/* ---------- Entrada ---------- */
function prepararEntrada() {
  const titulo = $("entrada-titulo");
  const letras = [...titulo.textContent];
  titulo.textContent = "";
  letras.forEach((letra, i) => {
    const span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.style.setProperty("--i", i);
    span.textContent = letra;
    titulo.append(span);
  });
  $("entrada-datos").textContent = `${todas.length} fotos · ${CAPITULOS.length} capítulos`;
  if (esCelular) $("pista").textContent = "Desliza";
  $("entrada").style.background = fondoDe(FOTO_PORTADA.paleta, 0);

  const entrar = (conMusica) => {
    if (conMusica) ponerMusica();
    document.documentElement.classList.remove("en-entrada");
    $("entrada").classList.add("saliendo");
  };
  $("entrar-musica").addEventListener("click", () => entrar(true));
  $("entrar-silencio").addEventListener("click", () => entrar(false));

  if (location.hash) entrarDirecto();
}

function entrarDirecto() {
  document.documentElement.classList.remove("en-entrada");
  $("entrada").hidden = true;
  $("entrada").style.display = "none";
  const destino = document.getElementById(location.hash.slice(1));
  if (destino) destino.scrollIntoView();
}

/* ---------- Música ---------- */
const musica = $("musica");

function ponerMusica() {
  musica.volume = 0.6;
  musica.play().catch(sinMusica);
}

function textoMusica(texto) {
  document.querySelectorAll(".boton-musica-texto").forEach((t) => { t.textContent = texto; });
}

function sinMusica() {
  textoMusica("Música no disponible");
  document.querySelectorAll(".boton-musica").forEach((b) => { b.disabled = true; });
}

function activarMusica() {
  const botones = document.querySelectorAll(".boton-musica");
  botones.forEach((boton) => boton.addEventListener("click", () => {
    if (musica.paused) ponerMusica();
    else musica.pause();
  }));
  musica.addEventListener("play", () => {
    textoMusica("Pausar música");
    botones.forEach((boton) => boton.classList.add("sonando"));
  });
  musica.addEventListener("pause", () => {
    textoMusica("Poner música");
    botones.forEach((boton) => boton.classList.remove("sonando"));
  });
  musica.addEventListener("error", sinMusica);
}

/* ---------- Foto ampliada ---------- */
function activarVisor() {
  const visor = $("visor");
  let actual = 0;
  let inicioX = null;

  function mostrar(indice) {
    actual = (indice + todas.length) % todas.length;
    const foto = todas[actual];
    visor.style.background = fondoDe(foto.paleta, 0);
    $("visor-img").src = rutaDe(foto);
    $("visor-img").alt = foto.alt;
    $("visor-frase").textContent = foto.frase;
    $("visor-contador").textContent = `${actual + 1} de ${todas.length}`;
  }

  window.abrirVisor = (id) => {
    mostrar(todas.findIndex((foto) => foto.id === id));
    visor.showModal();
  };

  escena.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-foto]");
    if (!boton) return;
    mostrar(todas.findIndex((foto) => foto.id === boton.dataset.foto));
    visor.showModal();
  });

  $("visor-cerrar").addEventListener("click", () => visor.close());
  $("visor-anterior").addEventListener("click", () => mostrar(actual - 1));
  $("visor-siguiente").addEventListener("click", () => mostrar(actual + 1));
  visor.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft") mostrar(actual - 1);
    if (evento.key === "ArrowRight") mostrar(actual + 1);
  });
  $("visor-area").addEventListener("click", (evento) => {
    if (evento.target === $("visor-area")) visor.close();
  });
  $("visor-area").addEventListener("pointerdown", (evento) => { inicioX = evento.clientX; });
  $("visor-area").addEventListener("pointerup", (evento) => {
    if (inicioX === null) return;
    const recorrido = evento.clientX - inicioX;
    inicioX = null;
    if (Math.abs(recorrido) > 50) mostrar(actual + (recorrido < 0 ? 1 : -1));
  });
}

/* ---------- Todas las fotos ---------- */
function activarIndice() {
  const indice = $("indice");
  const lista = $("indice-lista");
  const grupos = [{ titulo: "Portada", fotos: [FOTO_PORTADA] }, ...CAPITULOS];

  grupos.forEach((grupo) => {
    const titulo = document.createElement("p");
    titulo.className = "rotulo indice-capitulo";
    titulo.textContent = grupo.titulo;
    const fotos = document.createElement("div");
    fotos.className = "indice-fotos";
    grupo.fotos.forEach((foto) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.setAttribute("aria-label", `Ir a la foto: ${foto.frase}`);
      const imagen = document.createElement("img");
      imagen.src = rutaDe(foto);
      imagen.alt = "";
      imagen.loading = "lazy";
      boton.append(imagen);
      boton.addEventListener("click", () => {
        indice.close();
        irA(planos.findIndex((plano) => plano.foto === foto), false);
      });
      fotos.append(boton);
    });
    lista.append(titulo, fotos);
  });

  $("abrir-indice").addEventListener("click", () => indice.showModal());
  $("indice-cerrar").addEventListener("click", () => indice.close());
}

/* ---------- Controles generales ---------- */
function activarControles() {
  const hayDialogoAbierto = () => $("visor").open || $("indice").open;

  window.addEventListener("keydown", (evento) => {
    const clases = document.documentElement.classList;
    if (hayDialogoAbierto() || clases.contains("en-entrada") || clases.contains("en-galaxia")) return;
    if (evento.key === "ArrowDown" || evento.key === "ArrowRight") {
      evento.preventDefault();
      irA(activo + 1);
    }
    if (evento.key === "ArrowUp" || evento.key === "ArrowLeft") {
      evento.preventDefault();
      irA(activo - 1);
    }
  });

  window.addEventListener("pointermove", (evento) => {
    if (evento.pointerType !== "mouse") return;
    ratonX = evento.clientX / window.innerWidth - 0.5;
    ratonY = evento.clientY / window.innerHeight - 0.5;
  });

  window.addEventListener("resize", medir);
  $("ir-inicio").addEventListener("click", () => irA(0));
  $("volver").addEventListener("click", () => irA(0));
}

function crearGrano() {
  const lienzo = document.createElement("canvas");
  lienzo.width = lienzo.height = 160;
  const contexto = lienzo.getContext("2d");
  const imagen = contexto.createImageData(160, 160);
  for (let i = 0; i < imagen.data.length; i += 4) {
    const valor = Math.random() * 255;
    imagen.data[i] = imagen.data[i + 1] = imagen.data[i + 2] = valor;
    imagen.data[i + 3] = 255;
  }
  contexto.putImageData(imagen, 0, 0);
  $("grano").style.backgroundImage = `url(${lienzo.toDataURL()})`;
}

/* ---------- Arranque ---------- */
medir();
prepararEntrada();
activarMusica();
activarVisor();
activarIndice();
activarControles();

if (sinMovimiento) {
  document.documentElement.classList.add("sin-movimiento");
  aplicarColores(PALETA_FIN, 0);
  $("ubicacion-capitulo").textContent = "Mirely";
} else {
  crearGrano();
  camara = leerObjetivo();
  pintar();
  requestAnimationFrame(animar);
}
