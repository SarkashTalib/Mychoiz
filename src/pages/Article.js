import React from 'react'
import parse from 'html-react-parser';
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

  if (loading) return <div role="status" className=" text-center">
    <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble loading the article</p>


  const options = {
    replace: (node) => {
      if (node.name === 'img') {
        const { src, alt, caption } = node.attribs;
        return <img src={src} alt={alt} caption={caption} />;
      }
    },
  };

  return (
    <>
      <div className="bg-white py-32 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          <p className="text-sm font-semibold leading-7 ">
            {data.article.data.attributes.categories.data.map((category) => (

              <Link to={`/category/${category.id}`} key={category.id}>
                <span
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
              {`${data.article.data.attributes.coverImg.data[0].attributes['caption']}`}
            </figcaption>
          </figure>
          <div className="mt-10 max-w-3xl" key={data.article.data.attributes.content.id}>
            {parse(data.article.data.attributes.content, options)}
          </div>
        </div>
      </div>
    </>
  )
}










