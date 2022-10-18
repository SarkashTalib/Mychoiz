import React from 'react'

export default function Hero() {
  return (
    <>
      <div className="">
        <img src="/images/sarah-dorweiler-x2Tmfd1-SgA-unsplash.jpg" alt="" className="w-screen max-h-[80vh] object-fill"/>
        <div className="flex flex-col items-center translate-x-16 -translate-y-40 md:translate-x-32 md:-translate-y-60 lg:-translate-y-80">
          <h1 className="font-serif text-2xl font-normal md:text-6xl ">Let's do it together</h1>
          <h3 className="font-sans text-sm font-thin md:text-xl">Let's find the best on the internet</h3>
          <a href="/" className="p-1 md:p-2 mt-4 border border-solid text-[#637f53] border-[#637f53] text-sm md:text-lg hover:bg-[#637f53] hover:text-white duration-300 ">View Latest Posts</a>
        </div>
      </div>
    </>
  )
}
