/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';
import { Modal } from 'antd';
import VerifyPhone from './verifyPhone';
import SignIn from './signin';

type Props = {
	open: boolean;
	onClose: () => void;
};

const LoginModal = ({ open, onClose }: Props) => {
	const [component, setComponent] = useState<string>('signin');
	const handleComponent = () => {
		setComponent(component === 'signin' ? 'verify' : 'signin');
	};
	return (
		<Modal open={open} width={800} height={525} onCancel={onClose} footer={null}>
			<div className="flex h-full">
				<div className="w-[500px] px-10 pb-6 pt-[45px]">
					{component === 'signin' ? (
						<VerifyPhone handleRegister={handleComponent} />
					) : (
						<SignIn handleLogin={handleComponent} />
					)}
				</div>
				<div className="w-[300px] bg-[#deebff]">
					<div className="flex flex-col items-center justify-center	 min-h-[100%]">
						<div className="w-[200px] h-[200px]">
							<img src="/img/login.png" alt="" className="w-full h-full" />
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
		</Modal>
	);
};

export default LoginModal;
