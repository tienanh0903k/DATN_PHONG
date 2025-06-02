/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Table, Select, Input, Button, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AdminServices from '@/services/admin/adminServices';
import { URL_SERVICE } from '@/constant/constant';

const { Option } = Select;

interface Bill {
	billId: number;
	customerId: number;
	numberPhone: string;
	address: string;
	statusId: number;
	createAt: string;
	Customer: {
		customerName: string;
		email: string;
	};
	StatusBill: {
		statusName: string;
	};
	BillDetail: Array<{
		quantity: number;
		totalPrice: number;
		ProductVariant: {
			Products: {
				productName: string;
				Shop: {
					shopName: string;
				};
			};
		};
	}>;
}

const AllBillsPage = () => {
	const adminServices = new AdminServices(URL_SERVICE, () => {});
	const [bills, setBills] = useState<Bill[]>([]);
	const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [statusFilter, setStatusFilter] = useState<number | null>(null);
	const [messageApi, messageContextHolder] = message.useMessage();

	const statusOptions = [
		{ id: 0, name: 'Tất cả' },
		{ id: 1, name: 'Chưa thanh toán' },
		{ id: 2, name: 'Đã thanh toán' },
		{ id: 3, name: 'Đang vận chuyển' },
		{ id: 4, name: 'Đã giao' },
		{ id: 5, name: 'Đã hủy' },
		{ id: 6, name: 'Thanh toán sau' },
	];

	const fetchBills = async () => {
		try {
			setLoading(true);
			const response: any = await adminServices.getAllBill();
			console.log(response);
			setBills(response);
			setFilteredBills(response);
		} catch (error) {
			console.error('Error fetching bills:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBills();
	}, []);

	const handleStatusChange = async (billId: number, newStatus: number) => {
		try {
			await adminServices.updateBillStatus(billId, newStatus);
			messageApi.success('Cập nhật trạng thái đơn hàng thành công');
			fetchBills();
		} catch (error) {
			console.error('Error updating bill status:', error);
		}
	};

	const handleSearch = () => {
		const filtered = bills.filter((bill) => {
			const matchesSearch =
				bill.billId.toString().includes(searchText) ||
				bill.Customer.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
				bill.Customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
				bill.BillDetail.some((detail) =>
					detail.ProductVariant.Products.productName.toLowerCase().includes(searchText.toLowerCase()),
				);

			const matchesStatus = statusFilter === null || statusFilter === 0 || bill.statusId === statusFilter;

			return matchesSearch && matchesStatus;
		});

		setFilteredBills(filtered);
	};

	const columns = [
		{
			title: 'Mã đơn hàng',
			dataIndex: 'billId',
			key: 'billId',
		},
		{
			title: 'Khách hàng',
			dataIndex: ['Customer', 'customerName'],
			key: 'customerName',
		},
		{
			title: 'Email',
			dataIndex: ['Customer', 'email'],
			key: 'email',
		},
		{
			title: 'Sản phẩm',
			dataIndex: 'BillDetail',
			key: 'products',
			render: (details: Bill['BillDetail']) => (
				<ul>
					{details.map((detail, index) => (
						<li key={index}>
							{detail.ProductVariant.Products.productName} - Số lượng: {detail.quantity}
						</li>
					))}
				</ul>
			),
		},
		{
			title: 'Tổng tiền',
			dataIndex: 'BillDetail',
			key: 'total',
			render: (details: Bill['BillDetail']) => {
				const total = details.reduce((sum, detail) => sum + detail.totalPrice, 0);
				return `${total.toLocaleString('vi-VN')}đ`;
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: ['StatusBill', 'statusName'],
			key: 'status',
			render: (status: string, record: Bill) => (
				<Select
					defaultValue={record.statusId}
					style={{ width: 150 }}
					onChange={(value) => handleStatusChange(record.billId, value)}
				>
					{statusOptions.map((option) => (
						<Option key={option.id} value={option.id}>
							{option.name}
						</Option>
					))}
				</Select>
			),
		},
		{
			title: 'Ngày tạo',
			dataIndex: 'createAt',
			key: 'createAt',
			render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
		},
	];

	return (
		<>
			{messageContextHolder}
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>

				<div className="mb-6 flex gap-4">
					<Input
						placeholder="Tìm kiếm theo mã đơn, tên khách hàng, email hoặc tên sản phẩm"
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						style={{ width: 400 }}
						prefix={<SearchOutlined />}
					/>

					<Select
						placeholder="Lọc theo trạng thái"
						style={{ width: 200 }}
						onChange={(value) => setStatusFilter(value)}
						allowClear
					>
						{statusOptions.map((option) => (
							<Option key={option.id} value={option.id}>
								{option.name}
							</Option>
						))}
					</Select>

					<Button type="primary" onClick={handleSearch}>
						Tìm kiếm
					</Button>
				</div>

				<Table
					columns={columns}
					dataSource={filteredBills}
					rowKey="billId"
					loading={loading}
					pagination={{
						pageSize: 10,
						showSizeChanger: true,
						showTotal: (total) => `Tổng số ${total} đơn hàng`,
					}}
				/>
			</div>
		</>
	);
};

export default AllBillsPage;
