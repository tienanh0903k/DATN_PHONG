/* eslint-disable @next/next/no-img-element */
'use client';
import { Radio } from 'antd';
import { useState } from 'react';
import { formatPrice } from '@/utils/formatprice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CheckOut = () => {
	const [deliveryMethod, setDeliveryMethod] = useState('standard');
	const [paymentMethod, setPaymentMethod] = useState('cod');
	const user = useSelector((state: RootState) => state.auth.userInfo);
	console.log(user);
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
								<div className="ml-6 mt-2 text-[13px] text-[#808089]">
									Được giao bởi TikiNOW Smart Logistics (giao từ Hồ Chí Minh)
								</div>
							</div>
						</Radio.Group>
					</div>

					<div className="bg-white p-4 rounded">
						<h2 className="text-[18px] font-medium mb-4">Chọn hình thức thanh toán</h2>
						<Radio.Group value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
							<div className="flex flex-col gap-4">
								<Radio value="cod" className="p-4 border rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/92/b2/78/1b3b9cda5208b323eb9ec56b84c7eb87.png"
											alt="COD"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Thanh toán tiền mặt</span>
									</div>
								</Radio>
								<Radio value="momo" className="p-4 border rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/5f/f9/75/d7ac8660aae903818dd7da8e4772e145.png"
											alt="Momo"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Viettel Pay</span>
									</div>
								</Radio>
								<Radio value="momo" className="p-4 border rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/ce/f6/e8/ea880ef285856f744e3ffb5d282d4b2d.jpg"
											alt="Momo"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Ví Momo</span>
									</div>
								</Radio>
								<Radio value="zalopay" className="p-4 border rounded">
									<div className="flex items-center">
										<img
											src="https://salt.tikicdn.com/ts/upload/2f/43/da/dd7ded6d3659036f15f95fe81ac76d93.png"
											alt="ZaloPay"
											className="w-[32px] h-[32px] mr-2"
										/>
										<span>Ví ZaloPay</span>
									</div>
								</Radio>
								<Radio value="vnpay" className="p-4 border rounded">
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
								<Radio value="card" className="p-4 border rounded">
									<div className="flex items-center">
										<img src="/img/card.png" alt="Card" className="w-[32px] h-[32px] mr-2" />
										<span>Thẻ tín dụng/Ghi nợ</span>
									</div>
									<div className="flex gap-2 mt-2 ml-8">
										<img src="/img/visa.png" alt="Visa" className="h-6" />
										<img src="/img/mastercard.png" alt="Mastercard" className="h-6" />
										<img src="/img/jcb.png" alt="JCB" className="h-6" />
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
								<span>{formatPrice(483000)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Phí vận chuyển</span>
								<span>{formatPrice(64700)}</span>
							</div>
							<div className="flex justify-between mb-2">
								<span>Giảm giá</span>
								<span className="text-[#FF424E]">-{formatPrice(233000)}</span>
							</div>
							<div className="flex justify-between">
								<span>Giảm giá vận chuyển</span>
								<span className="text-[#FF424E]">-{formatPrice(25000)}</span>
							</div>
						</div>

						<div className="mb-4">
							<div className="flex justify-between mb-1">
								<span>Tổng tiền</span>
								<div className="text-right">
									<div className="text-[#FF424E] text-[20px] font-medium">{formatPrice(289700)}</div>
									<div className="text-[#808089] text-[13px]">(Đã bao gồm VAT nếu có)</div>
								</div>
							</div>
						</div>

						<button className="w-full bg-[#FF424E] text-white py-3 rounded">Đặt hàng</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CheckOut;
