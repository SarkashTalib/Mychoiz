import React from 'react';
import Loading from '../components/Loading';

import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import parse from 'html-react-parser';

const ARTICLE = gql`
  query GetArticle($slug: String!) {
    article(slug: $slug) {
      data {
        id
        attributes {
          title,
          description,
          content,
          slug,
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
  const { slug } = useParams()
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: { slug: slug }
  })

  if (loading) return <Loading />
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