import React from 'react';
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const navigation = [


  { name: 'Home', href: '/' },
  { name: 'Category', href: '/' },
  // { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]
export default function NavBar() {
  return (
    <Popover>
      <div className="px-4 mx-auto sm:px-6" >
        <nav className="relative flex items-center justify-between sm:h-10 md:h-14 md:justify-around" data-testid="nav" aria-label="Global">
          <a href="/" data-testid="logo-tag" className="flex">
            <span className="sr-only">Your Company</span>
            <img src="/logo.png" className="w-10 mr-2" alt="" />
            <h1 className="px-2 font-sans text-xl italic font-medium tracking-wider text-gray-500 uppercase md:px-0 md:text-3xl">Choiz Place</h1>
          </a>
          <div className="flex justify-center px-2 lg:ml-6 lg:justify-center">
            <div className="max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 duration-200 border border-gray-200 rounded-md focus:border-gray-100 focus:bg-gray-100 focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div data-testid="menu" className="flex items-center px-2 flex-2 md:absolute md:inset-y-0 md:left-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="flex items-center -mr-2 md:hidden">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md bg-gray-50 hover:bg-gray-100 hover:text-gray-500 ">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon data-testid="menu-icon" className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:space-x-10">
            {navigation.map((item, index) => (
              <a data-testid="nav-items" key={index} href={item.href} className="font-medium text-gray-500 hover:text-sky-600">
                {item.name}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >

        <Popover.Panel data-testid="panel" className="absolute inset-x-0 top-0 right-0 z-10 p-2 transition origin-top-right transform md:hidden">
          <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <a href="/" data-testid="popover">
                <span className="sr-only">Your Company</span>
                <h1 className="font-sans text-3xl italic font-medium tracking-wider text-gray-500 uppercase">Mychoiz</h1>
              </a>
              <div className="-mr-2" data-testid="popover-button">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 ">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon data-testid="popover-button-icon" className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <a
                  data-testid="popover-items"
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}