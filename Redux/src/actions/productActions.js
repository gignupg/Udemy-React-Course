import {
    GET_PRODUCTS_FROM_DB,
    ADD_NEW_PRODUCT,
    DELETE_PRODUCT,
    PUT_PRODUCT_IN_EDIT_MODE,
    MAKE_CHANGES_TO_PRODUCT
} from '../types';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

export function getProductsArrayAction() {
    return async dispatch => {
        try {
            const response = await axiosClient.get('/products');
            dispatch({ type: GET_PRODUCTS_FROM_DB, payload: response.data });

        } catch (error) {
            console.log(error);
        }
    };
}

export function addNewProductAction(newProduct) {
    return async dispatch => {
        try {
            const response = await axiosClient.post('/products', newProduct);
            dispatch({ type: ADD_NEW_PRODUCT, payload: response.data });

            Swal.fire(
                'Done!',
                'Your product has been added.',
                'success'
            )

        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteProductAction(productId) {
    return async dispatch => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async result => {
            if (result.isConfirmed) {
                await axiosClient.delete(`/products/${productId}`);
                dispatch({ type: DELETE_PRODUCT, payload: productId });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );

            }
        }).catch(error => {
            console.log(error);
        });
    };
}

export function editModeActivationAction(product) {
    return dispatch => {
        dispatch({ type: PUT_PRODUCT_IN_EDIT_MODE, payload: product });
    };
}

export function modifyProductAction(product) {
    return async dispatch => {
        try {
            await axiosClient.put(`/products/${product.id}`, product);
            dispatch({ type: MAKE_CHANGES_TO_PRODUCT, payload: product });

            Swal.fire(
                'Done!',
                'Your product has been changed.',
                'success'
            )

        } catch (error) {
            console.log(error);
        }
    };
}