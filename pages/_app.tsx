import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { NextPage } from "next";
import Router from "next/router";
import { AppProps } from "next/app";
import nProgress from "nprogress";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { appWithTranslation } from "next-i18next";
import RTL from "components/RTL";
import MuiTheme from "theme/MuiTheme";
import OpenGraphTags from "utils/OpenGraphTags";
import { AppProvider } from "contexts/AppContext";
import SettingsProvider from "contexts/SettingContext";
import SnackbarProvider from "components/SnackbarProvider";
import createEmotionCache from "createEmotionCache";

import { SessionProvider } from "next-auth/react";

import "nprogress/nprogress.css";
import "simplebar-react/dist/simplebar.min.css";
import "../src/__server__";
import CartProvider from "contexts/CartContext";

//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());
// small change
nProgress.configure({ showSpinner: false });

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  session?: any;
  emotionCache?: EmotionCache;
  Component: NextPage & { getLayout?: (page: ReactElement) => ReactNode };
}

const App = (props: MyAppProps) => {
  const {
    session,
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          httpEquiv="Content-Type"
          content="text/html; charset=utf-8"
        />
        <OpenGraphTags />
        <title>MeuCurso - Do seu jeito. No seu tempo.</title>
      </Head>
      <SessionProvider session={session}>
        <SettingsProvider>
          <AppProvider>
            <MuiTheme>
              <SnackbarProvider>
                <RTL>{getLayout(<Component {...pageProps} />)}</RTL>
              </SnackbarProvider>
            </MuiTheme>
          </AppProvider>
        </SettingsProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(App);
