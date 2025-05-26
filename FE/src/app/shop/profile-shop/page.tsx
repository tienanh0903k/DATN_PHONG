/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Tabs, Card, Statistic, Row, Col, Button } from 'antd';
import { ShoppingOutlined, StarOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
// import Products from '@/components/app/Home/Products';
import ListProduct from '@/components/app/shop/listproduct';
import ProductServices from '@/services/products/productServices';
import { useEffect, useState } from 'react';
import { URL_SERVICE } from '@/constant/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ShopServicer from '@/services/shopServicer/shopServicer';

const ProfileShop = () => {
	const shop = useSelector((state: RootState) => state.shop.shopInfo);

	const router = useRouter();
	const [products, setProducts] = useState([]);
	const [countProduct, setCountProduct] = useState(0);
	const [totalSales, setTotalSales] = useState(0);
	const [averageRating, setAverageRating] = useState<any>(0);
	const productService = new ProductServices(URL_SERVICE, () => {});
	const shopServicer = new ShopServicer(URL_SERVICE, () => {});

	const fetchDataProduct = async () => {
		try {
			const response = await productService.getProductByShopId(shop?.shopId);
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchDataProduct();
	}, [shop?.shopId]);

	useEffect(() => {
		const fetchCountProduct = async () => {
			try {
				const response = await shopServicer.getCountProductByShopId(shop?.shopId);
				console.log(response);
				setCountProduct(response.data);
			} catch (error) {
				console.error('Error fetching count product:', error);
			}
		};
		fetchCountProduct();
	}, [shop?.shopId]);

	useEffect(() => {
		const fetchTotalSales = async () => {
			try {
				const response = await shopServicer.getTotalSalesAmount(shop?.shopId);
				setTotalSales(response.data);
			} catch (error) {
				console.error('Error fetching total sales:', error);
			}
		};
		fetchTotalSales();
	}, [shop?.shopId]);

	useEffect(() => {
		const fetchAverageRating = async () => {
			try {
				const response = await shopServicer.getAverageRating(shop?.shopId);
				console.log(response);
				setAverageRating(response.data);
			} catch (error) {
				console.error('Error fetching average rating:', error);
			}
		};
		fetchAverageRating();
	}, [shop?.shopId]);

	return (
		<div className="container-base p-6">
			<Card className="mb-6">
				<div className="relative">
					<div className="h-56 bg-gray-200 rounded-t-lg">
						{shop?.shopBanner && (
							<img
								src={shop.shopBanner}
								alt="Shop Banner"
								className="w-full h-full object-cover rounded-t-lg"
							/>
						)}
					</div>

					<div className="flex items-start px-6 -mt-12">
						<div className="w-[116px] h-[116px] rounded-full border-4 border-white overflow-hidden bg-gray-100">
							<Image
								width={116}
								height={116}
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
						<Statistic title="Tổng sản phẩm" value={countProduct || 0} prefix={<ShoppingOutlined />} />
					</Col>
					<Col span={8}>
						<Statistic title="Tổng doanh số" value={totalSales || 0} prefix="₫" />
					</Col>
					<Col span={8}>
						<Statistic
							title="Đánh giá"
							value={averageRating.averageRating || 0}
							prefix={<StarOutlined />}
						/>
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
											<h3 className="font-semibold text-2xl">Thông tin liên hệ</h3>
											<p className="text-lg">Email: {shop?.emailShop}</p>
											<p className="text-lg">Số điện thoại: {shop?.shopNumberPhone}</p>
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
										<h3 className="font-semibold text-2xl">Địa chỉ</h3>
										<p className="text-lg">{shop?.shopAddress}</p>
									</div>
								</div>
							</Card>
						),
					},
				]}
			/>
		</div>
	);
};

export default ProfileShop;
