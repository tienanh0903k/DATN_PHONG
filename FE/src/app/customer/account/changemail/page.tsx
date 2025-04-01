/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Breadcrumb, message, Spin } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/reducers/slice/authSlice';
import CustomerServices from '@/services/CustomerServices/customerServices';
import { URL_SERVICE } from '@/constant/constant';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';

import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IoCloseCircle } from 'react-icons/io5';
import { useForm } from 'react-hook-form';

interface FormValues {
	email: string;
}
const ChangeEmail = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const [loading, setLoading] = useState(false);
	const customerServices = new CustomerServices(URL_SERVICE, () => {});
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			email: user?.email || '',
		},
	});
	const emailValue = watch('email');

	const handleClear = () => {
		setValue('email', '');
	};

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const response: any = await customerServices.changeEmail({
				email: data.email,
				customerId: user?.customerId,
			});
			dispatch(setUserInfo(response));
			messageApi.open({
				type: 'success',
				content: 'Cập nhật số điện thoại thành công!',
			});
		} catch (error) {
			console.error(error);
			messageApi.open({
				type: 'error',
				content: 'Có lỗi xảy ra, vui lòng thử lại!',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="">
			{/* Breadcrumb */}
			{contextHolder}
			<div className="py-4">
				<Breadcrumb
					items={[
						{
							title: (
								<Link href="/">
									<HomeOutlined className="mr-1" />
									Trang chủ
								</Link>
							),
						},
						{
							title: <Link href="/customer">Tài khoản</Link>,
						},
						{
							title: 'Thay đổi email',
						},
					]}
				/>
			</div>

			<h1 className="text-[20px] leading-[32px] font-[300] mt-1 mb-3">Thay đổi địa chỉ email</h1>
			<Spin spinning={loading} className="w-full block">
				<div className="info flex no-wrap justify-between rounded-[8px] bg-white ">
					<form onSubmit={handleSubmit(onSubmit)} className="w-[400px] p-5 mx-auto">
						<div className="flex flex-col gap-2 p-4 border-[1px] border-[#ebebf0] border-solid rounded-[8px]">
							<label htmlFor="numberPhone" className="text-[14px] text-[#4a4a4a]">
								Email
							</label>
							<div className="flex items-center h-9 cursor-pointer gap-2 border-[1px] border-[#c4c4cf] border-solid rounded-[4px] py-[10px] px-2">
								<MdEmail />
								<input
									type="email"
									{...register('email', {
										required: 'Vui lòng nhập email',
										pattern: {
											value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
											message: 'Email không hợp lệ',
										},
									})}
									className="outline-none border-none w-full"
								/>
								{emailValue && (
									<IoCloseCircle
										className="text-gray-400 hover:text-gray-600 cursor-pointer text-[18px]"
										onClick={handleClear}
									/>
								)}
							</div>
							{errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
							<button
								type="submit"
								className="bg-[#007bff] text-white px-4 py-2 rounded-[4px] cursor-pointer hover:bg-[#0056b3] mt-8"
							>
								Lưu thay đổi
							</button>
						</div>
					</form>
				</div>
			</Spin>
		</div>
	);
};

export default ChangeEmail;
