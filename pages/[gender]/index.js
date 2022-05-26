import Hero from "../../components/Hero"
import CategoryPreview from "../../components/CategoryPreview"
import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"

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
  paths.push({ params: { gender: "all" } })
    

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
      * [_type == "product"] {
        "id": _id,
        "name": title,
        "href": "#",
        "price": defaultProductVariant.price,
        "imageSrc": defaultProductVariant.images[0].asset->url,
        "imageAlt": title,
      }
    `)
  } else {
    products = await sanityClient.fetch(`
      * [_type == "product" 
      && ( "${gender}" in categories[]->slug.current )] {
        "id": _id,
        "name": title,
        "href": "#",
        "price": defaultProductVariant.price,
        "imageSrc": defaultProductVariant.images[0].asset->url,
        "imageAlt": title,
      }
    `)
  }

  return {
    props: {
      products,
    },
  }
}
