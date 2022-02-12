import type { NextPage } from "next";
import Earn from "../components/Earn";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reader from "../components/Reader";
import Writer from "../components/Writer";
import Hero from "./../components/Hero";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Writer />
      <Reader />
      <Earn />
      <Footer />
    </>
  );
};

export default Home;
