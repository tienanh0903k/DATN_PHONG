/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import RegisterServices from '@/services/register/registerServices';
// import { URL_AUTH } from '@/constant/constant';

import AuthenEmail from './authenEmail';

type Props = object;

const VerifyPhone: React.FC<Props> = () => {
	const { register, handleSubmit } = useForm();
	const [showPassword, setShowPassword] = useState(false);

	const onSubmit = (data: any) => {
		console.log(data);
	};
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div className="mb-5">
						<h2 className="text-[24px] mb-[10px] font-[500]">Đăng nhập bằng email </h2>
						<p className="text-[15px]">Nhập email và mật khẩu tài khoản Tiki</p>
					</div>
					<div className="relative after:content-[''] after:absolute left-0 right-0 bottom-0 border-b-[1px] border-solid border-[#e0e0e0]">
						<input
							type="email"
							className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none"
							{...register('email', {
								required: 'Email là bắt buộc',
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: 'Email không hợp lệ',
								},
							})}
							placeholder="Nhập email"
						/>
					</div>
					<div className="relative after:content-[''] after:absolute left-0 right-0 bottom-0 border-b-[1px] border-solid border-[#e0e0e0]">
						<input
							type={showPassword ? 'text' : 'password'}
							className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none"
							{...register('password', { required: true })}
							placeholder="Password"
						/>
						<button onClick={handleShowPassword} className="absolute right-0 top-0 bottom-0 cursor-pointer">
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
					</div>
				</div>
				<button
					type="submit"
					className="mt-[30px] mb-[10px] text-[16px] font-[500] text-[#fff] bg-[#ff424e] rounded-[4px] py-[13px] text-center cursor-pointer hover:opacity-80 transition-all duration-300 w-full"
				>
					Đăng nhập
				</button>
				<p className="block text-[13px] text-[#0d5cb6] mt-5 cursor-pointer leading-[150%]">Quên mật khẩu</p>
				<span className="text-[#787878] text-[13px] mt-[10px]">
					Chưa có tài khoản?{' '}
					<span className="inline-block text-[13px] text-[#0d5cb6] mt-5 cursor-pointer">Tạo tài khoản</span>
				</span>
			</form>
			<div className="mt-[10px] mb-[10px] text-center">
				<p className="relative mb-[20px] before:content-[''] before:absolute before:h-[1px] before:w-[100%] before:bg-[#f2f2f2] before:top-[50%] before:left-0 before:transform translate-y-[50%] before:z-1">
					<span className="text-[15px] z-2 text-[#787878] relative">Hoặc tiếp tục bằng</span>
				</p>
				<AuthenEmail />
			</div>
			<p className="text-[12px] text-[#787878] leading-[16px] align-start">
				Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
				<a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">điều khoản sử dụng</a> và{' '}
				<a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">Chính sách bảo mật thông tin cá nhân</a> của Tiki
			</p>
		</div>
	);
};

export default VerifyPhone;
