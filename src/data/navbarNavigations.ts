import categoriesMegaMenu from "./categoriesMegaMenu";

// MEGAMENU DATA
const megaMenus = [
  [
    {
      title: "Cursos",
      child: [
        { title: "Administrativo", url: "/" },
        { title: "Ambiental", url: "/" },
        { title: "Civil", url: "/" },
        { title: "Competências Emocionais", url: "/" },
        { title: "Compilance Digital", url: "/" },
        { title: "Direito Médio", url: "/" },
        { title: "Direito Público", url: "/" },
        { title: "Diversos", url: "/" },
        { title: "Empresatial", url: "/" },
        { title: "Penal", url: "/" },
        { title: "Primeiros Passos", url: "/" },
        { title: "Trabalhista e Previdênciario", url: "/" },
      ],
    },
  ],
];

// MAIN NAVIGATION DATA
const navbarNavigations = [
  {
    title: "OAB",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      { title: "1ª Fase OAB", url: "/cursos-oab-1fase" },
      { title: "2ª Fase OAB", url: "/cursos-oab-2fase" },
    ],
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Concursos Públicos",
    child: [
      { title: "Tribunais", url: "/" },
      { title: "Procuradorias", url: "/" },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Atualização e Prática",
    child: [
      {
        title: "Cursos",
        child: [
          { title: "Administrativo", url: "/" },
          { title: "Ambiental", url: "/" },
          { title: "Civil", url: "/" },
          { title: "Competências Emocionais", url: "/" },
          { title: "Compilance Digital", url: "/" },
          { title: "Direito Médio", url: "/" },
          { title: "Direito Público", url: "/" },
          { title: "Diversos", url: "/" },
          { title: "Empresatial", url: "/" },
          { title: "Penal", url: "/" },
          { title: "Primeiros Passos", url: "/" },
          { title: "Trabalhista e Previdênciario", url: "/" },
        ],
      },
      { title: "Eventos Gratuitos", url: "/" },
    ],
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Pós Graduação",
    child: [
      { title: "Cursos", url: "/" },
      { title: "Congressos Digitais", url: "/" },
      { title: "Eventos Gratuitos", url: "/" },
    ],
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "/Professor",
    url: "/professor",
  },
  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Primeiros passos",
    url: "/primeiros-passos-na-advocacia",
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
