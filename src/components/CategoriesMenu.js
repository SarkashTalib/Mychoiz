// import React from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loading from './Loading';
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


function Menu() {
  const { loading, error, data } = useQuery(CATEGORIES)


  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p className="text-center text-red-500 text-lg p-10">Couldn't load categories</p>;
  }
  if (!data.categories.data.length) {
    return <p className="text-center text-gray-500 text-lg p-10">No categories found</p>;
  }

  return (

    <div>
      <div className="flex justify-center flex-wrap xl:flex-nowrap gap-2 mt-6 md:gap-5 lg:gap-10 ">
        {data.categories.data.map(category => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
          >
            <span className="px-4 py-2  text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">
              {category.attributes.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}



export default function CategoriesMenu() {

  return (

    <div div className="bg-gray-100" >
      <nav className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className='text-base lg:text-lg font-semibold text-center text-gray-500'>What are you looking for?</p>
        <div className="flex justify-center flex-wrap xl:flex-nowrap gap-2 mt-6 md:gap-5 lg:gap-10 ">
          <ErrorBoundary>
            <Menu />
          </ErrorBoundary>
        </div>

      </nav>
    </div>
  )
}