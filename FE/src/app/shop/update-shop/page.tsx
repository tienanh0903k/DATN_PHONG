/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller } from 'react-hook-form';
import { Input, Upload, Button, message, Spin, notification } from 'antd';
import {
	UploadOutlined,
	ShopOutlined,
	PhoneOutlined,
	MailOutlined,
	EnvironmentOutlined,
	CheckCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/config/supabase.config';
import { useSelector } from 'react-redux';
import { ICreateShopForm } from '@/models/Shop/shop.model';
import { URL_SERVICE } from '@/constant/constant';
import ShopServicer from '@/services/shopServicer/shopServicer';
import { useDispatch } from 'react-redux';
import { setShopInfo } from '@/reducers/slice/shopSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function UpdateShop() {
	const shop = useSelector((state: RootState) => state.shop.shopInfo);
	const router = useRouter();
	const { control, handleSubmit, reset, watch, setValue } = useForm<ICreateShopForm>();
	const [avatarFile, setAvatarFile] = useState<UploadFile[]>([]);
	const [bannerFile, setBannerFile] = useState<UploadFile[]>([]);
	const [img, setImg] = useState<File | null>(null);
	const [imgBanner, setImgBanner] = useState<File | null>(null);
	const [avatar, setAvatar] = useState<string | null>(shop?.shopAvatar || null);
	const [banner, setBanner] = useState<string | null>(shop?.shopBanner || null);
	const [loading, setLoading] = useState(false);

	const shopservices = new ShopServicer(URL_SERVICE, () => {});
	const dispatch = useDispatch();

	// Set initial form values from shop data
	useEffect(() => {
		if (shop) {
			setValue('shopName', shop.shopName);
			setValue('shopAddress', shop.shopAddress);
			setValue('shopNumberPhone', shop.shopNumberPhone);
			setValue('emailShop', shop.emailShop);
		}
	}, [shop, setValue]);

	const shopName = watch('shopName') || shop?.shopName;
	const shopAddress = watch('shopAddress') || shop?.shopAddress;
	const shopNumberPhone = watch('shopNumberPhone') || shop?.shopNumberPhone;
	const emailShop = watch('emailShop') || shop?.emailShop;

	const uploadImage = async (file: File) => {
		try {
			const fileName = `img/-${Date.now()}-${file.name}`;
			const { error } = await supabase.storage.from('tikistogare').upload(fileName, file);
			if (error) throw error;
			const { data: publicUrl } = supabase.storage.from('tikistogare').getPublicUrl(fileName);
			return publicUrl.publicUrl;
		} catch (error) {
			console.error('Upload image error:', error);
			return null;
		}
	};

	const onSubmit = async (data: ICreateShopForm) => {
		setLoading(true);
		let AvtUrl = shop?.shopAvatar;
		let BannerUrl = shop?.shopBanner;

		if (img) {
			AvtUrl = await uploadImage(img);
		}
		if (imgBanner) {
			BannerUrl = await uploadImage(imgBanner);
		}

		const formatData = {
			...data,
			shopId: shop?.shopId,
			shopAvatar: AvtUrl,
			shopBanner: BannerUrl,
		};

		try {
			const res: any = await shopservices.updateShop(formatData);
			console.log(res);
			dispatch(setShopInfo(res.shop));
			message.success('Cập nhật cửa hàng thành công!');
			notification.success({
				message: 'Cập nhật thành công',
				description: 'Thông tin cửa hàng đã được cập nhật thành công.',
				icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
				duration: 2,
			});
			// Navigate back to profile page after 1.5 seconds
			setTimeout(() => {
				router.push('/shop/profile-shop');
			}, 1500);
		} catch (error: any) {
			message.error('Có lỗi xảy ra khi cập nhật cửa hàng!', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-6xl mx-auto mt-10 p-6 min-h-[80vh] overflow-y-auto">
			<Spin spinning={loading}>
				<div className="grid grid-cols-2 gap-8">
					<div className="bg-white rounded-lg shadow p-6">
						<h2 className="text-2xl font-semibold mb-6">Cập nhật cửa hàng</h2>

						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
							<div>
								<label className="block text-sm font-medium mb-1">Tên cửa hàng</label>
								<Controller
									name="shopName"
									control={control}
									rules={{ required: 'Vui lòng nhập tên cửa hàng!' }}
									render={({ field, fieldState: { error } }) => (
										<>
											<Input {...field} placeholder="Nhập tên cửa hàng" />
											{error && (
												<span className="text-red-500 text-xs mt-1">{error.message}</span>
											)}
										</>
									)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Địa chỉ</label>
								<Controller
									name="shopAddress"
									control={control}
									rules={{ required: 'Vui lòng nhập địa chỉ!' }}
									render={({ field, fieldState: { error } }) => (
										<>
											<Input {...field} placeholder="Nhập địa chỉ cửa hàng" />
											{error && (
												<span className="text-red-500 text-xs mt-1">{error.message}</span>
											)}
										</>
									)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Số điện thoại</label>
								<Controller
									name="shopNumberPhone"
									control={control}
									rules={{
										required: 'Vui lòng nhập số điện thoại!',
										pattern: {
											value: /^[0-9]{10}$/,
											message: 'Số điện thoại không hợp lệ!',
										},
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<Input {...field} placeholder="Nhập số điện thoại" />
											{error && (
												<span className="text-red-500 text-xs mt-1">{error.message}</span>
											)}
										</>
									)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Email</label>
								<Controller
									name="emailShop"
									control={control}
									rules={{
										required: 'Vui lòng nhập email!',
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
											message: 'Email không hợp lệ!',
										},
									}}
									render={({ field, fieldState: { error } }) => (
										<>
											<Input {...field} placeholder="Nhập email cửa hàng" />
											{error && (
												<span className="text-red-500 text-xs mt-1">{error.message}</span>
											)}
										</>
									)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Ảnh đại diện</label>
								<Controller
									name="shopAvatar"
									control={control}
									render={({ field }) => (
										<Upload
											listType="picture"
											beforeUpload={() => false}
											maxCount={1}
											fileList={avatarFile}
											onChange={({ fileList }) => {
												setAvatarFile(fileList);
												const selectedFile = fileList[0]?.originFileObj;
												if (selectedFile) {
													const reader = new FileReader();
													reader.onload = (e) => {
														setAvatar(e.target?.result as string);
													};
													reader.readAsDataURL(selectedFile);
													setImg(selectedFile);
													field.onChange(selectedFile);
												}
											}}
										>
											<Button icon={<UploadOutlined />}>Tải ảnh đại diện</Button>
										</Upload>
									)}
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-1">Ảnh bìa</label>
								<Controller
									name="shopBanner"
									control={control}
									render={({ field }) => (
										<Upload
											listType="picture"
											maxCount={1}
											fileList={bannerFile}
											beforeUpload={() => false}
											onChange={({ fileList }) => {
												setBannerFile(fileList);
												const selectedFile = fileList[0]?.originFileObj;
												if (selectedFile) {
													const reader = new FileReader();
													reader.onload = (e) => {
														setBanner(e.target?.result as string);
													};
													reader.readAsDataURL(selectedFile);
													setImgBanner(selectedFile);
													field.onChange(selectedFile);
												}
											}}
										>
											<Button icon={<UploadOutlined />}>Tải ảnh bìa</Button>
										</Upload>
									)}
								/>
							</div>

							<div className="flex justify-end gap-4 pt-4">
								<Button type="default" onClick={() => reset()}>
									Hủy
								</Button>
								<Button type="primary" htmlType="submit">
									Cập nhật cửa hàng
								</Button>
							</div>
						</form>
					</div>
					<div className="bg-white rounded-lg shadow">
						<div className="relative h-48 bg-gray-100 rounded-t-lg">
							{banner ? (
								<Image src={banner} alt="Shop banner" fill className="object-cover rounded-t-lg" />
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400">
									<span>Ảnh bìa cửa hàng</span>
								</div>
							)}
						</div>

						<div className="p-6">
							<div className="relative -mt-16 mb-4">
								<div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100">
									{avatar ? (
										<Image
											src={avatar}
											alt="Shop avatar"
											width={96}
											height={96}
											className="object-cover"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center">
											<ShopOutlined className="text-2xl text-gray-400" />
										</div>
									)}
								</div>
							</div>

							<div className="space-y-4">
								<h3 className="text-xl font-semibold">{shopName || 'Tên cửa hàng'}</h3>

								<div className="space-y-2 text-gray-600">
									<div className="flex items-center gap-2">
										<EnvironmentOutlined />
										<span>{shopAddress || 'Địa chỉ cửa hàng'}</span>
									</div>

									<div className="flex items-center gap-2">
										<PhoneOutlined />
										<span>{shopNumberPhone || 'Số điện thoại'}</span>
									</div>

									<div className="flex items-center gap-2">
										<MailOutlined />
										<span>{emailShop || 'Email cửa hàng'}</span>
									</div>
								</div>

								<div className="pt-4 border-t">
									<div className="grid grid-cols-3 gap-4 text-center">
										<div>
											<div className="font-semibold">0</div>
											<div className="text-sm text-gray-500">Sản phẩm</div>
										</div>
										<div>
											<div className="font-semibold">0</div>
											<div className="text-sm text-gray-500">Đơn hàng</div>
										</div>
										<div>
											<div className="font-semibold">0</div>
											<div className="text-sm text-gray-500">Người theo dõi</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Spin>
		</div>
	);
}
