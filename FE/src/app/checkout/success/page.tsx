'use client';
import { Suspense } from 'react';
import CheckoutSuccess from '@/components/app/checkout/checkoutSucces';

export default function SuccessPage() {
	return (
		<Suspense fallback={<div className="text-center py-10">Đang xử lý...</div>}>
			<CheckoutSuccess />
		</Suspense>
	);
}
