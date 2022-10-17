import React from 'react'

const categories = [
  {
    'id': "1",
    'name': "Cinema"
  },
  {
    'id': "2",
    'name': "Nature"
  },
  {
    'id': "3",
    'name': "Software"
  },
  {
    'id': "4",
    'name': "Vacation"
  },
  {
    'id': "5",
    'name': "Travel"
  },
  {
    'id': "6",
    'name': "Adventure"
  },

]

export default function CategoriesMenu() {
  return (
    <>
      <div className="mx-auto mb-20 max-w-7xl">
        <ul className="flex justify-between">
          {categories.map((category) => (
            <a href={category.id}><li className="px-6 py-1 text-lg duration-200 rounded-lg hover:bg-gray-50 text-black/60">{category.name}</li></a>
          ))}
        </ul>
      </div>
    </>
  )
}
