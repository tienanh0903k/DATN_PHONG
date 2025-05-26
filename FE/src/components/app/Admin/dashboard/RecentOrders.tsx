/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AdminService from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';
import { useState, useEffect } from 'react';
import { formatPrice } from '@/utils/formatprice';

export default function RecentOrders() {
	const router = useRouter();
	const adminService = new AdminService(URL_SERVICE, () => {});
	const [recentOrders, setRecentOrders] = useState([]);
	useEffect(() => {
		const fetchRecentOrders = async () => {
			try {
				const res: any = await adminService.getRecentOrders();
				setRecentOrders(res);
				console.log(res);
			} catch (err) {
				console.log(err);
			}
		};
		fetchRecentOrders();
	}, []);
	return (
		<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
			<div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Đơn hàng gần đây</h3>
				</div>

				<div className="flex items-center gap-3">
					<button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
						<svg
							className="stroke-current fill-white dark:fill-gray-800"
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M2.29004 5.90393H17.7067"
								stroke=""
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M17.7075 14.0961H2.29085"
								stroke=""
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
								fill=""
								stroke=""
								strokeWidth="1.5"
							/>
							<path
								d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
								fill=""
								stroke=""
								strokeWidth="1.5"
							/>
						</svg>
						bộ lọc
					</button>
					<button
						onClick={() => router.push('/admin/orders')}
						className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
					>
						xem tất cả
					</button>
				</div>
			</div>
			<div className="max-w-full overflow-x-auto">
				<Table>
					{/* Table Header */}
					<TableHeader className="border-gray-100 dark:border-gray-800 border-y">
						<TableRow>
							<TableCell
								isHeader
								className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Đơn hàng
							</TableCell>
							<TableCell
								isHeader
								className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Giá
							</TableCell>
							<TableCell
								isHeader
								className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								chi tiết
							</TableCell>
							<TableCell
								isHeader
								className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
							>
								Trạng thái
							</TableCell>
						</TableRow>
					</TableHeader>

					{/* Table Body */}

					<TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
						{recentOrders.map((product: any) => (
							<TableRow key={product.id} className="">
								<TableCell className="py-3">
									<div className="flex items-center gap-3">
										<div className="h-[50px] w-[50px] overflow-hidden rounded-md">
											<Image
												width={50}
												height={50}
												src={product.items[0].productImage}
												className="h-[50px] w-[50px]"
												alt={product.items[0].productName}
											/>
										</div>
										<div>
											<p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
												{product.items[0].productName}
											</p>
											<span className="text-gray-500 text-theme-xs dark:text-gray-400">
												{product.items.length} sản phẩm
											</span>
										</div>
									</div>
								</TableCell>
								<TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
									{formatPrice(product.totalAmount)}
								</TableCell>
								<TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
									{product.items[0].variant}
								</TableCell>

								<TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
									<Badge
									// color={
									// 	product.status === 'Delivered'
									// 		? 'success'
									// 		: product.status === 'Pending'
									// 			? 'warning'
									// 			: 'error'
									// }
									>
										{product.status}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
