import React from 'react'
import Moment from 'react-moment';
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading';


const CATEGORY = gql`
   query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name 
          articles {
            data {
              id
              attributes {
                title,
                description,
                content,
                createdAt,
                slug,
                publishedAt,
                coverImg {
                  data {
                    id,
                    attributes {
                      url,
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
   }
`

export default function Category() {

  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: { id: id }
  })

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble fetching you content</p>
  if (!data.category.data.attributes.articles.data.length) return <p className="text-center text-gray-500 text-lg p-10">No articles found</p>;


  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-5xl text-gray-600 p-5 my-5 bg-gray-50 shadow-gray-50 shadow-2xl ">{data.category.data.attributes.name}</h1>
      <div className="grid lg:grid-cols-3 max-w-lg lg:max-w-7xl mx-auto gap-5 px-4 pt-8 pb-20  sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">

        {data.category.data.attributes.articles.data.map((article) => (
          <article
            key={article.id}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <Link to={`/article/${article.attributes.slug}`}>
              <img src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['url']}`}
                alt={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['alternativeText']}`}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <Moment format="MMM Do YYYY" className="mr-8">
                  {article.attributes.publishedAt}
                </Moment>

              </div>
              <h3 className="mt-3 text-lg font-semibold leading-6 text-white lg:h-16 xl:h-12">
                {article.attributes.title}
              </h3>
              <div className="flex  flex-col h-28 justify-between">
                <p className="mt-3 text-base text-gray-400 h-28">{article.attributes.description.substring(0, 130)}</p>
              </div>
            </Link>
            <Link to={`/article/${article.attributes.slug}`} className="text-emerald-200 hover:text-emerald-500">Read more</Link>
          </article>

        ))}
      </div>
    </div>
  )
}
