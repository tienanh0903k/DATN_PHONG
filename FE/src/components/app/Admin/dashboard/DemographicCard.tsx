'use client';
import Image from 'next/image';
import { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import { Dropdown } from '@/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/components/ui/dropdown/DropdownItem';

export default function TopUserCard() {
	const [isOpen, setIsOpen] = useState(false);

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
				{[
					{
						name: 'Nguyễn Văn A',
						orders: 122,
						percentage: 56,
						avatar: 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1743475242759-31323fe7b907c09d296a2e74fb42cf59.jpg',
					},
					{
						name: 'Trần Thị B',
						orders: 95,
						percentage: 44,
						avatar: 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1743475242759-31323fe7b907c09d296a2e74fb42cf59.jpg',
					},
					{
						name: 'Nguyễn Văn C',
						orders: 88,
						percentage: 33,
						avatar: 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1743475242759-31323fe7b907c09d296a2e74fb42cf59.jpg',
					},
					{
						name: 'Nguyễn Văn D',
						orders: 77,
						percentage: 22,
						avatar: 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/-1743475242759-31323fe7b907c09d296a2e74fb42cf59.jpg',
					},
				].map((user, index) => (
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
									{user.name}
								</p>
								<span className="block text-gray-500 text-theme-xs dark:text-gray-400">
									{user.orders} đơn hàng
								</span>
							</div>
						</div>

						<div className="flex w-full max-w-[140px] items-center gap-3">
							<div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
								<div
									className="absolute left-0 top-0 h-full rounded-sm bg-brand-500"
									style={{ width: `${user.percentage}%` }}
								></div>
							</div>
							<p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
								{user.percentage}%
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
