import Head from "next/head";
import Header from "./components/Header";
import ProductFeed from "./components/ProductFeed";
import Slider from "./components/Slider";

export default function Home({ items }) {
  return (
    <>
      <div className="bg-gray-100">
        <Head>
          <title>Amazon 2.0</title>
        </Head>
        {/* header */}
        <Header />
        <main className=" mx-auto max-w-none md:max-w-screen-xl  ">
          {/* Slider */}
          <Slider />
          {/* Products */}
          <ProductFeed items={items} />
        </main>
      </div>
    </>
  );
}

//server side rendering
//fetch the data first
export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products/").then(
    (res) => res.json()
  );

  return {
    props: {
      items: products,
    },
  };
}
