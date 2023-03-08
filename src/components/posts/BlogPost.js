import React from 'react'
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
          categories {
            data
            {
              id,
              attributes {
                name
              }
            }
          },
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

export default function BlogPost() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(ARTICLES, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>error </p>

  return (
    <>
      <div className="relative w-screen px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none  lg:grid-cols-3">
            {data.articles.data.map((article) => (
              <article key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-sm">
                <Link to={`/article/${article.id}`} className=" cursor-auto">
                  <div className="flex-shrink-0">
                    <p className="absolute m-2 overflow-hidden max-w-[300px]">
                      {article.attributes.categories.data.map((category) => (
                        <Link to={`/category/${category.id}`} >
                          <span
                            key={category.id}
                            className="px-3 m-2 text-emerald-50 bg-gray-900/20 rounded-md hover:underline"
                          >
                            {category.attributes.name}
                          </span>
                        </Link>
                      ))}
                    </p>
                    <img className="h-72 w-full object-cover"
                      src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['url']}`}
                      alt={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['alternativeText']}`}
                    />

                  </div>
                  <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
                    <div className="flex-1  border-b">
                      <div className="block mt-2">
                        <h4 className="text-xl font-semibold text-gray-900 h-16">{article.attributes.title.substring(0, 70)}</h4>
                        <div className="flex flex-col lg:h-24 justify-between ">
                          <p className="text-sm xl:text-base text-gray-500 ">{article.attributes.description.substring(0, 130)}</p>
                          <Link to={`/article/${article.id}`} className="text-blue-600 hover:text-emerald-600">Read more</Link>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 self-end">
                      <p className="text-sm text-gray-500">
                        <Moment format="MMM Do YYYY">{article.attributes.publishedAt}</Moment>
                      </p>
                    </div>

                  </div>
                </Link>
              </article>

            ))}


          </div>
        </div>
      </div>
    </>
  )
}