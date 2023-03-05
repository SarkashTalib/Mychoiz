import React from 'react'
// import BlogPost from './BlogPost'
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Moment from "react-moment";

const ARTICLES = gql`
  query GetArticle {
    articles {
      data {
        id,
        attributes {
          title,
          description,
          content,
          IsFeatured,
          categories {
            data {
              id,
              attributes {
                name
              }
            }
          }
          createdAt,
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
`
export default function ContentFeatured(props) {

  const { id } = useParams()
  const { loading, error, data } = useQuery(ARTICLES, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>error </p>


  return (
    <>
      <div className="flex flex-col items-center justify-center flex-shrink-0 mt-10">
        <h1 className="pb-4 text-4xl border-b text-emerald-600">Featured Posts</h1>
        <div>

          <div>
            <div className="relative w-screen px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
              <div className="absolute inset-0">
                <div className="bg-white h-1/3 sm:h-2/3" />
              </div>
              <div className="relative mx-auto max-w-7xl">
                <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none lg:grid-cols-3">
                  {data.articles.data.map((article) => {
                    if (article.attributes.IsFeatured === 'featured') {
                      return <article
                        key={article.id}
                        className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-2 pt-80 sm:pt-48 lg:pt-80"
                      >
                        <Link to={`/article/${article.id}`}>
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
                            <div className="-ml-4 flex items-center gap-x-4">
                              <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                <circle cx={1} cy={1} r={1} />
                              </svg>
                              <p className="absolute m-2">
                                {article.attributes.categories.data.map((category) => (
                                  <Link to={`/category/${category.id}`} className="">
                                    <span
                                      key={category.id}
                                      className="px-2 m-2 text-emerald-50 bg-gray-900/20 rounded-md hover:text-emerald-300"
                                    >
                                      {category.attributes.name}
                                    </span>
                                  </Link>
                                ))}
                              </p>
                            </div>
                          </div>
                          <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                            {article.attributes.title}
                          </h3>
                          <div className="flex  flex-col h-28 justify-between">
                            <p className="mt-3 text-base text-gray-400 h-28">{article.attributes.description.substring(0, 130)}</p>
                            <Link to={`/article/${article.id}`} className="text-emerald-200 hover:text-emerald-500">Read more</Link>
                          </div>
                        </Link>
                      </article>
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
