import React from 'react'
import BlogPost from './BlogPost'

export default function RecentPosts(props) {
  return (
    <>
      <div className="flex flex-col items-center justify-center flex-shrink-0 mt-10">
        <h1 className="pb-4 text-4xl border-b text-emerald-600">Most Recent</h1>
        <div>
          <BlogPost />
        </div>
      </div>
    </>
  )
}
