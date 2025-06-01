/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import SwiperComponents from '@/components/app/Home/swiper';
import Trending from '@/components/app/Home/trending';
import ProductServices from '@/services/products/productServices';
import { URL_SERVICE } from '@/constant/constant';
import { Pagination } from 'antd';
const Products = dynamic(() => import('@/components/app/Home/Products'), {
	ssr: true,
});

export default function Home() {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 10;
	const productService = new ProductServices(URL_SERVICE, () => {});
	const fetchDataProduct = async () => {
		try {
			const response = await productService.getAllProducts();
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
	useEffect(() => {
		fetchDataProduct();
	}, []);

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentProducts = products.slice(startIndex, endIndex);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="">
			<SwiperComponents />
			<Trending />
			<div className="flex gap-6 h-[760px]">
				<Products products={currentProducts} />
			</div>
			<div className="mt-4">
				<Pagination
					align="center"
					current={currentPage}
					pageSize={pageSize}
					total={products.length}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
