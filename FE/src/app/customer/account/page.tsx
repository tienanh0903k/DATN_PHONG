/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import SidebarCustomer from '@/components/LayoutComponents/Sidebar/SidebarCustomer';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import { HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { FaPhoneAlt, FaRegTrashAlt, FaFacebook, FaGoogle } from 'react-icons/fa';
import { MdOutlineEmail, MdLockOutline } from 'react-icons/md';

const Account = () => {
	const { register, handleSubmit, control } = useForm();
	const [date, setDate] = useState<Date>();
	const fileInputRef = useRef(null);
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const [avatar, setAvatar] = useState<string>(user?.avatar || '');
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setAvatar(e.target?.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}
	};
	const onSubmit = (data: any) => {
		console.log(data);
	};
	const handleChangeAvatar = () => {
		const input = document.getElementById('avatar') as HTMLInputElement;
		input.click();
	};
	return (
		<div className="container-customer h-[81vh]">
			{/* Breadcrumb */}
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
							title: 'Thông tin tài khoản',
						},
					]}
				/>
			</div>

			<div className="flex">
				<SidebarCustomer />
				<div className="w-[calc(100%-254px)] overflow-hidden">
					<h1 className="text-[20px] leading-[32px] font-[300] mt-1 mb-3">Thông tin tài khoản</h1>
					<div className="info flex no-wrap justify-between rounded-[8px] bg-white ">
						<div className="info-left w-[553px] py-4 pr-6 pl-4">
							<h2 className="text-[16px] text-[#64646d] leading-[24px] font-[400] mb-2">
								Thông tin cá nhân
							</h2>
							<div className="">
								<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
									<div className="flex gap-3 justify-between">
										<div className="mr-4">
											<Controller
												name="avatar"
												control={control}
												render={({ field }) => (
													<>
														<input
															type="file"
															ref={fileInputRef}
															hidden
															onChange={(e) => {
																handleFileChange(e);
																field.onChange(e.target.files);
															}}
															accept=".jpeg, .png"
															id="avatar"
															className="hidden"
														/>
														<div
															onClick={handleChangeAvatar}
															className="w-[112px] h-[112px] overflow-hidden rounded-full bg-gray-200 border-[4px] border-solid border-[#c2e1ff]"
														>
															{avatar ? (
																<img
																	src={avatar}
																	alt="avatar"
																	className="w-full h-full object-cover"
																/>
															) : (
																<div>
																	<PlusOutlined />
																</div>
															)}
														</div>
													</>
												)}
											/>
										</div>
										<div className="flex flex-col justify-between flex-1">
											<div className="space-y-2 flex gap-3 items-center">
												<Label className="min-w-[70px]" htmlFor="fullName">
													Họ & Tên
												</Label>
												<Input
													id="fullName"
													{...register('fullName')}
													defaultValue="Phong Nguyen"
												/>
											</div>

											<div className="space-y-2 flex gap-3 items-center">
												<Label className="min-w-[70px]" htmlFor="nickname">
													Nickname
												</Label>
												<Input
													id="nickname"
													{...register('nickname')}
													placeholder="Thêm nickname"
												/>
											</div>
										</div>
									</div>

									<div className="space-y-2">
										<Label>Ngày sinh</Label>
										<Popover>
											<PopoverTrigger asChild>
												<Button
													variant={'outline'}
													className={cn(
														'w-full justify-start text-left font-normal',
														!date && 'text-muted-foreground',
													)}
												>
													<CalendarIcon className="mr-2 h-4 w-4" />
													{date
														? format(date, 'dd/MM/yyyy', { locale: vi })
														: 'Chọn ngày sinh'}
												</Button>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={date}
													onSelect={setDate}
													initialFocus
													locale={vi}
													fromYear={1900}
													toYear={new Date().getFullYear()}
												/>
											</PopoverContent>
										</Popover>
									</div>

									{/* Giới tính */}
									<div className="space-y-2">
										<Label>Giới tính</Label>
										<RadioGroup defaultValue="nam" className="flex gap-4">
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="nam" id="nam" />
												<Label htmlFor="nam">Nam</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="nu" id="nu" />
												<Label htmlFor="nu">Nữ</Label>
											</div>
											<div className="flex items-center space-x-2">
												<RadioGroupItem value="khac" id="khac" />
												<Label htmlFor="khac">Khác</Label>
											</div>
										</RadioGroup>
									</div>

									<Button type="submit" className="bg-[#0B74E5] hover:bg-[#0956a8]">
										Lưu thay đổi
									</Button>
								</form>
							</div>
						</div>
						<div className="border"></div>
						<div className="info-right w-[calc(100%-553px)] py-4 pl-6 pr-4">
							<span className="text-[16px] leading-[24px] text-[#64646d] font-[400]">
								Số điện thoại và email
							</span>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<FaPhoneAlt className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Số điện thoại
											</span>
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												{user?.numberPhone || 'Chưa có số điện thoại'}
											</span>
										</div>
									</div>
									<Link href="/customer/account/changenumberphone">
										<Button
											variant="outline"
											className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#74b5fae5]"
										>
											{user?.numberPhone ? 'cập nhật ' : 'Thêm số '}
										</Button>
									</Link>
								</div>
							</div>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<MdOutlineEmail className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Email
											</span>
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												{user?.email || 'Chưa có email'}
											</span>
										</div>
									</div>
									<Link href="/customer/account/changemail">
										<Button
											variant="outline"
											className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#73b2f5e5]"
										>
											{user?.email ? 'Cập nhật ' : 'Thêm email '}
										</Button>
									</Link>
								</div>
							</div>
							<span className="text-[16px] leading-[24px] text-[#64646d] font-[400]">Bảo mật</span>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<MdLockOutline className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Thiết lập mật khẩu
											</span>
										</div>
									</div>
									<Button
										variant="outline"
										className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#73b2f5e5]"
									>
										{user?.email ? 'Cập nhật ' : 'Thêm email '}
									</Button>
								</div>
							</div>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<FaRegTrashAlt className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Yêu cầu xóa tài khoản
											</span>
										</div>
									</div>
									<Button
										variant="outline"
										className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#73b2f5e5]"
									>
										Yêu cầu
									</Button>
								</div>
							</div>
							<span className="text-[16px] leading-[24px] text-[#64646d] font-[400]">
								Liên kết mạng xã hội
							</span>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<FaFacebook className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Yêu cầu xóa tài khoản
											</span>
										</div>
									</div>
									<Button
										variant="outline"
										className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#73b2f5e5]"
									>
										Liên kết
									</Button>
								</div>
							</div>
							<div className="py-[20px]">
								<div className="flex items-center gap-2 justify-between">
									<div className="flex items-start gap-2">
										<FaGoogle className="mt-[2px]" />
										<div className="">
											<span className="block text-[14px] leading-[20px] text-[#38383d] font-[400]">
												Google
											</span>
										</div>
									</div>
									<Button
										variant="outline"
										className="text-[#0b74e5] border-[#0b74e5] cursor-pointer hover:bg-[#fff] hover:text-[#73b2f5e5]"
									>
										Liên kết
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
