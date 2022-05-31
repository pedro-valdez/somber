import Hero from "../../components/Hero"
import CategoryPreview from "../../components/CategoryPreview"
import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"
import FETCHES from "../../lib/fetches"

export default function Home({ products }) {
  return (
    <>
      <Hero />
      <CategoryPreview />
      <ProductList products={products} />
    </>
  )
}

export async function getStaticPaths() {
  let paths = await sanityClient.fetch(`
    * [_type ==  "category" && "gender" in parents[]->slug.current] {
      "gender": slug.current,
    }
  `)

  paths = paths
    .map(path => ({ params: path }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { gender } = params

  let products
  if (gender === "all") {
    products = await sanityClient.fetch(`
      * [_type == "product"] ${FETCHES.PRODUCT_PROJECTION}
    `)
  } else {
    products = await sanityClient.fetch(`
      * [_type == "product" 
      && ( "${gender}" in categories[]->slug.current )] ${FETCHES.PRODUCT_PROJECTION}
    `)
  }

  return {
    props: {
      products,
    },
  }
}
