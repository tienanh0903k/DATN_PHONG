/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from '@/utils/formatprice';
import { MessageSquare, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const OderList = ({ orderList }: any) => {
	console.log('orderList', orderList);
	const router = useRouter();
	const viewShop = (shopId: number) => {
		router.push(`/shop-infor/${shopId}`);
	};
	const handleProduct = (productId: number) => {
		router.push(`/product-detail/${productId}`);
	};

	return (
		<div className="space-y-4">
			{orderList.map((order: any) => (
				<div key={order.id} className="bg-white p-4 rounded-lg shadow">
					{/* Order Header */}
					<div className="flex justify-between items-center border-b pb-3 mb-3">
						<div className="flex items-center gap-3">
							<Store className="h-5 w-5 text-gray-600" />
							<span className="font-medium">{order.shopName}</span>
							<button className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200">
								<MessageSquare className="h-3 w-3" /> Chat
							</button>
							<button
								onClick={() => viewShop(order.shopId)}
								className="flex items-center gap-1 text-xs cursor-pointer border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
							>
								<Store className="h-3 w-3" /> View Shop
							</button>
						</div>
					</div>

					{order.BillDetail.map((item: any) => (
						<div key={item.productId} className="flex gap-4 mb-3">
							<Image
								src={item.ProductVariant.img}
								alt={item.ProductVariant.Products.productName}
								width={80}
								height={80}
								className="w-20 h-20 object-cover rounded border"
							/>
							<div className="flex-1">
								<p className="font-medium mb-1">{item.ProductVariant.Products.productName}</p>
								<p className="text-sm text-gray-600">
									Variation: {item.ProductVariant.VariantValue.typeValue}
								</p>
								<p className="text-sm text-gray-600">x{item.quantity}</p>
							</div>
							<div className="text-right">
								{item.totalPrice && (
									<span className="text-sm text-gray-500 line-through mr-2">
										{formatPrice(item.totalPrice)}
									</span>
								)}
								<span className="text-sm font-medium text-red-600 mb-1">
									{formatPrice(item.totalPrice)}
								</span>
							</div>
						</div>
					))}

					<p className="text-[16px] text-gray-500 mb-3">
						Hình thức thanh toán :<span className="font-medium text-red-600">{order.statusbill}</span>
					</p>

					{/* Order Footer */}
					<div className="flex justify-end items-center gap-4 border-t pt-3 mt-3">
						<div className="flex gap-2">
							<button className="bg-orange-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-medium">
								Mua lại
							</button>

							<button
								onClick={() => handleProduct(order.productId)}
								className="border border-gray-300 px-4 cursor-pointer py-2 rounded hover:bg-gray-100 text-sm"
							>
								Đánh giá
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default OderList;
