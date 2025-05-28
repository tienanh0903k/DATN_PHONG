/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AdminServices from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';
import formatDate from '@/utils/formatdate';

interface UserData {
	customerId: number;
	customerName: string;
	email: string;
	numberPhone?: string;
	birthday: string;
	address: string;
	gender: string;
	status: string;
}

const ListUser = () => {
	const [data, setData] = useState([]);
	const handleApprove = (id: number) => {
		console.log(id);
	};
	const handleHide = (id: number) => {
		console.log(id);
	};
	const adminService = new AdminServices(URL_SERVICE, () => {});

	const fetchDataUser = async () => {
		try {
			const response: any = await adminService.getAllUser();
			console.log(response);
			setData(response);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchDataUser();
	}, []);

	const columns: ColumnsType<UserData> = [
		{
			title: 'ID',
			dataIndex: 'customerId',
			key: 'customerId',
		},
		{
			title: 'Tên khách hàng',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'numberPhone',
			key: 'numberPhone',
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'birthday',
			key: 'birthday',
			render: (date: string) => formatDate(new Date(date)),
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Giới tính',
			dataIndex: 'gender',
			key: 'gender',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Hành động',
			key: 'action',
			render: (_: any, record: any) => (
				<div className="flex gap-2">
					<Button
						className="text-blue-500 hover:underline cursor-pointer"
						type="primary"
						onClick={() => handleApprove(record.productId)}
					>
						Duyệt
					</Button>
					<Button
						className="text-yellow-500 hover:underline cursor-pointer"
						type="default"
						color="yellow"
						onClick={() => handleHide(record.productId)}
					>
						Ẩn
					</Button>
				</div>
			),
		},
	];
	return (
		<div className="">
			<h1>list user</h1>
			<Table columns={columns} dataSource={data} rowKey="customerId" />
		</div>
	);
};

export default ListUser;
