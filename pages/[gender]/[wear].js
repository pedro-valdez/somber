import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"

export default function Wear({ products }) {
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}

export async function getStaticPaths() {
  const wear = await sanityClient.fetch(`
    * [_type == "category" 
    && ( "menu-item" in parents[]->slug.current
    || "menu-item" in parents[]->parents[]->slug.current  )] {
      "wear": slug.current,
    }
  `)

  const genders = await sanityClient.fetch(`
    * [_type ==  "category" && "gender" in parents[]->slug.current] {
      "gender": slug.current,
    }
  `)

  const paths = genders
    .map(gender => (wear
      .map(wear => ({ params: { ...gender, ...wear  } }))))
    .flat()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { gender, wear } = params
  const products = await sanityClient.fetch(`
    * [_type == "product" 
    && ( "${wear}" in categories[]->slug.current
    || "${wear}" in categories[]->parents[]->slug.current  )
    && ( "${gender}" in categories[]->slug.current )] {
      "id": _id,
      "name": title,
      "href": "#",
      "price": defaultProductVariant.price,
      "imageSrc": defaultProductVariant.images[0].asset->url,
      "imageAlt": title,
    }
  `)

  return {
    props: {
      products,
    },
  }
}
