//next imports
import type { AppProps } from "next/app";
import Head from "next/head";

//css import
import "@/styles/globals.css";

//HOC import
import HigherOrderComponent from "@/HigherOrderComponent";

//redux imports(s)
import { ReduxProvider } from "@/redux/provider";
import { PersistGate } from "redux-persist/integration/react";

//redux(local) store import
import { persistor } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PokeApp</title>
      </Head>
      <ReduxProvider>
        <HigherOrderComponent>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </HigherOrderComponent>
      </ReduxProvider>
    </>
  );
}
