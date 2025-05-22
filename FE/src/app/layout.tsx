'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { AuthProvider } from '@/components/base/context/AuthContext';
import LoadingModal from '@/components/base/loading/loadingPage';
import './globals.css';
interface ReduxProviderProps {
	children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
	return (
		<Provider store={store}>
			<AuthProvider>
				<html lang="en">
					<body>
						<LoadingModal />
						{children}
					</body>
				</html>
			</AuthProvider>
		</Provider>
	);
}
