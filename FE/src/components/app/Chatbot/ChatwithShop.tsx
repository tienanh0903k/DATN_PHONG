/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BsCardImage } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
type Props = {
	handleClose: () => void;
};
const shops = [
	{
		id: 1,
		name: 'Dacotours',
		avatar: 'https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/a2b2c31ea7b0ad4b2e7d0e6ef817241b.png',
	},
	{
		id: 2,
		name: 'Vinatour',
		avatar: 'https://cdn-icons-png.flaticon.com/512/1995/1995526.png',
	},
];

const ChatwithShop = ({ handleClose }: Props) => {
	const [selectedShop, setSelectedShop] = useState(shops[0]);
	// const [message, setMessage] = useState('');

	const { register, handleSubmit, reset } = useForm<any>();

	const onSubmit = (data: any) => {
		if (!data.message.trim()) return;

		console.log(`Gửi đến ${selectedShop.name}:`, data.message);

		// Reset input field sau khi gửi
		reset();
	};
	return (
		<div className="flex h-[500px] w-[700px] border rounded shadow bg-white overflow-hidden">
			{/* Sidebar - Danh sách shop */}
			<div className="w-1/3 border-r">
				<div className="p-3 border-b">
					<input
						type="text"
						placeholder="Tìm theo người dùng..."
						className="w-full px-3 py-2 border rounded text-sm"
					/>
				</div>
				<div className="overflow-y-auto">
					{shops.map((shop) => (
						<div
							key={shop.id}
							onClick={() => setSelectedShop(shop)}
							className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
								selectedShop.id === shop.id ? 'bg-gray-100' : ''
							}`}
						>
							<img src={shop.avatar} alt={shop.name} className="w-8 h-8 rounded-full" />
							<span className="text-sm">{shop.name}</span>
						</div>
					))}
				</div>
			</div>

			<div className="flex-1 flex flex-col">
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<div className="flex items-center gap-2">
						<img src={selectedShop.avatar} alt="Shop" className="w-8 h-8 rounded-full" />
						<span className="font-semibold text-sm">{selectedShop.name}</span>
					</div>
					<button onClick={handleClose} className="text-gray-500 text-xl cursor-pointer">
						<IoMdClose />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4 text-center text-gray-400">
					<p>Chưa có tin nhắn với {selectedShop.name}</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="flex items-center px-3 py-2 border-t">
					<button type="button" className="text-xl text-gray-500 hover:text-blue-500">
						<BsCardImage />
					</button>
					<input
						{...register('message')}
						type="text"
						placeholder="Nhập nội dung chat..."
						className="flex-1 mx-2 px-3 py-2 border border-gray-300 rounded-full text-sm outline-none focus:border-blue-500"
					/>
					<button type="submit" className="text-xl text-blue-500 hover:text-blue-600">
						<IoMdSend />
					</button>
				</form>
			</div>
		</div>
	);
};

export default ChatwithShop;
