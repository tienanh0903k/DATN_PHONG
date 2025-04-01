'use client';
import { Rate, ConfigProvider } from 'antd';
import products from '@/mocks/products.json';
import { formatPrice } from '@/utils/formatprice';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProductSkeleton from './ProductSkeleton';
import Image from 'next/image';
const Products = () => {
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
		<Link href={`/productdetail`} className="w-full flex gap-2 flex-wrap mr-[-16px] mt-6">
			{products.products.map((item, index) => (
				<div
					key={index}
					className="w-[16%] cursor-pointer  border-[1px] overflow-hidden border-solid border-[#ebebf0] bg-white rounded-[8px]"
				>
					<div className="">
						<Image src={item.image} alt={item.name} width={180} height={180} />
					</div>
					<div className="p-2">
						<div className="h-[68px]">
							<h3 className="text-[14px] font-[400] leading-[150%] overflow-hidden line-clamp-2 ">
								{item.name}
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
								<Rate className="h-[18px] " disabled defaultValue={item.rating} />
							</ConfigProvider>
						</div>
						<p className="text-[16px] text-[#ff424e] font-[600] text-left leading-[150%] ">
							{formatPrice(item.price)}
						</p>
					</div>
				</div>
			))}
		</Link>
	);
};

export default Products;
