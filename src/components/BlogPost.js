import React from 'react'
import { posts } from '../data/Posts';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function readingcolor(...classes) {
  return classes.filter(Boolean).join(' ')
}
const MAX_LENGTH = 150;

export default function BlogPost(props) {
  return (
    <>
      <div className="relative w-screen px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="grid max-w-lg gap-5 mx-auto lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  <p className="absolute m-2 text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      <span
                        className={classNames(
                          post.category.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                        )}
                      >
                        {post.category.name}
                      </span>
                    </a>
                  </p>
                  <img className="object-cover w-full h-60" src={post.imageUrl} alt={post.title} />
                </div>
                <div className="flex flex-col justify-between flex-1 px-6 py-2 bg-white">
                  <div className="flex-1 border-b pb-2">
                    <a href={post.href} className="block mt-2 overflow-hidden">
                      <h4 className="text-xl font-semibold text-gray-900 h-14">{post.title}</h4>
                      <p className="mt-3 text-base text-gray-500">
                        {post.description.length > MAX_LENGTH ? 
                          (
                            <p>{`${post.description.substring(0, MAX_LENGTH)}... `}<a href="/" className="text-blue-600">Read More</a></p>
                          ) :
                          <p>{post.description}</p>
                        }
                      </p>
                    </a>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span className={readingcolor(
                          post.readingcolor.color,
                          'inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium'
                        )}>{post.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
