'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutFailure() {
	const searchParams = useSearchParams();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	useEffect(() => {
		const message = searchParams.get('message');
		if (message) {
			setErrorMessage(message);
		}
	}, [searchParams]);

	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center">
					<div className="flex justify-center">
						<XCircle className="h-16 w-16 text-red-500" />
					</div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">Thanh toán không thành công</h2>
					<p className="mt-2 text-sm text-gray-600">
						Rất tiếc, quá trình thanh toán của bạn đã không thành công.
					</p>
					{errorMessage && <p className="mt-2 text-sm text-red-600">Lý do: {errorMessage}</p>}
				</div>
				<div className="mt-8 space-y-4">
					<Link
						href="/checkout"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Thử thanh toán lại
					</Link>
					<Link
						href="/cart"
						className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Quay về giỏ hàng
					</Link>
					<Link
						href="/"
						className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Quay về trang chủ
					</Link>
				</div>
			</div>
		</div>
	);
}
