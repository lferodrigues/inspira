/* ======================================================================
   DATA.JS — Fonte única de dados da INSPIRA
   ======================================================================
   Este arquivo é o "banco de dados" do site. Tanto a página inicial
   (main.js) quanto a página de produto (produto.js) leem daqui.

   Por que isso importa para o futuro:
   Quando a INSPIRA virar um e-commerce de verdade (com carrinho, checkout,
   painel administrativo etc.), a estrutura de "coleções" e "produtos"
   abaixo pode ser exportada quase 1:1 para um banco de dados real
   (Firebase, Supabase, Shopify, WooCommerce...). Você não vai precisar
   redesenhar a informação — só trocar de onde ela vem.

   COMO ADICIONAR UM PRODUTO NOVO:
   1. Copie um objeto inteiro dentro de PRODUTOS (do "{" ao "},").
   2. Troque os valores.
   3. "slug" precisa ser único e sem espaços/acentos (usado na URL).
   4. "colecaoId" precisa bater com o "id" de uma coleção lá em cima.
   5. Pronto — o produto aparece sozinho na home e ganha página própria.
   ====================================================================== */

const COLECOES = [
    {
        id: "camisetas",
        nome: "Camisetas",
        descricao: "Estampas exclusivas em algodão premium para o dia a dia.",
        imagem: "img/colecoes/produto1.jpg"
    },
    {
        id: "canecas",
        nome: "Canecas",
        descricao: "Para começar o dia com uma palavra de fé.",
        imagem: "img/colecoes/produto4.jpg"
    },
    {
        id: "lancamentos",
        nome: "Lançamentos",
        descricao: "As novidades mais recentes da marca.",
        imagem: "img/colecoes/produto3.jpg"
    },
    {
        id: "dia-dos-pais",
        nome: "Dia dos Pais",
        descricao: "Peças especiais para presentear com propósito.",
        imagem: "img/colecoes/dia-dos-pais.jpg"
    },
    {
        id: "especiais",
        nome: "Coleções Especiais",
        descricao: "Edições limitadas com design exclusivo.",
        imagem: "img/colecoes/produto2.jpg"
    }
];

const PRODUTOS = [
    {
        id: 1,
        slug: "camiseta-fe",
        nome: "Camiseta Fé",
        colecaoId: "camisetas",
        preco: "R$ 69,90",
        destaque: true,
        badge: "LANÇAMENTO",
        descricaoCurta: "Camiseta premium com estampa cristã exclusiva e tecido confortável.",
        descricaoCompleta: "A Camiseta Fé une conforto e propósito em uma peça pensada para o seu dia a dia. Estampa exclusiva desenvolvida pelo nosso time de design, com acabamento que não desbota e caimento moderno.",
        imagemPrincipal: "img/produtos/camiseta-fe/1.png",
        imagens: [
            "img/produtos/camiseta-fe/1.png",
            "img/produtos/camiseta-fe/2.png",
            "img/produtos/camiseta-fe/3.png",
            "img/produtos/camiseta-fe/4.png"
        ],
        // TODO: troque pelo link real do anúncio no Mercado Livre
        linkMercadoLivre: "https://produto.mercadolivre.com.br/SEU-LINK-CAMISETA-FE",
        ficha: {
            tecido: "100% Algodão Penteado 30.1, fio único",
            modelagem: "Unissex, corte reto, caimento moderno",
            gramatura: "180g/m²",
            cuidados: "Lavar à máquina com cores similares, não usar alvejante",
            medidas: [
                { tamanho: "P", largura: 48, comprimento: 68 },
                { tamanho: "M", largura: 51, comprimento: 70 },
                { tamanho: "G", largura: 54, comprimento: 72 },
                { tamanho: "GG", largura: 57, comprimento: 74 }
            ]
        }
    },
    {
        id: 2,
        slug: "moletom-inspira",
        nome: "Moletom Inspira",
        colecaoId: "especiais",
        preco: "R$ 129,90",
        destaque: true,
        badge: "DESTAQUE",
        descricaoCurta: "Moletom elegante e confortável, ideal para dias frios, com identidade cristã.",
        descricaoCompleta: "Um moletom pensado para quem quer levar sua fé com estilo até nos dias mais frios. Forro macio por dentro, bordado discreto e caimento premium.",
        imagemPrincipal: "img/produtos/moletom/1.jpg",
        imagens: [
            "img/produtos/moletom/1.jpg"
        ],
            
        linkMercadoLivre: "https://produto.mercadolivre.com.br/SEU-LINK-MOLETOM-INSPIRA",
        ficha: {
            tecido: "50% Algodão / 50% Poliéster, moletom flanelado",
            modelagem: "Unissex, capuz com cordão, bolso canguru",
            gramatura: "320g/m²",
            cuidados: "Lavar à máquina, não usar secadora",
            medidas: [
                { tamanho: "P", largura: 54, comprimento: 68 },
                { tamanho: "M", largura: 57, comprimento: 70 },
                { tamanho: "G", largura: 60, comprimento: 72 },
                { tamanho: "GG", largura: 63, comprimento: 74 }
            ]
        }
    },
    {
        id: 3,
        slug: "bone-inspira",
        nome: "Boné Inspira",
        colecaoId: "lancamentos",
        preco: "R$ 49,90",
        destaque: true,
        badge: "NOVO",
        descricaoCurta: "Boné versátil e moderno para complementar seu visual com propósito.",
        descricaoCompleta: "Aba curva, fecho de ajuste traseiro e bordado em alto relevo. O acessório perfeito para fechar o visual com discrição e estilo.",
        imagemPrincipal: "img/produtos/bone/1.jpg",
        imagens: [
            "img/produtos/bone/1.jpg",
           
        ],
        linkMercadoLivre: "https://produto.mercadolivre.com.br/SEU-LINK-BONE-INSPIRA",
        ficha: {
            tecido: "Sarja de algodão",
            modelagem: "Tamanho único, ajuste traseiro",
            gramatura: "—",
            cuidados: "Limpar com pano úmido",
            medidas: [
                { tamanho: "Único", largura: 58, comprimento: 0 }
            ]
        }
    },
    {
        id: 4,
        slug: "caneca-inspira",
        nome: "Caneca Inspira",
        colecaoId: "canecas",
        preco: "R$ 39,90",
        destaque: true,
        badge: "EXCLUSIVO",
        descricaoCurta: "Caneca de porcelana com frase inspiradora, ideal para o café da manhã com propósito.",
        descricaoCompleta: "Comece o dia lembrando do que importa. Porcelana de alta resistência, estampa que não desbota na lavagem e caixa própria para presente.",
        imagemPrincipal: "img/produtos/caneca/1.jpg",
        imagens: [
            "img/produtos/caneca/1.jpg",
            
        ],
        linkMercadoLivre: "https://produto.mercadolivre.com.br/SEU-LINK-CANECA-INSPIRA",
        ficha: {
            tecido: "Porcelana branca de alta resistência",
            modelagem: "Capacidade 325ml",
            gramatura: "—",
            cuidados: "Pode ir ao micro-ondas e lava-louças",
            medidas: [
                { tamanho: "Único", largura: 8, comprimento: 9.5 }
            ]
        }
    },
    {
        id: 5,
        slug: "camiseta-forca-dia-dos-pais",
        nome: "Camiseta Força — Dia dos Pais",
        colecaoId: "dia-dos-pais",
        preco: "R$ 74,90",
        destaque: false,
        badge: "EDIÇÃO ESPECIAL",
        descricaoCurta: "Peça exclusiva da coleção Dia dos Pais, feita para presentear com significado.",
        descricaoCompleta: "Uma homenagem à força e à fé dos pais. Estampa exclusiva desta coleção, produzida em quantidade limitada.",
        imagemPrincipal: "img/produtos/colecao-especial/1.png",
        imagens: [
            "img/produtos/colecao-especial/1.png",
            
        ],
        linkMercadoLivre: "https://produto.mercadolivre.com.br/SEU-LINK-CAMISETA-FORCA-PAIS",
        ficha: {
            tecido: "100% Algodão Penteado 30.1",
            modelagem: "Unissex, corte reto",
            gramatura: "180g/m²",
            cuidados: "Lavar à máquina com cores similares",
            medidas: [
                { tamanho: "P", largura: 48, comprimento: 68 },
                { tamanho: "M", largura: 51, comprimento: 70 },
                { tamanho: "G", largura: 54, comprimento: 72 },
                { tamanho: "GG", largura: 57, comprimento: 74 }
            ]
        }
    }
];

/* ======================================================================
   AVALIAÇÕES — estrutura pronta para quando as vendas começarem.
   Troque "exemplo: true" por "exemplo: false" quando forem avaliações reais.
   ====================================================================== */
const AVALIACOES = [
    {
        nome: "Cliente Inspira",
        estrelas: 5,
        comentario: "Espaço reservado para uma avaliação real de cliente sobre qualidade, entrega e atendimento.",
        foto: "img/avatar/1.png",
        exemplo: true
    },
    {
        nome: "Cliente Inspira",
        estrelas: 5,
        comentario: "Espaço reservado para uma avaliação real de cliente sobre o produto recebido.",
        foto: "img/avatar/1.png",
        exemplo: true
    },
    {
        nome: "Cliente Inspira",
        estrelas: 5,
        comentario: "Espaço reservado para uma avaliação real de cliente com foto usando o produto.",
        foto: "img/avatar/1.png",
        exemplo: true
    }
];

/* ======================================================================
   FAQ
   ====================================================================== */
const FAQ = [
    {
        pergunta: "Qual o prazo de entrega?",
        resposta: "O prazo varia de acordo com a sua região e é calculado diretamente no anúncio do Mercado Livre no momento da compra, com base no seu CEP."
    },
    {
        pergunta: "Como funcionam trocas e devoluções?",
        resposta: "Trocas e devoluções seguem a política do Mercado Livre, que garante a sua compra. Em caso de dúvida, também atendemos diretamente pelo WhatsApp."
    },
    {
        pergunta: "Quais as formas de pagamento e é possível parcelar?",
        resposta: "Todas as formas de pagamento disponíveis no Mercado Livre são aceitas, incluindo parcelamento no cartão de crédito. As opções exatas aparecem no anúncio de cada produto."
    },
    {
        pergunta: "Qual o tecido das camisetas?",
        resposta: "Usamos algodão penteado premium, com toque macio e caimento que não deforma com o uso. Os detalhes completos de tecido e medidas estão na página de cada produto."
    },
    {
        pergunta: "As estampas desbotam ou racham com o tempo?",
        resposta: "Não. Utilizamos processos de estamparia de alta durabilidade, feitos para resistir a lavagens repetidas sem perder a qualidade."
    }
];
