import { Paper, TextField, Typography } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import InputFields from "../components/inputFields";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Crypto Converter</title>
      </Head>
      <InputFields />
    </>
  );
};

export default Home;
