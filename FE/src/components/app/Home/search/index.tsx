/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductServices from '@/services/products/productServices';
import { URL_SERVICE } from '@/constant/constant';
import Products from '@/components/app/Home/Products';

export default function SearchComponent() {
	const searchParams = useSearchParams();
	const q = searchParams.get('q');
	const productServices = new ProductServices(URL_SERVICE || '', () => {});
	const [products, setProducts] = useState([]);
	const [sortType, setSortType] = useState('popular');

	const fetchDataProduct = async () => {
		if (q !== null) {
			try {
				const response: any = await productServices.searchProduct(q);
				setProducts(response.data);
			} catch (error) {
				console.log(error);
			}
		} else {
			console.log('Query parameter is null');
		}
	};

	const sortProducts = (products: any[], type: string) => {
		return products?.reduce((sorted: any[], current: any) => {
			const insertIndex = sorted.findIndex((item) => {
				switch (type) {
					case 'price-asc':
						return item.price > current.price;
					case 'price-desc':
						return item.price < current.price;
					case 'popular':
						return (item.rating || 0) < (current.rating || 0);
					default:
						return false;
				}
			});

			if (insertIndex === -1) {
				sorted.push(current);
			} else {
				sorted.splice(insertIndex, 0, current);
			}

			return sorted;
		}, []);
	};

	useEffect(() => {
		fetchDataProduct();
	}, [q]);

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortType(e.target.value);
	};

	const sortedProducts = sortProducts([...products], sortType);

	return (
		<div className="flex flex-col min-h-screen bg-gray-50">
			<div className="flex items-center justify-between px-4 mb-2">
				<div className="font-semibold">Sắp xếp</div>
				<select className="border rounded px-2 py-1" value={sortType} onChange={handleSortChange}>
					<option value="popular">Phổ biến</option>
					<option value="price-asc">Giá thấp đến cao</option>
					<option value="price-desc">Giá cao đến thấp</option>
				</select>
			</div>

			<div className="flex gap-6 px-4">
				{sortedProducts && sortedProducts.length > 0 ? (
					<Products products={sortedProducts} itemsPerRow={5} />
				) : (
					<div className="text-center py-8">
						<p className="text-[16px] text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
					</div>
				)}
			</div>
		</div>
	);
}
