import { useDispatch, useSelector } from "react-redux";
import { addToCartRedux, removeFromCartRedux } from "../store/cart";

function AddToCart({ product }:any) {

  const cart = useSelector((state:any) => state.cart);

  const dispatch = useDispatch();

  const productInCart = cart[product.id];

  const handleRemoveFromCart = () => {
    dispatch(removeFromCartRedux(product));
  };

  const handleAddToCart = () => {
    dispatch(addToCartRedux(product));
  };

  if (!productInCart) {

    return (
      <div className="add-to-cart" onClick={handleAddToCart}>
        Add To Cart{" "}
      </div>
    );
  } else {
    
    return (
      <div className="add-to-cart-container">
        <div className="add" onClick={handleRemoveFromCart}>
          -
        </div>
        <div className="quantity">{productInCart.quantity}</div>
        <div className="add" onClick={handleAddToCart}>
          +
        </div>
      </div>
    );
  }
}

export default AddToCart;