// =============================================
// Este arquivo monta as páginas e as animações.
// Você não precisa mexer aqui para adicionar projetos.
// =============================================

const $ = (id) => document.getElementById(id);
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function imagem(src, alt) {
  return `<div class="imagem-caixa" data-nome="${alt}">
    <img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()">
  </div>`;
}
function linkWhats() {
  return CONFIG.whatsapp
    ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Olá! Vi seu portfólio e quero um orçamento.")}`
    : "";
}

// ---------- Partes comuns ----------
$("logo").textContent = CONFIG.nome.toLowerCase();
$("rodape").innerHTML = `© ${new Date().getFullYear()} ${CONFIG.nome} · ${CONFIG.funcao} · feito com código e café ☕`;

// Topo muda ao rolar
const topo = $("topo");
addEventListener("scroll", () => topo.classList.toggle("rolou", scrollY > 30), { passive: true });

// =============================================
// ANIMAÇÃO 1 — Fundo: rede de pontos que reage ao mouse
// =============================================
(function redeDePontos() {
  const canvas = $("fundo");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const brilho = document.querySelector(".brilho");
  let w, h, pontos = [];
  const mouse = { x: -9999, y: -9999 };

  function criar() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const qtd = Math.min(110, Math.floor((w * h) / 14000));
    pontos = Array.from({ length: qtd }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  }

  function desenhar() {
    ctx.clearRect(0, 0, w, h);
    for (const p of pontos) {
      // mouse puxa os pontos de leve
      const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
      if (d < 200) { p.x += dx * 0.012; p.y += dy * 0.012; }
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    // linhas entre pontos próximos
    for (let i = 0; i < pontos.length; i++) {
      const a = pontos[i];
      for (let j = i + 1; j < pontos.length; j++) {
        const b = pontos[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 130) {
          ctx.strokeStyle = `rgba(80,130,255,${(1 - d / 130) * 0.28})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // linhas mais fortes até o mouse
      const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (dm < 180) {
        ctx.strokeStyle = `rgba(110,162,255,${(1 - dm / 180) * 0.7})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = dm < 180 ? "#9cc0ff" : "rgba(110,162,255,.7)";
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!semMovimento) requestAnimationFrame(desenhar);
  }

  addEventListener("resize", criar);
  addEventListener("mousemove", (e) => {
    mouse.x = e.clientX; mouse.y = e.clientY;
    if (brilho) brilho.style.transform = `translate(${e.clientX - 350}px, ${e.clientY - 350}px)`;
  });
  addEventListener("mouseout", () => { mouse.x = mouse.y = -9999; });
  criar();
  requestAnimationFrame(desenhar);
})();

// =============================================
// ANIMAÇÃO 2b — Letras subindo uma por uma com desvanecer
// =============================================
// cores: lista de cores para pintar as letras durante a animação (degradê)
function letrasSubindo(el, texto, atrasoInicial = 0, intervalo = 70, cores = null) {
  const letras = [...texto];
  el.innerHTML = "";
  if (cores) el.classList.add("animando");
  letras.forEach((c, i) => {
    const s = document.createElement("span");
    s.className = "letra-sobe";
    s.textContent = c === " " ? " " : c;
    s.style.animationDelay = (semMovimento ? 0 : atrasoInicial + i * intervalo) + "ms";
    if (cores) s.style.color = misturar(cores, letras.length > 1 ? i / (letras.length - 1) : 0);
    el.appendChild(s);
  });
  if (cores) {
    // quando a última letra terminar, liga o degradê que corre pelo nome
    const fim = semMovimento ? 0 : atrasoInicial + (letras.length - 1) * intervalo + 1000;
    setTimeout(() => { el.classList.remove("animando"); el.textContent = texto; }, fim);
  }
}
function misturar(cores, t) {
  const hex = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));
  const pos = t * (cores.length - 1), i = Math.min(Math.floor(pos), cores.length - 2), f = pos - i;
  const a = hex(cores[i]), b = hex(cores[i + 1]);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(",")})`;
}

// =============================================
// ANIMAÇÃO 3 — Revelar ao rolar a página
// =============================================
const observador = new IntersectionObserver((itens) => {
  itens.forEach((item) => {
    if (item.isIntersecting) { item.target.classList.add("visivel"); observador.unobserve(item.target); }
  });
}, { threshold: 0.12 });
function observarRevela() {
  document.querySelectorAll(".revela").forEach((el, i) => {
    if (el.dataset.atraso) el.style.transitionDelay = el.dataset.atraso + "ms";
    observador.observe(el);
  });
}

// =============================================
// ANIMAÇÃO 4 — Luz que segue o mouse + inclinação 3D nos cards
// =============================================
function ativarLuz() {
  document.querySelectorAll(".luz").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      el.style.setProperty("--mx", x + "px");
      el.style.setProperty("--my", y + "px");
      if (el.classList.contains("inclina") && !semMovimento) {
        const rx = ((y / r.height) - 0.5) * -8, ry = ((x / r.width) - 0.5) * 8;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      }
    });
    el.addEventListener("mouseleave", () => { if (el.classList.contains("inclina")) el.style.transform = ""; });
  });
}

// =============================================
// PÁGINA INICIAL
// =============================================
if ($("lista-projetos")) {
  document.title = `${CONFIG.nome} · ${CONFIG.funcao}`;

  // Nome: letras subindo com desvanecer
  const h1 = $("nome-completo");
  const nomeTodo = [CONFIG.nome, CONFIG.sobrenome].filter(Boolean).join(" ");
  h1.innerHTML = `<span class="nome-gradiente"></span>`;
  letrasSubindo(h1.firstChild, nomeTodo + ".", 200, 90, ["#ffffff", "#6ea2ff", "#2b6cff"]);

  // Palavras subindo com desvanecer: a atual sobe e some, a próxima entra por baixo
  (function palavrasSubindo() {
    const caixa = $("digitando");
    const spans = CONFIG.digitando.map((t) => {
      const s = document.createElement("span");
      s.className = "palavra"; s.textContent = t;
      caixa.appendChild(s);
      return s;
    });
    let atual = 0;
    const ajustarLargura = () => { caixa.style.width = spans[atual].offsetWidth + "px"; };

    function mostrar(i) {
      spans.forEach((s) => s.classList.remove("saindo"));
      spans[atual].classList.remove("ativa");
      if (i !== atual) spans[atual].classList.add("saindo");
      atual = i;
      spans[atual].classList.add("ativa");
      ajustarLargura();
    }
    addEventListener("resize", ajustarLargura);
    setTimeout(() => mostrar(0), 1500);
    if (!semMovimento && spans.length > 1) {
      setTimeout(() => setInterval(() => mostrar((atual + 1) % spans.length), 2800), 1500);
    }
  })();

  $("frase").textContent = CONFIG.frase;
  $("texto-sobre").textContent = CONFIG.sobre;

  // Foto ou inicial
  const foto = $("foto");
  const mostrarInicial = () => { foto.innerHTML = `<span class="inicial">${CONFIG.nome[0]}</span>`; };
  if (CONFIG.foto) {
    const img = new Image();
    img.alt = CONFIG.nome;
    img.onload = () => { foto.innerHTML = ""; foto.appendChild(img); };
    img.onerror = mostrarInicial;
    img.src = CONFIG.foto;
  } else mostrarInicial();

  const whats = linkWhats();
  if (whats) $("hero-whats").href = whats; else $("hero-whats").remove();

  // Faixa de tecnologias (duplicada para girar sem emenda)
  const tecs = CONFIG.tecnologias.map((t) => `<span>${t}</span>`).join("");
  $("faixa").innerHTML = tecs + tecs;

  // Serviços
  $("lista-servicos").innerHTML = CONFIG.servicos.map((s, i) => `
    <div class="servico luz revela" data-atraso="${i * 100}">
      <div class="icone">${s.icone}</div>
      <h3>${s.titulo}</h3>
      <p>${s.texto}</p>
    </div>`).join("");

  // Projetos
  $("lista-projetos").innerHTML = PROJETOS.map((p, i) => `
    <a class="card luz inclina revela" data-atraso="${i * 120}" href="projeto.html?id=${p.id}">
      ${imagem(p.capa, p.nome)}
      <div class="card-texto">
        <div class="card-topo">
          <span class="etiqueta">${p.tipo}</span>
          <span class="abrir">→</span>
        </div>
        <h3>${p.nome}</h3>
        <p>${p.resumo}</p>
        <div class="mini-tags">${p.tecnologias.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>
    </a>`).join("");

  // Terminal que se escreve sozinho na seção "Sobre"
  (function terminal() {
    const el = $("terminal");
    const linhas = [
      `<span class="c">// sobre mim</span>`,
      `<span class="k">const</span> dev = {`,
      `  nome: <span class="s">"${CONFIG.nome}"</span>,`,
      `  foco: <span class="s">"${CONFIG.funcao}"</span>,`,
      `  stack: [${CONFIG.tecnologias.slice(0, 4).map((t) => `<span class="s">"${t}"</span>`).join(", ")}],`,
      `  disponivel: <span class="k">true</span>,`,
      `};`,
    ];
    let iniciou = false;
    new IntersectionObserver(([e], obs) => {
      if (!e.isIntersecting || iniciou) return;
      iniciou = true; obs.disconnect();
      let i = 0;
      (function proxima() {
        if (i >= linhas.length) return;
        el.innerHTML += linhas[i++] + "\n";
        setTimeout(proxima, semMovimento ? 0 : 260);
      })();
    }, { threshold: 0.3 }).observe(el);
  })();

  // Contato
  $("contatos").innerHTML = [
    whats && `<a class="botao" href="${whats}" target="_blank" rel="noopener">WhatsApp <span class="seta">→</span></a>`,
    CONFIG.email && `<a class="botao botao-vazio" href="mailto:${CONFIG.email}">${CONFIG.email}</a>`,
    CONFIG.instagram && `<a class="botao botao-vazio" href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener">@${CONFIG.instagram}</a>`,
    CONFIG.github && `<a class="botao botao-vazio" href="https://github.com/${CONFIG.github}" target="_blank" rel="noopener">GitHub</a>`,
  ].filter(Boolean).join("");
}

// =============================================
// PÁGINA DE UM PROJETO
// =============================================
if ($("pagina-projeto")) {
  const id = new URLSearchParams(location.search).get("id");
  const p = PROJETOS.find((x) => x.id === id);

  if (!p) {
    $("pagina-projeto").innerHTML = `<p>Projeto não encontrado. <a href="index.html">Voltar</a></p>`;
  } else {
    document.title = `${p.nome} · ${CONFIG.nome}`;
    $("pagina-projeto").innerHTML = `
      <span class="etiqueta revela">${p.tipo}</span>
      <h1 id="titulo-projeto">${p.nome}</h1>
      <p class="resumo revela">${p.resumo}</p>
      ${p.link ? `<a class="botao revela" href="${p.link}" target="_blank" rel="noopener">Ver site no ar <span class="seta">↗</span></a>` : ""}

      <div class="galeria">${p.imagens.map((src, i) => `<div class="revela" data-atraso="${i * 100}">${imagem(src, p.nome)}</div>`).join("")}</div>

      <div class="duas-colunas revela">
        <div><h2>O objetivo</h2><p>${p.objetivo}</p></div>
        <div><h2>A solução</h2><p>${p.solucao}</p></div>
      </div>

      <h2 class="revela">Funcionalidades</h2>
      <ul class="lista-func">${p.funcionalidades.map((f, i) => `<li class="luz revela" data-atraso="${i * 60}"><span>${f}</span></li>`).join("")}</ul>

      <h2 class="revela">Tecnologias</h2>
      <div class="tags revela">${p.tecnologias.map((t) => `<span class="tag">${t}</span>`).join("")}</div>

      <div class="cta luz revela">
        <p>Quer um projeto assim para o seu negócio?</p>
        ${linkWhats() ? `<a class="botao" href="${linkWhats()}" target="_blank" rel="noopener">Pedir orçamento <span class="seta">→</span></a>` : ""}
      </div>`;

    letrasSubindo($("titulo-projeto"), p.nome, 100, 45);

    // Clique na imagem para ampliar
    const zoom = $("zoom");
    document.querySelectorAll(".galeria img").forEach((img) => {
      img.parentElement.addEventListener("click", () => {
        zoom.querySelector("img").src = img.src;
        zoom.classList.add("aberto");
      });
    });
    zoom.addEventListener("click", () => zoom.classList.remove("aberto"));
    addEventListener("keydown", (e) => { if (e.key === "Escape") zoom.classList.remove("aberto"); });
  }
}

observarRevela();
ativarLuz();
