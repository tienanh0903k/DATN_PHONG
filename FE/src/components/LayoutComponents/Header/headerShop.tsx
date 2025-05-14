/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { Button, Dropdown, MenuProps } from 'antd';
import {
	ShopOutlined,
	ShoppingOutlined,
	FileTextOutlined,
	StarOutlined,
	UserOutlined,
	HomeOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import RegisterServices from '@/services/register/registerServices';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { URL_AUTH, URL_SERVICE } from '@/constant/constant';

import { useDispatch } from 'react-redux';
import { setUserInfo } from '@/reducers/slice/authSlice';
import { setShopInfo } from '@/reducers/slice/shopSlice';
import { addtoCart } from '@/reducers/slice/cartSlice';
import CartServices from '@/services/CartServices/CartServices';
const HeaderShop = () => {
	const shop = useSelector((state: RootState) => state.shop.shopInfo);
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const registerServices = new RegisterServices(URL_AUTH || '', () => {});
	const dispatch = useDispatch();
	const shopServices = new ShopServicer(URL_SERVICE || '', () => {});
	const cartServices = new CartServices(URL_SERVICE || '', () => {});
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const handleCallback = async () => {
				try {
					const response = await registerServices.callbackGoogle(token);
					handleLogin(response.data.identities[0].identity_data.email);
				} catch (error) {
					console.log(error);
				}
			};
			handleCallback();
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem('tokenlogin');
		if (token) {
			const handleLogin = async () => {
				try {
					const response: any = await registerServices.getCustomer(token);
					dispatch(setUserInfo(response));
					const shop: any = await shopServices.getShop(response.customerId);
					dispatch(setShopInfo(shop?.shop));
					const data = await cartServices.getCartByCustomerId(response.customerId);
					dispatch(addtoCart(data));
				} catch (error) {
					console.log(error);
				}
			};
			handleLogin();
		}
	}, []);
	const handleLogin = async (email: string) => {
		const response: any = await registerServices.signIn(email);
		const shop: any = await shopServices.getShop(response.customerId);
		dispatch(setUserInfo(response));
		dispatch(setShopInfo(shop?.shop));
	};

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<Link href="/shop/profile-shop" className="flex items-center gap-2">
					<Image src={shop?.shopAvatar} alt="Shop" width={20} height={20} className="rounded-[50%]" />
					<span>Quản lý cửa hàng</span>
				</Link>
			),
		},
		{
			key: '2',
			label: (
				<Link href="/shop/create-product" className="flex items-center gap-2">
					<ShoppingOutlined />
					<span>Thêm sản phẩm</span>
				</Link>
			),
		},
		{
			key: '3',
			label: (
				<Link href="/shop/orders" className="flex items-center gap-2">
					<FileTextOutlined />
					<span>Quản lý đơn hàng</span>
				</Link>
			),
		},
		{
			key: '4',
			label: (
				<Link href="/shop/reviews" className="flex items-center gap-2">
					<StarOutlined />
					<span>Đánh giá</span>
				</Link>
			),
		},
		{
			type: 'divider',
		},
		{
			key: '5',
			label: (
				<Link href="/shop/update-shop" className="flex items-center gap-2">
					<UserOutlined />
					<span>Tài khoản</span>
				</Link>
			),
		},
		{
			key: '6',
			label: (
				<Link href="/" className="flex items-center gap-2">
					<HomeOutlined />
					<span>Về trang chủ</span>
				</Link>
			),
		},
	];

	return (
		<header className="w-full bg-white shadow-sm">
			<div className="container-base h-[--header-height] flex items-center justify-between py-2">
				{/* Logo and Shop Name */}
				<div className="flex items-center gap-4">
					<Link href="/shop/profile-shop" className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-full overflow-hidden">
							<Image
								src={shop?.shopAvatar || '/img/default-shop-avatar.png'}
								alt="Shop Avatar"
								width={40}
								height={40}
								className="object-cover"
							/>
						</div>
						<div>
							<h1 className="text-lg font-semibold">{shop?.shopName}</h1>
							<p className="text-sm text-gray-500">Quản lý cửa hàng</p>
						</div>
					</Link>
				</div>

				{/* Navigation */}
				<div className="flex items-center gap-6">
					<Link href="/shop/profile-shop">
						<Button type="text" icon={<ShopOutlined />}>
							Tổng quan
						</Button>
					</Link>
					<Link href="/shop/create-product">
						<Button type="text" icon={<ShoppingOutlined />}>
							Sản phẩm
						</Button>
					</Link>
					<Link href="/shop/orders">
						<Button type="text" icon={<FileTextOutlined />}>
							Đơn hàng
						</Button>
					</Link>
					<Link href="/shop/reviews">
						<Button type="text" icon={<StarOutlined />}>
							Đánh giá
						</Button>
					</Link>
				</div>

				{/* User Menu */}
				<div className="flex items-center gap-4">
					<Dropdown menu={{ items }} placement="bottomRight">
						<Button type="text" icon={<UserOutlined />}>
							{user?.email}
						</Button>
					</Dropdown>
				</div>
			</div>
		</header>
	);
};

export default HeaderShop;
