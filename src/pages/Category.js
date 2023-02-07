import React from 'react'
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
    <div>
      <h1>{data.category.data.attributes.name}</h1>
      <div className="grid grid-cols-5">
        {data.category.data.attributes.articles.data.map((article) => (
          <div key={article.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
              <div className="flex-1 pb-2 border-b">
                <div className="block mt-2 overflow-hidden">
                  <h4 className="text-xl font-semibold text-gray-900 h-14">{article.attributes.title}</h4>
                  <div className="">
                    <p className="mt-3 text-base text-gray-500">{article.attributes.description.substring(0, 100)}</p>
                    <Link to={`/article/${article.id}`} className="text-blue-600">Read more</Link>
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
