import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Head>
        <title>DEM UGM | Persuratan</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
