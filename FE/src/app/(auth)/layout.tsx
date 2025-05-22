/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import '../globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SidebarAdmin from '@/components/LayoutComponents/Sidebar/sidebarAdmin';
import { useAuth } from '@/components/base/context/AuthContext';

// export const metadata = {
// 	title: 'Tiki Admin',
// 	description: 'Tiki Admin',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const { role } = useAuth();
	const roled = localStorage.getItem('role');
	const router = useRouter();

	useEffect(() => {
		if (role !== 'Admin' && roled !== 'Admin') {
			router.replace('/unauthorized');
		}
	}, [role, roled]);

	if (role !== 'Admin' && roled !== 'Admin') return null;

	return (
		<div className="flex h-screen">
			<SidebarAdmin />
			<main className="w-full p-6 bg-white">{children}</main>
		</div>
	);
}
