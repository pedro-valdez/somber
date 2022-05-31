export const CART_ACTIONS = {
  ADD: 'add',
}

export const CartContext = createContext()

function cartReducer(state, action) {
  switch(action.type) {
    case CART_ACTIONS.ADD:
      return [...state, action.payload]
      break
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatchCart] = useReducer(cartReducer, [])
  const [open, setOpen] = useState(false)

  return (
    <CartContext.Provider
      value={{
        dispatchCart,
        open, setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCartContext () {
  return useContext(CartContext)
}
