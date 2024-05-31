import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import store from "@/redux/configureStore";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.push("/store");
  }, []);
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
