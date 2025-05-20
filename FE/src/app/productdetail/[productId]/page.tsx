/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { formatPrice } from '@/utils/formatprice';
import { ConfigProvider, Modal, Rate, message } from 'antd';
import { FaRegMessage } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductServices from '@/services/products/productServices';
import { URL_SERVICE } from '@/constant/constant';
import { Button } from 'antd';
import CartServices from '@/services/CartServices/CartServices';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import ModalAddress from '@/components/LayoutComponents/Header/modalAddress';
import { useRouter } from 'next/navigation';
import { updateCart } from '@/reducers/slice/cartSlice';
import Link from 'next/link';
import { SelectedItems } from '@/reducers/slice/checkout';
import RatingForm from '@/components/app/rating/ratingform';
import RatingList from '@/components/app/rating/ratingList';
import RatingServices from '@/services/rating/ratingServices';

export default function DetailProduct() {
	const [quantity, setQuantity] = useState(1);
	const dispatch = useDispatch();
	const [data, setData] = useState<any>([]);
	const [isRated, setIsRated] = useState<any>([]);
	const [dataRating, setDataRating] = useState<any>([]);
	const productServices = new ProductServices(URL_SERVICE || '', () => {});
	const ratingServices = new RatingServices(URL_SERVICE || '', () => {});
	const user = useSelector((state: RootState) => state.auth.userInfo);
	const router = useRouter();
	const { productId } = useParams();
	const [itemProduct, setItemProduct] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const cartServices = new CartServices(URL_SERVICE || '', () => {});

	const fetchDataProduct = async () => {
		try {
			const response: any = await productServices.getProductById(productId);

			setData(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};
	const checkRating = async () => {
		try {
			const response: any = await ratingServices.checkRating(user.customerId, Number(productId));
			setIsRated(response.result);
		} catch (error) {
			console.error('Error checking rating:', error);
		}
	};
	const fetchDataRating = async () => {
		try {
			const response: any = await ratingServices.getRatingByProductId(Number(productId));
			console.log(response);
			setDataRating(response.data);
		} catch (error) {
			console.error('Error fetching rating:', error);
		}
	};
	const ratingAverage = dataRating.reduce((acc: number, curr: any) => acc + curr.ratingValue, 0) / dataRating.length;

	useEffect(() => {
		fetchDataRating();
	}, []);
	useEffect(() => {
		if (user.customerId) {
			checkRating();
		}
	}, []);
	useEffect(() => {
		fetchDataProduct();
	}, [productId]);
	const showModal = () => {
		if (user != null) {
			setIsModalOpen(true);
		} else {
			messageApi.open({
				type: 'error',
				content: 'Đăng nhập để thêm địa chỉ giao hàng',
			});
			router.push('/login');
		}
	};
	const onSuccess = () => {
		checkRating();
		fetchDataRating();
	};
	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	const handleIncreaseQuantity = () => {
		setQuantity((prev) => {
			return prev + 1;
		});
	};

	const handleDecreaseQuantity = () => {
		setQuantity((prev: number) => {
			if (prev === 1) {
				return 1;
			}
			return prev - 1;
		});
	};
	const handleProduct = (item: any) => {
		setData((prev: any) => {
			return {
				...prev,
				img: item.img,
			};
		});
	};
	const handleClickVariant = (item: any) => {
		// console.log(item);
		setItemProduct(item);
		setData((prev: any) => {
			return {
				...prev,
				img: item.img,
				price: item.price,
			};
		});
	};

	const handleAddToCart = async () => {
		const formatdata = {
			id: itemProduct.id,
			customerId: user.customerId,
			quantity: quantity,
		};
		try {
			const response = await cartServices.addToCart(formatdata);
			console.log(response);
			dispatch(updateCart(response));
		} catch (err) {
			console.log(err);
		}
	};
	const handleBuy = () => {
		if (itemProduct) {
			const allSelected = {
				id: itemProduct.id,
				name: data.productName,
				quantity: quantity,
				price: itemProduct.price,
				img: itemProduct.img,
				variantValue: itemProduct.VariantValue?.typeValue,
				totalPrice: quantity * itemProduct.price,
			};
			dispatch(SelectedItems([allSelected]));
			router.push('/checkout');
		} else {
			messageApi.open({
				type: 'error',
				content: 'Vui lòng chọn sản phẩm',
			});
		}
	};
	return (
		<div className="">
			{contextHolder}
			<div className="grid grid-cols-[1fr_360px] gap-6 pt-4">
				<div className="grid grid-cols-[100%] gap-4">
					<div className="grid grid-cols-[400px_1fr] gap-6 rounder-[8px] items-start">
						<div className="flex flex-col bg-white rounded-lg py-4 gap-4 sticky top-3 max-h-[480px] w-[400px]">
							<div className="flex flex-col gap-[6px]">
								<div className="flex flex-col gap-1">
									<div className="flex gap-2 items-center border-b border-[#ebebf0] pb-2">
										<div className="w-[368px]">
											<img
												src={data.img}
												alt="brand"
												width={368}
												height={368}
												className="object-contain w-full h-full block"
											/>
										</div>
									</div>
									<div className="flex gap-2 items-center mt-2">
										{data.productVariant?.map((item: any, index: number) => (
											<div
												key={index}
												onClick={() => {
													handleProduct(item);
												}}
												className="border-[1px] border-solid border-[#e5e5e5] rounded-lg p-2"
											>
												<div className="w-[42px] h-[42px]">
													<img
														src={item.img}
														alt="brand"
														className="object-contain w-[100%] h-[100%] "
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
						{/* product info */}
						<div className="flex flex-col min-w-[586px]  gap-4">
							<div className="bg-white rounded-lg p-4">
								<h1 className="m-0 text-[#27272a] text-2xl font-medium leading-[150%] break-words whitespace-break-spaces">
									{data?.productName}
								</h1>
								<div className="flex">
									<div className="flex items-center justify-between">
										<div className="flex">
											<div className="mr-1 text-[14px] leading-[150%] font-medium">
												{ratingAverage}
											</div>
											<div className="flex items-center">
												<Rate allowHalf disabled defaultValue={ratingAverage} />
											</div>
											<p className="ml-2 text-[#787878] text-[14px] leading-6">
												({dataRating.length})
											</p>
											<div className="w-[1px] h-3 bg-[#c7c7c7] mx-2 translate-y-1/2"></div>
										</div>
									</div>
									<div className="text-[14px] leading-6 text-[#787878]">Đã bán 3055</div>
								</div>
								<div className="flex items-center text-[#27272a] gap-2">
									<div className="text-[24px] font-semibold leading-[150%]">
										{formatPrice(data?.price || 1)}
									</div>
									<div className="font-normal text-xs leading-[150%] px-1 bg-[#f5f5fa] rounded-lg text-[#27272a]">
										-12%
									</div>
								</div>

								<div className="mb-4">
									<p className="text-gray-800 font-semibold mb-2">Loại biến thể</p>
									<div className="flex flex-col gap-4">
										{[
											...new Set(
												data.productVariant?.map(
													(item: any) => item.VariantValue?.VariantType?.typeName,
												),
											),
										].map((typeName: any | undefined, index: number) => (
											<div key={index}>
												<p className="text-gray-600 text-sm font-semibold">{typeName}</p>

												<div className="flex gap-2 mt-2">
													{data.productVariant
														?.filter(
															(item: any) =>
																item.VariantValue?.VariantType?.typeName === typeName,
														)
														.map((item: any, idx: number) => (
															<button
																key={idx}
																onClick={() => handleClickVariant(item)}
																className={`border px-4 py-2 rounded-lg ${
																	itemProduct === item
																		? 'border-blue-500 bg-blue-100'
																		: 'border-gray-300'
																}`}
															>
																{item.VariantValue?.typeValue}
															</button>
														))}
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="bg-white rounded-lg p-4">
								<div className="font-semibold text-base leading-[150%] text-[#27272a]">
									Thông tin vận chuyển
								</div>
								<div className="flex flex-row items-center py-2 border-b border-[#ebebf0] text-[14px] leading-[150%] font-normal text-[#27272a] gap-2">
									<div className="flex items-center cursor-pointer gap-1 text-sm font-normal leading-[150%] flex-1">
										<div className="text-[#27272a] overflow-hidden line-clamp-1 w-full">
											Giao đến : {user?.address}
										</div>
										<span onClick={showModal} className="text-[#0a68ff]">
											Đổi
										</span>
										<ConfigProvider
											theme={{
												components: {
													Modal: {
														colorBgElevated: '#f8f8f8',
													},
												},
											}}
										>
											<Modal
												open={isModalOpen}
												onOk={handleOk}
												footer={false}
												onCancel={handleCancel}
												closable={false}
												maskClosable={true}
												width={'600px'}
											>
												<ModalAddress onClose={handleCancel} />
											</Modal>
										</ConfigProvider>
									</div>
								</div>
								<div className="flex flex-row items-center py-2 border-b border-[#ebebf0] text-[14px] leading-[150%] font-normal text-[#27272a] gap-2">
									<div className="flex items-center cursor-pointer gap-1 text-sm font-normal leading-[150%] flex-1">
										<div className="text-[#27272a] overflow-hidden line-clamp-1 w-full">
											Giao siêu tốc 2h
										</div>
										<div className="text-[#27272a]">
											<img
												src="https://salt.tikicdn.com/ts/upload/14/11/46/13b71dceb805fb57ce37d57585bc3762.png"
												alt="now"
												className="object-contain w-[32px] h-full block"
											/>
										</div>
									</div>
								</div>
								<div className="flex flex-row items-center py-2 border-b border-[#ebebf0] text-[14px] leading-[150%] font-normal text-[#27272a] gap-2">
									<div className="flex items-center cursor-pointer gap-1 text-sm font-normal leading-[150%] flex-1">
										<div className="text-[#27272a] overflow-hidden line-clamp-1 w-full">
											Giao đúng sáng mai
										</div>
										<div className="text-[#27272a]">
											<img src="#" alt="sun" className="object-contain w-full h-full block" />
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white rounded-lg p-4">
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Thông tin bảo hành</p>
									<div className="text-[#27272a]">
										<span className="text-[#27272a]">Thời gian bảo hành:</span>
										<span className="text-[#00AB56]">12 Tháng</span>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Hình thức bảo hành:</p>
									<div className="text-[#27272a]">Hóa đơn</div>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Nơi bảo hành:</p>
									<div className="text-[#27272a]">Bảo hành chính hãng</div>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Hướng dẫn bảo hành:</p>
									<div className="text-[#0a68ff] text-sm font-normal leading-[150%]">
										Xem chi tiết
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="product-comparison-widget-id"></div>
					<div className="">
						<div className="flex flex-col bg-white rounded-[8px] gap-1 w-full h-[500px]"></div>
						<div className="products-more mt-4">
							<div className="flex flex-col bg-white rounded-lg min-h-[300px] p-4 gap-4">
								<div className="flex flex-col gap-4">
									<h2 className="text-base font-semibold leading-[150%] text-[#27272a]">
										Đánh giá sản phẩm
									</h2>
									<div className="flex gap-4">
										{isRated.hasPurchased == true && isRated.hasRated == false && (
											<RatingForm
												customerId={user.customerId}
												billDetailId={isRated.billDetailId}
												onSuccess={onSuccess}
											/>
										)}
										<div className="flex-1">
											<RatingList dataRating={dataRating} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* pricing */}
				<div className="grid grid-cols-[100%] gap-4">
					<div className="flex min-w-[354px] flex-col bg-white rounded-lg p-4 gap-4 mr-5 sticky top-3 max-h-[460px]">
						<div className="flex items-center justify-between h-[65px] pb-3 border-b-[1px] border-solid border-[#ebebf0]">
							<Link href={`/shop-infor/${data.shopId}`} className="flex items-center gap-2 flex-1">
								<div className="w-10 h-10 rounded-full overflow-hidden border-[1px] border-solid border-[#dddde3] mr-2">
									<img src={data.shopAvatar} alt="" className="w-full h-full" />
								</div>
								<div className="">
									<p className="line-clamp-1 text-[16px] font-[500] text-[#242424]">
										{data.shopName}
									</p>
									<img
										src="https://salt.tikicdn.com/cache/w100/ts/upload/6b/25/fb/c288b5bcee51f35f2df0a5f5f03de2e1.png.webp"
										alt=""
										className=""
									/>
								</div>
							</Link>
							<div className="p-[6px] border-[1px] h-[34px] w-[34px] border-solid border-[#dddde3] rounded-[4px] cursor-pointer flex items-center justify-center">
								<FaRegMessage />
							</div>
						</div>
						<div className="flex flex-col items-stretch gap-3">
							<div className="h-[50px]  ">
								<h4 className="text-base font-normal text-[var(--black-color)] line-clamp-2">
									{data?.productName}
								</h4>
							</div>
							<div className="flex flex-col gap-4">
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Số lượng</p>
									<div className="flex items-center">
										<button
											onClick={handleDecreaseQuantity}
											className="cursor-pointer flex justify-center items-center w-8 bg-white border border-[#ececec] rounded min-h-8"
										>
											<span className="leading-5 text-2xl font-normal">-</span>
										</button>
										<input
											value={quantity}
											className="rounded w-10 border border-[#ececec] mx-1 h-8 text-[#242424] text-sm text-center"
											readOnly
										/>
										<button
											onClick={handleIncreaseQuantity}
											className="cursor-pointer flex justify-center items-center w-8 bg-white border border-[#ececec] rounded min-h-8"
										>
											<span className="leading-5 text-2xl font-normal">+</span>
										</button>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<p className="text-sm font-semibold leading-[150%] m-0">Tạm tính</p>
									<div className="text-[24px] font-semibold leading-[150%] text-[var(--black-color)]">
										{formatPrice((data?.price || 1) * quantity)}
									</div>
								</div>
								<div className="grid grid-cols-1 gap-2">
									<Button onClick={handleBuy} color="danger" variant="solid">
										Mua ngay
									</Button>
									<Button onClick={handleAddToCart} color="primary" variant="outlined">
										Thêm vào giỏ hàng
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
