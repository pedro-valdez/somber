import Navbar from "../components/Navbar"
import Quickview from "../components/Quickview"
import GlobalProvider from "../components/GlobalContext"
import Cart from "../components/Cart"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Navbar />
      <Quickview />
      <Cart />
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
