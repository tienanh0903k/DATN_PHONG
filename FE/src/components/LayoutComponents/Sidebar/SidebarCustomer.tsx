'use client';
import { CiUser, CiBellOn, CiHeart } from 'react-icons/ci';
import { MdOutlineStorefront } from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { LiaCcAmazonPay } from 'react-icons/lia';
import Link from 'next/link';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
interface Sidebardata {
	title: string;
	icon: React.ReactNode;
	href: string;
}
const SidebarCustomer = () => {
	const user = useSelector((state: RootState) => state.auth.userInfo);

	const Sidebardata: Sidebardata[] = [
		{
			title: 'Thông tin tài khoản',
			icon: <CiUser />,
			href: '/customer/account',
		},
		{
			title: 'Thông báo của tôi',
			icon: <CiBellOn />,
			href: '/customer/notification',
		},
		{
			title: 'Đơn hàng của tôi',
			icon: <MdOutlineStorefront />,
			href: '/customer/order',
		},
		{
			title: 'Sổ địa chỉ',
			icon: <IoLocationOutline />,
			href: '/customer/address',
		},
		{
			title: 'Sản phẩm yêu thích',
			icon: <CiHeart />,
			href: '/customer/favorite',
		},
		{
			title: 'Thông tin thanh toán',
			icon: <LiaCcAmazonPay />,
			href: '/customer/payload',
		},
	];
	const [active, setActive] = useState<number>(0);
	return (
		<div className="w-[250px] mr-[17px]">
			<div className="flex items-center gap-5 pl-2 mb-3">
				<div className="w-[45px] h-[45px] rounded-full overflow-hidden mr-3">
					<Image src={user?.avatar} alt="" width={45} height={45} className="w-full h-full object-cover" />
				</div>
				<div className="flex flex-col">
					<span className="text-[14px] text-[#4a4a4a]">Tài khoản của</span>
					<span className="text-[16px] font-bold">{user?.customerName}</span>
				</div>
			</div>
			<ul className="">
				{Sidebardata.map((item, index) => (
					<Link
						onClick={() => setActive(index)}
						key={index}
						href={item.href}
						className={`block text-[#4a4a4a] ${active === index ? 'bg-[#ebebf0] text-black' : ''}`}
					>
						<div className="flex items-center gap-5 py-[7px] px-[18px] ">
							{item.icon}
							<span>{item.title}</span>
						</div>
					</Link>
				))}
			</ul>
		</div>
	);
};

export default SidebarCustomer;
