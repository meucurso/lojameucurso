import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

const navigations = [
  {
    icon: BalanceOutlinedIcon,
    title: "OAB 1ª Fase",
    href: "/cursos-oab-1fase",
    menuComponent: "MegaMenu1",
  },
  {
    icon: BalanceOutlinedIcon,
    title: "OAB 2ª Fase",
    href: "/cursos-oab-2fase",
    menuComponent: "MegaMenu1",
  },

  {
    icon: SchoolOutlinedIcon,
    title: "Pós Graduação",
    href: "/pos-graduacao",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        title: "Cursos",
        href: "/searchCategory?CategoryId=98",
        megaMenu: "MegaMenu1",
      },
      {
        title: "Congressos Digitais",
        href: "/searchCategory?CategoryId=100",
        megaMenu: 2,
      },
      {
        title: "Eventos Gratuitos",
        href: "/searchCategory?CategoryId=99",
        megaMenu: 3,
      },
    ],
  },
  {
    icon: GavelOutlinedIcon,
    title: "Concursos Públicos",
    href: "/concursos-publicos",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        title: "Tribunais",
        href: "/searchCategory?CategoryId=101",
        megaMenu: "MegaMenu1",
      },
      {
        title: "Procuradorias",
        href: "/searchCategory?CategoryId=74",
        megaMenu: 2,
      },
      {
        title: "Assinaturas",
        href: "/searchCategory?CategoryId=75",
        megaMenu: 2,
      },
    ],
  },
  {
    icon: LocalLibraryOutlinedIcon,
    title: "Atualização e Prática",
    href: "/atualizacao-e-pratica",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        title: "Cursos",
        href: "/searchCategory?CategoryId=76",
        megaMenu: "MegaMenu3",
        menuData: {
          categories: [
            {
              title: "Administrativo",
              href: "/searchCategory?CategoryId=77",
            },
            { title: "Ambiental", href: "/searchCategory?CategoryId=78" },
            { title: "Civil", href: "/searchCategory?CategoryId=79" },
            {
              title: "Competências Emocionais",
              href: "/searchCategory?CategoryId=81",
            },
            {
              title: "Compilance e Digital",
              href: "/searchCategory?CategoryId=82",
            },
            {
              title: "Direito Médio",
              href: "/searchCategory?CategoryId=83",
            },
            {
              title: "Direito Público",
              href: "/searchCategory?CategoryId=84",
            },
            { title: "Diversos", href: "/searchCategory?CategoryId=85" },
            {
              title: "Empresarial",
              href: "/searchCategory?CategoryId=86",
            },
            { title: "Penal", href: "/" },
            {
              title: "Primeiros Passos",
              href: "/searchCategory?CategoryId=87",
            },
            {
              title: "Trabalhista e Previdenciário",
              href: "/searchCategory?CategoryId=88",
            },
          ],
        },
      },
      {
        title: "Eventos Gratuitos",
        href: "/searchCategory?CategoryId=89",
      },
    ],
  },
  {
    icon: BalanceOutlinedIcon,
    title: "Primeiros Passos",
    href: "/primeiros-passos-na-advocacia",
    menuComponent: "MegaMenu1",
  },
];

export default navigations;
