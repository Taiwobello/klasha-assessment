import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/styles.scss";
import AppLayout from "@/components/layout/Layout";

const headTag = (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Klasha</title>
  </Head>
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {headTag}
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </div>
  );
}
