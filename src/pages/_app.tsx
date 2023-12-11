import HigherOrderComponent from "@/HigherOrderComponent";
import { ReduxProvider } from "@/redux/provider";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <HigherOrderComponent>
        <Component {...pageProps} />
      </HigherOrderComponent>
    </ReduxProvider>
  );
}
