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
      { title: "Tribunais", url: "/searchCategory?CategoryId=101" },
      { title: "Procuradorias", url: "/searchCategory?CategoryId=74" },
      { title: "Assinaturas", url: "/searchCategory?CategoryId=75" },
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
          {
            title: "Administrativo",
            url: "/searchCategory?CategoryId=77",
          },
          { title: "Ambiental", url: "/searchCategory?CategoryId=78" },
          { title: "Civil", url: "/searchCategory?CategoryId=79" },
          {
            title: "Competências Emocionais",
            url: "/searchCategory?CategoryId=81",
          },
          {
            title: "Compilance Digital",
            url: "/searchCategory?CategoryId=82",
          },
          { title: "Direito Médio", url: "/searchCategory?CategoryId=83" },
          {
            title: "Direito Público",
            url: "/searchCategory?CategoryId=84",
          },
          { title: "Diversos", url: "/searchCategory?CategoryId=85" },
          { title: "Empresatial", url: "/searchCategory?CategoryId=86" },
          { title: "Penal", url: "/" },
          {
            title: "Primeiros Passos",
            url: "/searchCategory?CategoryId=87",
          },
          {
            title: "Trabalhista e Previdênciario",
            url: "/searchCategory?CategoryId=88",
          },
        ],
      },
      { title: "Eventos Gratuitos", url: "/searchCategory?CategoryId=89" },
    ],
  },

  {
    megaMenu: false,
    megaMenuWithSub: false,
    title: "Pós Graduação",
    child: [
      { title: "Cursos", url: "/searchCategory?CategoryId=98" },
      {
        title: "Congressos Digitais",
        url: "/searchCategory?CategoryId=100",
      },
      { title: "Eventos Gratuitos", url: "/searchCategory?CategoryId=99" },
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
