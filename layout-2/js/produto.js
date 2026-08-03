/* ======================================================================
   PRODUTO.JS — comportamento da página de detalhe (produto.html)
   Depende de data.js estar carregado antes.

   Nota sobre URLs amigáveis:
   Hoje usamos "produto.html?slug=camiseta-fe" porque este é um site
   estático (sem servidor próprio de rotas). Quando migrarem para uma
   hospedagem com rotas (Next.js, Vercel, Shopify etc.), basta trocar
   esse padrão para algo como "/produtos/camiseta-fe" — o restante da
   lógica abaixo (buscar produto por slug e renderizar) continua igual.
   ====================================================================== */

document.getElementById("ano-atual").textContent = new Date().getFullYear();

const WHATSAPP_LOJA = "5532999403830";
function linkWhatsApp(mensagem) {
    return `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`;
}

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const produto = PRODUTOS.find(p => p.slug === slug);

const container = document.getElementById("produto-container");

if (!produto) {
    container.innerHTML = `
        <div style="text-align:center; padding: 60px 0;">
            <h1 style="font-size:26px; margin-bottom:16px;">Produto não encontrado</h1>
            <p style="color:var(--text-soft); margin-bottom:26px;">O produto que você procura não existe ou foi removido.</p>
            <a href="index.html#produtos" class="btn btn-gold">Ver todos os produtos</a>
        </div>
    `;
} else {
    montarPagina(produto);
}

function montarPagina(produto) {
    const colecao = COLECOES.find(c => c.id === produto.colecaoId);

    // SEO dinâmico básico
    document.title = `${produto.nome} | INSPIRA`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", produto.descricaoCurta);

    // Breadcrumb
    document.getElementById("breadcrumb-produto").textContent = produto.nome;
    const breadcrumbColecao = document.getElementById("breadcrumb-colecao");
    breadcrumbColecao.textContent = colecao ? colecao.nome : "Coleções";
    breadcrumbColecao.href = `index.html#produtos`;

    // Galeria
    document.getElementById("produto-imagem-principal").src = produto.imagemPrincipal;
    document.getElementById("produto-imagem-principal").alt = produto.nome;

    const thumbsEl = document.getElementById("produto-thumbs");
    thumbsEl.innerHTML = produto.imagens.map((img, i) => `
        <img src="${img}" alt="${produto.nome} - foto ${i + 1}" class="${i === 0 ? 'ativa' : ''}" data-img="${img}" loading="lazy">
    `).join("");

    thumbsEl.querySelectorAll("img").forEach(thumb => {
        thumb.addEventListener("click", () => {
            document.getElementById("produto-imagem-principal").src = thumb.dataset.img;
            thumbsEl.querySelectorAll("img").forEach(t => t.classList.remove("ativa"));
            thumb.classList.add("ativa");
        });
    });

    // Zoom da imagem principal via modal
    const modal = document.getElementById("modal-zoom");
    const modalImg = document.getElementById("modal-zoom-imagem");
    document.getElementById("produto-imagem-principal").addEventListener("click", () => {
        modalImg.src = document.getElementById("produto-imagem-principal").src;
        modal.classList.add("ativo");
    });
    document.getElementById("fechar-modal-zoom").addEventListener("click", () => modal.classList.remove("ativo"));
    document.getElementById("modal-zoom-overlay").addEventListener("click", () => modal.classList.remove("ativo"));

    // Informações
    document.getElementById("produto-colecao-link").textContent = colecao ? colecao.nome : "";
    document.getElementById("produto-nome").textContent = produto.nome;
    document.getElementById("produto-preco").textContent = produto.preco;
    document.getElementById("produto-descricao").textContent = produto.descricaoCompleta;

    const btnComprar = document.getElementById("produto-btn-comprar");
    btnComprar.href = produto.linkMercadoLivre;

    const btnWhatsapp = document.getElementById("produto-btn-whatsapp");
    btnWhatsapp.href = linkWhatsApp(`Olá! Tenho interesse no produto: ${produto.nome} - ${produto.preco}`);

    // Ficha técnica
    const fichaEl = document.getElementById("produto-ficha-lista");
    fichaEl.innerHTML = `
        <li><strong>Tecido:</strong> ${produto.ficha.tecido}</li>
        <li><strong>Modelagem:</strong> ${produto.ficha.modelagem}</li>
        <li><strong>Gramatura:</strong> ${produto.ficha.gramatura}</li>
        <li><strong>Cuidados:</strong> ${produto.ficha.cuidados}</li>
    `;

    // Tabela de medidas
    const temMedidaComprimento = produto.ficha.medidas.some(m => m.comprimento > 0);
    const tabelaEl = document.getElementById("produto-tabela-medidas");
    tabelaEl.innerHTML = `
        <thead>
            <tr>
                <th>Tamanho</th>
                <th>Largura (cm)</th>
                ${temMedidaComprimento ? "<th>Comprimento (cm)</th>" : ""}
            </tr>
        </thead>
        <tbody>
            ${produto.ficha.medidas.map(m => `
                <tr>
                    <td>${m.tamanho}</td>
                    <td>${m.largura}</td>
                    ${temMedidaComprimento ? `<td>${m.comprimento || "—"}</td>` : ""}
                </tr>
            `).join("")}
        </tbody>
    `;

    // Produtos relacionados (mesma coleção)
    const relacionados = PRODUTOS.filter(p => p.colecaoId === produto.colecaoId && p.id !== produto.id).slice(0, 4);
    const relacionadosEl = document.getElementById("produtos-relacionados-lista");
    const relacionadosSecao = document.getElementById("produtos-relacionados");

    if (relacionados.length) {
        relacionadosEl.innerHTML = relacionados.map(p => `
            <div class="card">
                <div class="card-image">
                    <span class="card-badge">${p.badge}</span>
                    <img src="${p.imagemPrincipal}" alt="${p.nome}" loading="lazy">
                </div>
                <div class="card-content">
                    <h3>${p.nome}</h3>
                    <p>${p.descricaoCurta}</p>
                    <div class="card-footer">
                        <span class="preco">${p.preco}</span>
                        <div class="card-buttons">
                            <a href="${p.linkMercadoLivre}" target="_blank" rel="noopener" class="btn btn-gold">
                                <i class="fa-solid fa-cart-shopping"></i> Comprar
                            </a>
                            <a href="produto.html?slug=${p.slug}" class="btn btn-outline">Ver detalhes</a>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
    } else {
        relacionadosSecao.style.display = "none";
    }

    // JSON-LD (dados estruturados de produto para SEO / Google Shopping)
    const jsonLd = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": produto.nome,
        "description": produto.descricaoCompleta,
        "image": produto.imagens,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "BRL",
            "price": produto.preco.replace("R$", "").replace(".", "").replace(",", ".").trim(),
            "availability": "https://schema.org/InStock",
            "url": produto.linkMercadoLivre
        }
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
}
