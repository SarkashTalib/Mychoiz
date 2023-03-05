import React from 'react'
import ReactMarkdown from "react-markdown";
import { useQuery, gql } from '@apollo/client';

import { Link, useParams } from 'react-router-dom'

const ARTICLE = gql`
  query GetArticle($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title,
          description,
          content,
          categories {
            data{
              id,
              attributes {
                name
              }
            }
          },
          coverImg {
            data {
              id,
              attributes {
                url,
                alternativeText,
                caption
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

  return (
    <>
      <div className="bg-white py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-sm font-semibold leading-7 ">
            {data.article.data.attributes.categories.data.map((category) => (

              <Link to={`/category/${category.id}`}>
                <span
                  key={category.id}
                  className=" pr-5 text-emerald-600/50 hover:text-sky-400"
                >
                  {category.attributes.name}
                </span>
              </Link>
            ))}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.article.data.attributes.title}</h1>
          <p className="mt-6 text-xl leading-8">{data.article.data.attributes.description}</p>
          <figure className="mt-16">
            <img
              className="aspect-video rounded-xl bg-gray-50 object-cover"
              src={`${process.env.REACT_APP_BACKEND_URL}${data.article.data.attributes.coverImg.data[0].attributes['url']}`}
              alt={`${process.env.REACT_APP_BACKEND_URL}${data.article.data.attributes.coverImg.data[0].attributes['alternativeText']}`}
            />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              {/* <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" /> */}
              {`${data.article.data.attributes.coverImg.data[0].attributes['caption']}`}
            </figcaption>
          </figure>
          <div className="mt-10 max-w-3xl">
            <ReactMarkdown>
              {data.article.data.attributes.content}
            </ReactMarkdown>
          </div>

          {/* 

          <div className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Everything you need to get up and running</h2>
            <p className="mt-6">
              Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In
              amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie.
              Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
              ac. Cras fermentum convallis quam.
            </p>
            <p className="mt-8">
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
              sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
            </p>
          </div> */}

        </div>
      </div>
    </>
  )
}