'use client';
import SwiperComponents from '@/components/app/Home/swiper';
import Trending from '@/components/app/Home/trending';
import Sidebar from '@/components/LayoutComponents/Sidebar/Sidebar';

export default function Home() {
	return (
		<div className="container-base">
			<div className="flex max-w-[100%] justify-between pt-4">
				<Sidebar />
				<main className="w-[calc(100%-254px)] overflow-hidden">
					<SwiperComponents />
					<Trending />
				</main>
			</div>
		</div>
	);
}
