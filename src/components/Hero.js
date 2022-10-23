import React from 'react'

export default function Hero() {
  return (
    <>
      <div className="relative overflow-hidden bg-gray-50">
        <div className="hidden sm:absolute sm:inset-y-0 sm:block sm:h-full sm:w-full" aria-hidden="true">
          <div className="relative h-full mx-auto max-w-7xl">
            <svg
              className="absolute transform right-full translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
            </svg>
            <svg
              className="absolute transform left-full -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
              width={404}
              height={784}
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={784} fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
            </svg>
          </div>
        </div>

        <div className="relative pt-6 pb-16 sm:pb-24">
          <main className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Let's do it</span>{' '}
                <span className="block text-emerald-600 xl:inline">Together</span>
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
                Find the best on the internet</p>
              <div className="max-w-lg mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <a
                    href="/"
                    className="flex items-center justify-center w-full px-8 py-3 text-base font-medium bg-white rounded-md text-emerald-600 hover:bg-gray-50 md:py-2 md:px-10 md:text-lg"
                  >
                    Latest Posts
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

    </>
  )
}
