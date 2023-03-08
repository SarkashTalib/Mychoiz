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

export default function FeaturedPosts() {

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-shrink-0 mt-10">
        <h1 className="pb-4 text-4xl border-b text-emerald-600">Featured Posts</h1>
        <div>
          <Posts />
        </div>
      </div>
    </>
  )
}


function Posts(props) {
  const { id } = useParams()
  const { loading, error, data } = useQuery(ARTICLES, {
    variables: { id: id }
  })

  if (loading) return <div role="status" className=" text-center">
    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble fetching you featured articles</p>


  return (
    <>
      <div className="flex flex-col items-center justify-center flex-shrink-0 mt-10">
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
