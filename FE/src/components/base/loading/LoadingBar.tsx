'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';

const LoadingBar = () => {
	const pathname = usePathname();

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
	}, []);

	useEffect(() => {
		NProgress.start();
		setTimeout(() => {
			NProgress.done();
		}, 500);
	}, [pathname]);

	return null;
};

export default LoadingBar;
