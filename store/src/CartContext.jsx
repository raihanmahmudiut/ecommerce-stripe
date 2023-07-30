import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { getProductData } from "./productsstore";

export const CartContext = createContext({
	items: [],
	getProductQuantity: () => {},
	addOneToCart: () => {},
	removeOneFromCart: () => {},
	deleteFromCart: () => {},
	getTotalCost: () => {},
});

function CartProvider({ children }) {
	CartProvider.propTypes = {
		children: PropTypes.node.isRequired,
	};

	const [cartProducts, setCartProducts] = useState([]);
	//[{id:1, quantity: 2}]

	function getProductQuantity(id) {
		const quantity = cartProducts.find(
			(product) => product.id === id
		)?.quantity;
		if (quantity === undefined) {
			return 0;
		}
		return quantity;
	}

	function addOneToCart(id) {
		const quantity = getProductQuantity(id);
		if (quantity === 0) {
			setCartProducts([
				...cartProducts,
				{
					id: id,
					quantity: 1,
				},
			]);
		} else {
			setCartProducts(
				cartProducts.map((product) =>
					product.id === id
						? { ...product, quantity: product.quantity + 1 }
						: product
				)
			);
		}
	}

	function removeOneFromCart(id) {
		const quantity = getProductQuantity(id);
		if (quantity == 1) {
			deleteFromCart(id);
		} else {
			setCartProducts(
				cartProducts.map((product) =>
					product.id === id
						? { ...product, quantity: product.quantity - 1 }
						: product
				)
			);
		}
	}

	function deleteFromCart(id) {
		setCartProducts((cartProducts) =>
			cartProducts.filter((currentProduct) => {
				return currentProduct.id != id;
			})
		);
	}

	function getTotalCost() {
		let totalCost = 0;
		cartProducts.map((cartItem) => {
			const productData = getProductData(cartItem.id);
			totalCost += productData.price * cartItem.quantity;
		});
		return totalCost;
	}

	const contextValue = {
		items: cartProducts,
		getProductQuantity,
		addOneToCart,
		removeOneFromCart,
		deleteFromCart,
		getTotalCost,
	};
	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	);
}

export default CartProvider;
//Code down here

//context (cart, addtocart, removefromcart)
//provider => gives the app access to all thing in the context
