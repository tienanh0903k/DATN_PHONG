'use client';

import { Suspense } from 'react';
import CheckoutFailure from '@/components/app/checkout/checkoutFailure';

export default function FailurePage() {
	return (
		<Suspense fallback={<div className="text-center py-10">Đang xử lý...</div>}>
			<CheckoutFailure />
		</Suspense>
	);
}
