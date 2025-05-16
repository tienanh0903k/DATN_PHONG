/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsCardImage } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import ServicesChat from '@/services/chat/servicesChat';
import { URL_SERVICE, URL_SOCKET } from '@/constant/constant';
import useDebounce from '@/utils/useDebounce';
import { Ishop, Ichat } from '@/models/chat/Ichat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import io from 'socket.io-client';

type Props = {
	handleClose: () => void;
};

const ChatwithShop = ({ handleClose }: Props) => {
	const [shops, setShops] = useState<Ishop[]>([]);
	const [selectedShop, setSelectedShop] = useState<Ishop>(shops[0]);
	const [chats, setChats] = useState<Ichat[]>([]);
	const [loading, setLoading] = useState(false);
	const servicesChat = new ServicesChat(URL_SERVICE || '', () => {});
	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const socket = io(URL_SOCKET);
	const containerRef = useRef<HTMLDivElement>(null);
	const customer = useSelector((state: RootState) => state.auth.userInfo);
	useEffect(() => {
		const fetchData = async () => {
			if (debouncedSearchTerm.trim()) {
				setLoading(true);

				const delayTimer = setTimeout(async () => {
					try {
						const response: any = await servicesChat.searchShop(debouncedSearchTerm);
						setShops(response.data);
					} catch (error) {
						console.log(error);
					} finally {
						setLoading(false);
					}
				}, 500);

				return () => clearTimeout(delayTimer);
			}
		};

		fetchData();
	}, [debouncedSearchTerm]);
	useEffect(() => {
		const fetchData = async () => {
			const response: any = await servicesChat.getShopsChattedWithCustomer(customer.customerId);
			setShops(response.data);
		};
		fetchData();
	}, []);
	const scrollToBottom = () => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		} else {
			console.log('Container ref is null');
		}
	};
	const handleSelectShop = (shop: Ishop) => {
		if (customer.customerId && shop.shopId) {
			setSelectedShop(shop);
			const fetchChats = async () => {
				try {
					const response = await servicesChat.getShopMessages(customer.customerId, shop.shopId);
					console.log(response);
					setChats(response.data);
				} catch (error) {
					console.log(error);
				}
			};
			fetchChats();
		}
	};
	const { register, handleSubmit, reset } = useForm<any>();

	const onSubmit = async (data: any) => {
		if (!data.message.trim()) return;
		if (customer.customerId && selectedShop.shopId) {
			const datasend = {
				customerId: customer.customerId,
				shopId: selectedShop.shopId,
				content: data.message,
				senderId: customer.customerId,
				senderType: 'CUSTOMER',
			};

			try {
				const response = await servicesChat.createChat(datasend);
				console.log(response);
				socket.emit('sendMessage', {
					content: data.message,
					senderType: 'CUSTOMER',
					createdAt: response.data.createdAt,
				});
			} catch (error) {
				console.log(error);
			}
		}
		reset();
	};
	useEffect(() => {
		socket.on('receiveMessage', (data: any) => {
			setChats((prev) => [...prev, data]);
			scrollToBottom();
		});
	}, []);

	return (
		<div className="flex h-[500px] w-[700px] border rounded shadow bg-white overflow-hidden">
			{/* Sidebar - Danh sách shop */}
			<div className="w-1/3 border-r">
				<div className="p-3 border-b">
					<input
						onChange={(e) => setSearchTerm(e.target.value)}
						type="text"
						placeholder="Tìm theo người dùng..."
						className="w-full px-3 py-2 border rounded text-sm"
					/>
				</div>
				<div className="overflow-y-auto">
					{loading ? (
						<div className="p-3 text-sm text-gray-500">Đang tìm kiếm...</div>
					) : shops.length === 0 ? (
						<div className="p-3 text-sm text-gray-500">Không tìm thấy kết quả</div>
					) : (
						shops.map((shop) => (
							<div
								key={shop.shopId}
								onClick={() => handleSelectShop(shop)}
								className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
									selectedShop?.shopId === shop.shopId ? 'bg-gray-100' : ''
								}`}
							>
								<img src={shop.shopAvatar} alt={shop.shopName} className="w-8 h-8 rounded-full" />
								<span className="text-sm">{shop.shopName}</span>
							</div>
						))
					)}
				</div>
			</div>

			{selectedShop ? (
				<div className="flex-1 flex flex-col">
					<div className="flex items-center justify-between px-4 py-3 border-b">
						<div className="flex items-center gap-2">
							<img src={selectedShop.shopAvatar} alt="Shop" className="w-8 h-8 rounded-full" />
							<span className="font-semibold text-sm">{selectedShop.shopName}</span>
						</div>
						<button onClick={handleClose} className="text-gray-500 text-xl cursor-pointer">
							<IoMdClose />
						</button>
					</div>

					<div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
						{chats.length === 0 ? (
							<p className="text-center text-gray-400">Chưa có tin nhắn với {selectedShop.shopName}</p>
						) : (
							chats.map((msg) => (
								<div
									key={msg.messageId}
									className={`flex ${
										msg.senderType === 'CUSTOMER' ? 'justify-end' : 'justify-start'
									}`}
								>
									<div
										className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
											msg.senderType === 'CUSTOMER'
												? 'bg-blue-500 text-white'
												: 'bg-gray-200 text-gray-900'
										}`}
									>
										{msg.content}
										<p
											className={`text-[8px] leading-[8px] ${msg.senderType === 'CUSTOMER' ? 'text-white' : 'text-[#333]'} mt-1`}
										>
											{formatDistanceToNow(new Date(msg.createdAt), {
												addSuffix: true,
												locale: vi,
											})}
										</p>
									</div>
								</div>
							))
						)}
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="flex items-center px-3 py-2 border-t">
						<button type="button" className="text-xl text-gray-500 hover:text-blue-500 cursor-pointer">
							<BsCardImage />
						</button>

						<input
							{...register('message')}
							type="text"
							placeholder="Nhập nội dung chat..."
							className="flex-1 mx-2 px-3 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-blue-500"
						/>
						<button type="submit" className="text-xl text-blue-500 hover:text-blue-600 cursor-pointer">
							<IoMdSend />
						</button>
					</form>
				</div>
			) : (
				<div className="flex-1 overflow-y-auto p-4 text-center text-gray-400">
					<p>Chưa có tin nhắn với </p>
				</div>
			)}
		</div>
	);
};

export default ChatwithShop;
