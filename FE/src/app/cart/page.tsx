'use client';
// import { useState, useEffect } from 'react';
import CartEmty from '@/components/app/cart/cartEmpty';
import CartList from '@/components/app/cart/cartList';
const Cart = () => {
	return (
		<div className="p-6 w-full">
			<h2 className="text-[20px] text-black leading-[28px] font-[500] mb-4">Giỏ hàng</h2>
			<CartList />
		</div>
	);
};
export default Cart;
