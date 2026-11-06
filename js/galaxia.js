// Galaxia 3D de Mirely. Usa las fotos, frases y paletas definidas en app.js (la lista "todas").
(function () {
  const THREE_URL = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
  const FRASES_ANILLOS = [
    "BRILLA SIEMPRE  ✦  CREE EN TI  ✦  SIGUE ADELANTE  ✦  ",
    "ERES ÚNICA  ✦  TU LUZ ES TUYA  ✦  NUNCA TE RINDAS  ✦  ",
    "SUEÑA EN GRANDE  ✦  FLORECE A TU RITMO  ✦  TODO ES POSIBLE  ✦  "
  ];
  const RADIO_GALAXIA = 34;

  const raiz = document.getElementById("galaxia");
  const html = document.documentElement;
  const el = (id) => document.getElementById(id);
  const reposo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esCel = () => window.innerWidth <= 760;
  const suavizar = (x) => x * x * (3 - 2 * x);
  const limitar = (v, a, b) => Math.min(b, Math.max(a, v));

  let T; // THREE
  let renderer, scene, camera;
  let galaxia, nebulosa, nucleo, corazon, columna, estelas, anillos = [];
  let planetas = [];
  let construida = false;
  let activa = false;
  let tiempo = 0;
  let escalaTiempo = 1;
  let ultimo = 0;
  let viaje = 0; // segundos desde que se entró
  let seleccion = -1;
  let cursorSobre = -1;

  // Cámara orbital
  const cam = { theta: 0.6, phi: 1.12, dist: 36, thetaO: 0.6, phiO: 1.12, distO: 36 };
  let objetivo, objetivoFinal;
  let tinte, tinteFinal, fondo, fondoFinal;

  function velocidad(r) { return 0.55 / Math.sqrt(r + 1.5); }

  function cargarScript(url) {
    return new Promise((ok, mal) => {
      const s = document.createElement("script");
      s.src = url;
      s.onload = ok;
      s.onerror = () => mal(new Error(url));
      document.head.append(s);
    });
  }

  function aviso(texto) {
    el("galaxia-aviso").textContent = texto || "";
    el("galaxia-aviso").hidden = !texto;
  }

  /* ---------- Partículas de la espiral ---------- */
  const SOMBREADOR_PUNTOS = `
    attribute float aR; attribute float aA; attribute float aY; attribute float aS; attribute float aP;
    attribute vec3 aC;
    uniform float uT; uniform float uPx; uniform float uAlfa; uniform vec3 uTinte;
    varying vec3 vC; varying float vB;
    void main() {
      float a = aA + uT * 0.55 / sqrt(aR + 1.5);
      vec3 p = vec3(cos(a) * aR, aY, sin(a) * aR);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = clamp(aS * uPx * 340.0 / -mv.z, 1.3 * uPx, 16.0 * uPx);
      vC = mix(aC, uTinte, 0.35 * step(0.001, length(uTinte)));
      vB = (0.95 + 0.35 * sin(uT * 2.4 + aP)) * uAlfa;
    }`;
  const FRAGMENTO_PUNTOS = `
    varying vec3 vC; varying float vB;
    void main() {
      float d = length(gl_PointCoord - 0.5);
      float a = smoothstep(0.5, 0.06, d);
      gl_FragColor = vec4(vC * vB * a, a);
    }`;

  function colorPorRadio(r, azar) {
    const paradas = [
      [0, new T.Color("#ffe2a8")],
      [0.16, new T.Color("#ffb37a")],
      [0.38, new T.Color("#ff6d9f")],
      [0.66, new T.Color("#a768ff")],
      [1, new T.Color("#59a6ff")]
    ];
    const t = limitar(r / RADIO_GALAXIA, 0, 1);
    let i = 0;
    while (i < paradas.length - 2 && t > paradas[i + 1][0]) i++;
    const f = (t - paradas[i][0]) / (paradas[i + 1][0] - paradas[i][0]);
    const c = paradas[i][1].clone().lerp(paradas[i + 1][1], f);
    if (azar < 0.12) c.lerp(new T.Color("#ffffff"), 0.7);
    return c;
  }

  function normal() { return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5; }

  function crearGalaxia() {
    const total = esCel() ? 32000 : 75000;
    const R = new Float32Array(total), A = new Float32Array(total), Y = new Float32Array(total);
    const S = new Float32Array(total), P = new Float32Array(total), C = new Float32Array(total * 3);
    const posiciones = new Float32Array(total * 3);

    for (let i = 0; i < total; i++) {
      let r, a, y, size;
      if (i % 9 === 0) {
        // Disco de acreción alrededor del agujero negro
        r = 1.5 + Math.pow(Math.random(), 1.8) * 3.2;
        a = Math.random() * Math.PI * 2;
        y = normal() * 0.08;
        size = 0.07 + Math.random() * 0.06;
      } else {
        const brazo = i % 3;
        r = 2.2 + Math.pow(Math.random(), 1.45) * (RADIO_GALAXIA - 2.2);
        const dispersion = normal() * (0.28 + 1.1 / (r * 0.35 + 1));
        a = (brazo * Math.PI * 2) / 3 + r * 0.3 + dispersion;
        y = normal() * (0.22 + 1.1 * Math.exp(-r / 7));
        size = 0.05 + Math.random() * Math.random() * 0.14;
      }
      R[i] = r; A[i] = a; Y[i] = y; S[i] = size; P[i] = Math.random() * 6.28;
      const color = i % 9 === 0 ? new T.Color("#ffd27a").lerp(new T.Color("#ff8a4c"), (r - 1.5) / 3.2) : colorPorRadio(r, Math.random());
      C.set([color.r, color.g, color.b], i * 3);
    }

    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(posiciones, 3));
    g.setAttribute("aR", new T.BufferAttribute(R, 1));
    g.setAttribute("aA", new T.BufferAttribute(A, 1));
    g.setAttribute("aY", new T.BufferAttribute(Y, 1));
    g.setAttribute("aS", new T.BufferAttribute(S, 1));
    g.setAttribute("aP", new T.BufferAttribute(P, 1));
    g.setAttribute("aC", new T.BufferAttribute(C, 3));

    const m = new T.ShaderMaterial({
      vertexShader: SOMBREADOR_PUNTOS,
      fragmentShader: FRAGMENTO_PUNTOS,
      uniforms: { uT: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uAlfa: { value: 0 }, uTinte: { value: tinte } },
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending
    });
    galaxia = new T.Points(g, m);
    galaxia.frustumCulled = false;
    scene.add(galaxia);
  }

  // Nubes de polvo de colores sobre los brazos de la espiral
  function crearNebulosa() {
    nebulosa = new T.Group();
    const texturas = new Map();
    for (let i = 0; i < 110; i++) {
      const r = 3 + Math.pow(Math.random(), 0.8) * (RADIO_GALAXIA - 3);
      const a = ((i % 3) * Math.PI * 2) / 3 + r * 0.3 + normal() * 0.3;
      const color = "#" + colorPorRadio(r, 1).getHexString();
      if (!texturas.has(color)) texturas.set(color, texturaBrillo(color));
      const nube = new T.Sprite(new T.SpriteMaterial({ map: texturas.get(color), blending: T.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }));
      const tam = 5 + Math.random() * 7 + r * 0.12;
      nube.scale.set(tam, tam, 1);
      nube.position.set(Math.cos(a) * r, normal() * 0.4, Math.sin(a) * r);
      nebulosa.add(nube);
    }
    scene.add(nebulosa);
  }

  function crearEstrellas() {
    const total = 3500;
    const p = new Float32Array(total * 3);
    for (let i = 0; i < total; i++) {
      const v = new T.Vector3().randomDirection ? new T.Vector3().randomDirection() : new T.Vector3(normal(), normal(), normal()).normalize();
      v.multiplyScalar(140 + Math.random() * 220);
      p.set([v.x, v.y, v.z], i * 3);
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(p, 3));
    scene.add(new T.Points(g, new T.PointsMaterial({ color: 0xcfd8ff, size: 1.3 * renderer.getPixelRatio(), sizeAttenuation: false, transparent: true, opacity: 0.75, depthWrite: false })));
  }

  function texturaBrillo(color) {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const x = c.getContext("2d");
    const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, color + "ff");
    g.addColorStop(0.35, color + "66");
    g.addColorStop(1, color + "00");
    x.fillStyle = g;
    x.fillRect(0, 0, 256, 256);
    return new T.CanvasTexture(c);
  }

  function crearNucleo() {
    nucleo = new T.Group();
    const brillo = new T.Sprite(new T.SpriteMaterial({ map: texturaBrillo("#ffb36b"), blending: T.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }));
    brillo.scale.set(13, 13, 1);
    nucleo.add(brillo);
    const agujero = new T.Mesh(new T.SphereGeometry(1.25, 48, 32), new T.MeshBasicMaterial({ color: 0x000000 }));
    agujero.renderOrder = 2;
    nucleo.add(agujero);
    const anillo = new T.Mesh(
      new T.TorusGeometry(1.42, 0.05, 12, 96),
      new T.MeshBasicMaterial({ color: 0xffe6b0, blending: T.AdditiveBlending, transparent: true, depthWrite: false })
    );
    anillo.rotation.x = Math.PI / 2;
    anillo.renderOrder = 3;
    nucleo.add(anillo);
    scene.add(nucleo);
  }

  /* ---------- Corazón y columna de luz ---------- */
  function crearCorazon() {
    const total = esCel() ? 9000 : 18000;
    const p = new Float32Array(total * 3), C = new Float32Array(total * 3), S = new Float32Array(total), F = new Float32Array(total);
    const rosa = new T.Color("#ff4fc3"), claro = new T.Color("#ffd0ef");
    for (let i = 0; i < total; i++) {
      const t = Math.random() * Math.PI * 2;
      const borde = Math.random() < 0.5;
      const k = borde ? 0.92 + Math.random() * 0.1 : Math.sqrt(Math.random()) * 0.92;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      p.set([x * k * 0.3, y * k * 0.3, normal() * 0.35], i * 3);
      const c = rosa.clone().lerp(claro, Math.random() * (borde ? 0.55 : 0.2));
      C.set([c.r, c.g, c.b], i * 3);
      S[i] = 0.07 + Math.random() * 0.1;
      F[i] = Math.random() * 6.28;
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(p, 3));
    g.setAttribute("aC", new T.BufferAttribute(C, 3));
    g.setAttribute("aS", new T.BufferAttribute(S, 1));
    g.setAttribute("aF", new T.BufferAttribute(F, 1));
    const m = new T.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uAlfa: { value: 0 } },
      vertexShader: `
        attribute vec3 aC; attribute float aS; attribute float aF;
        uniform float uT; uniform float uPx; uniform float uAlfa;
        varying vec3 vC; varying float vB;
        void main() {
          float t = fract(uT * 0.28);
          float latido = 1.0 + 0.07 * exp(-40.0 * pow(t - 0.1, 2.0)) + 0.05 * exp(-40.0 * pow(t - 0.32, 2.0));
          vec3 q = position * latido + 0.05 * vec3(sin(uT + aF), cos(uT * 1.3 + aF), sin(uT * 0.7 + aF));
          vec4 mv = modelViewMatrix * vec4(q, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aS * uPx * 300.0 / -mv.z, 1.6 * uPx, 14.0 * uPx);
          vC = aC; vB = (0.75 + 0.25 * sin(uT * 3.0 + aF)) * uAlfa;
        }`,
      fragmentShader: FRAGMENTO_PUNTOS,
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending
    });
    corazon = new T.Points(g, m);
    corazon.frustumCulled = false;
    corazon.position.y = 9.5;

    const resplandor = new T.Sprite(new T.SpriteMaterial({ map: texturaBrillo("#ff4fc3"), blending: T.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }));
    resplandor.scale.set(24, 24, 1);
    corazon.add(resplandor);

    const nombre = new T.Sprite(new T.SpriteMaterial({ map: texturaTexto("Mirely"), transparent: true, depthWrite: false }));
    nombre.scale.set(8, 2, 1);
    nombre.position.y = 0.4;
    nombre.renderOrder = 4;
    corazon.add(nombre);
    scene.add(corazon);

    // Columna de partículas que sube del agujero negro al corazón
    const n = 1500;
    const cp = new Float32Array(n * 3), fase = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      cp.set([normal() * 0.22, 0, normal() * 0.22], i * 3);
      fase[i] = Math.random();
    }
    const cg = new T.BufferGeometry();
    cg.setAttribute("position", new T.BufferAttribute(cp, 3));
    cg.setAttribute("aF", new T.BufferAttribute(fase, 1));
    columna = new T.Points(cg, new T.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uPx: { value: renderer.getPixelRatio() }, uAlfa: { value: 0 } },
      vertexShader: `
        attribute float aF; uniform float uT; uniform float uPx; uniform float uAlfa; varying vec3 vC; varying float vB;
        void main() {
          float h = fract(aF + uT * 0.12);
          vec3 q = vec3(position.x * (1.0 - h * 0.4), 1.2 + h * 5.6, position.z * (1.0 - h * 0.4));
          vec4 mv = modelViewMatrix * vec4(q, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(0.13 * uPx * 300.0 / -mv.z, 1.6 * uPx, 12.0 * uPx);
          vC = vec3(1.0, 0.36, 0.82); vB = sin(h * 3.14) * uAlfa;
        }`,
      fragmentShader: FRAGMENTO_PUNTOS,
      transparent: true, depthWrite: false, blending: T.AdditiveBlending
    }));
    columna.frustumCulled = false;
    scene.add(columna);
  }

  function texturaTexto(texto) {
    const c = document.createElement("canvas");
    c.width = 1024; c.height = 256;
    const x = c.getContext("2d");
    x.font = '170px "Italiana", "Times New Roman", serif';
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.shadowColor = "#ff4fc3";
    x.shadowBlur = 30;
    x.fillStyle = "#ffffff";
    x.fillText(texto, 512, 128);
    return new T.CanvasTexture(c);
  }

  /* ---------- Anillos de frases ---------- */
  function crearAnillos() {
    [12.5, 20, 28].forEach((radio, n) => {
      const c = document.createElement("canvas");
      c.width = 4096; c.height = 96;
      const x = c.getContext("2d");
      x.font = '500 62px "Jost", "Century Gothic", sans-serif';
      x.textBaseline = "middle";
      const base = FRASES_ANILLOS[n];
      const ancho = x.measureText(base).width;
      const veces = Math.max(1, Math.round((2 * Math.PI * radio * 36) / ancho));
      c.width = Math.min(4096, Math.ceil(ancho * veces));
      const y = c.getContext("2d");
      y.font = x.font = '500 62px "Jost", "Century Gothic", sans-serif';
      y.textBaseline = "middle";
      y.fillStyle = ["#ffd9ec", "#ffe6c2", "#d9d2ff"][n];
      y.scale(c.width / (ancho * veces), 1);
      for (let i = 0; i < veces; i++) y.fillText(base, i * ancho, 50);

      const textura = new T.CanvasTexture(c);
      textura.anisotropy = renderer.capabilities.getMaxAnisotropy();
      textura.wrapS = T.RepeatWrapping;

      const seg = 180, ancho3d = 1.05;
      const pos = [], uv = [], idx = [];
      for (let i = 0; i <= seg; i++) {
        const u = i / seg, a = -u * Math.PI * 2;
        const cx = Math.cos(a), sz = Math.sin(a);
        pos.push(cx * (radio + ancho3d / 2), 0, sz * (radio + ancho3d / 2));
        pos.push(cx * (radio - ancho3d / 2), 0, sz * (radio - ancho3d / 2));
        uv.push(u, 0, u, 1);
        if (i < seg) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
      }
      const g = new T.BufferGeometry();
      g.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
      g.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
      g.setIndex(idx);
      const anillo = new T.Mesh(g, new T.MeshBasicMaterial({ map: textura, transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending }));
      anillo.position.y = 0.5 + n * 0.25;
      anillo.userData.giro = (n % 2 ? 1 : -1) * 0.018 / (n + 1);
      anillo.renderOrder = 1;
      scene.add(anillo);
      anillos.push(anillo);
    });
  }

  /* ---------- Fotos como planetas ---------- */
  function cargarImagen(src) {
    return new Promise((ok, mal) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = mal;
      i.src = src;
    });
  }

  async function crearPlanetas() {
    const imagenes = await Promise.all(todas.map((foto) => cargarImagen(window.FOTOS_GALAXIA[foto.id])));
    planetas = todas.map((foto, i) => {
      const c = document.createElement("canvas");
      c.width = c.height = 512;
      const x = c.getContext("2d");
      x.save();
      x.shadowColor = foto.paleta.acento;
      x.shadowBlur = 34;
      x.beginPath();
      x.arc(256, 256, 216, 0, Math.PI * 2);
      x.fillStyle = foto.paleta.acento;
      x.fill();
      x.restore();
      x.save();
      x.beginPath();
      x.arc(256, 256, 208, 0, Math.PI * 2);
      x.clip();
      x.drawImage(imagenes[i], 48, 48, 416, 416);
      x.restore();
      const textura = new T.CanvasTexture(c);
      textura.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const sprite = new T.Sprite(new T.SpriteMaterial({ map: textura, transparent: true, depthWrite: false, opacity: 0 }));
      sprite.renderOrder = 5;
      const brillo = new T.Sprite(new T.SpriteMaterial({ map: texturaBrillo(foto.paleta.halo), blending: T.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0 }));
      brillo.renderOrder = 4;
      scene.add(brillo, sprite);

      // Repartidas por los tres brazos, de adentro hacia afuera
      const r = 6.5 + i * 1.75;
      const brazo = i % 3;
      const tam = 3.3 + (i % 4) * 0.28 + r * 0.03;
      return {
        foto, sprite, brillo, r, tam,
        a0: (brazo * Math.PI * 2) / 3 + r * 0.3,
        y: 0.8 + Math.sin(i * 2.4) * 0.9,
        pos: new T.Vector3(),
        escala: 1
      };
    });
  }

  /* ---------- Viaje de entrada: estrellas que se estiran ---------- */
  function crearEstelas() {
    const n = 1600;
    const p = new Float32Array(n * 6), datos = new Float32Array(n * 2), c = new Float32Array(n * 6);
    const tonos = ["#ffd28a", "#ff6d9f", "#a768ff", "#59a6ff", "#ffffff"].map((h) => new T.Color(h));
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI * 2, rad = 4 + Math.random() * 60;
      const x = Math.cos(ang) * rad, y = Math.sin(ang) * rad, z = Math.random();
      p.set([x, y, z, x, y, z], i * 6);
      datos.set([0, 1], i * 2);
      const t = tonos[i % tonos.length];
      c.set([t.r, t.g, t.b, t.r, t.g, t.b], i * 6);
    }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(p, 3));
    g.setAttribute("aCola", new T.BufferAttribute(datos, 1));
    g.setAttribute("aC", new T.BufferAttribute(c, 3));
    estelas = new T.LineSegments(g, new T.ShaderMaterial({
      uniforms: { uAvance: { value: 0 }, uLargo: { value: 0.02 }, uAlfa: { value: 0 } },
      vertexShader: `
        attribute float aCola; attribute vec3 aC; uniform float uAvance; uniform float uLargo; varying vec3 vC; varying float vL;
        void main() {
          float z = fract(position.z + uAvance);
          z = z - aCola * uLargo;
          vec4 mv = vec4(position.xy, -240.0 + z * 240.0, 1.0);
          gl_Position = projectionMatrix * mv;
          vC = aC; vL = smoothstep(0.0, 0.5, z);
        }`,
      fragmentShader: `
        uniform float uAlfa; varying vec3 vC; varying float vL;
        void main() { gl_FragColor = vec4(vC * vL * uAlfa, 1.0); }`,
      transparent: true, depthWrite: false, depthTest: false, blending: T.AdditiveBlending
    }));
    estelas.frustumCulled = false;
    scene.add(estelas);
  }

  /* ---------- Armado ---------- */
  async function construir() {
    aviso("Encendiendo la galaxia…");
    if (!window.THREE) await cargarScript(THREE_URL);
    if (!window.FOTOS_GALAXIA) await cargarScript("js/galaxia-fotos.js");
    T = window.THREE;

    renderer = new T.WebGLRenderer({ canvas: el("galaxia-lienzo"), antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, esCel() ? 1.6 : 2));
    scene = new T.Scene();
    camera = new T.PerspectiveCamera(52, 1, 0.1, 800);
    objetivo = new T.Vector3();
    objetivoFinal = new T.Vector3();
    tinte = new T.Color(0, 0, 0);
    tinteFinal = new T.Color(0, 0, 0);
    fondo = new T.Color("#04020a");
    fondoFinal = new T.Color("#04020a");

    try { await document.fonts.load('170px "Italiana"'); await document.fonts.load('500 62px "Jost"'); } catch (e) { /* usa la letra de respaldo */ }

    crearEstrellas();
    crearNebulosa();
    crearGalaxia();
    crearNucleo();
    crearCorazon();
    crearAnillos();
    crearEstelas();
    await crearPlanetas();
    medir();
    activarGestos();
    construida = true;
    aviso("");
  }

  function medir() {
    if (!renderer) return;
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  /* ---------- Bucle ---------- */
  function cuadro(ahora) {
    if (!activa) return;
    requestAnimationFrame(cuadro);
    const dt = Math.min(0.2, (ahora - ultimo) / 1000 || 0);
    const k = (r) => 1 - Math.exp(-dt * r);
    ultimo = ahora;
    viaje += dt;

    const deseada = seleccion >= 0 ? 0.04 : 1;
    escalaTiempo += (deseada - escalaTiempo) * k(3);
    tiempo += dt * escalaTiempo;

    const DUR_ESTELAS = reposo ? 0 : 2.3;
    const DUR_ENTRADA = reposo ? 0.01 : 5;
    const aparicion = suavizar(limitar((viaje - DUR_ESTELAS * 0.6) / 1.6, 0, 1));
    const llegada = suavizar(limitar(viaje / DUR_ENTRADA, 0, 1));

    // Estelas de entrada
    if (estelas) {
      const m = estelas.material.uniforms;
      const v = limitar(viaje / DUR_ESTELAS, 0, 1);
      m.uAvance.value += dt * (0.15 + v * v * 1.6);
      m.uLargo.value = 0.01 + v * v * 0.28;
      m.uAlfa.value = viaje < DUR_ESTELAS ? Math.min(1, viaje * 3) : Math.max(0, 1 - (viaje - DUR_ESTELAS) * 2.5);
      estelas.visible = m.uAlfa.value > 0.01;
    }
    if (viaje > DUR_ESTELAS * 0.72 && !raiz.dataset.destello) {
      raiz.dataset.destello = "si";
      if (!reposo) el("galaxia-destello").classList.add("activo");
    }

    // Uniformes
    galaxia.material.uniforms.uT.value = tiempo;
    galaxia.material.uniforms.uAlfa.value = aparicion;
    nebulosa.rotation.y = -tiempo * 0.09;
    nebulosa.children.forEach((nube) => { nube.material.opacity = 0.2 * aparicion * (seleccion >= 0 ? 0.45 : 1); });
    tinte.lerp(tinteFinal, k(2));
    corazon.material.uniforms.uT.value = viaje;
    corazon.material.uniforms.uAlfa.value = aparicion;
    columna.material.uniforms.uT.value = viaje;
    columna.material.uniforms.uAlfa.value = aparicion;
    corazon.children[0].material.opacity = 0.32 * aparicion;
    corazon.children[1].material.opacity = aparicion;
    nucleo.children[0].material.opacity = 0.8 * aparicion;
    nucleo.children[2].material.opacity = aparicion;
    anillos.forEach((a) => {
      a.rotation.y += a.userData.giro * dt * 6 * Math.max(escalaTiempo, 0.2);
      a.material.opacity = 0.62 * aparicion * (seleccion >= 0 ? 0.12 : 1);
    });

    // El corazón siempre mira a la cámara
    corazon.rotation.y = Math.atan2(camera.position.x - corazon.position.x, camera.position.z - corazon.position.z);

    // Planetas
    planetas.forEach((p, i) => {
      const a = p.a0 + tiempo * velocidad(p.r);
      p.pos.set(Math.cos(a) * p.r, p.y + Math.sin(tiempo * 0.6 + i) * 0.25, Math.sin(a) * p.r);
      p.sprite.position.copy(p.pos);
      p.brillo.position.copy(p.pos);
      const destino = i === seleccion ? 1.25 : i === cursorSobre ? 1.2 : 1;
      p.escala += (destino - p.escala) * k(7);
      const s = p.tam * p.escala;
      p.sprite.scale.set(s, s, 1);
      p.brillo.scale.set(s * 2.6, s * 2.6, 1);
      const entrada = limitar((viaje - DUR_ESTELAS * 0.7 - i * 0.12) / 0.8, 0, 1);
      const atenuar = seleccion >= 0 && i !== seleccion ? 0.5 : 1;
      p.sprite.material.opacity = entrada * atenuar;
      p.brillo.material.opacity = 0.75 * entrada * atenuar;
    });

    // Cámara
    if (seleccion < 0) {
      if (!reposo && !arrastrando) cam.thetaO += dt * 0.035;
      objetivoFinal.set(0, 2.5, 0);
    } else {
      const p = planetas[seleccion];
      objetivoFinal.copy(p.pos);
      objetivoFinal.y -= esCel() ? 0.9 : 0.6;
    }
    objetivo.lerp(objetivoFinal, k(3));
    cam.theta += (cam.thetaO - cam.theta) * k(3.6);
    cam.phi += (cam.phiO - cam.phi) * k(3.6);
    cam.dist += (cam.distO - cam.dist) * k(3);

    const phi = viaje < DUR_ENTRADA ? 0.3 + (cam.phi - 0.3) * llegada : cam.phi;
    const dist = viaje < DUR_ENTRADA ? 130 + (cam.dist - 130) * llegada : cam.dist;
    const theta = cam.theta - (1 - llegada) * 2.2;
    camera.position.set(
      objetivo.x + dist * Math.sin(phi) * Math.sin(theta),
      objetivo.y + dist * Math.cos(phi),
      objetivo.z + dist * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(objetivo);

    fondo.lerp(fondoFinal, k(2));
    renderer.setClearColor(fondo, 1);
    renderer.render(scene, camera);

    if (viaje > (reposo ? 0 : 3.4)) raiz.classList.add("lista");
  }

  /* ---------- Selección ---------- */
  function seleccionar(i) {
    const n = planetas.length;
    seleccion = ((i % n) + n) % n;
    const { foto } = planetas[seleccion];
    const pal = foto.paleta;
    cam.distO = esCel() ? 10.5 : 8;
    cam.phiO = 1.28;

    // La cámara se acerca desde afuera, para que el centro quede detrás de la foto
    const a = planetas[seleccion].a0 + tiempo * velocidad(planetas[seleccion].r);
    let destino = Math.atan2(Math.cos(a), Math.sin(a));
    const vueltas = Math.round((cam.thetaO - destino) / (Math.PI * 2));
    cam.thetaO = destino + vueltas * Math.PI * 2;

    tinteFinal.set(pal.halo);
    fondoFinal.set(pal.base).multiplyScalar(0.55);
    raiz.style.setProperty("--acento", pal.acento);
    raiz.style.setProperty("--texto", pal.texto);
    raiz.style.setProperty("--halo", pal.halo);
    el("galaxia-numero").textContent = `Nº ${String(seleccion + 1).padStart(2, "0")} de ${n}`;
    el("galaxia-frase").textContent = foto.frase;
    raiz.classList.add("con-foto");
  }

  function alejarse() {
    seleccion = -1;
    cam.distO = esCel() ? 62 : 38;
    cam.phiO = 1.12;
    tinteFinal.setRGB(0, 0, 0);
    fondoFinal.set("#04020a");
    raiz.classList.remove("con-foto");
  }

  /* ---------- Gestos ---------- */
  let arrastrando = false;
  const punteros = new Map();
  let movido = 0;
  let pellizco = 0;

  function plantearPlaneta(x, y) {
    const v = new T.Vector3();
    let mejor = -1, mejorD = Infinity;
    planetas.forEach((p, i) => {
      v.copy(p.pos).project(camera);
      if (v.z > 1) return;
      const sx = (v.x + 1) * 0.5 * window.innerWidth, sy = (1 - v.y) * 0.5 * window.innerHeight;
      const d = Math.hypot(sx - x, sy - y);
      const distCam = camera.position.distanceTo(p.pos);
      const radioPx = (p.tam * p.escala * 0.45 * window.innerHeight) / (2 * Math.tan((camera.fov * Math.PI) / 360) * distCam);
      if (d < Math.max(radioPx, 22) && d < mejorD) { mejor = i; mejorD = d; }
    });
    return mejor;
  }

  function activarGestos() {
    const lienzo = el("galaxia-lienzo");
    lienzo.addEventListener("pointerdown", (e) => {
      lienzo.setPointerCapture(e.pointerId);
      punteros.set(e.pointerId, { x: e.clientX, y: e.clientY });
      movido = 0;
      arrastrando = true;
      pellizco = 0;
    });
    lienzo.addEventListener("pointermove", (e) => {
      if (!punteros.has(e.pointerId)) {
        if (e.pointerType === "mouse" && construida) {
          cursorSobre = plantearPlaneta(e.clientX, e.clientY);
          lienzo.style.cursor = cursorSobre >= 0 ? "pointer" : "grab";
        }
        return;
      }
      const previo = punteros.get(e.pointerId);
      const dx = e.clientX - previo.x, dy = e.clientY - previo.y;
      previo.x = e.clientX; previo.y = e.clientY;
      movido += Math.abs(dx) + Math.abs(dy);
      if (punteros.size === 2) {
        const [a, b] = [...punteros.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pellizco) cam.distO = limitar(cam.distO * (pellizco / d), 6, 85);
        pellizco = d;
      } else {
        cam.thetaO -= dx * 0.005;
        cam.phiO = limitar(cam.phiO - dy * 0.004, 0.25, 1.52);
      }
    });
    const soltar = (e) => {
      if (!punteros.has(e.pointerId)) return;
      punteros.delete(e.pointerId);
      if (!punteros.size) {
        arrastrando = false;
        if (movido < 8 && e.type === "pointerup") {
          const i = plantearPlaneta(e.clientX, e.clientY);
          if (i >= 0) seleccionar(i);
        }
      }
      pellizco = 0;
    };
    lienzo.addEventListener("pointerup", soltar);
    lienzo.addEventListener("pointercancel", soltar);
    lienzo.addEventListener("wheel", (e) => {
      e.preventDefault();
      cam.distO = limitar(cam.distO * Math.exp(e.deltaY * 0.001), 6, 85);
    }, { passive: false });
  }

  /* ---------- Abrir y cerrar ---------- */
  async function abrir() {
    raiz.hidden = false;
    html.classList.add("en-galaxia");
    raiz.classList.remove("lista", "con-foto", "con-error");
    delete raiz.dataset.destello;
    el("galaxia-destello").classList.remove("activo");
    el("galaxia-salir").focus();
    activa = true;
    try {
      if (!construida) await construir();
    } catch (error) {
      raiz.classList.add("con-error");
      aviso("No se pudo abrir la galaxia. Revisa tu conexión a internet y vuelve a intentarlo.");
      return;
    }
    if (!activa) return;
    viaje = 0;
    seleccion = -1;
    cam.theta = cam.thetaO = 0.6;
    cam.phi = cam.phiO = 1.12;
    cam.dist = cam.distO = esCel() ? 62 : 38;
    objetivo.set(0, 2.5, 0);
    alejarse();
    medir();
    ultimo = performance.now();
    requestAnimationFrame(cuadro);
  }

  function cerrar() {
    activa = false;
    raiz.hidden = true;
    html.classList.remove("en-galaxia");
    const volver = document.getElementById("abrir-galaxia");
    if (volver) volver.focus({ preventScroll: true });
  }

  el("abrir-galaxia").addEventListener("click", abrir);
  el("galaxia-salir").addEventListener("click", cerrar);
  el("galaxia-anterior").addEventListener("click", () => construida && seleccionar(seleccion < 0 ? planetas.length - 1 : seleccion - 1));
  el("galaxia-siguiente").addEventListener("click", () => construida && seleccionar(seleccion < 0 ? 0 : seleccion + 1));
  el("galaxia-alejarse").addEventListener("click", () => construida && alejarse());
  el("galaxia-ver").addEventListener("click", () => {
    if (seleccion >= 0) window.abrirVisor(planetas[seleccion].foto.id);
  });

  window.addEventListener("keydown", (e) => {
    if (!activa || !construida || document.getElementById("visor").open) return;
    if (e.key === "ArrowRight") seleccionar(seleccion + 1);
    if (e.key === "ArrowLeft") seleccionar(seleccion < 0 ? planetas.length - 1 : seleccion - 1);
    if (e.key === "Escape") { if (seleccion >= 0) alejarse(); else cerrar(); }
  });
  window.addEventListener("resize", medir);

  // Para probar la galaxia
  window.galaxiaEstado = () => ({ activa, construida, seleccion, viaje, puntos: galaxia ? galaxia.geometry.attributes.aR.count : 0 });
})();
