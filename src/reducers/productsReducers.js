import { FETCH_PRODUCTS } from "../types";

export const productsReducers = (state ={}, action) =>{
    switch(action.type){
        case FETCH_PRODUCTS: return {
            items: action.payload
        }
        default: return state;
    }
}