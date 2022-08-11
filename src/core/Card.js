import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment from "moment"
import { addItem, updateItem, removeCartItem } from './cartHelpers'

const Card = ({
    product, showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined
}) => {

    const [redirect, setRedirect] = useState(false)

    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Products
                </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }
    const showCartButton = (quantity, showAddToCartButton) => {
        return product.sold < quantity && showAddToCartButton ? (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to cart
            </button>
        ) : (
                <span></span>
            );
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeCartItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count}
                            onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };
    
    const showStock = quantity => {
        return product.sold < quantity ? (
            <span className="badge badge-primary badge-pill">In Stock {quantity} </span>
        ) : (
                <span className="badge badge-primary badge-pill">Out of Stock </span>
            );
    };

    return (
        <div className="card" style={{maxHeight:"100%"}}>
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="products" />
                <p className="lead mt-2">{product.description.substring(0, 100)}
                </p>

                <p className="black-10"> ₹ : {product.price}
                </p>

                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>

                <p className="black-8">
                    Added on: {moment(product.createdAt).fromNow()}
                </p>

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showCartButton(product.quantity, showAddToCartButton)}
                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;
