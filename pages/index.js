import Hero from "../components/Hero"
import CategoryPreview from "../components/CategoryPreview"
import ProductList from "../components/ProductList"
import sanityClient from "../lib/client"
import FETCHES from "../lib/fetches"

export default function Home({ popular, newest }) {
  return (
    <>
      <Hero />
      <CategoryPreview />
      <ProductList products={popular} />
      <ProductList products={newest} />
    </>
  )
}

export async function getStaticProps() {
  const popular = await sanityClient.fetch(`
    * [_type == "product"
    && "popular" in tags] ${FETCHES.PRODUCT_PROJECTION}
  `)

  const newest = await sanityClient.fetch(`
    * [_type == "product"] ${FETCHES.PRODUCT_PROJECTION}
    | order(_createdAt desc)
    [0..3]
  `)

  return {
    props: {
      popular,
      newest,
    },
  }
}
