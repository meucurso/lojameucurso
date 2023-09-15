import { Box, styled } from "@mui/material";
import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import CategoryMenuCard from "./CategoryMenuCard";

// styled component
const Wrapper = styled(Box)(({ theme: { direction } }) => ({
  cursor: "pointer",
  position: "relative",
  transition: "all 250ms ease-in-out",
  "& .dropdown-icon ": {
    transition: "all 250ms ease-in-out",
  },
  "&:hover": {
    "& .dropdown-icon ": {
      transition: "all 250ms ease-in-out",
      transform: `rotate(${direction === "rtl" ? "-90deg" : "90deg"})`,
    },
  },
}));

type CategoryMenuProps = {
  children: React.ReactElement;
};

const CategoryMenu: FC<CategoryMenuProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<boolean>(false);

  const handleMouseEnter = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    popoverRef.current = open;
  }, [open]);

  return (
    <Wrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(children, {
        open,
        className: `${children.props.className}`,
      })}

      <CategoryMenuCard open={open} />
    </Wrapper>
  );
};

export default CategoryMenu;
