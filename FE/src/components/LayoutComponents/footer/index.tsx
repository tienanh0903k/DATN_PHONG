'use client';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
	return (
		<footer className="mt-4 text-xs leading-4 font-normal text-[#808089] bg-white">
			<div className="py-4">
				<div className="flex justify-between w-[1270px] px-[15px] mx-auto">
					<div className="w-[268px]">
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Hỗ trợ khách hàng</h4>
						<p className=" text-xs leading-4 text-[#808089] mb-3">
							Hotline:
							<span className="text-[#38383d] font-medium">1900-6035</span>
							<span className="block">(1000 đ/phút, 8-21h kể cả T7, CN)</span>
						</p>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Các câu hỏi thường gặp
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Gửi yêu cầu hỗ trợ
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Hướng dẫn đặt hàng
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Phương thức vận chuyển
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Chính sách đổi trả
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Hướng dẫn trả góp
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Chính sách hàng nhập khẩu
						</Link>
						<p>
							Hỗ trợ khách hàng:
							<Link href="#">hotro@tiki.vn</Link>
						</p>
						<p className="mt-[10px]">
							<Link href="#">security@tiki.vn</Link>
						</p>
					</div>
					<div className="w-[268px]">
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Về Tiki</h4>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Giới thiệu Tiki
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Tiki Blog
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Tuyển dụng
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Chính sách bảo mật thanh h{' '}
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Chính sách bảo mật thông tin cá nhân
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Chính sách giải quyết khiếu nại
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Điều khoản sử dụng
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Giới thiệu Tiki Xu
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Thưởng thêm Astra
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Gói hội viên VIP
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Tiếp thị liên kết cùng Tiki
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Bán hàng doanh nghiệp
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Điều kiện vận chuyển
						</Link>
					</div>
					<div className="w-[268px]">
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Hợp tác và liên kết</h4>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Quy chế hoạt động Sàn GDTMĐT
						</Link>
						<Link className="block mb-2 text-[#808089] text-xs" href="#">
							Bán hàng cùng Tiki
						</Link>
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Chứng nhận bởi</h4>
						<div className="w-[226px] flex items-center flex-wrap gap-2">
							<Image
								className="w-8 h-8"
								src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
								width={32}
								height={32}
								alt="bo-cong-thuong-2"
							/>
							<Image
								className="w-[83px] h-8"
								src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
								width={83}
								height={32}
								alt="bo-cong-thuong"
							/>
						</div>
					</div>
					<div className="w-[268px]">
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Phương thức thanh toán</h4>
						<p className="text-xs leading-4 text-[#808089] mb-3">
							<span className="inline-block mr-2 mb-2 align-middle w-8 h-8">{/* <SubTiki /> */}</span>
							<span className="inline-block mr-2 mb-2 align-middle w-8 h-8">{/* <Visa /> */}</span>
							<span className="inline-block mr-2 mb-2 align-middle w-8 h-8">{/* <Momo /> */}</span>
							<span className="inline-block mr-2 mb-2 align-middle w-8 h-8">{/* <ZaloPay /> */}</span>
						</p>
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Dịch vụ giao hàng</h4>
						<div className="w-[110px] flex items-center flex-wrap gap-2">
							<Image
								src="https://salt.tikicdn.com/ts/upload/74/56/ab/e71563afb23e3f34a148fe1b7d3413c5.png"
								alt=""
								width={110}
								height={32}
								className="w-full"
							/>
						</div>
					</div>
					<div className="w-[268px]">
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">Kết nối với chúng tôi</h4>
						<p className="text-xs leading-4 text-[#808089] mb-3">
							<Link className="inline-block mr-2 mb-2 align-middle w-8 h-8" href="#">
								<Image src="/facebook.svg" alt="facebook" width={32} height={32} />
							</Link>
							<Link className="inline-block mr-2 mb-2 align-middle w-8 h-8" href="#">
								<Image src="/youtube.svg" alt="instagram" width={32} height={32} />
							</Link>
							<Link className="inline-block mr-2 mb-2 align-middle w-8 h-8" href="#">
								<Image src="/zalo.svg" alt="zalo" width={32} height={32} />
							</Link>
						</p>
						<h4 className="text-base leading-6 font-medium text-[#38383d] mb-3">
							Tải ứng dụng trên điện thoại
						</h4>
						<div className="w-[226px] flex items-center flex-nowrap gap-2">
							<Image
								className="w-20 h-20"
								src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png"
								width={80}
								height={80}
								alt="qrcode"
							/>
							<div className="w-full">
								<Link href="#">
									<Image
										className="h-9"
										src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png"
										width={130}
										height={36}
										alt="appstore"
									/>
								</Link>
								<Link href="#">
									<Image
										className="h-9"
										src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png"
										width={130}
										height={36}
										alt=""
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
