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
    icon: GavelOutlinedIcon,
    title: "Concursos Públicos",
    href: "/concursos-publicos",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        title: "Tribunais",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
      },
      {
        title: "Procuradorias",
        href: "/product/search/electronics",
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
        href: "/product/search/fashion",
        megaMenu: "MegaMenu3",
        menuData: {
          categories: [
            { title: "Administrativo", href: "/" },
            { title: "Ambiental", href: "/" },
            { title: "Civil", href: "/" },
            { title: "Competências Emocionais", href: "/" },
            { title: "Compilance e Digital", href: "/" },
            { title: "Direito Médio", href: "/" },
            { title: "Direito Público", href: "/" },
            { title: "Diversos", href: "/" },
            { title: "Empresarial", href: "/" },
            { title: "Penal", href: "/" },
            { title: "Primeiros Passos", href: "/" },
            { title: "Trabalhista e Previdenciário", href: "/" },
          ],
        },
      },
      {
        title: "Eventos Gratuitos",
        href: "/product/search/electronics",
      },
    ],
  },
  {
    icon: SchoolOutlinedIcon,
    title: "Pós Graduação",
    href: "/pos-graduacao",
    menuComponent: "MegaMenu2",
    menuData: [
      {
        title: "Cursos",
        href: "/product/search/fashion",
        megaMenu: "MegaMenu1",
      },
      {
        title: "Congressos Digitais",
        href: "/product/search/electronics",
        megaMenu: 2,
      },
      {
        title: "Eventos Gratuitos",
        href: "/product/search/home&garden",
        megaMenu: 3,
      },
    ],
  },
];

export default navigations;
