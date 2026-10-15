// =============================================
// SEUS PROJETOS
// Para adicionar um projeto novo: copie um bloco { ... },
// cole no começo da lista (o primeiro aparece primeiro)
// e troque os textos. Coloque as imagens na pasta "imagens".
// =============================================
const PROJETOS = [
  {
    id: "gy-imports", // nome curto, sem espaço e sem acento (vira o endereço da página)
    nome: "GY Imports",
    tipo: "Loja virtual",
    resumo: "Loja de eletrônicos com compra, reserva e pagamento online.",
    capa: "imagens/gy-home.jpg",
    imagens: [
      "imagens/gy-home.jpg",
      "imagens/gy-vantagens.jpg",
      "imagens/gy-checkout.jpg",
      "imagens/gy-final.jpg",
    ],
    objetivo:
      "A GY Imports vende celulares, Apple Watch, consoles e fones e precisava de um site " +
      "para vender online para todo o Brasil, aceitando tanto produtos em estoque quanto encomendas.",
    solucao:
      "Criei uma loja completa com dois jeitos de comprar: produto em estoque é pago 100% na hora, " +
      "e produto sem estoque vira encomenda com 30% de entrada. O cliente recebe avisos automáticos " +
      "por e-mail e a loja acompanha tudo pelos relatórios de vendas.",
    funcionalidades: [
      "Catálogo de produtos com estoque",
      "Pagamento online via Mercado Pago",
      "Encomenda com 30% de entrada e restante por link",
      "Prazo de desistência da reserva",
      "Cancelamento automático de reservas abandonadas",
      "Avisos automáticos por e-mail",
      "Relatórios de vendas",
      "Entrega para todo o Brasil",
    ],
    tecnologias: ["HTML/CSS/JavaScript", "Supabase", "Mercado Pago", "Vercel"],
    link: "", // coloque o endereço do site no ar, ex.: "https://gyimports.com.br"
  },

  // ---- MODELO para o próximo projeto (apague as // do começo das linhas) ----
  // {
  //   id: "nome-do-projeto",
  //   nome: "Nome do Projeto",
  //   tipo: "Site institucional",
  //   resumo: "Uma frase dizendo o que é.",
  //   capa: "imagens/projeto-capa.png",
  //   imagens: ["imagens/projeto-capa.png"],
  //   objetivo: "O que o cliente precisava.",
  //   solucao: "O que você fez para resolver.",
  //   funcionalidades: ["Funcionalidade 1", "Funcionalidade 2"],
  //   tecnologias: ["HTML/CSS/JavaScript"],
  //   link: "",
  // },
];
