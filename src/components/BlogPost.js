import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Moment from "react-moment";


// import { posts } from '../data/Posts';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
// function readingcolor(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

const ARTICLES = gql`
  query GetArticle {
    articles {
      data {
        id,
        attributes {
          title,
          description,
          content,
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
          <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none lg:grid-cols-3">
            {data.articles.data.map((article) => (
              <div key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <p className="absolute m-2 text-sm font-medium text-indigo-600">
                    <a href="/" className="hover:underline">
                      <span
                        className={classNames(
                          article.attributes.category,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium z-50 text-white'
                        )}
                      >
                        {article.attributes.category}
                      </span>
                    </a>
                  </p>
                  < img className=" w-full h-60" src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['url']}`} alt={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['alternativeText']}`} />

                </div>
                <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
                  <div className="flex-1 pb-2 border-b">
                    <div className="block mt-2 overflow-hidden">
                      <h4 className="text-xl font-semibold text-gray-900 h-14 overflow-hidden">{article.attributes.title.substring(0, 70)}</h4>
                      <div className="flex  flex-col h-28 justify-between">
                        <p className="mt-3 text-base text-gray-500">{article.attributes.description.substring(0, 150)}</p>
                        <Link to={`/article/${article.id}`} className="text-blue-600 bottom">Read more</Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center  mt-2">
                    <div className="text-sm text-gray-500">
                      {/* <span aria-hidden="true"></span>
                      <span className={readingcolor(
                        article.attributes.readingcolor.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                      )}>{article.attributes.readingTime} read</span> */}
                      <p className="">
                        {/* <Moment form  at="MMM Do YYYY">{article.attributes.createdAt}</Moment> */}
                        <Moment format="MMM Do YYYY">{article.attributes.publishedAt}</Moment>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}