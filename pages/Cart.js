import React, { useContext } from 'react';
import { Context } from '../useContext'
import CartItem from './CartItem'


function Cart() {
	const { cartItems, removeItems, placeOrder } = useContext(Context)
	const cartItemElement = cartItems.map(item => (
		<CartItem key={item.id} item={item} removeItems={removeItems} />
	))
	const total = cartItems.length * 5.99;
	const totalCostToDisplay = total.toLocaleString("en-US", { style: "currency", currency: "USD" })


	return (
		<main className="cart-page">
			<h1>Check out</h1>
			{cartItemElement}
			<p className="total-cost">Total: {totalCostToDisplay}</p>
			<div className='order-button'>
				<button onChange={placeOrder}>Place Order</button>
			</div>
		</main>
	);
}

export default Cart;
