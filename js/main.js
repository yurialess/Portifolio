// =============================================
// Este arquivo monta as páginas sozinho.
// Você não precisa mexer aqui para adicionar projetos.
// =============================================

const $ = (id) => document.getElementById(id);

// Se a imagem ainda não existe, mostra um quadro com o nome do projeto
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
$("logo").textContent = CONFIG.nome;
$("rodape").textContent = `© ${new Date().getFullYear()} ${CONFIG.nome} · ${CONFIG.funcao}`;

// ---------- Página inicial ----------
if ($("lista-projetos")) {
  document.title = `${CONFIG.nome} · ${CONFIG.funcao}`;
  $("funcao").textContent = CONFIG.funcao;
  $("frase").textContent = CONFIG.frase;
  $("texto-sobre").textContent = CONFIG.sobre;

  const whats = linkWhats();
  if (whats) $("hero-whats").href = whats;
  else $("hero-whats").remove();

  $("lista-projetos").innerHTML = PROJETOS.map((p) => `
    <a class="card" href="projeto.html?id=${p.id}">
      ${imagem(p.capa, p.nome)}
      <div class="card-texto">
        <span class="etiqueta">${p.tipo}</span>
        <h3>${p.nome}</h3>
        <p>${p.resumo}</p>
      </div>
    </a>`).join("");

  const contatos = [
    whats && `<a class="botao" href="${whats}" target="_blank" rel="noopener">WhatsApp</a>`,
    CONFIG.email && `<a class="botao botao-vazio" href="mailto:${CONFIG.email}">${CONFIG.email}</a>`,
    CONFIG.instagram && `<a class="botao botao-vazio" href="https://instagram.com/${CONFIG.instagram}" target="_blank" rel="noopener">@${CONFIG.instagram}</a>`,
    CONFIG.github && `<a class="botao botao-vazio" href="https://github.com/${CONFIG.github}" target="_blank" rel="noopener">GitHub</a>`,
  ].filter(Boolean);
  $("contatos").innerHTML = contatos.join("");
}

// ---------- Página de um projeto ----------
if ($("pagina-projeto")) {
  const id = new URLSearchParams(location.search).get("id");
  const p = PROJETOS.find((x) => x.id === id);

  if (!p) {
    $("pagina-projeto").innerHTML = `<p>Projeto não encontrado. <a href="index.html">Voltar</a></p>`;
  } else {
    document.title = `${p.nome} · ${CONFIG.nome}`;
    $("pagina-projeto").innerHTML = `
      <span class="etiqueta">${p.tipo}</span>
      <h1>${p.nome}</h1>
      <p class="resumo">${p.resumo}</p>
      ${p.link ? `<a class="botao" href="${p.link}" target="_blank" rel="noopener">Ver site no ar ↗</a>` : ""}

      <div class="galeria">${p.imagens.map((src) => imagem(src, p.nome)).join("")}</div>

      <div class="duas-colunas">
        <div>
          <h2>O objetivo</h2>
          <p>${p.objetivo}</p>
        </div>
        <div>
          <h2>A solução</h2>
          <p>${p.solucao}</p>
        </div>
      </div>

      <h2>Funcionalidades</h2>
      <ul class="lista-func">${p.funcionalidades.map((f) => `<li>${f}</li>`).join("")}</ul>

      <h2>Tecnologias</h2>
      <div class="tags">${p.tecnologias.map((t) => `<span class="tag">${t}</span>`).join("")}</div>

      <div class="cta">
        <p>Quer um projeto assim para o seu negócio?</p>
        ${linkWhats() ? `<a class="botao" href="${linkWhats()}" target="_blank" rel="noopener">Pedir orçamento</a>` : ""}
      </div>`;
  }
}
