import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"

export default function Wear() {
  return (
    <>
      <ProductList />
      <ProductList />
      <ProductList />
      <ProductList />
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

export async function getStaticProps() {
  return {
    props: {
    },
  }
}
