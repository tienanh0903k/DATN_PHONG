/* eslint-disable @next/next/no-img-element */
'use client';
import { useState } from 'react';

import { MdMessage } from 'react-icons/md';
import ChatwithAI from './ChatwithAI';
import ChatwithShop from './ChatwithShop';

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [typeChat, setTypeChat] = useState<number>(1);
	const handleOpenChat = (type: number) => {
		setTypeChat(type);
		setIsOpen(true);
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 ">
			{!isOpen ? (
				<div className="flex flex-col rounded-[12px] overflow-hidden gap-[1px]">
					<div
						onClick={() => handleOpenChat(1)}
						className="bg-[#0B74E5] text-white  flex-col items-center text-center justify-center py-4 px-[6px] gap-2 cursor-pointer"
					>
						<MdMessage size={24} className="mx-auto" />

						<p>Tin mới</p>
					</div>
					<div
						onClick={() => handleOpenChat(2)}
						className="bg-[#0B74E5] text-white text-center flex-col items-center justify-center py-4 px-[6px] gap-2 cursor-pointer"
					>
						<img
							src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png"
							alt="Chatbot"
							className="w-6 h-6 mx-auto"
						/>
						<p>Trợ lý</p>
					</div>
				</div>
			) : typeChat === 1 ? (
				<ChatwithShop handleClose={() => setIsOpen(false)} />
			) : (
				<ChatwithAI handleClose={() => setIsOpen(false)} />
			)}
		</div>
	);
};

export default Chatbot;
