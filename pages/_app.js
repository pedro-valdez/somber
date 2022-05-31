import Navbar from "../components/Navbar"
import CartProvider from "../components/CartContext"
import Cart from "../components/Cart"
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Navbar />
      <Cart />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
