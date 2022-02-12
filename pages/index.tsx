import type { NextPage } from "next";
import Earn from "../components/Earn";
import Reader from "../components/Reader";
import Writer from "../components/Writer";
import Hero from "./../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <Writer />
      <Reader />
      <Earn />
    </>
  );
};

export default Home;
