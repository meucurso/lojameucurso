import categoriesMegaMenu from "./categoriesMegaMenu";

// MAIN NAVIGATION DATA
const navbarNavigations = [
  {
    title: "OAB 1ª Fase",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Conheça o curso",
        url: "/cursos/cursos-oab-1fase",
      },
      {
        title: "TOP10 e Reta Final",
        url: "/categorias/oab-1-fase-top10-e-reta-final",
      },
      { title: "Eventos", url: "/categorias/oab-1-fase-eventos" },
      {
        title: "Cursos Gratuitos",
        url: "/categorias/oab-1-fase-cursos-gratuitos",
      },
      {
        title: "Associados AASP",
        url: "/categorias/oab-1-fase-associados-aasp",
      },
      { title: "39º Exame", url: "/categorias/oab-1-fase-39-exame" },
      { title: "40º Exame", url: "/categorias/oab-1-fase-40-exame" },
    ],
  },
  {
    title: "OAB 2ª Fase",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Conheça o curso",
        url: "/cursos/cursos-oab-2fase",
      },
      {
        title: "Administrativo",
        url: "/categorias/oab-2-fase-administrativo",
      },
      { title: "Civil", url: "/categorias/oab-2-fase-civil" },
      {
        title: "Constitucional",
        url: "/categorias/oab-2-fase-constitucional",
      },
      { title: "Empresarial", url: "/categorias/oab-2-fase-empresarial" },
      { title: "Penal", url: "/categorias/oab-2-fase-penal" },
      { title: "Trabalho", url: "/categorias/oab-2-fase-trabalho" },
      { title: "Tributário", url: "/categorias/oab-2-fase-tributario" },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Pós Graduação",
    child: [
      { title: "Conheça os cursos", url: "/categorias/pos-graduacao" },
    ],
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Concursos Públicos",
    child: [
      { title: "Conhheça os cursos", url: "/cursos/concursos-publicos" },
      {
        title: "Carreiras Policiais",
        url: "/categorias/concursos-publicos-carreiras-policiais",
      },
      {
        title: "Tribunais",
        url: "/categorias/concursos-publicos-tribunais",
      },
      {
        title: "Procuradorias",
        url: "/categorias/concursos-publicos-procuradorias",
      },
      {
        title: "Planos de assinatura",
        url: "/categorias/concursos-publicos-planos-de-assinatura",
      },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Atualização e Prática",
    child: [
      { title: "Conheça os cursos", url: "/cursos/atualizacao-e-pratica" },
      {
        title: "Cursos",
        child: [
          {
            title: "Ambiental",
            url: "/categorias/atualizacao-e-pratica-ambiental",
          },
          {
            title: "Civil",
            url: "/categorias/atualizacao-e-pratica-civil",
          },
          {
            title: "Competências Emocionais",
            url: "/categorias/atualizacao-e-pratica-competencias-emocionais",
          },
          {
            title: "Direito Digital e Compliance",
            url: "/categorias/atualizacao-e-pratica-direito-digital-e-compliance",
          },
          {
            title: "Compilance Digital",
            url: "/searchCategory?CategoryId=82",
          },
          {
            title: "Direito Público",
            url: "/categorias/atualizacao-e-pratica-direito-publico",
          },
          {
            title: "Direito Médico",
            url: "/categorias/atualizacao-e-pratica-direito-medico",
          },
          {
            title: "Diversos",
            url: "/categorias/atualizacao-e-pratica-diversos",
          },
          {
            title: "Empresatial",
            url: "/categorias/atualizacao-e-pratica-empresarial",
          },
          {
            title: "Penal",
            url: "/categorias/atualizacao-e-pratica-penal",
          },
          {
            title: "Previdenciário",
            url: "/categorias/atualizacao-e-pratica-previdenciario",
          },
          {
            title: "Trabalhista",
            url: "/categorias/atualizacao-e-pratica-trabalhista",
          },
        ],
      },
    ],
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Primeiros passos",
    url: "/cursos/primeiros-passos-na-advocacia",
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "/Professor",
    url: "/professor",
    child: [
      { title: "Conhheça os cursos", url: "/cursos/concursos-publicos" },
      {
        title: "Alessandro Spilborghs",
        url: "https://aluno.meucurso.com.br/marketplace/index/alessandrospilborghs",
      },
      {
        title: "Carol Macaubal",
        url: "https://aluno.meucurso.com.br/marketplace/index/carolmacaubal",
      },
      {
        title: "Conrado Paulino",
        url: "https://aluno.meucurso.com.br/marketplace/index/conradopaulino",
      },
      {
        title: "Daniel Lamounier",
        url: "https://aluno.meucurso.com.br/marketplace/index/lamounierdaniel",
      },
      {
        title: "Darlan Barroso",
        url: "https://aluno.meucurso.com.br/marketplace/index/darlanbarroso",
      },
      {
        title: "Enki Pimenta",
        url: "https://aluno.meucurso.com.br/marketplace/index/enkipimenta",
      },
      {
        title: "Marcelle Tasoko",
        url: "https://aluno.meucurso.com.br/marketplace/index/marcelletasoko",
      },
      {
        title: "Marcos Oliveira",
        url: "https://aluno.meucurso.com.br/marketplace/index/marcosoliveira",
      },
      {
        title: "Priscila Souto",
        url: "https://aluno.meucurso.com.br/marketplace/index/priscilasouto",
      },
      {
        title: "Savio Chalita",
        url: "https://aluno.meucurso.com.br/marketplace/index/saviochalita",
      },
      {
        title: "Vanderlei Garcia",
        url: "https://aluno.meucurso.com.br/marketplace/index/vanderlei-garcia",
      },
      {
        title: "Yuri Carneiro",
        url: "https://aluno.meucurso.com.br/marketplace/index/yuricarneiro",
      },
      {
        title: "Anselmo Gonzalez",
        url: "https://aluno.meucurso.com.br/marketplace/index/anselmogonzalez",
      },
      {
        title: "Ivana David",
        url: "https://aluno.meucurso.com.br/marketplace/index/ivanadavid",
      },
      {
        title: "Sérgio Gabriel",
        url: "https://aluno.meucurso.com.br/marketplace/index/sergiogabriel",
      },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Embaixadores / Parceiros",
    url: "/embaixadores",
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Blog MeuCurso",
    url: "https://blog.meucurso.com.br/",
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Central de Ajuda",
    url: "/central-de-ajuda",
  },
];

export default navbarNavigations;
