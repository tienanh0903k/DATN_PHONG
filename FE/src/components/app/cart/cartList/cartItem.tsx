/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import { FaRegTrashCan } from 'react-icons/fa6';
import { formatPrice } from '@/utils/formatprice';

type Props = {
	id: number;
	img: string;
	name: string;
	quantities: number;
	price: number;
	variantValue: string;
	isSelected: boolean;
	onSelect?: (item: {
		id: number;
		name: string;
		quantity: number;
		price: number;
		img: string;
		variantValue: string;
		totalPrice: number;
		isSelected: boolean;
	}) => void;
};

const CartItem = ({ id, img, name, quantities, price, variantValue, onSelect }: Props) => {
	const [quantity, setQuantity] = useState<number>(quantities);
	const [totalPrice, setTotalPrice] = useState<number>(price * quantities);
	const [isSelected, setIsSelected] = useState<boolean>(false);

	const onChange: CheckboxProps['onChange'] = (e) => {
		setIsSelected(e.target.checked);
		if (onSelect) {
			onSelect({
				id,
				name,
				quantity,
				price,
				img,
				variantValue,
				totalPrice: price * quantities,
				isSelected: e.target.checked,
			});
		}
	};

	const handleDelete = () => {
		console.log('Delete selected items');
	};

	const handlePrev = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			const newTotalPrice = newQuantity * price;
			setTotalPrice(newTotalPrice);
			if (onSelect && isSelected) {
				onSelect({
					id,
					name,
					quantity: newQuantity,
					price,
					img,
					variantValue,
					totalPrice: newTotalPrice,
					isSelected,
				});
			}
		}
	};

	const handlePlus = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		const newTotalPrice = newQuantity * price;
		setTotalPrice(newTotalPrice);
		if (onSelect && isSelected) {
			onSelect({
				id,
				name,
				quantity: newQuantity,
				price,
				img,
				variantValue,
				totalPrice: newTotalPrice,
				isSelected,
			});
		}
	};

	return (
		<div className="bg-white grid items-center py-2 px-4 text-[#242424] gap-x-6 grid-cols-[auto_180px_120px_120px_20px] mb-2">
			<div className="flex items-center gap-x-2">
				<Checkbox onChange={onChange}></Checkbox>
				<div className="flex items-center gap-x-2 cursor-pointer">
					<div className="cart-item__image w-[80px] h-[80px]">
						<img src={img} alt="" className="w-full h-full object-cover" />
					</div>
					<div className="cart-item__details ">
						<h3 className="text-[14px] leading-[150%] text-[#27272a] line-clamp-2 hover:text-[#0b74e5]">
							{name}
						</h3>
						<p className="cart-item__description">{variantValue}</p>
					</div>
				</div>
			</div>
			<div className="cart-item__unit-price">
				<div className="">
					<span className="text-[#ff424e] text-[14px] leading-[21px] font-[600]">{formatPrice(price)}</span>
					<span className="line-through ml-1 text-[12px] text-[#808089] font-[400]">
						{formatPrice(price)}
					</span>
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
					value={quantity}
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
				<span className="cart-item__total-price-value">{formatPrice(totalPrice)}</span>
			</div>
			<button className="cursor-pointer" onClick={handleDelete}>
				<FaRegTrashCan />
			</button>
		</div>
	);
};

export default CartItem;
