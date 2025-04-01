'use client';
import dynamic from 'next/dynamic';
import SwiperComponents from '@/components/app/Home/swiper';
import Trending from '@/components/app/Home/trending';
// import Products from '@/components/app/Home/Products';
const Products = dynamic(() => import('@/components/app/Home/Products'), {
	ssr: true,
});

export default function Home() {
	return (
		<div className="">
			<SwiperComponents />
			<Trending />
			<Products />
		</div>
	);
}
