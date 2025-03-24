'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

const LoadingBar = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
	}, []);

	useEffect(() => {
		NProgress.start();
		setTimeout(() => {
			NProgress.done();
		}, 500);
	}, [pathname, searchParams]);

	return null;
};

export default LoadingBar;
