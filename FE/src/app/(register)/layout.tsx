import '../globals.css';

export const metadata = {
	title: 'Tiki Login',
	description: 'Tiki Login',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}
