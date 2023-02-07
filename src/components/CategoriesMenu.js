// import React from 'react'
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


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

  if (loading) return <p>Loading catagories...</p>
  if (error) return <p>Error fetching categories</p>

  return (

    <div div className="bg-gray-100" >
      {/* <Link to="/"><h1 className="">Category</h1></Link> */}
      <nav className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className='text-base font-semibold text-center text-gray-500'>What are you looking for?</p>
        <div className="flex justify-center gap-2 mt-6 md:gap-20 ">
          {data.categories.data.map(category => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1"
            >
              <span className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">
                {category.attributes.name}
              </span>


            </Link>

          ))}
        </div>

      </nav>
    </div>

  )
}
