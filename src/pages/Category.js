import React from 'react'
import Moment from 'react-moment';
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error while fetching </p>

  console.log(data)

  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-5xl font-mono font-semibold text-gray-600 p-5 my-5 bg-teal-900/30 shadow-teal-100/20 shadow-2xl ">{data.category.data.attributes.name}</h1>
      <div className="grid grid-cols-4 gap-5">
        {data.category.data.attributes.articles.data.map((article) => (
          <div key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">

            <div className="flex-shrink-0">
              <p className="absolute m-2 text-sm font-medium text-indigo-600">
                <a href="/" className="hover:underline">
                  {/* <span
                    className={classNames(
                      article.attributes.category,
                      'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium z-50 text-white'
                    )}
                  >
                    {article.attributes.category}
                  </span> */}
                </a>
              </p>
              < img className=" w-full h-56" src={`${process.env.REACT_APP_BACKEND_URL}${article.attributes.coverImg.data[0].attributes['url']}`} alt="" />
            </div>

            <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
              <div className="flex-1 pb-2 border-b">
                <div className="block mt-2 overflow-hidden">
                  <h4 className="text-xl font-semibold text-gray-900 h-14">{article.attributes.title.substring(0, 40)}</h4>
                  <div className="">
                    <p className="mt-3 text-base text-gray-500">{article.attributes.description.substring(0, 100)}</p>
                    <Link to={`/article/${article.id}`} className="text-blue-600">Read more</Link>
                  </div>
                </div>
              </div>

              <div className="flex mt-2">
                <div className="text-sm text-gray-500">
                  {/* <span aria-hidden="true"></span>
                      <span className={readingcolor(
                        article.attributes.readingcolor.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                      )}>{article.attributes.readingTime} read</span> */}
                  <div className="">
                    {/* <Moment form  at="MMM Do YYYY">{article.attributes.createdAt}</Moment> */}
                    <Moment format="MMM Do YYYY">{article.attributes.publishedAt}</Moment>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
