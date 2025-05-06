import { formatPrice } from '@/utils/formatprice';
import { Truck, MessageSquare, Store } from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	productId: number;
	name: string;
	variation: string;
	quantity: number;
	imageUrl: string;
	originalPrice?: number;
	currentPrice: number;
}

interface Order {
	id: string | number;
	sellerName: string;
	sellerId: string;
	items: OrderItem[];
	status: 'CANCELLED' | 'COMPLETED' | 'PROCESSING' | string;
	orderTotal: number;
	cancellationReason?: string;
	deliveryStatus?: string;
}

type OderListProps = {
	orderList: Order[];
};

const OderList = ({ orderList }: OderListProps) => {
	const getStatusStyles = (status: string) => {
		switch (status.toUpperCase()) {
			case 'CANCELLED':
				return 'text-red-500';
			case 'COMPLETED':
				return 'text-green-600';

			default:
				return 'text-gray-600';
		}
	};

	return (
		<div className="space-y-4">
			{orderList.map((order) => (
				<div key={order.id} className="bg-white p-4 rounded-lg shadow">
					{/* Order Header */}
					<div className="flex justify-between items-center border-b pb-3 mb-3">
						<div className="flex items-center gap-3">
							<Store className="h-5 w-5 text-gray-600" />
							<span className="font-medium">{order.sellerName}</span>
							<button className="flex items-center gap-1 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded hover:bg-orange-200">
								<MessageSquare className="h-3 w-3" /> Chat
							</button>
							<button className="flex items-center gap-1 text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
								<Store className="h-3 w-3" /> View Shop
							</button>
						</div>
						<div className={`flex items-center gap-2 text-sm font-medium ${getStatusStyles(order.status)}`}>
							{order.deliveryStatus && <Truck className="h-4 w-4" />}
							{order.deliveryStatus}
							{order.deliveryStatus && order.status && <span className="text-gray-300">|</span>}
							{order.status.toUpperCase()}
						</div>
					</div>

					{/* Order Items */}
					{order.items.map((item) => (
						<div key={item.productId} className="flex gap-4 mb-3">
							<Image
								src={item.imageUrl}
								alt={item.name}
								width={80}
								height={80}
								className="w-20 h-20 object-cover rounded border"
							/>
							<div className="flex-1">
								<p className="font-medium mb-1">{item.name}</p>
								<p className="text-sm text-gray-600">Variation: {item.variation}</p>
								<p className="text-sm text-gray-600">x{item.quantity}</p>
							</div>
							<div className="text-right">
								{item.originalPrice && (
									<span className="text-sm text-gray-500 line-through mr-2">
										{formatPrice(item.originalPrice)}
									</span>
								)}
								<span className="text-sm font-medium text-red-600">
									{formatPrice(item.currentPrice)}
								</span>
							</div>
						</div>
					))}

					{/* Cancellation Reason (if applicable) */}
					{order.status.toUpperCase() === 'CANCELLED' && order.cancellationReason && (
						<p className="text-sm text-gray-500 mb-3">Cancelled by: {order.cancellationReason}</p>
					)}

					{/* Order Footer */}
					<div className="flex justify-end items-center gap-4 border-t pt-3 mt-3">
						<div className="text-right">
							Order Total:{' '}
							<span className="text-lg font-medium text-red-600">{formatPrice(order.orderTotal)}</span>
						</div>
						<div className="flex gap-2">
							<button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm font-medium">
								Buy Again
							</button>
							{order.status.toUpperCase() === 'CANCELLED' && (
								<button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm">
									View Cancellation Details
								</button>
							)}
							<button className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 text-sm">
								Contact Seller
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default OderList;
