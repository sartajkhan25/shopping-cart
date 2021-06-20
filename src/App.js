import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { thisExpression } from "@babel/types";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [], // persistance
      size: "",
      sort: "",
    };
  }
  createOrder = (order) => {
    // send this as a props as cart component
    alert("need to save order for " + order.name);
  };
  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    ); // persistance
  };
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice(); //clone copy
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // persistance
  };
  sortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
    // switch (event.target.value) {
    //   case "":
    //     return this.setState({
    //       product: data.products.sort((a, b) => b._id - a._id),
    //     });
    //   case "highest":
    //     return this.setState({
    //       product: data.products.sort((a, b) => b.price - a.price),
    //     });
    //   case "lowest":
    //     return this.setState({
    //       product: data.products.sort((a, b) => a.price - b.price),
    //     });
    //   default:
    //     return this.state;
    // }
  };
  filterProducts = (event) => {
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };
  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  count={this.state.products.length} // sending count as props
                  size={this.state.size} // sending size as props
                  sort={this.state.sort} // sending filterProducts as props
                  filterProducts={this.filterProducts} // sending filterProducts as props
                  sortProducts={this.sortProducts} // sending sortProducts as props
                />
                <Products
                  products={this.state.products} // sending products as props
                  addToCart={this.addToCart} // sending addToCart as props
                ></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems} // sending cartItems as props
                  removeFromCart={this.removeFromCart} // sending removeFromCart as props
                  createOrder={this.createOrder} // sending createOrder as props
                />
              </div>
            </div>
          </main>
          <footer>All Right Reserved</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
