// @ts-nocheck

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store  from "../redux/store";
import NProgress from "nprogress"
import Head from "next/head"
import "../index.css";
import Router from "next/router"

Router.onRouteChangeStart = url => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => NProgress.done()

Router.onRouteChangeError = () => NProgress.done()

function MyApp({ Component, pageProps }: AppProps) {

  
  return (
    <>
     <Head>
        <title>VCB</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </>
  );
}

export default MyApp;