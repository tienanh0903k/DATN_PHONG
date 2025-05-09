/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { URL_SERVICE } from '@/constant/constant';
import { useParams } from 'next/navigation';
import Products from '@/components/app/Home/Products';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function ShopInfoPage() {
	const [dataShop, setDataShop] = useState<any>([]);
	const user = useSelector((state: RootState) => state.auth.userInfo);
	console.log(user);
	const shopServicer = new ShopServicer(URL_SERVICE, () => {});
	const { shopId } = useParams();
	const fetchDataShop = async () => {
		try {
			const response: any = await shopServicer.getShopById(Number(shopId));
			console.log(response);
			setDataShop(response.data);
		} catch (err: any) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchDataShop();
	}, [shopId]);

	return (
		<div className="bg-[#f5f5f5] min-h-screen">
			<div className="container mx-auto py-6 flex flex-col items-center">
				<div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center w-full max-w-4xl">
					<div className="flex items-center gap-4 flex-1">
						<img src={dataShop.shopAvatar} alt="Shop Avatar" className="w-24 h-24 rounded-full border" />
						<div>
							<h2 className="text-2xl font-bold">{dataShop.shopName}</h2>
							<div className="text-sm text-gray-500">Active 1 minute ago</div>
							<div className="mt-2 flex gap-2">
								<button className="bg-white border px-4 py-1 rounded font-semibold cursor-pointer">
									+ Follow
								</button>
								<button className="bg-[#6d2323] text-white px-4 py-1 rounded font-semibold cursor-pointer">
									Chat
								</button>
							</div>
						</div>
					</div>

					<div className="flex-1 grid grid-cols-2 gap-2 text-sm mt-4 md:mt-0">
						<div>
							Products: <span className="font-bold">{dataShop.productCount}</span>
						</div>
						<div>
							Followers: <span className="font-bold">{dataShop.followerCount}</span>
						</div>
						<div>
							Following: <span className="font-bold">3</span>
						</div>
						<div>
							Rating: <span className="font-bold text-orange-500">{dataShop.totalRatings}</span> (20,2k
							Rating)
						</div>
						<div>
							Chat Performance: <span className="font-bold text-green-600">100% (Within Hours)</span>
						</div>
						<div>
							Joined: <span className="font-bold">32 Months Ago</span>
						</div>
					</div>
				</div>
			</div>

			{/* Thanh điều hướng */}
			<div className="container mx-auto">
				<div className="bg-white rounded shadow flex gap-8 px-8 py-3 font-semibold text-gray-700">
					<div className="border-b-2 border-red-500 pb-2 text-red-500">Home</div>
					<div>All Products</div>
					<div>Hàng Mới Về</div>
					<div>Top Sản Phẩm Bán Chạy</div>
					<div>Giảm giá</div>
					<div>Áo thun</div>
					<div>More</div>
				</div>
			</div>

			{/* Voucher */}
			<div className="container mx-auto mt-4">
				<div className="bg-white rounded shadow p-4 flex gap-4 overflow-x-auto">
					{/* Lặp qua danh sách voucher */}
					{[1, 2, 3, 4].map((v, i) => (
						<div key={i} className="border border-red-200 bg-red-50 rounded p-4 min-w-[220px]">
							<div className="text-red-500 font-bold mb-2">₫10k off</div>
							<div className="text-xs mb-2">Min. Spend ₫89k</div>
							<button className="bg-red-500 text-white px-4 py-1 rounded">Claim</button>
							<div className="text-xs text-gray-400 mt-2">Valid Till: 14.05.2025</div>
						</div>
					))}
				</div>
			</div>

			{/* Sản phẩm gợi ý */}
			<div className="container mx-auto mt-6">
				<div className="flex justify-between items-center mb-2">
					<h3 className="font-bold text-lg">RECOMMENDED FOR YOU</h3>
					<a href="#" className="text-red-500 text-sm font-semibold">
						See All &gt;
					</a>
				</div>
				<div className="flex gap-6 px-4">
					{dataShop.productByShop && dataShop.productByShop.length > 0 ? (
						<Products products={dataShop.productByShop} itemsPerRow={5} />
					) : (
						<div className="text-center py-8">
							<p className="text-[16px] text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
