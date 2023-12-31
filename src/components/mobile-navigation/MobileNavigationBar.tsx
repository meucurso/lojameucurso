import { FC, useEffect } from "react";
import { Badge, Button, Box, Typography, Modal } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Home from "components/icons/Home";
import User2 from "components/icons/User2";
import CategoryOutlined from "components/icons/CategoryOutline";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import useWindowSize from "hooks/useWindowSize";
import { useAppContext } from "contexts/AppContext";
import { iconStyle, StyledNavLink, Wrapper } from "./styles";
import { useSession, signOut } from "next-auth/react";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import Link from "next/link";
import BipeIcon from "components/icons/BipeIcon";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const MobileNavigationBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userConfigs, setUserConfigs] = useState<any>();
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const width = useWindowSize();
  const { state } = useAppContext();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserConfigs = async () => {
      if (session) {
        await axios
          .get(
            `https://apiecommerce.meucurso.com.br/Student/%7BcustomerId%7D?customerId=${session?.user?.CustomerId}`,
            {
              headers: { Authorization: `Bearer ${session?.user?.Token}` },
            }
          )
          .then((response) => setUserConfigs(response.data))
          .catch((err) => console.log(err));
      }
    };
    fetchUserConfigs();
  }, [session, setUserConfigs]);

  return width <= 900 ? (
    <Wrapper>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign={"center"}
          >
            Configurações
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              {" "}
              <strong>Nome:</strong> {userConfigs?.FirstName}
            </p>
            <p>
              {" "}
              <strong>Sobrenome:</strong> {userConfigs?.LastName}
            </p>
            <p>
              <strong>Email:</strong> {userConfigs?.Email}
            </p>
            <p>
              {" "}
              <strong>CPF:</strong> {userConfigs?.CPF}
            </p>
            <p>
              <strong>Telefone Principal:</strong> {userConfigs?.MainPhone}
            </p>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <Button
              style={{ display: "block", margin: "0 auto " }}
              variant="outlined"
              color="success"
            >
              <a
                target="_blank"
                href="https://aluno.meucurso.com.br/Account/MyAccount"
              >
                {" "}
                Editar
              </a>
            </Button>
            <Button
              onClick={handleCloseModal}
              style={{ display: "block", margin: "0 auto " }}
              variant="outlined"
              color="error"
            >
              Sair
            </Button>
          </Box>
        </Box>
      </Modal>
      {list.map((item) => (
        <StyledNavLink href={item.href} key={item.title}>
          {item.title === "Cart" ? (
            <Badge badgeContent={state.cart.length} color="primary">
              <item.icon fontSize="small" sx={iconStyle} />
            </Badge>
          ) : (
            <item.icon sx={iconStyle} fontSize="small" />
          )}

          {item.title}
        </StyledNavLink>
      ))}
      {!session && (
        <>
          <Button
            href="/login"
            sx={{
              ":hover": {
                color: "#D23F57",
              },
              transition: "0.2s",
              flex: "1 1 0",
              display: "flex",
              fontSize: "13px",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <User2 fontSize="small" />
            Conta
          </Button>
        </>
      )}
      {session && (
        <>
          <Box
            onClick={handleClick}
            sx={{
              ":hover": {
                color: "#D23F57",
              },
              transition: "0.2s",
              cursor: "pointer",
              flex: "1 1 0",
              display: "flex",
              fontSize: "13px",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
            p={0.5}
          >
            <User2 fontSize="small" />
            {session?.user?.Name}
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            {/* <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem> */}

            <MenuItem onClick={handleOpenModal}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <Link
              target="_blank"
              href={"https://aluno.meucurso.com.br/BIPEStore/Orders"}
            >
              <MenuItem>
                <ListItemIcon>
                  <DescriptionIcon fontSize="small" />
                </ListItemIcon>
                Meus Pedidos
              </MenuItem>
            </Link>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sair da conta
            </MenuItem>
          </Menu>
        </>
      )}
    </Wrapper>
  ) : null;
};

const list = [
  { title: "Início", icon: Home, href: "/" },
  {
    title: "Área do Aluno",
    icon: BipeIcon,
    href: "https://aluno.meucurso.com.br/",
  },
  // { title: "Conta", icon: User2, href: "/profile" },
];

export default MobileNavigationBar;
