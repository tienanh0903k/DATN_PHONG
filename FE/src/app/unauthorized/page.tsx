import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Unauthorized = () => {
	return (
		<div
			className="flex flex-col items-center justify-center min-h-screen"
			style={{
				backgroundImage:
					"url('https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/bg-4.jpg')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				width: '100%',
				height: '100vh',
			}}
		>
			<h1 className="text-[120px] font-bold text-gray-800 mb-2 drop-shadow-lg">403</h1>
			<h2 className="text-[100px] font-semibold text-gray-700 mb-2 drop-shadow-lg">Forbidden</h2>
			<p className="text-gray-700 text-[20px] drop-shadow-lg mb-5">
				Quyền truy cập vào tài nguyên này trên máy chủ bị từ chối!
			</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
			>
				<IoArrowBack />
				Quay lại trang chủ
			</Link>
		</div>
	);
};

export default Unauthorized;
