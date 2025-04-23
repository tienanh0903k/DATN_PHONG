'use client';

import { useState } from 'react';

import { Copy } from 'lucide-react';
import { QRCode } from 'antd';
import { useSearchParams } from 'next/navigation';

export default function QRCodePage() {
	const searchParams = useSearchParams();
	const checkoutUrl = searchParams.get('checkoutUrl');
	const [copySuccess, setCopySuccess] = useState<string | null>(null);

	const bankDetails = {
		bankName: 'Ngân hàng TMCP Quân đội',
		accountHolder: 'BUI TIEN LOC',
		accountNumber: 'VQRQACEDG6346',
		amount: '2,000',
		content: 'Mo ta don hang',
	};

	const handleCopy = async (text: string, field: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopySuccess(field);
			setTimeout(() => setCopySuccess(null), 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	};

	const CopyButton = ({ text, field }: { text: string; field: string }) => (
		<button
			onClick={() => handleCopy(text, field)}
			className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-1"
		>
			{copySuccess === field ? (
				'Đã sao chép'
			) : (
				<>
					<Copy className="h-4 w-4" />
					Sao chép
				</>
			)}
		</button>
	);
	if (!checkoutUrl) return <p>Không tìm thấy đường dẫn thanh toán.</p>;
	return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">Chi tiết đơn hàng</h2>

					<div className="mb-6 text-center flex justify-center">
						<QRCode
							className="mx-auto"
							errorLevel="H"
							value={checkoutUrl}
							icon="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
						/>
					</div>

					<div className="space-y-4 text-left">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Ngân hàng</p>
								<p className="font-medium">{bankDetails.bankName}</p>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Chủ tài khoản</p>
								<p className="font-medium">{bankDetails.accountHolder}</p>
							</div>
							<CopyButton text={bankDetails.accountHolder} field="accountHolder" />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Số tài khoản</p>
								<p className="font-medium">{bankDetails.accountNumber}</p>
							</div>

							<CopyButton text={bankDetails.accountNumber} field="accountNumber" />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Số tiền</p>
								<p className="font-medium">{bankDetails.amount} vnd</p>
							</div>
							<CopyButton text={bankDetails.amount} field="amount" />
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">Nội dung</p>
								<p className="font-medium">{bankDetails.content}</p>
							</div>
							<CopyButton text={bankDetails.content} field="content" />
						</div>
					</div>

					<div className="mt-8 text-sm text-gray-600">
						<p>Lưu ý: Nhập chính xác số tiền {bankDetails.amount} khi chuyển khoản</p>
					</div>
				</div>
			</div>
		</div>
	);
}
