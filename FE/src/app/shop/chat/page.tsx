/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ServicesChat from '@/services/chat/servicesChat';
import { URL_SERVICE } from '@/constant/constant';
import useDebounce from '@/utils/useDebounce';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useForm } from 'react-hook-form';

export default function ChatPage() {
	const { register, handleSubmit, reset } = useForm<any>();
	const [newMessage, setNewMessage] = useState('');
	const [customers, setCustomers] = useState<any>([]);

	const [selectedCustomer, setSelectedCustomer] = useState<any>(customers[0]);

	const [chats, setChats] = useState<any>([]);

	const [searchTerm, setSearchTerm] = useState('');
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);
	const servicesChat = new ServicesChat(URL_SERVICE || '', () => {});
	const shop = useSelector((state: RootState) => state.shop.shopInfo);

	const fetchDataCustomer = async () => {
		try {
			const response = await servicesChat.getCustomerChattedWithShop(shop?.shopId);
			console.log(response);
			setCustomers(response.data);
		} catch (error) {
			console.error('Error fetching customers:', error);
		}
	};
	const handleChat = (customer: any) => {
		if (customer.customerId && shop.shopId) {
			setSelectedCustomer(customer);
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
	useEffect(() => {
		fetchDataCustomer();
	}, []);
	const onSubmit = async (data: any) => {
		if (!data.message.trim()) return;
		if (selectedCustomer.customerId && shop.shopId) {
			const datasend = {
				customerId: selectedCustomer.customerId,
				shopId: shop.shopId,
				content: data.message,
				senderId: shop.shopId,
				senderType: 'SHOP',
			};

			try {
				const response = await servicesChat.createChat(datasend);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
		reset();
	};
	return (
		<div className="flex h-[85vh] container-base mt-10 bg-gray-50">
			{/* Sidebar */}
			<aside className="w-1/4 border-r bg-white p-4">
				<h2 className="text-xl font-semibold mb-4">Chats</h2>
				<Input placeholder="Search..." className="mb-4" />
				<ul className="space-y-3 overflow-auto h-[85%] pr-2">
					{customers.map((c: any, i: number) => (
						<li
							onClick={() => handleChat(c)}
							key={i}
							className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
						>
							<img src={c.avatar} alt={c.customerName} className="w-10 h-10 rounded-full object-cover" />
							<div>
								<p className="font-medium text-sm">{c.customerName}</p>
								{/* <p className="text-xs text-gray-500">{c.title}</p> */}
							</div>
							{/* <span className="ml-auto text-xs text-gray-400">{c.time}</span> */}
						</li>
					))}
				</ul>
			</aside>

			{/* Chat Window */}
			<main className="flex-1 flex flex-col">
				{selectedCustomer && (
					<div className="flex items-center justify-between border-b px-6 py-4 bg-white">
						<div className="flex items-center space-x-3">
							<img
								src={selectedCustomer.avatar}
								alt={selectedCustomer.customerName}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<div>
								<h3 className="font-medium">{selectedCustomer.customerName}</h3>
								<span className="text-xs text-green-500">● Online</span>
							</div>
						</div>
						<div className="flex items-center gap-4 text-gray-600">
							<FiMoreVertical className="w-5 h-5 cursor-pointer" />
						</div>
					</div>
				)}

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
					{chats.length === 0 ? (
						<p className="text-center text-gray-400">
							{/* Chưa có tin nhắn với {selectedCustomer.customerName} */}
						</p>
					) : (
						chats.map((msg: any) => (
							<div
								key={msg.messageId}
								className={`flex ${msg.senderType === 'SHOP' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
										msg.senderType === 'SHOP'
											? 'bg-blue-500 text-white'
											: 'bg-gray-200 text-gray-900'
									}`}
								>
									<p>{msg.content}</p>
									<p
										className={`text-[8px] leading-[8px] mt-1 ${
											msg.senderType === 'SHOP' ? 'text-white' : 'text-gray-600'
										}`}
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

				{/* Message Input */}
				<form onSubmit={handleSubmit(onSubmit)} className="p-4 border-t bg-white flex items-center gap-2">
					<Input placeholder="Type a message" {...register('message')} className="flex-1" />
					<Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
						<FiSend className="w-5 h-5" />
					</Button>
				</form>
			</main>
		</div>
	);
}
