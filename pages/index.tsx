import type { NextPage } from 'next'
import Hero from "../components/Home/Hero";
import About from "../components/Home/About";
import WhatWeDo from "../components/Home/WhatWeDo";
import Navbar from "../components/Home/Navbar";
import Layout from '../layouts/Layout';
import Faq from '../components/Home/Faq';

const Home: NextPage = () => {
  return (
    <Layout title="" >
      <Navbar />
      <Hero />
      <WhatWeDo />
      <About />
      <Faq />

    </Layout>
  )
}

export default Home
