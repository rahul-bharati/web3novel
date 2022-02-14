import "../styles/globals.scss";
import "react-quill/dist/quill.snow.css";

import type { AppProps } from "next/app";
import { AppContextProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </>
    </AppContextProvider>
  );
}

export default MyApp;
