import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsArrayAction } from '../actions/productActions';
import Product from './Product';

const ProductList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsArrayAction());
        // eslint-disable-next-line
    }, []);

    const productList = useSelector(state => state.product.productList);

    return (
        <div className="container">
            <h2 className="table-heading">Product List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList.length ?
                            productList.map(product => (
                                <Product
                                    key={product.id}
                                    product={product}
                                />
                            ))
                            :
                            (
                                <tr>
                                    <td>No products available. Feel free to add some!</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;