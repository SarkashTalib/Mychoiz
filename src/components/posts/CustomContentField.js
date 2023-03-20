import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import parse from 'html-react-parser';
import Loading from '../Loading';

const ARTICLE = gql`
  query GetArticle($slug: String!) {
    articles(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes{
          content
        }
      }
    }
  }
`

export const CustomContentField = () => {

  const { slug } = useParams()
  const { loading, error, data } = useQuery(ARTICLE, {
    variables: { slug: slug }
  })

  const options = {
    replace: (node) => {
      if (node.name === 'img') {
        const { src, alt, caption, srcSet } = node.attribs;
        return <img
          src={`${process.env.REACT_APP_BACKEND_URL}${src}`}
          srcSet={srcSet}
          alt={alt}
          title={caption}
        />;
      }
    },
  };

  if (loading) return <Loading />
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble loading your article</p>
  if (!data.articles.data.length) return <p className="text-center text-gray-500 text-lg p-10">No articles found</p>;

  return (
    <>
      <div className="bg-white py-32 px-6 lg:px-8">
        {data.articles.data.map((article) => (
          <div key={article.attributes.slug} className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <div className="mt-10 max-w-3xl" key={article.attributes.content.index}>
              {parse(article.attributes.content, options)}
            </div>
          </div>
        ))}

      </div>
    </>
  )
}