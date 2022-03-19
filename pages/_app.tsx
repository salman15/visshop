import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Navigation, Footer } from "../components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
