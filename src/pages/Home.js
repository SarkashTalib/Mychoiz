import React from 'react';

import CategoriesMenu from '../components/CategoriesMenu';
import Hero from '../components/Hero';
import ContentPosts from "../components/ContentPosts";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategoriesMenu />
      <ContentPosts />
    </div>
  )
}
