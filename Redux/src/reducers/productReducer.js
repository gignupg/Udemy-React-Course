import {
    GET_PRODUCTS_FROM_DB,
    ADD_NEW_PRODUCT,
    DELETE_PRODUCT,
    PUT_PRODUCT_IN_EDIT_MODE,
    MAKE_CHANGES_TO_PRODUCT
} from '../types';

// cada reducer tiene su propio state
const initialState = {
    productList: [],
    productInEditMode: {}
}

export default function productReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PRODUCTS_FROM_DB:
            return {
                ...state,
                productList: action.payload
            }
        case ADD_NEW_PRODUCT:
            console.log("Hola desde el reducer")
            return {
                ...state,
                productList: [...state.productList, action.payload]
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                productList: state.productList.filter(product => product.id !== action.payload)
            }
        case PUT_PRODUCT_IN_EDIT_MODE:
            return {
                ...state,
                productInEditMode: action.payload
            }
        case MAKE_CHANGES_TO_PRODUCT:
            return {
                ...state,
                productList:  state.productList.filter(product => product.id !== action.payload.id ? product : action.payload)
            }
        default:
            return state;
    }
}