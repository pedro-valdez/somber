import { useState, useReducer, createContext, useContext } from "react"

export const CART_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
}

export const CartContext = createContext()

function cartReducer(state, action) {
  switch(action.type) {
    case CART_ACTIONS.ADD:
      return [...state, action.payload]
      break
    case CART_ACTIONS.REMOVE:
      return state.filter(product => product.id !== action.payload)
    default:
      return state
  }
}

export default function CartProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, [])
  const [isOpenCart, setIsOpenCart] = useState(false)

  return (
    <CartContext.Provider
      value={{
        cart, dispatchCart,
        isOpenCart, setIsOpenCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext () {
  return useContext(CartContext)
}
