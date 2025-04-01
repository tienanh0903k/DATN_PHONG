/* eslint-disable @typescript-eslint/no-explicit-any */

import RegisterServices from '@/services/register/registerServices';
import { FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import { URL_AUTH } from '@/constant/constant';
const AuthenEmail = () => {
	const registerServices = new RegisterServices(URL_AUTH || '', () => {
		console.log('Unauthenticated');
	});
	const handleGoogleLogin = async () => {
		try {
			const currentPath = window.location.pathname;
			const pathToSend = currentPath === '' || currentPath === '/login' ? '/' : currentPath;
			const response: any = await registerServices.loginGoogle(pathToSend);
			if (response) {
				window.location.href = response;
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="flex justify-center items-center gap-[10px] mb-[10px]">
				<FaGithub onClick={handleGoogleLogin} className="text-[#000] text-[58px]" />

				<div onClick={handleGoogleLogin} className="w-[58px] h-[58px]">
					<Image
						src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
						alt="google"
						width={58}
						height={58}
					/>
				</div>
			</div>
		</div>
	);
};

export default AuthenEmail;
