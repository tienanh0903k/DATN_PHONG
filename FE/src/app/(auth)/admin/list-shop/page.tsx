/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { Table, Select, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AdminServices from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';
import { formatPrice } from '@/utils/formatprice';

interface ShopData {
	shopId: number;
	shopName: string;
	emailShop: string;
	shopNumberPhone?: string;
	shopAddress: string;
	status: string;
	totalProducts: number;
	totalRevenue: number;
}

const ListShop = () => {
	const [data, setData] = useState([]);
	const [messageApi, contextHolder] = message.useMessage();
	const adminService = new AdminServices(URL_SERVICE, () => {});

	const handleStatusChange = async (shopId: number, status: string) => {
		console.log(shopId, status);
		try {
			await adminService.updateStatusShop(shopId, status);
			messageApi.success('Cập nhật trạng thái thành công');
			fetchDataShop();
		} catch (error) {
			console.log(error);
			messageApi.error('Có lỗi xảy ra khi cập nhật trạng thái');
		}
	};

	const fetchDataShop = async () => {
		try {
			const response: any = await adminService.getAllShop();
			setData(response);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchDataShop();
	}, []);

	const columns: ColumnsType<ShopData> = [
		{
			title: 'ID',
			dataIndex: 'shopId',
			key: 'shopId',
		},
		{
			title: 'Tên cửa hàng',
			dataIndex: 'shopName',
			key: 'shopName',
		},
		{
			title: 'Email',
			dataIndex: 'emailShop',
			key: 'emailShop',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'shopNumberPhone',
			key: 'shopNumberPhone',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'shopAddress',
			key: 'shopAddress',
		},
		{
			title: 'Tổng sản phẩm',
			dataIndex: 'totalProducts',
			key: 'totalProducts',
			render: (value: number) => value.toLocaleString(),
		},
		{
			title: 'Tổng doanh thu',
			dataIndex: 'totalRevenue',
			key: 'totalRevenue',
			render: (value: number) => formatPrice(value),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: string, record: ShopData) => (
				<Select
					defaultValue={status}
					value={status}
					style={{ width: 120 }}
					onChange={(value) => handleStatusChange(record.shopId, value)}
					options={[
						{ value: 'active', label: 'Hoạt động' },
						{ value: 'inactive', label: 'Không hoạt động' },
						{ value: 'pending', label: 'Chờ duyệt' },
						{ value: 'banned', label: 'Bị cấm' },
					]}
				/>
			),
		},
	];

	return (
		<div className="">
			{contextHolder}
			<h1>Danh sách cửa hàng</h1>
			<Table columns={columns} dataSource={data} rowKey="shopId" />
		</div>
	);
};

export default ListShop;
