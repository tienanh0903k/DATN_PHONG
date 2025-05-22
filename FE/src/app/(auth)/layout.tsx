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
	const storedRole = typeof window !== 'undefined' ? localStorage.getItem('role') : null;
	const router = useRouter();

	useEffect(() => {
		if (role !== 'Admin' && storedRole !== 'Admin') {
			router.replace('/unauthorized');
		}
	}, [role, storedRole]);

	if (role !== 'Admin' && storedRole !== 'Admin') return null;

	return (
		<div className="flex h-screen">
			<SidebarAdmin />
			<main className="w-full p-6 bg-white">{children}</main>
		</div>
	);
}
