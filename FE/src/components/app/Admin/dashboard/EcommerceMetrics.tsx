/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';
import { FaBox } from 'react-icons/fa6';
import AdminServices from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';
export const EcommerceMetrics = () => {
	const AdminService = new AdminServices(URL_SERVICE, () => {});
	const [totalCustomer, setTotalCustomer] = useState(0);
	// const [totalProduct, setTotalProduct] = useState(0);
	const [totalOrder, setTotalOrder] = useState(0);

	useEffect(() => {
		const fetchTotalCustomer = async () => {
			try {
				const res: any = await AdminService.getTotalCustomer();
				setTotalCustomer(res);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTotalCustomer();
	}, []);
	// useEffect(() => {
	// 	const fetchTotalProduct = async () => {
	// 		try {
	// 			const res: any = await AdminService.getTotalProduct();
	// 			setTotalProduct(res);
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};
	// 	fetchTotalProduct();
	// }, []);
	useEffect(() => {
		const fetchTotalOrder = async () => {
			try {
				const res: any = await AdminService.getTotalOrder();
				setTotalOrder(res);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTotalOrder();
	}, []);

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
			{/* <!-- Metric Item Start --> */}
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
				<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
					<MdGroups className="text-gray-800 size-6 dark:text-white/90" />
				</div>

				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-gray-500 dark:text-gray-400">Khách hàng</span>
						<h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
							{totalCustomer}
						</h4>
					</div>
					<Badge color="success">
						<FaArrowUp />
						11.01%
					</Badge>
				</div>
			</div>
			{/* <!-- Metric Item End --> */}

			{/* <!-- Metric Item Start --> */}
			<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
				<div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
					<FaBox className="text-gray-800 dark:text-white/90" />
				</div>
				<div className="flex items-end justify-between mt-5">
					<div>
						<span className="text-sm text-gray-500 dark:text-gray-400">Đơn hàng</span>
						<h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{totalOrder}</h4>
					</div>

					<Badge color="error">
						<FaArrowDown className="text-error-500" />
						9.05%
					</Badge>
				</div>
			</div>
			{/* <!-- Metric Item End --> */}
		</div>
	);
};
