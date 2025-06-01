/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PaymentServices from '@/services/payment/paymentServices';
import { URL_SERVICE } from '@/constant/constant';
import { useEffect } from 'react';
export default function CheckoutSuccess() {
	const searchParams = useSearchParams();
	const paymentServices = new PaymentServices(URL_SERVICE, () => {});
	const billId = searchParams.get('billId');

	const updateBill = async () => {
		try {
			const response = await paymentServices.updateBill(Number(billId), 2);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		updateBill();
	}, []);

	return (
		<div className=" bg-gray-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center">
					<div className="flex justify-center">
						<CheckCircle2 className="h-16 w-16 text-green-500" />
					</div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thanh toán thành công!</h2>
					<p className="mt-2 text-sm text-gray-600">
						Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.
					</p>
				</div>
				<div className="mt-8 space-y-4">
					<Link
						href="/"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Quay về trang chủ
					</Link>
					<Link
						href="customer/order"
						className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Xem đơn hàng của tôi
					</Link>
				</div>
			</div>
		</div>
	);
}
