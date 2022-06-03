import { useState, useReducer, createContext, useContext, useEffect, useLayoutEffect } from "react"

export const CART_ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  INITIALIZE: 'initialize',
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

    case CART_ACTIONS.REMOVE:
      return state.filter(product => product.id !== action.payload)

    case CART_ACTIONS.INITIALIZE:
      return action.payload

    default:
      return state
  }
}

export default function GlobalProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, [])
  const [isOpenCart, setIsOpenCart] = useState(false)

  const [isOpenQuickview, setIsOpenQuickview] = useState(false)
  const [quickviewProduct, setQuickviewProduct] = useState(undefined)

  useLayoutEffect(() => {
    const storage = JSON.parse(sessionStorage.getItem('cart'))
    if (storage) {
      dispatchCart({ type: CART_ACTIONS.INITIALIZE, payload: storage })
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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
