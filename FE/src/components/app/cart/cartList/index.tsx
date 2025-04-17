import { useState } from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import { FaRegTrashCan } from 'react-icons/fa6';
import CartItem from './cartItem';
const CartList = () => {
	const [quantity, setQuantity] = useState(0);
	const onChange: CheckboxProps['onChange'] = (e) => {
		console.log(`checked = ${e.target.checked}`);
	};
	const handleDelete = () => {
		console.log('Delete selected items');
	};
	return (
		<div className="w-full flex">
			<div className="flex-1 w-[(calc(100% - 380px))] mr-5">
				<header className="bg-white grid  py-2 px-4 text-[#242424] gap-x-6 grid-cols-[auto_180px_120px_120px_20px] rounded-[4px] text-[13px] mb-3 sticky top-[20px] z-50 items-center">
					<div className="">
						<Checkbox onChange={onChange}>
							<span>{`Tất cả (${quantity} sản phẩm)`}</span>
						</Checkbox>
					</div>
					<span className="">Đơn giá</span>
					<span className="">Số lượng</span>
					<span className="">Thành tiền</span>
					<button onClick={handleDelete}>
						<FaRegTrashCan />
					</button>
				</header>
				<div className="">
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />
					<CartItem />
				</div>
			</div>
			<div className="w-[340px] bg-white"></div>
		</div>
	);
};
export default CartList;
