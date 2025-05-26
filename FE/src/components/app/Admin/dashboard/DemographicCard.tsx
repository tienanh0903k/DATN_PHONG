/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';
import AdminService from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';
import { formatPrice } from '@/utils/formatprice';

export default function TopUserCard() {
	const [isOpen, setIsOpen] = useState(false);
	const [topCustomers, setTopCustomers] = useState<any[]>([]);
	const adminService = new AdminService(URL_SERVICE, () => {});
	useEffect(() => {
		const fetchTopCustomers = async () => {
			try {
				const res: any = await adminService.getTopCustomers();
				setTopCustomers(res);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTopCustomers();
	}, []);
	function toggleDropdown() {
		setIsOpen(!isOpen);
	}

	function closeDropdown() {
		setIsOpen(false);
	}

	return (
		<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
			<div className="flex justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Top Users Mua Hàng</h3>
					<p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
						Người dùng có lượt mua nhiều nhất
					</p>
				</div>

				<div className="relative inline-block">
					<button onClick={toggleDropdown} className="dropdown-toggle">
						<IoMdMore className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
					</button>
					<Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
						<DropdownItem
							onItemClick={closeDropdown}
							className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
						>
							Xem chi tiết
						</DropdownItem>
						<DropdownItem
							onItemClick={closeDropdown}
							className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
						>
							Xoá
						</DropdownItem>
					</Dropdown>
				</div>
			</div>

			<div className="space-y-5 mt-6">
				{topCustomers.map((user, index) => (
					<div key={index} className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="items-center w-full rounded-full max-w-8 overflow-hidden">
								<Image
									width={48}
									height={48}
									src={user.avatar}
									alt={user.name}
									className="w-full rounded-full"
								/>
							</div>
							<div>
								<p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
									{user.customerName}
								</p>
								<span className="block text-gray-500 text-theme-xs dark:text-gray-400">
									{user.totalOrders} đơn hàng
								</span>
							</div>
						</div>

						<div className="flex w-full max-w-[180px] items-center gap-3">
							<p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
								Tổng tiền: {formatPrice(user.totalAmount)}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
