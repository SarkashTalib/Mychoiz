import React from 'react'

export default function CategoriesMenu() {
  return (
    <> 
      <div className="bg-gray-100">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-center text-gray-500">
            What are you looking for?
          </p>
          <div className="grid grid-cols-2 gap-2 mt-6 md:gap-8 md:grid-cols-6 lg:grid-cols-6">
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Cinema</a>
            </div>
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Nature</a>
            </div>
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Software</a>
            </div>
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Vacation</a>
            </div>
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Travel</a>
            </div>
            <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
              <a href="/" className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">Adventure</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
