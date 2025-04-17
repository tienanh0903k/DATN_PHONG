/* eslint-disable @next/next/no-img-element */
const CartEmty = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full bg-[#fff] rounded-[8px] py-4 ">
			<img
				src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/cart.png"
				alt="Empty Cart"
				className="w-[160px] h-[160px] mb-4"
			/>
			<h2 className="text-2xl font-bold">Giỏ hàng trống</h2>
			<p className="text-gray-500 mt-2">Bạn tham khảo thêm các sản phẩm được Tiki gợi ý bên dưới nhé!</p>
		</div>
	);
};
export default CartEmty;
