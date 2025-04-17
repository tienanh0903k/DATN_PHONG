/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import { FaRegTrashCan } from 'react-icons/fa6';
const CartItem = () => {
	const [quantity, setQuantity] = useState<number>(1);
	const onChange: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	const handleDelete = () => {
		console.log('Delete selected items');
	};
	const handlePrev = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
		console.log('Decrease quantity');
	};
	const handlePlus = () => {
		setQuantity(quantity + 1);
		console.log('Increase quantity');
	};
	return (
		<div className="bg-white grid items-center py-2 px-4 text-[#242424] gap-x-6 grid-cols-[auto_180px_120px_120px_20px] mb-2">
			<div className="flex items-center gap-x-2">
				<Checkbox onChange={onChange}></Checkbox>
				<div className="flex items-center gap-x-2 cursor-pointer">
					<div className="cart-item__image w-[80px] h-[80px]">
						<img
							src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/iphone13.png"
							alt=""
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="cart-item__details ">
						<h3 className="text-[14px] leading-[150%] text-[#27272a] line-clamp-2 hover:text-[#0b74e5]">
							Product Title
						</h3>
						<p className="cart-item__description">Product Description</p>
					</div>
				</div>
			</div>
			<div className="cart-item__unit-price">
				<div className="">
					<span className="text-[#ff424e] text-[14px] leading-[21px] font-[600]">$99.99</span>
					<span className="line-through ml-1 text-[12px] text-[#808089] font-[400]">$99.99</span>
				</div>
				<span className="text-[12px] leading-[18px] text-left text-[#808089] mt-1">
					Giá chưa áp dụng khuyến mãi
				</span>
			</div>

			<div className="flex items-center gap-x-2 border-[1px] border-[c8c8c8] border-solid w-[100px] rounded-[3px]">
				<button
					onClick={handlePrev}
					className="cursor-pointer text-center min-w-[24px] border-r-[1px] border-[c8c8c8] border-solid"
				>
					-
				</button>
				<input
					defaultValue={quantity}
					className="max-w-[32px] text-center text-[13px] appearance-none outline-none"
				/>
				<button
					onClick={handlePlus}
					className="cursor-pointer text-center min-w-[24px] border-l-[1px] border-[c8c8c8] border-solid"
				>
					+
				</button>
			</div>
			<div className="cart-item__total-price">
				<span className="cart-item__total-price-value">$99.99</span>
			</div>
			<button className="cursor-pointer" onClick={handleDelete}>
				<FaRegTrashCan />
			</button>
		</div>
	);
};
export default CartItem;
