
import { useEffect, useState } from "react";
import { useCartContext } from "../context/cart";
import {useSelector} from 'react-redux';

const Header:React.FC<any> = ({ selectedCategory, setSelectedCategory }) => {

    const [data, setData] = useState([]);
    const cart = useSelector((state:any) => state.cart);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setData(json);
            });
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            setSelectedCategory(data[0]);
        }
    }, [data, setSelectedCategory]);

    const value = useCartContext();

    let isLoading = false;
    let loadError = null;

    if (isLoading) {
        return <div>Data is Loading ...</div>;
    } else if (loadError) {
        return (
            <div>Oops there seems to be an error. Please try again later ...</div>
        );
    } else {
        return (
            <div className="header-items">
                {data.map((category) => (
                    <div
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={
                            "header-item " +
                            (selectedCategory === category ? "header-item-selected" : "")
                        }
                    >
                        {category}
                    </div>
                ))}
                <div className="shopping-items">
                    <span style={{ marginLeft: 5 }} className="cart-length">
                        {Object.keys(cart).length}
                    </span>
                </div>
            </div>
        );
    }
};

export default Header;            