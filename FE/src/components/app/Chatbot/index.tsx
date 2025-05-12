/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoMdSend } from 'react-icons/io';
import { FaRegFaceSmile } from 'react-icons/fa6';
import AiServices from '@/services/AiServices/AiServices';
import { URL_SERVICE } from '@/constant/constant';

interface Message {
	id: number;
	text: string;
	isAI: boolean;
	isHuman?: boolean;
}

const LoadingDots = () => {
	return (
		<div className="flex space-x-2 p-2">
			<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
			<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
			<div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
		</div>
	);
};

const Chatbot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState('');
	const [selectedSupport, setSelectedSupport] = useState<'ai' | 'human' | 'shop' | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const aiServices = new AiServices(URL_SERVICE, () => {});

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const formatMessage = (text: string) => {
		return text.split('\n').map((line, index) => (
			<span key={index}>
				{line}
				{index < text.split('\n').length - 1 && <br />}
			</span>
		));
	};

	const handleSendMessage = async () => {
		if (!inputMessage.trim()) return;

		const newUserMessage: Message = {
			id: Date.now(),
			text: inputMessage,
			isAI: false,
		};

		setMessages((prev) => [...prev, newUserMessage]);
		const currentInput = inputMessage;
		setInputMessage('');
		setIsLoading(true);

		try {
			const response: any = await aiServices.chat(currentInput);
			const aiText = response.reply;
			console.log(aiText);
			if (aiText) {
				const newAiMessage: Message = {
					id: Date.now() + 1,
					text: aiText.response,
					isAI: true,
				};
				setMessages((prev) => [...prev, newAiMessage]);
			} else {
				console.error('Could not extract AI response from:', response);
				const errorAiMessage: Message = {
					id: Date.now() + 1,
					text: 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn.',
					isAI: true,
				};
				setMessages((prev) => [...prev, errorAiMessage]);
			}
		} catch (error) {
			console.error('Error calling AI service:', error);
			const errorAiMessage: Message = {
				id: Date.now() + 1,
				text: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
				isAI: true,
			};
			setMessages((prev) => [...prev, errorAiMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSendMessage();
		}
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 ">
			{!isOpen ? (
				<button
					onClick={() => setIsOpen(true)}
					className="bg-[#0B74E5] text-white rounded-full p-4 flex items-center gap-2 cursor-pointer"
				>
					<img
						src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png"
						alt="Chatbot"
						className="w-6 h-6"
					/>
					Trợ lý AI
				</button>
			) : (
				<div className="bg-white rounded-lg shadow-lg w-[700px] h-[900px] flex flex-col">
					<div className="p-4 border-b flex justify-between items-center">
						<h3 className="font-medium">Trợ lý AI</h3>
						<button className="cursor-pointer" onClick={() => setIsOpen(false)}>
							<IoClose size={24} />
						</button>
					</div>
					{!selectedSupport && (
						<div className="p-4">
							<p className="text-center mb-4">Chọn trợ lý bạn muốn trò chuyện</p>
							<div className="flex justify-center gap-4">
								<button
									onClick={() => setSelectedSupport('ai')}
									className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
								>
									<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2 ">
										<img
											src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png"
											alt="AI"
											className="w-10 h-10"
										/>
									</div>
									<span>Hỏi Trợ lý AI</span>
								</button>
								<button
									onClick={() => setSelectedSupport('shop')}
									className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
								>
									<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
										<img src="/img/shop-avatar.png" alt="Shop" className="w-10 h-10" />
									</div>
									<span>Chat với Shop</span>
								</button>
								<button
									onClick={() => setSelectedSupport('human')}
									className="flex flex-col items-center p-4 border rounded-lg hover:border-blue-500 cursor-pointer"
								>
									<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
										<img src="/img/human-avatar.png" alt="Human" className="w-10 h-10" />
									</div>
									<span>Hỏi Trợ lý cá nhân</span>
								</button>
							</div>
						</div>
					)}

					{/* Chat Messages */}
					{selectedSupport && (
						<>
							<div className="flex-1 overflow-y-auto p-4">
								{messages.map((message, index: number) => (
									<div key={index} className={`flex mb-4 ${message.isAI ? '' : 'justify-end'}`}>
										{message.isAI && (
											<div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0">
												<img
													src={
														selectedSupport === 'ai'
															? 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png'
															: selectedSupport === 'shop'
																? '/img/shop-avatar.png'
																: '/img/human-avatar.png'
													}
													alt="Avatar"
													className="w-full h-full"
												/>
											</div>
										)}
										<div
											className={`max-w-[70%] p-3 rounded-lg ${
												message.isAI ? 'bg-gray-100' : 'bg-blue-500 text-white'
											}`}
										>
											{formatMessage(message.text)}
										</div>
									</div>
								))}
								{isLoading && (
									<div className="flex mb-4">
										<div className="w-8 h-8 rounded-full bg-blue-100 mr-2 flex-shrink-0">
											<img
												src={
													selectedSupport === 'ai'
														? 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png'
														: selectedSupport === 'shop'
															? '/img/shop-avatar.png'
															: '/img/human-avatar.png'
												}
												alt="Avatar"
												className="w-full h-full"
											/>
										</div>
										<div className="bg-gray-100 rounded-lg">
											<LoadingDots />
										</div>
									</div>
								)}
								<div ref={messagesEndRef} />
							</div>

							{/* Input Area */}
							<div className="p-4 border-t">
								<div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
									<FaRegFaceSmile className="text-gray-500 text-xl" />
									<input
										type="text"
										value={inputMessage}
										onChange={(e) => setInputMessage(e.target.value)}
										onKeyPress={handleKeyPress}
										placeholder="Nhập nội dung chat"
										className="flex-1 bg-transparent outline-none"
									/>
									<button onClick={handleSendMessage} className="text-blue-500 cursor-pointer">
										<IoMdSend size={20} />
									</button>
								</div>
								<div className="text-center text-xs text-gray-500 mt-2">
									Tích hợp trí tuệ nhân tạo, thông tin mang tính tham khảo
								</div>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Chatbot;
