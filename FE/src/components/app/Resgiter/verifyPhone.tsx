/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import RegisterServices from '@/services/register/registerServices';
import { URL_AUTH, URL_SOCKET } from '@/constant/constant';
import AuthenEmail from './authenEmail';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/reducers/slice/authSlice';
import io from 'socket.io-client';
const socket = io(URL_SOCKET);
type Props = {
	handleRegister: () => void;
	onLoginSuccess?: () => void;
};

const VerifyPhone: React.FC<Props> = ({ handleRegister, onLoginSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [status, setStatus] = useState<any>('');
	const [message, setMessage] = useState<string>('');
	const registerServices = new RegisterServices(URL_AUTH, () => {});

	const onSubmit = async (data: any) => {
		try {
			const response: any = await registerServices.login(data);

			if (response?.status === 'success') {
				setStatus('success');
				setMessage('Đăng nhập thành công!');
				const token = response.data.token;
				localStorage.setItem('tokenlogin', token);
				await fetchDataCustomer(token);
				if (onLoginSuccess) {
					onLoginSuccess();
				}
			} else {
				setStatus('error');
				setMessage(response?.message || 'Đăng nhập thất bại!');
			}
		} catch (error) {
			console.error('Login error:', error);
			setStatus('error');
			setMessage('Đăng nhập thất bại!');
		}
	};

	const fetchDataCustomer = async (token: string) => {
		try {
			const datauser: any = await registerServices.getCustomer(token);
			socket.emit('registerUser', datauser.customerId);
			dispatch(setUserInfo(datauser));
		} catch (error) {
			console.error('Error fetching customer data:', error);
		}
	};

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div className="mb-5">
						<h2 className="text-[24px] mb-[10px] font-[500]">Đăng nhập</h2>
						<p className="text-[15px]">Nhập email hoặc số điện thoại và mật khẩu tài khoản Tiki</p>
					</div>
					<div className="relative after:content-[''] after:absolute left-0 right-0 bottom-0 border-b-[1px] border-solid border-[#e0e0e0]">
						<input
							type="text"
							className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none"
							{...register('userName', {
								required: 'Vui lòng nhập email hoặc số điện thoại',
								validate: (value) => {
									const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
									const phoneRegex = /^[0-9]{10}$/;

									if (emailRegex.test(value) || phoneRegex.test(value)) {
										return true;
									}
									return 'Vui lòng nhập email hoặc số điện thoại hợp lệ';
								},
							})}
							placeholder="Nhập email hoặc số điện thoại"
						/>
						{errors.userName && (
							<p className="text-red-500 text-xs mt-1">{errors.userName.message as string}</p>
						)}
					</div>
					<div className="relative after:content-[''] after:absolute left-0 right-0 bottom-0 border-b-[1px] border-solid border-[#e0e0e0]">
						<input
							type={showPassword ? 'text' : 'password'}
							className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none"
							{...register('password', {
								required: 'Vui lòng nhập mật khẩu',
								minLength: {
									value: 6,
									message: 'Mật khẩu phải có ít nhất 6 ký tự',
								},
							})}
							placeholder="Nhập mật khẩu"
						/>
						<button
							type="button"
							onClick={handleShowPassword}
							className="absolute right-0 top-0 bottom-0 cursor-pointer"
						>
							{showPassword ? <FaEye /> : <FaEyeSlash />}
						</button>
						{errors.password && (
							<p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>
						)}
					</div>
				</div>
				{status && (
					<p className={`text-sm mt-2 ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
						{message}
					</p>
				)}
				<button
					type="submit"
					className="mt-[30px] mb-[10px] text-[16px] font-[500] text-[#fff] bg-[#ff424e] rounded-[4px] py-[13px] text-center cursor-pointer hover:opacity-80 transition-all duration-300 w-full"
				>
					Đăng nhập
				</button>
				<p className="block text-[13px] text-[#0d5cb6] mt-5 cursor-pointer leading-[150%]">Quên mật khẩu</p>
				<span className="text-[#787878] text-[13px] mt-[10px]">
					Chưa có tài khoản?{' '}
					<span
						onClick={handleRegister}
						className="inline-block text-[13px] text-[#0d5cb6] mt-5 cursor-pointer"
					>
						Tạo tài khoản
					</span>
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
