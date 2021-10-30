import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteProductAction, editModeActivationAction } from '../actions/productActions';

const Product = ({product}) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const editModeHandler = () => {
        dispatch(editModeActivationAction(product))
        history.push('/edit-product')
    }

    return (
        <tr
            key={product.id}
        >
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
                <div>
                    <button
                        className="table-button edit"
                        onClick={editModeHandler}
                    >Edit</button>
                    <button
                        className="table-button delete"
                        onClick={() => dispatch(deleteProductAction(product.id))}
                    >Delete</button>
                </div>
            </td>
        </tr>
    );
};

export default Product;