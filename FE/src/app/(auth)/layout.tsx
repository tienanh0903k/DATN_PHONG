import '../globals.css';
import SidebarAdmin from '@/components/LayoutComponents/Sidebar/sidebarAdmin';
export const metadata = {
	title: 'Tiki Admin',
	description: 'Tiki Admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-screen">
			<SidebarAdmin />
			<main className="w-full p-6 bg-white">{children}</main>
		</div>
	);
}
