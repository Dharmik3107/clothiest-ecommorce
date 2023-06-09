import { createContext, useEffect, useState } from "react";

const addItemToCart = (cartItems, newItem) => {
	const isExist = cartItems.find((element) => element.id === newItem.id);
	if (isExist) {
		return cartItems.map((element) => {
			return element.id === newItem.id ? { ...element, quantity: element.quantity + 1 } : { ...element };
		});
	}

	return [...cartItems, { ...newItem, quantity: 1 }];
};

const removeItemFromCart = (cartItems, item) => {
	const isExist = cartItems.find((element) => element.id === item.id);

	if (isExist.quantity === 1) {
		return cartItems.filter((element) => element.id !== item.id);
	}

	return cartItems.map((element) => {
		return element.id === item.id ? { ...element, quantity: element.quantity - 1 } : element;
	});
};

const clearItemFromCart = (cartItems, item) => cartItems.filter((element) => element.id !== item.id);

export const CartContext = createContext({
	cartItems: [],
	setCartItems: () => {},
	addItem: () => {},
	removeItem: () => {},
	clearItem: () => {},
	totalQuantity: 0,
	totalAmount: 0,
});

export const CartProvider = ({ children }) => {
	const [cartItems, setCartItems] = useState([]);
	const [totalQuantity, setQuantity] = useState(0);
	const [totalAmount, setAmount] = useState(0);

	const addItem = (item) => {
		setCartItems(addItemToCart(cartItems, item));
	};

	const removeItem = (item) => {
		setCartItems(removeItemFromCart(cartItems, item));
	};

	const clearItem = (item) => {
		setCartItems(clearItemFromCart(cartItems, item));
	};

	useEffect(() => {
		const currentQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setQuantity(currentQuantity);
	}, [cartItems]);

	useEffect(() => {
		const currentAmount = cartItems.reduce((total, cartItem) => total + cartItem.price.current.value * cartItem.quantity, 0);
		setAmount(currentAmount);
	}, [cartItems]);

	const value = { cartItems, setCartItems, addItem, removeItem, clearItem, totalQuantity, totalAmount };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
