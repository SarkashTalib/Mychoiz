import React from 'react';
import Loading from '../components/Loading';

import { Link, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { CustomContentField } from '../components/posts/CustomContentField';
import ErrorBoundary from '../components/ErrorBoundary';

const ARTICLE = gql`
  query GetArticle ($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      data {
        attributes{
          title
          description
          slug
          content
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


  // console.log("images", data)
  return (
    <>
      <div className="bg-white py-32 px-6 lg:px-8">
        {data.articles.data.map((article) => (
          <div key={article.attributes.slug} className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <div className="text-sm font-semibold leading-7 ">
              {article.attributes.categories.data.map((category) => (

                <Link to={`/category/${category.id}`} key={category.id}>
                  <span
                    className=" pr-5 text-emerald-600/50 hover:text-sky-400"
                  >
                    {category.attributes.name}
                  </span>
                </Link>
              ))}
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{article.attributes.title}</h1>
            <p className="mt-6 text-xl leading-8">{article.attributes.description}</p>
            <figure className="mt-16">
              {console.log('images', article)}
              <img
                className="aspect-video rounded-xl bg-gray-50 object-cover"
                key={`${article.attributes.coverImg.data.id}`}
                src={`${article.attributes.coverImg.data.attributes['url']}`}
                alt={`${article.attributes.coverImg.data.attributes['alternativeText']}`}
              />
              <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                {`${article.attributes.coverImg.data.attributes['caption']}`}
              </figcaption>
            </figure>
            <ErrorBoundary>
              <CustomContentField key={CustomContentField} />
            </ErrorBoundary>
          </div>
        ))}

      </div>
    </>
  )
}