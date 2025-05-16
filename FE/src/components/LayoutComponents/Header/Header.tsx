/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { TiHome } from 'react-icons/ti';
import { CiFaceSmile } from 'react-icons/ci';
import { BiCartAlt } from 'react-icons/bi';

import historySearch from '../../../mocks/historySearch.json';
import { IoLocationOutline, IoSearchOutline } from 'react-icons/io5';
import { Modal, ConfigProvider, Dropdown, MenuProps } from 'antd';
import ModalAddress from './modalAddress';
import RegisterModal from '../../app/Resgiter/RegisterModal';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { URL_AUTH, URL_SERVICE, URL_SOCKET } from '@/constant/constant';
import RegisterServices from '@/services/register/registerServices';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { setUserInfo, logout } from '@/reducers/slice/authSlice';
import { setShopInfo } from '@/reducers/slice/shopSlice';
import { addtoCart, clearCart } from '@/reducers/slice/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import CartServices from '@/services/CartServices/CartServices';
import { useForm } from 'react-hook-form';
import HistoryHeader from './historyHeader';

import io from 'socket.io-client';
const socket = io(URL_SOCKET);
type Props = object;

const HeaderCpn = ({}: Props) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const isLogin = useSelector((state: RootState) => state.auth.isAuthenticated);
	const { register, handleSubmit } = useForm();
	const cart = useSelector((state: RootState) => state.cart.cart);

	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const registerServices = new RegisterServices(URL_AUTH || '', () => {});
	const shopServices = new ShopServicer(URL_SERVICE || '', () => {});
	const cartServices = new CartServices(URL_SERVICE || '', () => {});
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModalLogin = () => {
		setIsModalVisible(true);
	};

	const handleCloseLogin = () => {
		setIsModalVisible(false);
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const onSubmit = async (data: any) => {
		console.log(data.contentSearch);
		router.push(`/search?q=${data.contentSearch}`);
	};

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
	useEffect(() => {
		const hash = window.location.hash.substring(1);

		if (hash) {
			const params = new URLSearchParams(hash);
			const access_token = params.get('access_token');
			localStorage.setItem('accessToken', access_token || '');
			if (access_token) {
				const handleCallback = async () => {
					try {
						const response = await registerServices.callbackGoogle(access_token);

						handleLogin(response.data.identities[0].identity_data.email);

						window.location.hash = '';
					} catch (error) {
						console.log(error);
					}
				};
				handleCallback();
			}
		}
	}, [isLogin]);

	const handleLogin = async (email: string) => {
		const response: any = await registerServices.signIn(email);

		const shop: any = await shopServices.getShop(response.customerId);
		socket.emit('registerUser', response.customerId);
		dispatch(setUserInfo(response));
		dispatch(setShopInfo(shop?.shop));
		const data = await cartServices.getCartByCustomerId(response.customerId);
		dispatch(addtoCart(data));
	};
	const handleLogout = () => {
		dispatch(logout());
		dispatch(clearCart());
		localStorage.removeItem('accessToken');
		localStorage.removeItem('tokenlogin');

		router.push('/');
	};
	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<div className="pr-8 py-[5px] leading-[150%] font-[400]">
					<Link className="text-[#27272a]" href="/customer/account">
						Thông tin tài khoản
					</Link>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div className="pr-8 py-[5px] leading-[150%] font-[400] ">
					<Link className="text-[#27272a]" href="/customer/order">
						Đơn hàng của tôi
					</Link>
				</div>
			),
		},
		{
			key: '3',
			label: <div className="pr-8 py-[5px] leading-[150%] font-[400] text-[#27272a]">Trung tâm hỗ trợ</div>,
		},
		{
			key: '4',
			label: (
				<div onClick={handleLogout} className="pr-8 py-[5px] leading-[150%] font-[400] text-[#27272a]">
					Đăng xuất
				</div>
			),
		},
	];

	return (
		<header className="w-full bg-[#fff]">
			<HeaderTop />
			<div className=" h-[--header-height] container-base flex items-center gap-[48px] py-2">
				<div className="flex flex-col min-w-[96px]">
					<Image
						width={96}
						height={40}
						src="/img/tiki.png"
						alt=""
						className="w-full h-[40px] object-contain justify-center"
					/>
					<span className="text-[14px] text-[#003ea1] font-[600] mt-2 ml-2">Tốt & Nhanh</span>
				</div>
				<div className="w-full block relative">
					<div className="flex w-full mb-2">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="header-search flex border border-[#ccc] rounded-[8px] h-[40px] flex-1 items-center "
						>
							<IoSearchOutline className="text-[#828181] text-[20px] ml-[18px]" />
							<input
								placeholder="Tìm kiếm sản phẩm"
								{...register('contentSearch')}
								type="text"
								className="w-full outline-none text-[#333] mx-2"
								onFocus={() => setIsSearchFocused(true)}
								onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
							/>
							<button
								type="submit"
								className="bg-[#fff] h-full text-[14px] w-[92px] rounded-md max-h-9 text-center text-[#0a68ff] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd] hover:bg-[#0a68ff33] active:bg-[#0a68ff66]"
							>
								Tìm kiếm
							</button>
						</form>

						<div className="ml-[48px] flex items-center ">
							<div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer">
								<TiHome className="text-[20px] text-[--primary-color] mr-1" />
								<Link href="/" className="text-[--primary-color]">
									Trang chủ
								</Link>
							</div>
							{isLogin ? (
								<ConfigProvider
									theme={{
										components: {
											Dropdown: {
												fontSize: 15,
												controlItemBgActive: '#27272a1f',
											},
										},
									}}
								>
									<Dropdown menu={{ items }} placement="bottomRight">
										<div className="flex items-center px-2 p-4 hover:bg-[#27272a1f] h-10 rounded-[10px] cursor-pointer">
											<CiFaceSmile className="text-[20px] mr-1" />
											<span className="">Tài khoản</span>
										</div>
									</Dropdown>
								</ConfigProvider>
							) : (
								<div className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd]">
									<span className="" onClick={showModalLogin}>
										Đăng nhập
									</span>
									<RegisterModal open={isModalVisible} onClose={handleCloseLogin} />
								</div>
							)}
							<Link
								href={'/cart'}
								className="flex items-center px-2 p-4 hover:bg-[#0060ff1f] h-10 rounded-[10px] cursor-pointer relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd]"
							>
								<BiCartAlt className="text-[20px] text-[--primary-color]" />
								<span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] rounded-full bg-[#ff424f] text-white text-[12px] flex items-center justify-center">
									{cart.length}
								</span>
							</Link>
						</div>
					</div>
					{isSearchFocused && <HistoryHeader data={historySearch} />}
					<div className="flex justify-between">
						<ul className="history flex gap-[12px] w-[820px] overflow-hidden h-6 ">
							{historySearch?.map((item: { name: string }, index: number) => (
								<li
									className="text-[14px] text-[#808089] leading-[150%] font-[500] cursor-pointer "
									key={index}
								>
									{item.name}
								</li>
							))}
						</ul>
						<div onClick={showModal} className="address flex cursor-pointer">
							<div className="flex items-center mr-2 text-[#808089]">
								<IoLocationOutline className="mr-1" />
								<p className="">Giao đến :</p>
							</div>
							<div className="text-[#27272a] font-[500] text-[14px] leading-[150%] ">
								<p className="underline">{user?.address}</p>
							</div>
						</div>
						<ConfigProvider
							theme={{
								components: {
									Modal: {
										colorBgElevated: '#f8f8f8',
									},
								},
							}}
						>
							<Modal
								open={isModalOpen}
								onOk={handleOk}
								footer={false}
								onCancel={handleCancel}
								closable={false}
								maskClosable={true}
								width={'600px'}
							>
								<ModalAddress />
							</Modal>
						</ConfigProvider>
					</div>
				</div>
			</div>
			<HeaderBottom />
		</header>
	);
};
export default HeaderCpn;
