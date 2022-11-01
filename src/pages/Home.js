import React from 'react';
import CategoriesMenu from '../components/CategoriesMenu';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import NavBar from "../components/NavBar";
import ContentFeatured from "../components/ContentFeatured";
import ContentPosts from "../components/ContentPosts";

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Hero />
      <CategoriesMenu />
      <ContentFeatured />
      <ContentPosts />
      <Footer />
    </div>
  )
}
