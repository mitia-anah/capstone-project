import React, { useContext, useState } from 'react';
import { Context } from '../useContext'
import CartItem from './CartItem'


function Cart() {
	const { cartItems, removeItems, emptyCard } = useContext(Context)
	const [orderBtnText, setOrderBtnText] = useState()
	const cartItemElement = cartItems.map(item => (
		<CartItem key={item.id} item={item} removeItems={removeItems} />
	))
	const total = cartItems.length * 5.99;
	const totalCostToDisplay = total.toLocaleString("en-US", { style: "currency", currency: "USD" })

	function handleOrder() {
		setOrderBtnText('Ordering...')
		setTimeout(() => {
			console.log('Order Placed');
			emptyCard()
		}, 3000)
	}


	return (
		<main className="cart-page">
			<h1>Check out</h1>
			{cartItemElement}
			<p className="total-cost">Total: {totalCostToDisplay}</p>
			<div className='order-button'>
				{cartItems.length > 0
					? <button onClick={handleOrder}>{orderBtnText}</button>
					: <p>You have no items in the cart</p>
				}
			</div>
		</main>
	);
}

export default Cart;
