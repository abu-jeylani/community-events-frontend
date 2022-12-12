import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "./Footer";
import Showcase from "./Showcase";
import Navbar from "./Navbar";

export default function Layout({ title, keywords, description, children }) {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-l from-black to-gray-900 h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Navbar />
      {router.pathname === "/" && <Showcase />}
      <div className="bg-gradient-to-l from-black to-gray-900"></div>
      <div className="whitespace-pre-wrap bg-gradient-to-l from-black to-gray-900 mt-8">
        <div className=" text-white  mx-auto p-8 max-w-4xl">{children}</div>
        <Footer />
      </div>
    </div>
  );
}

Layout.defaultProps = {
  title: "Community Events | Find what&apos;s going on in your community!",
  description: "Find the latest events going on in the community",
  keywords: "community, events",
};
