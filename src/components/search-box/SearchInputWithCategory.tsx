import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { Box, MenuItem, TextField, styled, useTheme } from "@mui/material";
import BazaarMenu from "components/BazaarMenu";
import { FlexBox } from "components/flex-box";
import { SearchOutlinedIcon, SearchResultCard } from "./styled";
import api from "../../utils/__api__/meu-curso";

const DropDownHandler = styled(FlexBox)(({ theme }) => ({
  whiteSpace: "pre",
  borderTopRightRadius: 300,
  borderBottomRightRadius: 300,
  borderLeft: `1px solid ${theme.palette.text.disabled}`,
  [theme.breakpoints.down("xs")]: { display: "none" },
}));

const SearchInputWithCategory: FC = () => {
  const parentRef = useRef();
  const { breakpoints } = useTheme();
  const [resultList, setResultList] = useState<string[]>([]);

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const handleSearch = (value: any) => {
    if (value.trim() === "") {
      setData([]);
    } else {
      const res = filterData.filter((f) =>
        f.Name.toLowerCase().includes(value)
      );
      setData(res);
    }
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.getProducts();
      return setFilterData(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", null);
  }, []);

  // CATEGORY MENU DROPDOWN
  const categoryDropdown = (
    <BazaarMenu
      direction="left"
      sx={{ zIndex: breakpoints.down("md") ? 99999 : 1502 }}
      // handler={
      //   <DropDownHandler
      //     px={3}
      //     gap={0.5}
      //     height="100%"
      //     color="grey.700"
      //     bgcolor="grey.100"
      //     alignItems="center"
      //     component={TouchRipple}
      //   >
      //     {categoryTitle}
      //     <KeyboardArrowDownOutlined fontSize="small" color="inherit" />
      //   </DropDownHandler>
      // }
    >
      {/* {categories.map((item) => (
        <MenuItem key={item.value} onClick={handleCategoryChange(item)}>
          {item.title}
        </MenuItem>
      ))} */}
    </BazaarMenu>
  );

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mx="auto"
      {...{ ref: parentRef }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Pesquisar..."
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          sx: {
            height: 44,
            paddingRight: 0,
            borderRadius: 300,
            color: "grey.700",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          },
          endAdornment: categoryDropdown,
          startAdornment: <SearchOutlinedIcon fontSize="small" />,
        }}
      />

      {data.length > 0 && (
        <SearchResultCard elevation={2}>
          {data.map((d, i) => (
            <Link href={`product/${d.URLKey}`} key={i}>
              <MenuItem key={i}>{d.Name}</MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </Box>
  );
};

const categories = [
  { title: "All Categories", value: "*" },
  { title: "Car", value: "car" },
  { title: "Clothes", value: "clothes" },
  { title: "Electronics", value: "electronics" },
  { title: "Laptop", value: "laptop" },
  { title: "Desktop", value: "desktop" },
  { title: "Camera", value: "camera" },
  { title: "Toys", value: "toys" },
];

export default SearchInputWithCategory;
