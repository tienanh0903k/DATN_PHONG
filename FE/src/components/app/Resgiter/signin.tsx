/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import RegisterServices from '@/services/register/registerServices';
import { URL_AUTH } from '@/constant/constant';
type Props = {
	handleLogin: () => void;
};
const SignUp = ({ handleLogin }: Props) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [status, setStatus] = useState<any>('');
	const [message, setMessage] = useState<string>('');
	const registerServices = new RegisterServices(URL_AUTH, () => {});

	const onSubmit = async (data: any) => {
		if (data.password !== data.confirmPassword) {
			setStatus('error');
			setMessage('Mật khẩu xác nhận không khớp');
			return;
		}
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		const phoneRegex = /^[0-9]{10}$/;

		const registerData = {
			userName: data.email,
			password: data.password,
			email: '',
			numberPhone: '',
		};

		if (emailRegex.test(data.email)) {
			registerData.email = data.email;
		} else if (phoneRegex.test(data.email)) {
			registerData.numberPhone = data.email;
		}

		try {
			const res: any = await registerServices.Register(registerData);
			if (res?.status === 'success') {
				setStatus('success');
				setMessage('Đăng ký thành công!');
			} else {
				setStatus('error');
				setMessage(res?.message || 'Đăng ký thất bại!');
			}
		} catch (error: any) {
			setStatus('error');
			setMessage(error?.message || 'Đăng ký thất bại!');
		} finally {
			reset();
		}
	};

	return (
		<div className="">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-5">
					<h2 className="text-[24px] mb-[10px] font-[500]">Đăng ký tài khoản</h2>
					<p className="text-[15px]">Nhập thông tin để đăng ký tài khoản Tiki</p>
				</div>
				<div className="mb-4">
					<input
						type="text"
						className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none border-b border-[#e0e0e0]"
						{...register('email', {
							required: 'Vui lòng nhập email hoặc số điện thoại ',
							validate: (value) => {
								const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

								const phoneRegex = /^[0-9]{10}$/;

								if (emailRegex.test(value) || phoneRegex.test(value)) {
									return true;
								}
								return 'Vui lòng nhập email hoặc số điện thoại ';
							},
						})}
						placeholder="Nhập email hoặc số điện thoại "
					/>
					{errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
				</div>
				<div className="mb-4">
					<input
						type="password"
						className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none border-b border-[#e0e0e0]"
						{...register('password', {
							required: 'Mật khẩu là bắt buộc',
							minLength: { value: 6, message: 'Mật khẩu tối thiểu 6 ký tự' },
						})}
						placeholder="Nhập mật khẩu"
					/>
					{errors.password && (
						<p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>
					)}
				</div>
				<div className="mb-4">
					<input
						type="password"
						className="w-full py-[10px] text-[14px] text-[#242424] outline-none appearance-none border-b border-[#e0e0e0]"
						{...register('confirmPassword', { required: 'Xác nhận mật khẩu là bắt buộc' })}
						placeholder="Xác nhận mật khẩu"
					/>
					{errors.confirmPassword && (
						<p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message as string}</p>
					)}
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
					Đăng ký
				</button>
				<span className="text-[#787878] text-[13px] mt-[10px]">
					Đã có tài khoản?{' '}
					<span onClick={handleLogin} className="inline-block text-[13px] text-[#0d5cb6] mt-5 cursor-pointer">
						Đăng nhập
					</span>
				</span>
			</form>
			<p className="text-[12px] text-[#787878] leading-[16px] align-start mt-4">
				Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
				<a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">điều khoản sử dụng</a> và{' '}
				<a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">Chính sách bảo mật thông tin cá nhân</a> của Tiki
			</p>
		</div>
	);
};

export default SignUp;
