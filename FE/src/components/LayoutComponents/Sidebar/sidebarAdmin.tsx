'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import {
	DashboardOutlined,
	ShoppingOutlined,
	FileTextOutlined,
	TruckOutlined,
	TagsOutlined,
	DollarOutlined,
	BarChartOutlined,
	MessageOutlined,
	UserOutlined,
	SettingOutlined,
	LogoutOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logout } from '@/reducers/slice/authSlice';

const { Sider } = Layout;

const SidebarAdmin = () => {
	const [openKeys, setOpenKeys] = React.useState<string[]>([]);

	const dispatch = useDispatch();

	const handleOpenChange = (keys: string[]) => {
		setOpenKeys(keys);
	};

	const handleLogout = () => {
		dispatch(logout());

		localStorage.removeItem('accessToken');
	};

	const menuItems = [
		{
			key: 'dashboard',
			icon: <DashboardOutlined />,
			label: <Link href="/admin/dashboards">Bảng điều khiển</Link>,
		},
		{
			key: 'products',
			icon: <ShoppingOutlined />,
			label: 'Quản lý Sản phẩm',
			children: [
				{
					key: 'product-list',
					label: <Link href="/admin/list_products">Danh sách sản phẩm</Link>,
				},
				{
					key: 'categories',
					label: <Link href="/admin/categories">Danh mục sản phẩm</Link>,
				},
				{
					key: 'brands',
					label: <Link href="/admin/brands">Thương hiệu</Link>,
				},
			],
		},
		{
			key: 'orders',
			icon: <FileTextOutlined />,
			label: 'Quản lý Đơn hàng',
			children: [
				{
					key: 'order-list',
					label: <Link href="/admin/orders">Tất cả đơn hàng</Link>,
				},
				{
					key: 'order-pending',
					label: <Link href="/admin/orders/pending">Đơn hàng chờ xử lý</Link>,
				},
				{
					key: 'order-shipping',
					label: <Link href="/admin/orders/shipping">Đơn hàng đang giao</Link>,
				},
				{
					key: 'order-completed',
					label: <Link href="/admin/orders/completed">Đơn hàng hoàn thành</Link>,
				},
			],
		},
		{
			key: 'shipping',
			icon: <TruckOutlined />,
			label: 'Quản lý Vận chuyển',
			children: [
				{
					key: 'shipping-methods',
					label: <Link href="/admin/shipping">Phương thức vận chuyển</Link>,
				},
				{
					key: 'shipping-rates',
					label: <Link href="/admin/shipping-rates">Phí vận chuyển</Link>,
				},
			],
		},
		{
			key: 'promotions',
			icon: <TagsOutlined />,
			label: 'Quản lý Khuyến mãi',
			children: [
				{
					key: 'coupons',
					label: <Link href="/admin/coupons">Mã giảm giá</Link>,
				},
				{
					key: 'promotions',
					label: <Link href="/admin/promotions">Chương trình khuyến mãi</Link>,
				},
			],
		},
		{
			key: 'finance',
			icon: <DollarOutlined />,
			label: 'Quản lý Tài chính',
			children: [
				{
					key: 'transactions',
					label: <Link href="/admin/transactions">Giao dịch</Link>,
				},
				{
					key: 'revenue',
					label: <Link href="/admin/revenue">Doanh thu</Link>,
				},
				{
					key: 'refunds',
					label: <Link href="/admin/refunds">Hoàn tiền</Link>,
				},
			],
		},
		{
			key: 'reports',
			icon: <BarChartOutlined />,
			label: 'Báo cáo & Thống kê',
			children: [
				{
					key: 'sales-report',
					label: <Link href="/admin/reports/sales">Báo cáo doanh số</Link>,
				},
				{
					key: 'product-report',
					label: <Link href="/admin/reports/products">Báo cáo sản phẩm</Link>,
				},
				{
					key: 'customer-report',
					label: <Link href="/admin/reports/customers">Báo cáo khách hàng</Link>,
				},
			],
		},
		{
			key: 'chat',
			icon: <MessageOutlined />,
			label: <Link href="/admin/chat">Tin nhắn</Link>,
		},
		{
			key: 'profile',
			icon: <UserOutlined />,
			label: 'Hồ sơ',
		},
		{
			key: 'settings',
			icon: <SettingOutlined />,
			label: 'Cài đặt',
		},
		{
			key: 'logout',
			icon: <LogoutOutlined />,
			label: <Link href="/">Đăng xuất</Link>,

			onClick: handleLogout,
		},
	];

	return (
		<Sider width={290} className=" fixed h-screen overflow-auto" theme="light">
			<div className="p-4 text-[#dee4ee]">
				<h1 className="text-xl text-black font-semibold">Trang quản trị</h1>
			</div>
			<Menu
				mode="inline"
				theme="light"
				openKeys={openKeys}
				onOpenChange={handleOpenChange}
				items={menuItems}
				className="bg-[#1c2333] border-none"
			/>
		</Sider>
	);
};

export default SidebarAdmin;
