import React from 'react';
import { Link } from 'react-router-dom';

import Loading from './Loading';

import { useQuery, gql } from '@apollo/client';
import ErrorBoundary from './ErrorBoundary';


const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
        id 
        attributes {
          name
        }
      }
    }
  }
`


export default function CategoriesMenu() {
  const { loading, error, data } = useQuery(CATEGORIES)


  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 text-lg p-10">Couldn't load categories</p>;
  if (!data.categories.data.length) return <p className="text-center text-gray-500 text-lg p-10">No articles found</p>;

  return (

    <div className="bg-gray-100" >
      <nav className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h2 className='text-base lg:text-xl text-center text-gray-900'>What are you looking for?</h2>
        <ErrorBoundary>
          <div className="flex justify-center flex-wrap xl:flex-nowrap gap-2 mt-6 md:gap-5 lg:gap-10 ">
            {data.categories.data.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
              >
                <span className="px-4 py-2  text-xl text-gray-500/95 duration-200 rounded-lg sm:text-3xl bg-slate-50 hover:bg-white">
                  {category.attributes.name}
                </span>
              </Link>
            ))}
          </div>
        </ErrorBoundary>

      </nav>
    </div>
  )
}