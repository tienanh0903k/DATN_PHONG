/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatPrice } from '@/utils/formatprice';
import { Truck, Package } from 'lucide-react';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { URL_SERVICE } from '@/constant/constant';
import { Button, Select, Tag } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type OrderListProps = {
	orderList: any[];
	onStatusChange?: (orderId: number, newStatusId: number) => void;
};

interface StatusOrder {
	statusId: number;
	statusName: string;
}

const ListOrder = ({ orderList, onStatusChange }: OrderListProps) => {
	const [dataStatus, setDataStatus] = useState<StatusOrder[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const shopServices = new ShopServicer(URL_SERVICE, () => {});

	useEffect(() => {
		const total = orderList.reduce((total: number, order: any) => {
			const orderTotal = order.BillDetail.reduce((sum: number, item: any) => sum + (item.totalPrice || 0), 0);
			return total + orderTotal;
		}, 0);
		setTotalPrice(total);
	}, [orderList]);

	const fetchSTatusOrder = async () => {
		try {
			const response: any = await shopServices.getStatusOder();

			setDataStatus(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchSTatusOrder();
	}, []);

	const getStatusStyles = (statusId: number) => {
		switch (statusId) {
			case 1:
				return 'text-yellow-600';
			case 2:
				return 'text-blue-600';
			case 3:
				return 'text-purple-600';
			case 4:
				return 'text-green-600';
			case 5:
				return 'text-red-600';
			case 6:
				return 'text-orange-600';
			default:
				return 'text-gray-600';
		}
	};

	const getStatusTag = (statusId: number, statusName: string) => {
		const statusMap: { [key: number]: { color: string } } = {
			1: { color: 'gold' },
			2: { color: 'blue' },
			3: { color: 'purple' },
			4: { color: 'green' },
			5: { color: 'red' },
			6: { color: 'orange' },
		};

		const statusInfo = statusMap[statusId] || { color: 'default' };
		return <Tag color={statusInfo.color}>{statusName}</Tag>;
	};

	return (
		<div className="space-y-4">
			{orderList.map((order) => (
				<div key={order.billId} className="bg-white p-4 rounded-lg shadow">
					<div className="flex justify-between items-center border-b pb-3 mb-3">
						<div className="flex items-center gap-3">
							<Package className="h-5 w-5 text-gray-600" />
							<span className="font-medium">Đơn hàng #{order.billId}</span>
							{/* <span className="text-sm text-gray-500">
								{new Date(order.createdAt).toLocaleDateString('vi-VN')}
							</span> */}
						</div>
						<div className="flex items-center gap-4">
							<div
								className={`flex items-center gap-2 text-sm font-medium ${getStatusStyles(order.statusId)}`}
							>
								{order.deliveryStatus && <Truck className="h-4 w-4" />}
								{order.deliveryStatus}
								{order.deliveryStatus && order.statusId && <span className="text-gray-300">|</span>}
								{getStatusTag(order.statusId, order.statusName)}
							</div>
							{onStatusChange && (
								<Select
									defaultValue={order.statusId}
									style={{ width: 200 }}
									onChange={(value) => onStatusChange(Number(order.id), value)}
									options={dataStatus.map((status) => ({
										value: status.statusId,
										label: status.statusName,
									}))}
								/>
							)}
						</div>
					</div>

					{order.BillDetail.map((item: any) => (
						<div key={item.productId} className="flex gap-4 mb-3">
							<Image
								src={item.ProductVariant.img}
								alt={item.ProductVariant.id}
								width={80}
								height={80}
								className="w-20 h-20 object-cover rounded border"
							/>
							<div className="w-[20%]">
								<p className="font-medium mb-1">{item.ProductVariant.Products.productName}</p>
								<p className="text-sm text-gray-600">
									Phân loại: {item.ProductVariant.VariantValue.typeValue}
								</p>
								<p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
							</div>
							<div className="border-b pb-3 mb-3 flex-1">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<h4 className="font-medium mb-2">Thông tin khách hàng</h4>
										<p className="text-sm text-gray-600">
											Họ và Tên: {order.Customer?.customerName || 'Giấu tên'}
										</p>
										<p className="text-sm text-gray-600">
											SĐT: {order.Customer?.numberPhone || 'N/A'}
										</p>
										<p className="text-sm text-gray-600">Email: {order.Customer?.email || 'N/A'}</p>
									</div>
									<div>
										<h4 className="font-medium mb-2">Địa chỉ giao hàng</h4>
										<p className="text-sm text-gray-600">{order.address || 'N/A'}</p>
									</div>
								</div>
							</div>
							<div className="text-right">
								{item.totalPrice && (
									<span className="text-sm text-gray-500 line-through mr-2">
										{formatPrice(item.totalPrice)}
									</span>
								)}
								<span className="text-sm font-medium text-red-600">{formatPrice(item.totalPrice)}</span>
							</div>
						</div>
					))}

					{/* {order.statusId === 5 && order.cancellationReason && (
						<p className="text-sm text-gray-500 mb-3">Lý do hủy: {order.cancellationReason}</p>
					)} */}

					{/* Order Footer */}
					<div className="flex justify-between items-center border-t pt-3 mt-3">
						<div className="flex gap-2">
							<Button type="primary" size="small">
								Xem chi tiết
							</Button>
							<Button size="small">In đơn hàng</Button>
						</div>
						<div className="text-right">
							Tổng tiền:{' '}
							<span className="text-lg font-medium text-red-600">{formatPrice(totalPrice)}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default ListOrder;
