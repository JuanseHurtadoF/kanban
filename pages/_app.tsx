import "@styles/globals.css";
import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

export default function App({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: {
      global: globalReducer,
    },
  });
  setupListeners(store.dispatch);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
