import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';


// import { posts } from '../data/Posts';


// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }
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
  const { loading, error, data } = useQuery(ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>error </p>
  console.log(data)
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
                      {/* <span
                        className={classNames(
                          post.category.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                        )}
                      >
                        {post.category.name}
                      </span> */}
                    </a>
                  </p>
                  <img className="object-cover w-full h-60" src="" alt="" />
                </div>
                <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
                  <div className="flex-1 pb-2 border-b">
                    <div className="block mt-2 overflow-hidden">
                      <h4 className="text-xl font-semibold text-gray-900 h-14">{article.attributes.title}</h4>
                      <div className="">
                        <p className="mt-3 text-base text-gray-500">{article.attributes.description.substring(0, 150)}</p>
                        <Link to={`/article/${article.id}`} className="text-blue-600">Read more</Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={article.attributes.datetime}>{article.attributes.publishedAt}</time>
                      <span aria-hidden="true">&middot;</span>
                      {/* <span className={readingcolor(
                          post.readingcolor.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                        )}>{post.readingTime} read</span> */}
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