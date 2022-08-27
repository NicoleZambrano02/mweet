import "../styles/globals.css";
import { AppProps } from "next/app";
import type { NextComponentType } from "next";
import Head from "next/head";
import WithAuth from "../hocs/withAuth";
import SideNav from "../components/SideNav";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { mustHaveAuth?: boolean }; // add auth type
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <div>
      <Head>
        <title>mweeter</title>
        <link rel="icon" href="/logos/twitter.png" />
      </Head>
      <div className="flex flex-row gap-12">
        {Component.mustHaveAuth && <SideNav />}
        <WithAuth mustHaveAuth={Component.mustHaveAuth}>
          <Component {...pageProps} />
        </WithAuth>
      </div>
    </div>
  );
}

export default MyApp;
