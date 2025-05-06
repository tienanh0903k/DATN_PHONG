export const metadata = {
	title: 'TikiShop',
	description: 'TikiShop',
};

// import LoadingBar from '@/components/base/loading/LoadingBar';
import '../globals.css';
import HeaderShop from '@/components/LayoutComponents/Header/headerShop';
import Footer from '@/components/LayoutComponents/footer';
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			{/* <LoadingBar /> */}
			<HeaderShop />
			<main>{children}</main>
			<Footer />
		</div>
	);
}
