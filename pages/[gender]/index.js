import Hero from "../../components/Hero"
import CategoryPreview from "../../components/CategoryPreview"
import ProductList from "../../components/ProductList"
import sanityClient from "../../lib/client"

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryPreview />
      <ProductList />
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
    .map(path => ({ params: { ...path } }))
  paths.push({ params: { gender: "all" } })
    

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  return {
    props: {
    },
  }
}
