/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ConfigProvider } from 'antd';

import { formatPrice } from '@/utils/formatprice';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductSkeleton from './ProductSkeleton';

const Products = (products: any) => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1500);

		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return (
			<div className="w-full flex gap-2 flex-wrap mr-[-16px] mt-6">
				{[...Array(12)].map((_, index) => (
					<ProductSkeleton key={`skeleton-${index}`} />
				))}
			</div>
		);
	}

	return (
		<div className="w-full flex gap-2 flex-wrap mr-[-16px] mt-6">
			{products.products.map((item: any, index: number) => (
				<Link key={index} href={`/productdetail/${item.productId}`} className="w-[16%] flex gap-2 ">
					<div className=" cursor-pointer flex-wrap mr-[-16px] mt-6  border-[1px] overflow-hidden border-solid border-[#ebebf0] bg-white rounded-[8px]">
						<div className="">
							<img src={item.img} alt={item.categoryName} className="w-[180px] h-[180px] shadow" />
						</div>
						<div className="p-2">
							<div className="h-[68px]">
								<h3 className="text-[14px] font-[400] leading-[150%] overflow-hidden line-clamp-2 ">
									{item.productName}
								</h3>
								<ConfigProvider
									theme={{
										components: {
											Rate: {
												starSize: 10,
											},
										},
									}}
								>
									{/* <Rate className="h-[18px] " disabled defaultValue={item.rating} /> */}
								</ConfigProvider>
							</div>
							<p className="text-[16px] text-[#ff424e] font-[600] text-left leading-[150%] ">
								{formatPrice(item.price)}
							</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Products;
