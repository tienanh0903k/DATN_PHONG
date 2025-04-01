export const metadata = {
	title: 'tikitoki',
	description: 'tikitoki',
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
			<div className="container-base">
				<main className=" ">{children}</main>
			</div>
			<Footer />
		</div>
	);
}
