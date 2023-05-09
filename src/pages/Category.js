import React from 'react'
import Moment from 'react-moment';
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import Loading from '../components/Loading';
import NotFoundPage from './NotFoundPage';


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

  if (!data.category || !data.category.data || !data.category.data.id || !data.category.data.attributes.articles.data.length) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-5xl text-gray-600 p-5 my-5 bg-gray-50 shadow-gray-50 shadow-2xl ">
        {data.category.data.attributes.name}
      </h1>
      <div className="grid lg:grid-cols-3 max-w-lg lg:max-w-7xl mx-auto gap-5 px-4 pt-8 pb-20  sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">

        {data.category.data.attributes.articles.data.map((article) => (
          <article
            key={article.attributes.slug}
            className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
          >
            <Link to={`/article/${article.attributes.slug}`}>
              <img
                src={`${article.attributes.coverImg.data.attributes['url']}`}
                alt={`${article.attributes.coverImg.data.attributes['alternativeText']}`}
                key={`${article.attributes.coverImg.data.id}`}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

              <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                <Moment format="MMM Do YYYY" className="mr-8">
                  {article.attributes.publishedAt}
                </Moment>
              </div>

              <h2 className="mt-3 text-lg font-semibold leading-6 text-white line-clamp-1">
                {article.attributes.title}
              </h2>

              <div className="flex  flex-col h-28 justify-between">
                <p className="mt-3 text-base text-gray-400  line-clamp-4">{article.attributes.description}</p>
              </div>

            </Link>

            <Link
              to={`/article/${article.attributes.slug}`}
              key={article.attributes.slug}
              className="text-emerald-200 hover:text-emerald-500">
              Read all the article
            </Link>
          </article>

        ))}
      </div>
    </div>
  )
}
