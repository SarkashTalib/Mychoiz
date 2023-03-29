import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Moment from "react-moment";
import Loading from '../Loading';
import ErrorBoundary from '../ErrorBoundary';

export default function RecentPosts(props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-shrink-0 mt-10">
        <h1 className="pb-4 text-4xl border-b text-emerald-600">Most Recent</h1>
        <div>
          <ErrorBoundary>
            <BlogPost />
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}



const ARTICLES = gql`
  query GetArticle {
    articles {
      data {
        id
        attributes {
          title,
          description,
          slug,
          categories {
            data
            {
              id,
              attributes {
                name,
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

function BlogPost() {
  const { slug } = useParams()
  const { loading, error, data } = useQuery(ARTICLES, {
    variables: { slug }
  })

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble fetching you content</p>
  if (!data.articles.data.length) return <p className="text-center text-gray-500 text-lg p-10">No articles found</p>;

  return (
    <>
      <div className="relative w-screen bg-gray-50 px-4 pt-16 pb-20  sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none  lg:grid-cols-3">
            {[...data.articles.data].reverse().map((article) => (
              <article key={article.attributes.slug} className="flex flex-col overflow-hidden rounded-lg shadow-sm">
                <Link to={`/article/${article.attributes.slug}`} className=" cursor-auto">
                  <div className="flex-shrink-0">

                    <div className="absolute m-2 overflow-hidden max-w-[300px]">
                      {article.attributes.categories.data.map((category) => (
                        <Link to={`/category/${category.id}`} key={category.id}>
                          <span

                            className="px-3 m-2 text-emerald-50 bg-gray-900/20 rounded-md hover:underline"
                          >
                            {category.attributes.name}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <img className="h-72 w-full object-cover"
                      src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['url']}`}
                      alt={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['alternativeText']}`}
                      key={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data.id}`}
                    />

                  </div>
                  <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
                    <div className="flex-1  border-b">
                      <div className="block mt-2">
                        <h1 className="sm:text-xl font-semibold text-gray-900  line-clamp-1">{article.attributes.title}</h1>
                        <div className="flex flex-col lg:h-24 justify-between ">
                          <p className="text-sm xl:text-base text-gray-500 line-clamp-3">{article.attributes.description}</p>
                          <Link to={`/article/${article.attributes.slug}`} className="text-blue-600 hover:text-emerald-600">Read all the article</Link>
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