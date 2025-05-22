import Head from "next/head";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Website Pribadi</title>
        <meta name="description" content="Website Pribadi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Sidebar /> */}
      <Navbar title={title} userName={""} subsPlan={""} activePeriod={""}/>
      <main>{children}</main>
    </>
  );
}