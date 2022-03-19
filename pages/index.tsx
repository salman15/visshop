import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Product } from "../components";
import { metaProps, productProps } from "../interface";
import styles from "../styles/Home.module.css";

interface Props {
  products: {
    data: productProps[];
    meta: metaProps;
  };
}

const Home: NextPage<Props> = ({ products }) => {
  if (!products.data) {
    return (
      <div className={styles.container}>
        <Head>
          <title>No products found</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
        </main>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main}  max-w-screen-lg mx-auto`}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className="grid grid-cols-2 gap-4 w-full">
          {products.data.map((item, i) => {
            return <Product item={item} key={i} />;
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  let error = false;
  let response = null;
  //
  try {
    response = await fetch(`${process.env.BE_URL}/api/products?populate=*`);
  } catch (e) {
    error = true;
  }

  if (error) {
    return {
      props: {
        products: [],
        error,
      },
    };
  } //
  let products: {
    data: productProps[];
    meta: metaProps;
  } = { data: [], meta: {} };
  let home = {};

  try {
    products = response ? await response.json() : {};
  } catch (e) {
    error = true;
  }
  // const allPostsData = getSortedPostsData();
  if (error) {
    return {
      props: {
        home,
        error,
      },
    };
  }
  return {
    props: {
      products,
      home,
      error,
    },
  };
}
