/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LoadingOverlay = () => {
	const [loading, setLoading] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setLoading(true);

		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [pathname]);

	if (!loading) return null;

	return (
		<div style={overlayStyle}>
			<img src="/loading.gif" alt="loading" style={gifStyle} />
		</div>
	);
};

const overlayStyle: React.CSSProperties = {
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '100vh',
	backgroundColor: 'rgba(0,0,0,0.4)',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	zIndex: 9999,
};

const gifStyle: React.CSSProperties = {
	width: '80px',
	height: '80px',
};

export default LoadingOverlay;
