import "@styles/globals.css";
import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import dragAndDropReducer from "state/dnd";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

export default function App({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: {
      global: globalReducer,
      dragAndDrop: dragAndDropReducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat(api.middleware),
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
