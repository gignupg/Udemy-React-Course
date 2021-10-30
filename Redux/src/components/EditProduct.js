import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { modifyProductAction } from '../actions/productActions';

const EditProduct = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = useSelector(state => state.product.productInEditMode);

    const [name, setName] = useState(initialState.name)
    const [price, setPrice] = useState(initialState.price)

    const submitHandler = e => {
        e.preventDefault();

        dispatch(modifyProductAction({
            id: initialState.id,
            name,
            price
        }));

        history.push('/');
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="card">
                <h2 className="product-title">Edit Product</h2>
                <h3>Product name</h3>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                ></input>
                <h3>Price</h3>
                <input
                    name="price"
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                ></input>
                <button className="submit-button">Submit changes</button>
            </div>
        </form>
    );
};

export default EditProduct;