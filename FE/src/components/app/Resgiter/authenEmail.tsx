/* eslint-disable @next/next/no-img-element */

import axios from 'axios';

import { URL_AUTH } from '@/constant/constant';
const AuthenEmail = () => {
	const handleGoogleLogin = async () => {
		try {
			const response = await axios.get(`${URL_AUTH}/login/google`);

			if (response?.data) {
				window.location.href = response.data;
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<div className="flex justify-center items-center gap-[10px] mb-[10px]">
				<img
					src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
					alt="facebook"
					className="w-[58px] h-[58px]"
				/>
				<div onClick={handleGoogleLogin} className="w-[58px] h-[58px]">
					<img
						src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
						alt="google"
						className="w-[58px] h-[58px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default AuthenEmail;
