import Navbar from "../components/Navbar"
import GlobalProvider from "../components/GlobalContext"
import Cart from "../components/Cart"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Navbar />
      <Cart />
      <Component {...pageProps} />
    </GlobalProvider>
  )
}

export default MyApp
