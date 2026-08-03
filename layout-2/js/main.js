/* ======================================================================
   MAIN.JS — comportamento da página inicial (index.html)
   Depende de data.js estar carregado antes (COLECOES, PRODUTOS, etc.)
   ====================================================================== */

document.getElementById("ano-atual").textContent = new Date().getFullYear();

/* Menu mobile e botão "voltar ao topo" ficam em js/ui.js,
   compartilhado entre index.html e produto.html. */

/* ----------------------------------------------------------------------
   LINK DE WHATSAPP — monta a mensagem automaticamente
   ---------------------------------------------------------------------- */
const WHATSAPP_LOJA = "5532999403830";

function linkWhatsApp(mensagem) {
    return `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`;
}

document.querySelectorAll("[data-whatsapp-generico]").forEach(el => {
    el.href = linkWhatsApp("Olá! Gostaria de mais informações sobre os produtos da INSPIRA.");
});

/* ----------------------------------------------------------------------
   RENDERIZAÇÃO — COLEÇÕES
   ---------------------------------------------------------------------- */
function renderColecoes() {
    const container = document.getElementById("lista-colecoes");
    if (!container) return;

    container.innerHTML = COLECOES.map(colecao => `
        <a class="colecao-card" href="#produtos" data-filtro-colecao="${colecao.id}">
            <img src="${colecao.imagem}" alt="Coleção ${colecao.nome} - INSPIRA" loading="lazy">
            <div class="colecao-label">
                <h3>${colecao.nome}</h3>
                <span>${colecao.descricao}</span>
            </div>
        </a>
    `).join("");

    container.querySelectorAll("[data-filtro-colecao]").forEach(card => {
        card.addEventListener("click", (e) => {
            e.preventDefault();
            const colecaoId = card.dataset.filtroColecao;
            document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
            aplicarFiltro(colecaoId);
        });
    });
}

/* ----------------------------------------------------------------------
   RENDERIZAÇÃO — PRODUTOS
   ---------------------------------------------------------------------- */
const listaProdutosEl = document.getElementById("lista-produtos");
let filtroAtivo = "todos";

function nomeColecao(colecaoId) {
    const c = COLECOES.find(c => c.id === colecaoId);
    return c ? c.nome : "";
}

function criarCardProduto(produto) {
    return `
        <div class="card">
            <div class="card-image">
                <span class="card-badge">${produto.badge}</span>
                <span class="colecao-tag">${nomeColecao(produto.colecaoId)}</span>
                <img src="${produto.imagemPrincipal}" alt="${produto.nome} - INSPIRA" loading="lazy">
            </div>

            <div class="card-content">
                <h3>${produto.nome}</h3>
                <p>${produto.descricaoCurta}</p>

                <div class="card-footer">
                    <span class="preco">${produto.preco}</span>

                    <div class="card-buttons">
                        <a href="${produto.linkMercadoLivre}" target="_blank" rel="noopener" class="btn btn-gold">
                            <i class="fa-solid fa-cart-shopping"></i> Comprar
                        </a>
                        <a href="produto.html?slug=${produto.slug}" class="btn btn-outline">
                            Ver detalhes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderizarProdutos() {
    if (!listaProdutosEl) return;

    const produtosFiltrados = filtroAtivo === "todos"
        ? PRODUTOS.filter(p => p.destaque)
        : PRODUTOS.filter(p => p.colecaoId === filtroAtivo);

    listaProdutosEl.innerHTML = produtosFiltrados.length
        ? produtosFiltrados.map(criarCardProduto).join("")
        : `<p style="grid-column:1/-1;text-align:center;color:var(--text-muted)">Nenhum produto nesta coleção ainda.</p>`;
}

function aplicarFiltro(colecaoId) {
    filtroAtivo = colecaoId;
    document.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.classList.toggle("ativo", btn.dataset.filtro === colecaoId);
    });
    renderizarProdutos();
}

function renderFiltros() {
    const container = document.getElementById("produtos-filtro");
    if (!container) return;

    const botoes = [`<button class="filtro-btn ativo" data-filtro="todos">Destaques</button>`]
        .concat(COLECOES.map(c => `<button class="filtro-btn" data-filtro="${c.id}">${c.nome}</button>`));

    container.innerHTML = botoes.join("");

    container.querySelectorAll(".filtro-btn").forEach(btn => {
        btn.addEventListener("click", () => aplicarFiltro(btn.dataset.filtro));
    });
}

/* ----------------------------------------------------------------------
   RENDERIZAÇÃO — AVALIAÇÕES
   ---------------------------------------------------------------------- */
function renderAvaliacoes() {
    const container = document.getElementById("lista-avaliacoes");
    if (!container) return;

    container.innerHTML = AVALIACOES.map(av => `
        <div class="avaliacao-card">
            <div class="avaliacao-estrelas">${"★".repeat(av.estrelas)}${"☆".repeat(5 - av.estrelas)}</div>
            <p class="avaliacao-comentario">"${av.comentario}"</p>
            <div class="avaliacao-autor">
                <img src="${av.foto}" alt="Foto de ${av.nome}" loading="lazy">
                <span>${av.nome}</span>
            </div>
        </div>
    `).join("");
}

/* ----------------------------------------------------------------------
   RENDERIZAÇÃO — FAQ (accordion)
   ---------------------------------------------------------------------- */
function renderFAQ() {
    const container = document.getElementById("lista-faq");
    if (!container) return;

    container.innerHTML = FAQ.map((item, i) => `
        <div class="faq-item" data-faq="${i}">
            <button class="faq-pergunta">
                ${item.pergunta}
                <i class="fa-solid fa-plus"></i>
            </button>
            <div class="faq-resposta">
                <p>${item.resposta}</p>
            </div>
        </div>
    `).join("");

    container.querySelectorAll(".faq-pergunta").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".faq-item").classList.toggle("aberto");
        });
    });
}

/* ----------------------------------------------------------------------
   INIT
   ---------------------------------------------------------------------- */
renderColecoes();
renderFiltros();
renderizarProdutos();
renderAvaliacoes();
renderFAQ();
