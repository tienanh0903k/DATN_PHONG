/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Định nghĩa type
type SuggestSearchType = {
	id: number;
	to: string;
	name: string;
	thumbnail?: string;
};

// Import images (giả sử các hình ảnh được lưu trong thư mục public/images)
const images = {
	search2: '/images/search2.png',
	noImage: '/images/no-image.png',
	trend: '/images/trend.png',
	trend1: '/images/trend1.png',
	trend2: '/images/trend2.png',
	trend3: '/images/trend3.png',
	trend4: '/images/trend4.png',
	trend5: '/images/trend5.png',
	trend6: '/images/trend6.png',
	category1: '/images/category1.png',
	category2: '/images/category2.png',
	category3: '/images/category3.png',
	category4: '/images/category4.png',
	category5: '/images/category5.png',
	category6: '/images/category6.png',
	category7: '/images/category7.png',
	category8: '/images/category8.png',
	huggies: '/images/huggies.png',
};

// Data mẫu
const SEARCH_SUGGEST: SuggestSearchType[] = [
	{ id: 0, to: '/', name: 'tai nghe bluetooth' },
	{ id: 1, to: '/', name: 'xứ sở miên man' },
	{ id: 2, to: '/', name: 'một đời như kẻ tìm đường' },
	{ id: 3, to: '/', name: 'huggies', thumbnail: images.huggies },
	{ id: 4, to: '/', name: 'cây cam ngọt của tôi' },
	{ id: 5, to: '/', name: 'muôn kiếp nhân sinh' },
	{ id: 6, to: '/', name: 'iphone 14 pro max' },
	{ id: 7, to: '/', name: 'muôn kiếp nhân sinh 3' },
	{ id: 8, to: '/', name: 'friso gold 4' },
];

const TrendingSearch: SuggestSearchType[] = [
	{ id: 0, to: '/', thumbnail: images.trend1, name: 'túi đựng laptop' },
	{ id: 1, to: '/', thumbnail: images.trend3, name: 'iphone 14' },
	{ id: 2, to: '/', thumbnail: images.trend2, name: 'sữa ensure' },
	{ id: 3, to: '/', thumbnail: images.trend5, name: 'dielac alpha 4' },
	{ id: 4, to: '/', thumbnail: images.trend4, name: 'muong an yaua' },
	{ id: 5, to: '/', thumbnail: images.trend6, name: 'bao laptop 14 inch' },
];

const Categories: SuggestSearchType[] = [
	{ id: 0, to: '/', thumbnail: images.category1, name: 'Đồ Chơi - Mẹ & Bé' },
	{ id: 1, to: '/', thumbnail: images.category2, name: 'Túi chống sốc' },
	{ id: 2, to: '/', thumbnail: images.category3, name: 'Điện thoại Smartphone' },
	{ id: 3, to: '/', thumbnail: images.category4, name: 'Sữa cho bé trên 24 tháng' },
	{ id: 4, to: '/', thumbnail: images.category5, name: 'Balo, cặp, túi chống sốc laptop' },
	{ id: 5, to: '/', thumbnail: images.category6, name: 'Balo và Vali' },
	{ id: 6, to: '/', thumbnail: images.category7, name: 'Đũa, muỗng, nĩa' },
	{ id: 7, to: '/', thumbnail: images.category8, name: 'Điện Thoại - Máy Tính Bảng' },
];

const HistoryHeader = ({ data }: { data: any }) => {
	const [isShowMore, setIsShowMore] = useState(true);
	const [numberItemShow, setNumberItemShow] = useState(3);
	const [searchSuggestList, setSearchSuggestList] = useState<SuggestSearchType[]>([]);
	const [trendSuggestList, setTrendSuggestList] = useState<SuggestSearchType[]>([]);
	const [categoryList, setCategoryList] = useState<SuggestSearchType[]>([]);

	const handleShowMore = () => {
		setIsShowMore(false);
		setNumberItemShow(SEARCH_SUGGEST.length);
	};
	const handleCollapse = () => {
		setIsShowMore(true);
		setNumberItemShow(3);
	};
	useEffect(() => {
		//fake api
		setSearchSuggestList(SEARCH_SUGGEST);
		setTrendSuggestList(TrendingSearch);
		setCategoryList(Categories);
	}, []);
	useEffect(() => {
		if (data.length > 0) {
			setSearchSuggestList(data);
		}
	}, [data]);
	return (
		<>
			{/* Overlay */}
			<div className="fixed top-[var(--height-header)] left-0 bottom-0 right-0 bg-black/53 z-[1] animate-fadeIn" />

			{/* Main Container */}
			<div className="absolute top-[calc(100%-1px)] left-0 list-none bg-white rounded-b-[3px] border-t border-[#e1e1e1] shadow-[0_6px_12px_0_rgba(0,0,0,0.28)] w-full z-[999] animate-fadeIn">
				{/* Suggest List */}
				<div>
					{searchSuggestList.slice(0, numberItemShow).map((item) => (
						<Link
							key={item.id}
							href="/"
							className="text-[#27272a] text-[14px] leading-[150%] h-9 font-medium flex items-center px-4 hover:bg-[#27272a]/12"
						>
							<Image
								src={item.thumbnail || images.search2}
								alt={item.name}
								width={35}
								height={35}
								className="w-[35px] h-[35px]"
							/>
							<div className="text-[#242424] text-[13px] leading-5 font-medium">{item.name}</div>
						</Link>
					))}
				</div>

				{/* Show More Section */}
				<div className="text-xs leading-[1.67] flex justify-center items-center text-[#0d5cb6]">
					<div className="flex p-[6px_16px] items-center cursor-pointer select-none">
						{isShowMore ? (
							<div onClick={handleShowMore} className="flex items-center">
								Xem thêm
								{/* <Arrow className="ml-2 rotate-90" /> */}
							</div>
						) : (
							<div onClick={handleCollapse} className="flex items-center">
								Thu gọn
								{/* <Arrow className="ml-2 -rotate-90" /> */}
							</div>
						)}
					</div>
				</div>

				{/* Trending List */}
				<div className="bg-white p-[8px_12px_12px] border-t border-[#f2f2f2]">
					<div className="flex items-center text-[15px] leading-6 pb-2">
						<Image src={images.trend} alt="trend" width={24} height={24} className="w-6 h-6 mr-2" />
						<div className="text-[15px] leading-6">Tìm Kiếm Phổ Biến</div>
					</div>
					<div className="grid grid-cols-3 grid-rows-2 gap-2">
						{trendSuggestList.map((item) => (
							<Link
								key={item.id}
								href={item.to}
								className="text-xs leading-[1.67] flex bg-[#fafafa] text-[#242424] hover:shadow-[0_1px_2px_0_rgba(0,0,0,0.1)]"
							>
								<Image
									src={item.thumbnail || images.noImage}
									alt={item.name}
									width={38}
									height={38}
									className="w-[38px] h-[38px] mr-2 object-contain"
								/>
								<span className="text-xs leading-[1.67] flex bg-[#fafafa] text-[#242424]">
									{item.name}
								</span>
							</Link>
						))}
					</div>
				</div>

				{/* Category List */}
				<div className="bg-white p-[8px_12px_12px] border-t border-[#f2f2f2]">
					<div className="flex items-center text-[15px] leading-6 pb-2">Danh Mục Nổi Bật</div>
					<div className="grid grid-cols-4 grid-rows-1 gap-x-2 gap-y-3">
						{categoryList.map((item) => (
							<Link
								key={item.id}
								href={item.to}
								className="text-xs leading-[1.67] flex flex-col text-[#242424] hover:shadow-[0_0_20px_rgba(0,0,0,0.1)]"
							>
								<div className="px-10">
									<div className="w-full pt-[100%] rounded-[36%] relative overflow-hidden bg-[#fafafa]">
										<Image
											src={item.thumbnail || images.noImage}
											alt={item.name}
											fill
											className="absolute top-0 left-0 w-full h-full object-contain"
										/>
									</div>
								</div>
								<span className="text-xs leading-4 pt-[6px] text-center overflow-hidden line-clamp-2">
									{item.name}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default HistoryHeader;
