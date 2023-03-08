import React from 'react';

import CategoriesMenu from '../components/CategoriesMenu';
import Hero from '../components/Hero';
import RecentPosts from "../components/posts/RecentPosts";
import FeaturedPosts from '../components/posts/FeaturedPosts';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedPosts />
      <CategoriesMenu />
      <RecentPosts />
    </div>
  )
}
