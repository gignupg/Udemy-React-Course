import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addNewProductAction } from '../actions/productActions';

const AddNewProduct = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [name, setName] = useState("")
    const [price, setPrice] = useState(null)

    const submitHandler = e => {
        e.preventDefault();

        dispatch(addNewProductAction({
            name,
            price
        }))

        history.push('/')
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="card">
                <h2 className="product-title">Add a Product</h2>
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
                <button className="submit-button">Submit</button>
            </div>
        </form>
    );
};

export default AddNewProduct;