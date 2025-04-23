import { Spin } from 'antd';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LoadingPage = () => {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoading(true);

		const timer = setTimeout(() => {
			setLoading(false);
		}, 500);

		return () => clearTimeout(timer);
	}, [pathname]);

	if (!loading) return null;

	return (
		<div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
			<Spin size="large" />
		</div>
	);
};

export default LoadingPage;
