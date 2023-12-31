import { FC, Fragment, ReactNode, useCallback, useState } from "react";
import Sticky from "components/Sticky";
import Topbar from "components/Topbar";
import { Footer1 } from "components/footer";
import Header from "components/header/Header";
import Navbar from "components/navbar/Navbar";
import { MobileNavigationBar } from "components/mobile-navigation";
import SearchInputWithCategory from "components/search-box/SearchInputWithCategory";
import styled from "@emotion/styled";

/**
 *  Used in:
 *  1. market-1, matket-2, gadget-shop,
 *     fashion-shop, fashion-shop-2, fashion-shop-3, furniture-shop, grocery3, gift-shop
 *  2. product details page
 *  3. order-confirmation page
 *  4. product-search page
 *  5. shops and shops-details page
 *  6. checkoutNavLayout and CustomerDashboadLayout component
 */

// ===================================================
type ShopLayout1Props = {
  children: ReactNode;
  showTopbar?: boolean;
  showNavbar?: boolean;
  topbarBgColor?: string;
};
// ===================================================
const WhatsApp = styled("img")({
  position: "fixed",
  bottom: "30px",
  right: "10px",
  "@media (max-width: 600px)": {
    width: "40px",
    height: "40px",
    bottom: "130px",
  },
});

// ===================================================

const ShopLayout1: FC<ShopLayout1Props> = ({
  children,
  topbarBgColor,
  showTopbar = true,
  showNavbar = true,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(
    (fixed: boolean) => setIsFixed(fixed),
    []
  );

  return (
    <Fragment>
      {/* TOPBAR */}
      {/* {showTopbar && <Topbar bgColor={topbarBgColor} />} */}

      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header
          isFixed={isFixed}
          searchInput={<SearchInputWithCategory />}
        />
      </Sticky>

      <div className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {showNavbar && <Navbar elevation={0} border={1} />}

        {/* BODY CONTENT */}
        {children}
      </div>

      {/* SMALL DEVICE BOTTOM NAVIGATION */}
      <MobileNavigationBar />
      {/* WHATSAPP ICON */}
      <a
        target="_blank"
        href="https://web.whatsapp.com/send?l=&phone=5511913494089&text=Oi! Gostaria de saber mais sobre alguns cursos, pode me ajudar?"
      >
        <WhatsApp
          src="https://imagepng.org/whatsapp-icone-icon/whatsapp-icone/"
          width={40}
          height={40}
        />
      </a>
      {/* FOOTER */}
      <Footer1 />
    </Fragment>
  );
};

export default ShopLayout1;
