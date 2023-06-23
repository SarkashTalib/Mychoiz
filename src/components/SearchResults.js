import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import { useQuery } from '@apollo/client';
import ARTICLES_QUERY from '../queries/ArticlesQuery';
import Loading from './Loading';



const SearchResults = ({ searchTerm }) => {
  const [, setData] = useState([]); //data is removed to prevent unsed eslint warnings
  const [filteredData, setFilteredData] = useState([]);

  const { loading, error, data: articlesData } = useQuery(ARTICLES_QUERY);

  useEffect(() => {
    if (articlesData) {
      console.log('daatta', articlesData.articles.data);
      setData(articlesData.articles.data);
      setFilteredData(filterResults(articlesData.articles.data, searchTerm));
    }
  }, [searchTerm, articlesData]);


  const filterResults = (articles, searchTerm) => {
    return articles.filter(result => {
      const titleMatch = result.attributes.title.toLowerCase().includes(searchTerm.toLowerCase());
      const descriptionMatch = result.attributes.description?.toLowerCase().includes(searchTerm.toLowerCase());
      return titleMatch || descriptionMatch;
    });
  };


  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500 text-lg p-10">Oh, snapp! We are having some trouble fetching you content</p>;
  if (filteredData.length === 0) return <p className="text-center text-gray-500 text-lg p-10">Nothing Found!</p>;

  return (
    <div className="flex-col flex" >
      <div className="flex flex-col items-center justify-center flex-shrink-0 md:mt-10">
        <div className="relative w-screen px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
          <div className="absolute inset-0">
            <div className="bg-white h-1/3 sm:h-2/3" />
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none lg:grid-cols-3">
              {filteredData.reverse().map((article) => (
                <article key={article.id} className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                  <Link to={`/article/${article.attributes.slug}`} key={`/article/${article.attributes.slug}`}>
                    {console.log('image', article.attributes.coverImg)}
                    <img
                      src={`${article.attributes.coverImg.data.attributes['url']}`}
                      alt={`${article.attributes.coverImg.data.attributes['alternativeText']}`}
                      key={`${article.attributes.coverImg.data.id}`}
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

                        <div className="absolute m-2">
                          {article.attributes.categories.data.map((category) => (
                            <Link to={`/category/${category.id}`} key={`/category/${category.id}`}>
                              <span

                                className="px-2 m-2 text-emerald-50 bg-gray-900/20 rounded-md hover:text-emerald-300"
                              >
                                {category.attributes.name}
                              </span>
                            </Link>
                          ))}
                        </div>

                      </div>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold leading-6 text-white line-clamp-1">
                      {article.attributes.title}
                    </h2>
                    <div className="flex  flex-col h-28 justify-between">
                      <p className="mt-3 text-base text-gray-400  line-clamp-4">{article.attributes.description}</p>
                    </div>
                  </Link>

                  <Link
                    to={`/article/${article.attributes.slug}`}
                    key={article.attributes.slug}
                    className="text-emerald-200 hover:text-emerald-500">
                    Read all the article
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
