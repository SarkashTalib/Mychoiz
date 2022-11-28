import React from 'react'

const categories = [


  { name: 'Cinema', href: '/Cinema' },
  { name: 'Nature', href: '/Nature' },
  { name: 'Software', href: '/Software' },
  { name: 'Vacation', href: '/Vacation' },
  { name: 'Travel', href: '/Travel' },
  { name: 'Adventure', href: '/Adventure' },
]

export default function CategoriesMenu() {
  return (
    <> 
      <div className="bg-gray-100">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-center text-gray-500">
            What are you looking for?
          </p>
          <div className="grid grid-cols-2 gap-2 mt-6 md:gap-8 md:grid-cols-6 lg:grid-cols-6">
            {categories.map((category) => (
              <div className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
                <a key={category.name} href={category.href} className="px-4 py-2 text-xl text-gray-400 duration-200 rounded-lg sm:text-3xl hover:bg-white">
                  {category.name}
                </a>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}
