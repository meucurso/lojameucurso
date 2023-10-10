import { NextPage } from "next";
import SEO from "components/SEO";
import Login from "pages-sections/sessions/Login";
import { FlexRowCenter } from "components/flex-box";

const LoginPage: NextPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO
        title="Login"
        sitename="MeuCurso - Do seu jeito.  No seu tempo."
      />
      <Login />
    </FlexRowCenter>
  );
};

export default LoginPage;
