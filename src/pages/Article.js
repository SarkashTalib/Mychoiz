import React from 'react'
import ReactMarkdown from "react-markdown";
import { useQuery, gql } from '@apollo/client';

import { useParams } from 'react-router-dom'

const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
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
`

export default function Article() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: { id: id }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>error </p>

  console.log(data)

  return (
    <>
      <div className="flex justify-center p-5 mx-auto my-10 align-bottom max-w-7xl bg-slate-50">
        <div className="">
          <h1 className=" text-3 xl">{data.article.data.attributes.title}</h1>
          <ReactMarkdown >
            {data.article.data.attributes.content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  )
}