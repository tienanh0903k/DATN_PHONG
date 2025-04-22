'use client';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Chatbot from '@/components/app/Chatbot';
import LoadingModal from '@/components/base/loading/loadingPage';
interface ReduxProviderProps {
	children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
	return (
		<Provider store={store}>
			<html lang="en">
				<body>
					<LoadingModal />
					{children}
					<Chatbot />
				</body>
			</html>
		</Provider>
	);
}
