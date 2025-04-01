/* eslint-disable @next/next/no-img-element */
import shop1 from '@/mocks/shop/shop1.json';
import Link from 'next/link';
const Shop = () => {
	return (
		<div className="container-customer">
			<div className="flex items-center justify-center">
				{shop1.map((item) => (
					<div key={item.id} className="p-[22px] cursor-pointer flex flex-col items-center ">
						<div className="w-[150px] h-[150px] rounded-[28px] overflow-hidden">
							<img className="w-full h-full object-cover" src={item.img} alt={item.title} />
						</div>
						<div className="text-black text-[19px] pt-[14px] leading-[24px] max-h-[60px] line-clamp-2 text-center max-w-[150px]">
							{item.title}
						</div>
					</div>
				))}
			</div>
			<div className="w-full mt-[20px]">
				<img
					src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/slide1.png"
					alt=""
					className="w-full"
				/>
			</div>
			<div className="w-full mt-[20px]">
				<img
					src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/slide2.png"
					alt=""
					className="w-full"
				/>
			</div>
			<div className="w-full mt-[20px]">
				<img
					src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/slide3.png"
					alt=""
					className="w-full"
				/>
			</div>
			<Link href="/shop" className="w-full mt-[20px] cursor-pointer">
				<img
					src="https://jpesrdrgrcqjeqavqxrj.supabase.co/storage/v1/object/public/tikistogare/img/cefa.png.webp"
					alt=""
					className="w-full"
				/>
			</Link>
		</div>
	);
};

export default Shop;
