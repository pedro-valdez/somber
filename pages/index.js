import Hero from "../components/Hero"
import CategoryPreview from "../components/CategoryPreview"
import ProductList from "../components/ProductList"
import sanityClient from "../lib/client"

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
    && "popular" in tags] {
      "id": _id,
      "name": title,
      "href": "#",
      "price": defaultProductVariant.price,
      "imageSrc": defaultProductVariant.images[0].asset->url,
      "imageAlt": title,
    }
  `)

  const newest = await sanityClient.fetch(`
    * [_type == "product"] {
      "id": _id,
      "name": title,
      "href": "#",
      "price": defaultProductVariant.price,
      "imageSrc": defaultProductVariant.images[0].asset->url,
      "imageAlt": title,
      _createdAt,
    }
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
