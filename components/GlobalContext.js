import { useState, useReducer, createContext, useContext, useEffect } from "react"

export const CART_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
}

export const GlobalContext = createContext()

function cartReducer(state, action) {
  switch(action.type) {
    case CART_ACTIONS.ADD:
      const newProduct = {
        ...action.payload,
        id: action.payload.id + action.payload.selectedSize
      }

      const newProductIndex = state
        .findIndex(product => product.id === newProduct.id)

      if(newProductIndex > -1) {
        const newState = JSON.parse(JSON.stringify(state))
        newState[newProductIndex].quantity += newProduct.quantity
        return newState
      }

      return [...state, newProduct]
      break

    case CART_ACTIONS.REMOVE:
      return state.filter(product => product.id !== action.payload)

    default:
      return state
  }
}

export default function GlobalProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, [])
  const [isOpenCart, setIsOpenCart] = useState(false)

  const [isOpenQuickview, setIsOpenQuickview] = useState(false)
  const [quickviewProduct, setQuickviewProduct] = useState(undefined)

  return (
    <GlobalContext.Provider
      value={{
        cart, dispatchCart,
        isOpenCart, setIsOpenCart,
        isOpenQuickview, setIsOpenQuickview,
        quickviewProduct, setQuickviewProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext () {
  return useContext(GlobalContext)
}
