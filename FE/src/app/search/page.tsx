'use client';

import SearchComponent from '@/components/app/Home/search';
import { Suspense } from 'react';

export default function SearchPage() {
	return (
		<Suspense fallback={<div className="text-center py-10">Đang xử lý...</div>}>
			<SearchComponent />
		</Suspense>
	);
}
