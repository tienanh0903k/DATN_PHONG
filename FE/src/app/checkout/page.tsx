/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { Radio } from 'antd';
import { useState } from 'react';
import { formatPrice } from '@/utils/formatprice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import PaymentServices from '@/services/payment/paymentServices';
import { URL_SERVICE } from '@/constant/constant';

const CheckOut = () => {
	const [deliveryMethod, setDeliveryMethod] = useState('standard');
	const [paymentMethod, setPaymentMethod] = useState('cod');

	const user = useSelector((state: RootState) => state.auth.userInfo);
	const selectedItems = useSelector((state: RootState) => state.checkout.selectedItems);

	const totalPrice = selectedItems.reduce((acc: number, item: any) => acc + item.totalPrice, 0);

	const paymentServices = new PaymentServices(URL_SERVICE, () => {});

	const handlePayment = async () => {
		const data = {
			customerId: user?.customerId,
			numberPhone: user?.numberPhone,
			address: user?.address,
			cartItems: selectedItems,
		};
		if (paymentMethod === '1') {
			console.log('Thanh toán sau khi nhận hàng');
		} else if (paymentMethod != '1') {
			const response: any = await paymentServices.createOrder(data);
			if (response?.checkoutUrl) {
				window.location.href = response.checkoutUrl;
			}
		}
	};
	return (
		<div className=" py-4">
			<div className="flex gap-8">
				<div className="flex-1">
					<div className="bg-white p-4 rounded mb-4">
						<h2 className="text-[18px] font-medium mb-4">Chọn hình thức giao hàng</h2>
						<Radio.Group value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
							<div className="border rounded p-4 mb-4">
								<Radio value="standard" className="w-full">
									<div className="flex justify-between items-center w-full">
										<div>
											<span className="text-[15px]">Giao tiết kiệm</span>
											<span className="text-[#00AB56] ml-2">-25K</span>
										</div>
										<span className="text-[15px]">{formatPrice(39700)}</span>
									</div>
								</Radio>
							</div>
						</Radio.Group>
						{selectedItems &&
							selectedItems.map((item: any, index: number) => (
								<div key={index} className="bg-white p-4 rounded mb-4">
									<h2 className="text-[18px] font-medium mb-4">Sản phẩm</h2>
									<div className="flex gap-4 items-start w-full justify-between ">
										<div className="flex gap-4 items-start ">
											<img
												src={item?.img}
												alt={item?.name}
												className="w-[80px] h-[80px] object-cover border rounded"
											/>
											<div className="flex flex-col justify-between">
												<div className="text-[15px] font-medium">
													{item?.name}({item?.variantValue})
												</div>
												<div className="text-[#808089] text-[13px]">SL: x{item.quantity}</div>
											</div>
										</div>
										<div className="flex gap-2 items-center mt-1">
											<span className="text-[#808089] line-through text-[14px]">
												{formatPrice(item?.totalPrice)}
											</span>
											<span className="text-[#FF424E] font-medium text-[16px]">
												{formatPrice(item?.totalPrice)}
											</span>
										</div>
										<div className="ml-6 mt-2 text-[13px] text-[#808089] w-[30%]">
											Được giao bởi TikiNOW Smart Logistics (giao từ Hồ Chí Minh)
										</div>
									</div>
								</div>
							))}
					</div>

					<div className="bg-white p-4 rounded">
						<h2 className="text-[18px] font-medium mb-4">Chọn hình thức thanh toán</h2>
						<Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
							<div className="flex flex-col gap-4">
								<Radio value="1" className="p-4 rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
											alt="COD"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Thanh toán sau khi nhận hàng</span>
									</div>
								</Radio>
								<Radio value="2" className="p-4 rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png"
											alt="Momo"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Viettel Pay</span>
									</div>
								</Radio>
								<Radio value="3" className="p-4 rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/77/6a/df/a35cb9c62b9215dbc6d334a77cda4327.png"
											alt="VNPay"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>VNPAY</span>
										<span className="text-[13px] text-[#808089] ml-2">
											Quét Mã QR từ ứng dụng ngân hàng
										</span>
									</div>
								</Radio>
							</div>
						</Radio.Group>
					</div>
				</div>

				<div className="w-[400px]">
					<div className="bg-white p-4 rounded">
						<div className="flex justify-between items-center mb-4">
							<span>Giao tới</span>
							<button className="text-[#0B74E5]">Thay đổi</button>
						</div>
						<div className="mb-2">
							<span className="font-medium">{user?.customerName}</span>
							<span className="text-[#808089] ml-2">{user?.numberPhone}</span>
						</div>
						<div className="text-[#808089]">
							<span className="text-[#EA4B48] px-1 py-0.5 bg-[#FFF0F1] mr-2 text-[13px]">Văn phòng</span>
							{user?.address}
						</div>

						<div className="border-t border-b my-4 py-4">
							<div className="flex justify-between mb-2">
								<span>Tạm tính</span>
								<span>{formatPrice(totalPrice)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Phí vận chuyển</span>
								<span>{formatPrice(64700)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Giảm giá</span>
								<span className="text-[#FF424E]">-{formatPrice(totalPrice * 0.1)}</span>
							</div>
							<div className="flex justify-between">
								<span>Giảm giá vận chuyển</span>
								<span className="text-[#FF424E]">-{formatPrice(20000)}</span>
							</div>
						</div>

						<div className="mb-4">
							<div className="flex justify-between mb-1">
								<span>Tổng tiền</span>
								<div className="text-right">
									<div className="text-[#FF424E] text-[20px] font-medium">
										{formatPrice(totalPrice * 0.9)}
									</div>
									<div className="text-[#808089] text-[13px]">(Đã bao gồm VAT nếu có)</div>
								</div>
							</div>
						</div>

						<button onClick={handlePayment} className="w-full bg-[#FF424E] text-white py-3 rounded">
							Đặt hàng
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
