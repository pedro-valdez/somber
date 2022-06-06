import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"
import FETCHES from "../../lib/fetches"

export default function Wear({ products, gender, wear }) {
  return (
    <>
      <ProductList title={gender + " / " + wear} products={products}/>
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

  let genders = await sanityClient.fetch(`
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

  let products
  if (gender === "all") {
    products = await sanityClient.fetch(`
      * [_type == "product" 
      && ( "${wear}" in categories[]->slug.current
      || "${wear}" in categories[]->parents[]->slug.current )] ${FETCHES.PRODUCT_PROJECTION}
    `)
  } else {
    products = await sanityClient.fetch(`
      * [_type == "product" 
      && ( "${wear}" in categories[]->slug.current
      || "${wear}" in categories[]->parents[]->slug.current  )
      && ( "${gender}" in categories[]->slug.current )] ${FETCHES.PRODUCT_PROJECTION}
    `)
  }

  return {
    props: {
      products,
      gender,
      wear,
    },
  }
}
