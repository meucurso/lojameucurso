import { FC } from "react";
import { Badge, Button, Box } from "@mui/material";
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

const MobileNavigationBar: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const width = useWindowSize();
  const { state } = useAppContext();
  const { data: session } = useSession();

  return width <= 900 ? (
    <Wrapper>
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
        <Button
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

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </>
      )}
    </Wrapper>
  ) : null;
};

const list = [
  { title: "Início", icon: Home, href: "/" },
  { title: "Carrinho", icon: ShoppingBagOutlined, href: "/cart" },
  // { title: "Conta", icon: User2, href: "/profile" },
];

export default MobileNavigationBar;
