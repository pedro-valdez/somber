import Navbar from "../components/Navbar"
import Cart from "../components/Cart"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Cart />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
