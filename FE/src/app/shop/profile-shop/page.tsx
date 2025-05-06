/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Tabs, Card, Statistic, Row, Col, Button } from 'antd';
import { ShoppingOutlined, StarOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
// import Products from '@/components/app/Home/Products';
import ListProduct from '@/components/app/shop/listproduct';
import ListOder from '@/components/app/shop/listOder';
import ProductServices from '@/services/prouduct/productServices';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { useEffect, useState } from 'react';
import { URL_SERVICE } from '@/constant/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProfileShop = () => {
	const shop = useSelector((state: RootState) => state.shop.shopInfo);
	const [orderList, setOrderList] = useState([]);
	const router = useRouter();
	const [products, setProducts] = useState([]);
	const productService = new ProductServices(URL_SERVICE, () => {});
	const shopService = new ShopServicer(URL_SERVICE, () => {});
	const fetchDataProduct = async () => {
		try {
			const response = await productService.getProductByShopId(shop?.shopId);
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
	const fetchDataOrder = async () => {
		try {
			const response = await shopService.getOrderListByShopId(shop?.shopId);
			setOrderList(response.data);
		} catch (error) {
			console.error('Error fetching orders:', error);
		}
	};
	const fetchOrderByStatus = async (status: number) => {
		const data: any = {
			status,
			shopId: shop?.shopId,
		};
		try {
			const response: any = await shopService.getOderbyStatus(data);
			console.log('data oder', response.data);
			setOrderList(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		fetchDataProduct();
		fetchDataOrder();
	}, [shop?.shopId]);
	const handleStatusChange = (newStatus: number) => {
		console.log(newStatus);
		fetchOrderByStatus(newStatus);
	};
	return (
		<div className="container-base p-6">
			<Card className="mb-6">
				<div className="relative">
					<div className="h-48 bg-gray-200 rounded-t-lg">
						{shop?.shopBanner && (
							<img
								src={shop.shopBanner}
								alt="Shop Banner"
								className="w-full h-full object-cover rounded-t-lg"
							/>
						)}
					</div>

					<div className="flex items-start px-6 -mt-12">
						<div className="w-[96px] h-[96px] rounded-full border-4 border-white overflow-hidden bg-gray-100">
							<Image
								width={96}
								height={96}
								src={shop?.shopAvatar}
								alt="Shop Avatar"
								className="object-cover"
							/>
						</div>
						<div className="ml-6 mt-12">
							<h1 className="text-2xl font-bold">{shop?.shopName}</h1>
							<p className="text-gray-600">{shop?.shopAddress}</p>
						</div>
					</div>
				</div>

				{/* Statistics */}
				<Row gutter={16} className="mt-6">
					<Col span={8}>
						<Statistic
							title="Tổng sản phẩm"
							value={shop?.totalProduct || 0}
							prefix={<ShoppingOutlined />}
						/>
					</Col>
					<Col span={8}>
						<Statistic title="Tổng doanh số" value={shop?.totalSales || 0} prefix="₫" />
					</Col>
					<Col span={8}>
						<Statistic title="Đánh giá" value={4.5} prefix={<StarOutlined />} />
					</Col>
				</Row>
			</Card>

			<Tabs
				defaultActiveKey="1"
				items={[
					{
						key: '1',
						label: 'Tất cả sản phẩm',
						children: (
							<Card>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold mb-4">Danh sách sản phẩm</h3>
									<Button onClick={() => router.push('/shop/create-product')} icon={<PlusOutlined />}>
										Thêm sản phẩm
									</Button>
								</div>
								<ListProduct products={products} />
							</Card>
						),
					},
					{
						key: '2',
						label: 'Thông tin cửa hàng',
						children: (
							<Card>
								<div className="space-y-4">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-semibold">Thông tin liên hệ</h3>
											<p>Email: {shop?.emailShop}</p>
											<p>Số điện thoại: {shop?.shopNumberPhone}</p>
										</div>
										<Button
											type="primary"
											icon={<EditOutlined />}
											onClick={() => router.push('/shop/update-shop')}
										>
											Chỉnh sửa
										</Button>
									</div>
									<div>
										<h3 className="font-semibold">Địa chỉ</h3>
										<p>{shop?.shopAddress}</p>
									</div>
								</div>
							</Card>
						),
					},
					{
						key: '3',
						label: 'Lịch sử đơn hàng',
						children: (
							<Card>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold mb-4">Danh sách đơn hàng</h3>
								</div>

								<ListOder orderList={orderList} onStatusChange={handleStatusChange} />
							</Card>
						),
					},
					{
						key: '4',
						label: 'Đánh giá',
						children: <div>Danh sách đánh giá</div>,
					},
				]}
			/>
		</div>
	);
};

export default ProfileShop;
