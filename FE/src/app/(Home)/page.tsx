/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import SwiperComponents from '@/components/app/Home/swiper';
import Trending from '@/components/app/Home/trending';
import ProductServices from '@/services/products/productServices';
import { URL_SERVICE } from '@/constant/constant';

const Products = dynamic(() => import('@/components/app/Home/Products'), {
	ssr: true,
});

export default function Home() {
	const [products, setProducts] = useState([]);
	const productService = new ProductServices(URL_SERVICE, () => {});
	const fetchDataProduct = async () => {
		try {
			const response = await productService.getProductByShopId(1);

			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
	useEffect(() => {
		fetchDataProduct();
	}, []);
	return (
		<div className="">
			<SwiperComponents />
			<Trending />
			<div className="flex gap-6">
				<Products products={products} />
			</div>
		</div>
	);
}
