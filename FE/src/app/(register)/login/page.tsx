/* eslint-disable @next/next/no-img-element */
'use client';
import SignIn from '@/components/app/Resgiter/signin';
import VerifyPhone from '@/components/app/Resgiter/verifyPhone';
import { useState } from 'react';
import Image from 'next/image';

const Login = () => {
	const [component, setComponent] = useState<string>('signin');
	const handleComponent = () => {
		setComponent(component === 'signin' ? 'verify' : 'signin');
	};

	return (
		<div className="bg-[#42c5fe] w-full h-[100vh] flex items-center">
			<div className="w-[800px] h-[70%] bg-white rounded-lg m-auto overflow-hidden">
				<div className="flex items-center w-full h-full">
					<div className="w-[500px] px-10 pb-6 pt-[45px]">
						{component === 'signin' ? (
							<SignIn handleLogin={handleComponent} />
						) : (
							<VerifyPhone handleRegister={handleComponent} />
						)}
					</div>
					<div className="w-[300px] bg-[#deebff] flex items-center justify-center min-h-full">
						<div className="flex flex-col items-center justify-center min-h-full">
							<div className="w-[200px] h-[200px]">
								<Image
									src="https://hocvien.tiki.vn/wp-content/uploads/2023/08/Tiki-2D-mascot-19-1920x1920.png"
									alt=""
									width={200}
									height={200}
								/>
							</div>
							<div className="mt-[30px]">
								<h4 className="mb-[5px] text-[#0a68ff] text-[18px] leading-[24px] font-[500]">
									Mua sắm tại Tiki
								</h4>
								<p className="text-[14px] text-[#0a68ff] leading-[20px] ">Siêu ưu đãi mỗi ngày</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
