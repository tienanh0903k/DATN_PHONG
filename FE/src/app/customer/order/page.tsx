/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
export default function OrderHistory() {
	const [tabs, setTabs] = useState([
		{ id: 0, title: 'Tất cả đơn', status: true },
		{ id: 1, title: 'Chờ thanh toán', status: false },
		{ id: 2, title: 'Đang xử lý', status: false },
		{ id: 3, title: 'Đang vận chuyển', status: false },
		{ id: 4, title: 'Đã giao', status: false },
		{ id: 5, title: 'Đã huỷ', status: false },
	]);

	const handleChangeTab = (id: number) => {
		setTabs((prev) => {
			prev.forEach((item) => {
				if (item.id === id) {
					item.status = true;
				} else {
					item.status = false;
				}
			});
			return [...prev];
		});
	};

	return (
		<div className="">
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

			<h2 className="text-[16px] text-[#64646d] leading-[24px] font-[400] mb-2 ">Đơn hàng của tôi</h2>

			{/* Tabs */}
			<div className="cursor-pointer bg-white w-full flex flex-row overflow-hidden sticky top-0 z-10">
				{tabs.map((item: any) => (
					<div
						onClick={() => handleChangeTab(item.id)}
						key={item.id}
						className={`w-[16.6667%] py-3 text-center text-[14px] 
                                ${
									item.status
										? 'text-[#0d5cb6] border-b-2 border-[#0d5cb6]'
										: 'text-[#808089] border-b-0'
								}`}
					>
						{item.title}
					</div>
				))}
			</div>

			{/* Search Section */}
			<div className="w-full relative my-3">
				<CiSearch className="text-[#808089] absolute left-[10px] top-1/2 -translate-y-1/2 w-6 h-6" />
				<input
					className="transition-all duration-150 h-9 w-full rounded-[4px] py-[10px] px-3 
                            outline-none flex-1 border border-[#c4c4cf] pl-10"
					type="text"
					placeholder="Tìm đơn hàng theo Mã đơn hàng, Nhà bán hoặc Tên sản phẩm"
				/>
				<div
					className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#0b74e5] 
                        pl-4 pr-[6px] border-l-2 border-[#dddde3] cursor-pointer text-[14px]"
				>
					Tìm đơn hàng
				</div>
			</div>
			<div>
				<div className="flex flex-col items-center bg-white w-full p-[35px]">
					<img
						src="https://frontend.tikicdn.com/_desktop-next/static/img/account/empty-order.png"
						alt="Empty Order"
						className="w-[200px] h-[200px]"
					/>
					<p className="mt-[15px] text-[#38383d] text-base font-normal">Chưa có đơn hàng</p>
				</div>
			</div>
		</div>
	);
}
