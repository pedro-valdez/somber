import Login from "../../components/Login"

export default function Sign() {
  return (
    <Login />
  )
}

export async function getStaticPaths() {
  const paths = [
    { params: { sign: "sign-in" } },
    { params: { sign: "sign-up" } },
  ]

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps() {
  return {
    props: {},
  }
}
