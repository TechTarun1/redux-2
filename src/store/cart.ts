const ADD_TO_CART = "ADD_TO_CART"; // verbs
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

const addToCartRedux = (payload:any) => ({
  type: ADD_TO_CART,
  payload
});
const removeFromCartRedux = (payload:any) => ({
  type: REMOVE_FROM_CART,
  payload
});

const initialState:any = {};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      console.log("adding in reducer");
      const newCart = { ...state };
      // my item already exists in the cart
      if (state[action.payload.id]) {
        const newProduct = { ...state[action.payload.id] };
        newProduct.quantity = newProduct.quantity + 1;
        newCart[action.payload.id] = newProduct;
      } else {
        newCart[action.payload.id] = {
          id: action.payload.id,
          quantity: 1
        };
      }
      return newCart;
    }
    case "REMOVE_FROM_CART": {
      const newCart = { ...state };
      // I dont have the product
      // guard clauses
      if (!newCart[action.payload.id]) return state;

      // I have it but the qty is 1 - remove it
      if (newCart[action.payload.id].quantity === 1) {
        delete newCart[action.payload.id];
      } else {
        const newProduct = { ...state[action.payload.id] };
        newProduct.quantity -= 1;
        newCart[action.payload.id] = newProduct;
      }
      return newCart;
    }
    default:
      return state;
  }
};

export { addToCartRedux, removeFromCartRedux };
export default reducer;