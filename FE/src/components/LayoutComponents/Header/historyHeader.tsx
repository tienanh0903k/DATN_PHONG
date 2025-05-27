'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type Product = {
	productId: number;
	productName: string;
	img: string;
};

type Props = {
	products: Product[];
	searchValue: string;
};

const HistoryHeader = ({ products, searchValue }: Props) => {
	const [isShowMore, setIsShowMore] = useState(true);
	const [numberItemShow, setNumberItemShow] = useState(3);

	const filteredProducts = products?.filter(
		(product) => searchValue?.length >= 3 && product?.productName.toLowerCase().includes(searchValue.toLowerCase()),
	);

	const handleShowMore = () => {
		setIsShowMore(false);
		setNumberItemShow(filteredProducts.length);
	};

	const handleCollapse = () => {
		setIsShowMore(true);
		setNumberItemShow(3);
	};

	if (!searchValue || filteredProducts.length === 0) {
		return null;
	}

	return (
		<>
			<div className="fixed top-[var(--height-header)] left-0 bottom-0 right-0 bg-black/53 z-[1] animate-fadeIn" />

			<div className="absolute min-h-[300px] top-[calc(100%-1px)] left-0 list-none bg-white rounded-b-[3px] border-t border-[#e1e1e1] shadow-[0_6px_12px_0_rgba(0,0,0,0.28)] w-full z-[999] animate-fadeIn">
				<div>
					{filteredProducts.slice(0, numberItemShow).map((item, index: number) => (
						<Link
							href={`/productdetail/${item.productId}`}
							key={index}
							className="text-[#27272a] text-[14px] leading-[150%] h-fit font-medium py-2 flex items-center px-4 hover:bg-[#27272a]/12"
						>
							<Image
								src={item.img}
								alt={item.productName}
								width={60}
								height={60}
								className="w-[60px] h-[60px]"
							/>
							<div className="text-[#242424] text-[15px] leading-5 font-medium ml-2">
								{item.productName}
							</div>
						</Link>
					))}
				</div>

				{filteredProducts.length > 3 && (
					<div className="text-xs leading-[1.67] flex justify-center items-center text-[#0d5cb6]">
						<div className="flex p-[6px_16px] items-center cursor-pointer select-none">
							{isShowMore ? (
								<div onClick={handleShowMore} className="flex items-center">
									Xem thêm
								</div>
							) : (
								<div onClick={handleCollapse} className="flex items-center">
									Thu gọn
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default HistoryHeader;
