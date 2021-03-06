import { Fragment, useState } from 'react'
import { useGlobalContext } from "./GlobalContext"
import Link from "next/link"
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

/*
 * Why is this hard coded?
 * NextJS only allows fetching at build time for pages,
 * and since this is a component one can only fetch client-side.
 * However, navbar items don't frequently change, so client-side fetching
 * each time someone accesses the website is inefficient and unresourceful.
 * Furthermore, adding a navbar for each page and passing props to it is
 * tedious and more prone to errors.
 * Thus, we hardcode. The object is autogenerated anyway :p
*/
/*
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
*/

const navigation = {
  pages: [],
  categories: [
  {
    "featured": [
      {
        "_createdAt": "2022-04-26T02:00:04Z",
        "blurb": "Look scorching in bright red.",
        "id": "1d916720-b0cf-4775-9e29-3907a909ea44",
        "imageAlt": "Technical Hexagon Jacket",
        "imageSrc": "https://cdn.sanity.io/images/n8a5172y/production/adcb05a67779d985bcbe752de20e15df898402f6-640x960.jpg",
        "name": "Technical Hexagon Jacket",
        "price": 79.99,
        "sizes": [
          {
            "inStock": true,
            "name": "XS"
          },
          {
            "inStock": true,
            "name": "S"
          },
          {
            "inStock": true,
            "name": "L"
          },
          {
            "inStock": true,
            "name": "XL"
          }
        ]
      },
      {
        "_createdAt": "2022-04-22T04:10:58Z",
        "blurb": "Go! Go! Go!",
        "id": "2c272b0c-2ce1-43f7-be1a-089d522fb8b9",
        "imageAlt": "Misguided Neon Green Shirt",
        "imageSrc": "https://cdn.sanity.io/images/n8a5172y/production/1fb558e74af0d820746be24be05ed9da82118440-640x960.jpg",
        "name": "Misguided Neon Green Shirt",
        "price": 24.99,
        "sizes": [
          {
            "inStock": true,
            "name": "XS"
          },
          {
            "inStock": true,
            "name": "S"
          },
          {
            "inStock": true,
            "name": "L"
          },
          {
            "inStock": true,
            "name": "XL"
          }
        ]
      }
    ],
    "href": "/women",
    "id": "31d44a38-793c-4c3f-97f6-1044e277ae02",
    "name": "Women",
    "sections": [
      {
        "href": "/women/clothing",
        "id": "38cf7f3f-acae-4a29-aae2-7a6c11ed3dfe",
        "items": [
          {
            "href": "/women/jackets-and-others",
            "name": "Jackets & Others"
          },
          {
            "href": "/women/shirts-and-tops",
            "name": "Shirts & Tops"
          },
          {
            "href": "/women/sweaters-and-sweatshirts",
            "name": "Sweaters & Sweatshirts"
          },
          {
            "href": "/women/pants",
            "name": "Pants"
          }
        ],
        "name": "Clothing"
      },
      {
        "href": "/women/accessories",
        "id": "5acc6ee1-da29-4990-a173-3e98e8260345",
        "items": [],
        "name": "Accessories"
      },
      {
        "href": "/women/shoes",
        "id": "d1221cce-6d49-47e6-b826-0e8ae678007c",
        "items": [],
        "name": "Shoes"
      }
    ]
  },
  {
    "featured": [
      {
        "_createdAt": "2022-04-22T03:53:13Z",
        "blurb": "Boo!",
        "id": "088e0ffc-0c46-46eb-a55b-28a27befdfc5",
        "imageAlt": "Yikes Hoodie",
        "imageSrc": "https://cdn.sanity.io/images/n8a5172y/production/b587e069151ef735d240185ee42d42fd58721c8e-640x960.jpg",
        "name": "Yikes Hoodie",
        "price": 29.99,
        "sizes": [
          {
            "inStock": true,
            "name": "XS"
          },
          {
            "inStock": true,
            "name": "S"
          },
          {
            "inStock": true,
            "name": "L"
          },
          {
            "inStock": true,
            "name": "XL"
          }
        ]
      },
      {
        "_createdAt": "2022-04-22T02:32:31Z",
        "blurb": "Stay true.",
        "id": "27e1ddea-e2bd-4cdb-a70a-c99dab1e5ed7",
        "imageAlt": "Stay True Hoodie",
        "imageSrc": "https://cdn.sanity.io/images/n8a5172y/production/193280734eaa0d67fb13ac9023de9db6513a0a97-640x960.jpg",
        "name": "Stay True Hoodie",
        "price": 24.99,
        "sizes": [
          {
            "inStock": true,
            "name": "XS"
          },
          {
            "inStock": true,
            "name": "S"
          },
          {
            "inStock": true,
            "name": "L"
          },
          {
            "inStock": true,
            "name": "XL"
          }
        ]
      }
    ],
    "href": "/men",
    "id": "a31cb765-82a5-473b-83f7-1639f08d92cd",
    "name": "Men",
    "sections": [
      {
        "href": "/men/clothing",
        "id": "38cf7f3f-acae-4a29-aae2-7a6c11ed3dfe",
        "items": [
          {
            "href": "/men/jackets-and-others",
            "name": "Jackets & Others"
          },
          {
            "href": "/men/shirts-and-tops",
            "name": "Shirts & Tops"
          },
          {
            "href": "/men/sweaters-and-sweatshirts",
            "name": "Sweaters & Sweatshirts"
          },
          {
            "href": "/men/pants",
            "name": "Pants"
          }
        ],
        "name": "Clothing"
      },
      {
        "href": "/men/accessories",
        "id": "5acc6ee1-da29-4990-a173-3e98e8260345",
        "items": [],
        "name": "Accessories"
      },
      {
        "href": "/men/shoes",
        "id": "d1221cce-6d49-47e6-b826-0e8ae678007c",
        "items": [],
        "name": "Shoes"
      }
    ]
  },
  {
    "featured": [],
    "href": "/all",
    "id": "9b2c7e3c-c944-42f1-83bd-a53ac6b20d72",
    "name": "All",
    "sections": [
      {
        "href": "/all/clothing",
        "id": "38cf7f3f-acae-4a29-aae2-7a6c11ed3dfe",
        "items": [
          {
            "href": "/all/jackets-and-others",
            "name": "Jackets & Others"
          },
          {
            "href": "/all/shirts-and-tops",
            "name": "Shirts & Tops"
          },
          {
            "href": "/all/sweaters-and-sweatshirts",
            "name": "Sweaters & Sweatshirts"
          },
          {
            "href": "/all/pants",
            "name": "Pants"
          }
        ],
        "name": "Clothing"
      },
      {
        "href": "/all/accessories",
        "id": "5acc6ee1-da29-4990-a173-3e98e8260345",
        "items": [],
        "name": "Accessories"
      },
      {
        "href": "/all/shoes",
        "id": "d1221cce-6d49-47e6-b826-0e8ae678007c",
        "items": [],
        "name": "Shoes"
      }
    ]
  },
],
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const {
    setIsOpenCart,
    cart,
    setIsOpenQuickview,
    setQuickviewProduct
  } = useGlobalContext()

  return (
    <div className="bg-white sticky top-0 left-0 w-full z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[60] lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 pt-5 pb-2 flex">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex px-4 space-x-8">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                            )
                          }
                        >
                            {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <button
                              onClick={() => {
                                setIsOpenQuickview(true)
                                setQuickviewProduct(item)
                              }}
                              key={item.name}
                              className="group relative text-sm text-left">
                              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                              </div>
                              <span className="mt-6 block font-medium text-gray-900">
                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                {item.name}
                              </span>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </button>
                          ))}
                        </div>
                        <Link href={category.href}>
                          <a className="block font-medium text-gray-900">
                            {category.name}
                          </a>
                        </Link>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              <Link href={section.href}>
                                {section.name}
                              </Link>
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <Link href={item.href}>
                                    <a className="-m-2 p-2 block text-gray-500">
                                      {item.name}
                                    </a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link href={page.href}>
                        <a className="-m-2 p-2 block font-medium text-gray-900">
                          {page.name}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link href="/user/sign-in">
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        Sign in
                      </a>
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link href="/user/sign-up">
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        Create account
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                  <span className="-m-2 p-2 flex items-center">
                    <span className="w-5 block flex-shrink-0">????????</span>
                    <span className="ml-3 block text-base font-medium text-gray-900">USA</span>
                    <span className="sr-only">, change currency</span>
                  </span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                    />
                  </a>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="h-16 flex items-center">
                                    <p>
                                      <Link href={category.href}>
                                        {category.name}
                                      </Link>
                                    </p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 pb-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <button
                                          onClick={() => {
                                            setIsOpenQuickview(true)
                                            setQuickviewProduct(item)
                                          }}
                                          key={item.name}
                                          className="group relative text-base sm:text-sm text-left">
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <span className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </span>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </button>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            <Link href={section.href}>
                                              {section.name}
                                            </Link>
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <Link href={item.href}>
                                                  <a className="hover:text-gray-800">
                                                    {item.name}
                                                  </a>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                    >
                      <a
                        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        {page.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="/user/sign-in">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Sign in
                    </a>
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <Link href="/user/sign-up">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Create account
                    </a>
                  </Link>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <span className="text-gray-700 hover:text-gray-800 flex items-center">
                    <span className="w-5 block flex-shrink-0">????????</span>
                    <span className="ml-3 block text-sm font-medium">USA</span>
                    <span className="sr-only">, change currency</span>
                  </span>
                </div>

                {/* Search
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>
                */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button
                    href="#"
                    className="group -m-2 p-2 flex items-center text-left"
                    onClick={() => setIsOpenCart(true)}
                  >
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cart.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
