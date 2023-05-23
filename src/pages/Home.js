import React from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import Loading from '../components/Loading';

import SearchResults from '../components/SearchResults'

import CategoriesMenu from '../components/CategoriesMenu';
import Hero from '../components/Hero';
import RecentPosts from "../components/posts/RecentPosts";
import FeaturedPosts from '../components/posts/FeaturedPosts';

import ARTICLES_QUERY from '../queries/ArticlesQuery';


export default function Home() {

  const { slug } = useParams()
  const { loading, error, data } = useQuery(ARTICLES_QUERY, {
    variables: { slug }
  })

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble fetching you content</p>;
  if (!data.articles.data.length) return <p className="text-center text-gray-500 text-lg p-10">No articles found</p>;

  const articles = data.articles;

  return (
    <>
      <Hero />
      <SearchResults />
      <FeaturedPosts articles={articles} />
      <RecentPosts articles={articles} />
      <CategoriesMenu />
    </>
  )
}
