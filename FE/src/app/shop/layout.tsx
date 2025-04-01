export const metadata = {
	title: 'TikiShop',
	description: 'TikiShop',
};

import LoadingBar from '@/components/base/loading/LoadingBar';
import '../globals.css';
import Header from '@/components/LayoutComponents/Header/Header';
import Footer from '@/components/LayoutComponents/footer';
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<LoadingBar />
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
