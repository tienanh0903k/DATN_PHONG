/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useState } from 'react';
import { Table, Button, Image, message, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';

import ProductServices from '@/services/products/productServices';
import { URL_SERVICE } from '@/constant/constant';

const ListProducts = () => {
	const [products, setProducts] = useState([]);
	const [messageApi, messageContextHolder] = message.useMessage();
	const [statusFilter, setStatusFilter] = useState<string>('all');

	const productServices = new ProductServices(URL_SERVICE, () => {});
	const fetchProducts = async () => {
		const response = await productServices.getAllProductsAdmin();

		setProducts(response.data);
	};
	useEffect(() => {
		fetchProducts();
	}, []);
	const filteredProducts = products.filter((product: any) => {
		if (statusFilter === 'all') return true;
		return product.status === statusFilter;
	});
	const handleApprove = async (productId: number) => {
		try {
			await productServices.updateStatusProduct(productId, 'active');
			setProducts((prevProducts: any) =>
				prevProducts.map((product: any) =>
					product.productId === productId ? { ...product, status: 'active' } : product,
				),
			);
			messageApi.success('Đã duyệt sản phẩm');
		} catch (error) {
			console.log(error);
		}
	};
	const handleHide = async (productId: number) => {
		console.log(productId);
		try {
			await productServices.updateStatusProduct(productId, 'hidden');
			setProducts((prevProducts: any) =>
				prevProducts.map((product: any) =>
					product.productId === productId ? { ...product, status: 'hidden' } : product,
				),
			);
			messageApi.warning('Đã ẩn sản phẩm');
		} catch (error) {
			console.log(error);
		}
	};
	const columns: ColumnsType<any> = [
		{
			title: 'ID',
			dataIndex: 'productId',
			key: 'productId',
			align: 'center',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
		},
		{
			title: 'Danh mục',
			dataIndex: 'categoryName',
			key: 'categoryName',
			align: 'center',
		},
		{
			title: 'Shop',
			dataIndex: 'shopName',
			key: 'shopName',
			align: 'center',
			render: (shopName: string, record: any) => (
				<div>
					<strong>{shopName}</strong>
					<br />
					<small>{record.shopEmail}</small>
				</div>
			),
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'img',
			key: 'img',
			width: 100,
			align: 'center',
			render: (img: string) =>
				img ? <Image src={img} alt="Hình ảnh" width={60} height={60} /> : <span>Không có ảnh</span>,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			render: (status: string) => {
				let color = 'gray';
				let text = 'Chưa xác định';

				switch (status) {
					case 'pending':
						color = 'orange';
						text = 'Chờ duyệt';
						break;
					case 'active':
						color = 'green';
						text = 'Đang hiển thị';
						break;
					case 'hidden':
						color = 'red';
						text = 'Đã ẩn';
						break;
				}

				return <span style={{ color }}>{text}</span>;
			},
		},
		{
			title: 'Hành động',
			key: 'action',

			render: (_: any, record: any) => (
				<div className="flex gap-2">
					<Button
						className="text-blue-500 hover:underline cursor-pointer"
						type="primary"
						onClick={() => handleApprove(record.productId)}
					>
						Duyệt
					</Button>
					<Button
						className="text-yellow-500 hover:underline cursor-pointer"
						type="default"
						color="yellow"
						onClick={() => handleHide(record.productId)}
					>
						Ẩn
					</Button>
				</div>
			),
		},
	];
	return (
		<div className="">
			{messageContextHolder}
			<h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
			<div className="mb-4 flex items-center gap-2">
				<span className="font-medium">Lọc theo trạng thái:</span>
				<Select
					value={statusFilter}
					style={{ width: 200 }}
					onChange={(value: string) => setStatusFilter(value)}
					options={[
						{ label: 'Tất cả', value: 'all' },
						{ label: 'Chờ duyệt', value: 'pending' },
						{ label: 'Đang hiển thị', value: 'active' },
						{ label: 'Đã ẩn', value: 'hidden' },
					]}
				/>
			</div>
			<Table
				columns={columns}
				rowKey="productId"
				dataSource={filteredProducts}
				pagination={{ pageSize: 7 }}
				expandable={{
					expandedRowRender: (record) => (
						<div className="p-4">
							{/* Mô tả sản phẩm */}
							<h3 className="font-bold mb-2">Mô tả sản phẩm:</h3>
							<div
								className="prose max-w-none mb-4"
								dangerouslySetInnerHTML={{ __html: record.productDes }}
							/>

							{/* Biến thể sản phẩm */}
							<h3 className="font-bold mb-2">Các biến thể sản phẩm:</h3>
							{record.ProductVariant && record.ProductVariant.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{record.ProductVariant.map((variant: any, index: number) => (
										<div
											key={variant.id}
											className="border p-3 rounded shadow-sm flex items-center gap-4"
										>
											<img
												src={variant.img}
												alt={`Biến thể ${index + 1}`}
												className="w-20 h-20 object-cover rounded"
											/>
											<div>
												<p>
													<strong>Mã biến thể:</strong> {variant.id}
												</p>
												<p>
													<strong>Số lượng:</strong> {variant.quantity}
												</p>
												<p>
													<strong>Loại:</strong> {variant.VariantValue.typeValue}
												</p>
											</div>
										</div>
									))}
								</div>
							) : (
								<p className="text-gray-500">Không có biến thể nào.</p>
							)}
						</div>
					),
					rowExpandable: (record) =>
						record.productDes !== '' || (record.ProductVariant && record.ProductVariant.length > 0),
				}}
			/>
		</div>
	);
};

export default ListProducts;
