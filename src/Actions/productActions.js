import { FETCH_PRODUCTS } from '../types'

export const fetchProducts=()=>{
    return async (dispatch)=>{

        const output = require('../data.json')
        console.log(output.products)
        dispatch({
            type: FETCH_PRODUCTS,
            payload: output.products
        })
    }
    
}