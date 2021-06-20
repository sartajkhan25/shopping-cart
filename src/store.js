import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productsReducers } from "./reducers/productsReducers";
import { compose } from "redux";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// by this we are informing chrome about all redux information, to monitoe whatever happen, action, arders anything
const store = createStore(
  combineReducers({
    products: productsReducers,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store; // now use it- go to app.js and include it
