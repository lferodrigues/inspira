const topo = document.getElementById("btn-topo");
const anoAtual = document.getElementById("ano-atual");
const listaProdutos = document.getElementById("lista-produtos");

const modal = document.getElementById("modal-produto");
const fecharModalOverlay = document.getElementById("fechar-modal");
const btnFecharModal = document.getElementById("btn-fechar-modal");
const btnFecharModal2 = document.getElementById("btn-fechar-modal-2");

const modalImagem = document.getElementById("modal-imagem");
const modalNome = document.getElementById("modal-nome");
const modalDescricao = document.getElementById("modal-descricao");
const modalPreco = document.getElementById("modal-preco");
const modalWhatsapp = document.getElementById("modal-whatsapp");

// ======================================
// CONFIGURAÇÃO
// ======================================

// Coloque aqui o número do WhatsApp da loja no formato internacional.
// Exemplo Brasil: 5532999999999
const WHATSAPP_LOJA = "5532999403830";

// Lista de produtos
const produtos = [
    {
        id: 1,
        nome: "Camiseta Fé",
        descricao: "Camiseta premium com estampa cristã exclusiva, tecido confortável e acabamento de alta qualidade para o dia a dia.",
        preco: "R$ 69,90",
        imagem: "img/produto1.jpg",
        destaque: "LANÇAMENTO"
    },
    {
        id: 2,
        nome: "Moletom Inspira",
        descricao: "Moletom elegante e confortável, ideal para dias frios, com design moderno e identidade cristã.",
        preco: "R$ 129,90",
        imagem: "img/produto2.jpg",
        destaque: "DESTAQUE"
    },
    {
        id: 3,
        nome: "Boné Inspira",
        descricao: "Boné versátil e moderno para complementar seu visual com estilo, propósito e personalidade.",
        preco: "R$ 49,90",
        imagem: "img/produto3.jpg",
        destaque: "NOVO"
    },
    {
        id: 4,
        nome: "Coleção Exclusiva",
        descricao: "Peças limitadas da marca INSPIRA com visual exclusivo, acabamento premium e mensagem de fé.",
        preco: "R$ 89,90",
        imagem: "img/produto4.jpg",
        destaque: "EXCLUSIVO"
    }
];

// ======================================
// FUNÇÕES GERAIS
// ======================================

anoAtual.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topo.style.display = "flex";
    } else {
        topo.style.display = "none";
    }
});

// ======================================
// RENDERIZAÇÃO DOS PRODUTOS
// ======================================

function gerarLinkWhatsApp(produto) {
    const mensagem = `Olá! Tenho interesse no produto: ${produto.nome} - ${produto.preco}`;
    return `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`;
}

function criarCardProduto(produto) {
    return `
        <div class="card">
            <div class="card-image">
                <span class="card-badge">${produto.destaque}</span>
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>

            <div class="card-content">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>

                <div class="card-footer">
                    <span class="preco">${produto.preco}</span>

                    <div class="card-buttons">
                        <a href="${gerarLinkWhatsApp(produto)}" target="_blank" class="btn-produto">
                            <i class="fab fa-whatsapp"></i>
                            Comprar
                        </a>

                        <button class="btn-detalhes" data-id="${produto.id}">
                            Ver detalhes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderizarProdutos() {
    listaProdutos.innerHTML = produtos.map(criarCardProduto).join("");

    const botoesDetalhes = document.querySelectorAll(".btn-detalhes");

    botoesDetalhes.forEach(botao => {
        botao.addEventListener("click", () => {
            const id = Number(botao.dataset.id);
            const produto = produtos.find(item => item.id === id);

            if (produto) {
                abrirModal(produto);
            }
        });
    });
}

// ======================================
// MODAL
// ======================================

function abrirModal(produto) {
    modalImagem.src = produto.imagem;
    modalImagem.alt = produto.nome;
    modalNome.textContent = produto.nome;
    modalDescricao.textContent = produto.descricao;
    modalPreco.textContent = produto.preco;
    modalWhatsapp.href = gerarLinkWhatsApp(produto);

    modal.classList.add("ativo");
    document.body.style.overflow = "hidden";
}

function fecharModal() {
    modal.classList.remove("ativo");
    document.body.style.overflow = "";
}

fecharModalOverlay.addEventListener("click", fecharModal);
btnFecharModal.addEventListener("click", fecharModal);
btnFecharModal2.addEventListener("click", fecharModal);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("ativo")) {
        fecharModal();
    }
});



renderizarProdutos();

document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
      bloquearTela();
    }
  }, { passive: false });
  
  // Bloqueia o PrintScreen
  document.addEventListener("keydown", function (e) {
    
    if (e.key === "PrintScreen") {
      e.preventDefault();
      bloquearTela();
    }
  });
  function bloquearTela() {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#000;
        color:#fff;
        font-size:20px;
        text-align:center;
      ">
        Conteúdo protegido.<br>Ação não permitida.
      </div>
    `;
  }
  // Bloquear botão direito do mouse
  document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      alert("Função desabilitada!");
  });
  
  // Bloquear teclas de atalho relacionadas a ferramentas de desenvolvedor
  document.addEventListener("keydown", (event) => {
      if (
          event.key === "F12" || // F12 para abrir DevTools
          (event.ctrlKey && event.shiftKey && event.key === "I") || // Ctrl+Shift+I
          (event.ctrlKey && event.shiftKey && event.key === "J") || // Ctrl+Shift+J
          (event.ctrlKey && event.key === "U") || // Ctrl+U para visualizar o código-fonte
          (event.ctrlKey && event.key === "S") // Ctrl+S para salvar a página
      ) {
          event.preventDefault();
          alert("Ação bloqueada!");
      }
  });
  
  // Tentar detectar o uso das ferramentas de desenvolvedor
  (function detectDevTools() {
      const element = new Image();
      Object.defineProperty(element, 'id', {
          get: function () {
              alert("Ferramentas de desenvolvedor detectadas e bloqueadas!");
              window.location.href = "about:blank"; // Redireciona a página
          }
      });
      console.log('%c', element);
  })();
  document.addEventListener('keydown', function(event) {
      // Bloqueia Ctrl+S (salvar)
      if (event.ctrlKey && event.key === 's') {
          event.preventDefault();
          alert('A combinação Ctrl+S está desabilitada!');
      }
      // Bloqueia Ctrl+U (ver código-fonte)
      if (event.ctrlKey && event.key === 'u') {
          event.preventDefault();
          alert('A combinação Ctrl+U está desabilitada!');
      }
  });
        