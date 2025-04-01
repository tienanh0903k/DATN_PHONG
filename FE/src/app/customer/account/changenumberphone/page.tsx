/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Breadcrumb, Spin, message } from 'antd';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { MdPhone } from 'react-icons/md';
import { RootState } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { IoCloseCircle } from 'react-icons/io5';
import CustomerServices from '@/services/CustomerServices/customerServices';
import { URL_SERVICE } from '@/constant/constant';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUserInfo } from '@/reducers/slice/authSlice';

interface FormValues {
	numberPhone: string;
}

const ChangeNumberPhone = () => {
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const customerServices = new CustomerServices(URL_SERVICE, () => {});
	const dispatch = useDispatch();
	const [messageApi, contextHolder] = message.useMessage();
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			numberPhone: user?.numberPhone || '',
		},
	});

	const numberPhoneValue = watch('numberPhone');
	const [loading, setLoading] = useState(false);

	const handleClear = () => {
		setValue('numberPhone', '');
	};

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const response: any = await customerServices.changeNumberPhone({
				numberPhone: data.numberPhone,
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
							title: 'Thay đổi số điện thoại',
						},
					]}
				/>
			</div>

			<h1 className="text-[20px] leading-[32px] font-[300] mt-1 mb-3">Thông tin tài khoản</h1>
			<Spin spinning={loading} className="w-full block">
				<div className="info flex no-wrap justify-between rounded-[8px] bg-white ">
					<form onSubmit={handleSubmit(onSubmit)} className="w-[400px] p-5 mx-auto">
						<div className="flex flex-col gap-2 p-4 border-[1px] border-[#ebebf0] border-solid rounded-[8px]">
							<label htmlFor="numberPhone" className="text-[14px] text-[#4a4a4a]">
								Số điện thoại
							</label>
							<div className="flex items-center h-9 cursor-pointer gap-2 border-[1px] border-[#c4c4cf] border-solid rounded-[4px] py-[10px] px-2">
								<MdPhone />
								<input
									type="number"
									{...register('numberPhone', {
										required: 'Vui lòng nhập số điện thoại',
										pattern: {
											value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
											message: 'Số điện thoại không hợp lệ',
										},
									})}
									className="outline-none border-none w-full"
								/>
								{numberPhoneValue && (
									<IoCloseCircle
										className="text-gray-400 hover:text-gray-600 cursor-pointer text-[18px]"
										onClick={handleClear}
									/>
								)}
							</div>
							{errors.numberPhone && (
								<span className="text-red-500 text-sm">{errors.numberPhone.message}</span>
							)}
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
export default ChangeNumberPhone;
