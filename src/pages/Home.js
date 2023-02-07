import React from 'react';

import CategoriesMenu from '../components/CategoriesMenu';
import Hero from '../components/Hero';
// import ContentPosts from "../components/ContentPosts";
import ContentFeatured from '../components/ContentFeatured';

export default function Home() {
  return (
    <div>
      <Hero />
      <ContentFeatured/>
      <CategoriesMenu />
      {/* <ContentPosts/> */}
    </div>
  )
}
