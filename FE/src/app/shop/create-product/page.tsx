/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import { Button, Upload, Spin, notification } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
// import { IProductForm } from '@/models/Shop/createProduct.model';
import { supabase } from '@/config/supabase.config';

import Tiptap from '@/components/app/shop/Textedit';
import VariantService from '@/services/variant/variantService';
import ProductServices from '@/services/products/productServices';
import CategoryServices from '@/services/categoryServices/categoryServices';
import { URL_SERVICE } from '@/constant/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const CreateProduct = () => {
	const [fileList, setFileList] = useState<any>(null);
	const [variantCount, setVariantCount] = useState(1);
	const [productDes, setProductDes] = useState('');
	const [loading, setLoading] = useState(false); // Trạng thái loading
	const shopdata = useSelector((state: RootState) => state.shop.shopInfo);
	const [dataCategories, setDataCategories] = useState([]);
	const [dataVariant, setDataVariant] = useState([]);
	const [categoryId, setCategoryID] = useState<number>(0);
	const [variantId, setVariantID] = useState(0);
	const [valueVariant, setValueVariant] = useState([]);

	const variantServices = new VariantService(URL_SERVICE, () => {});
	const categoryServices = new CategoryServices(URL_SERVICE, () => {});
	const productServices = new ProductServices(URL_SERVICE, () => {});

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [variantImages, setVariantImages] = useState<UploadFile[][]>([]); // Quản lý file upload cho từng biến thể

	const handleVariantImageChange = (index: number, fileList: UploadFile[]) => {
		setVariantImages((prev) => {
			const updated = [...prev];
			updated[index] = fileList;
			return updated;
		});
	};
	const uploadImage = async (file: File) => {
		try {
			// Tạo tên file duy nhất
			const fileName = `img/${Date.now()}-${file.name}`;

			const { error } = await supabase.storage.from('tikistogare').upload(fileName, file);

			if (error) throw error;

			const { data: publicUrl } = supabase.storage.from('tikistogare').getPublicUrl(fileName);

			return publicUrl.publicUrl;
		} catch (error) {
			console.error('Upload image error:', error);
			return null;
		}
	};
	const fetchdataVariantType = async (categoryId: number) => {
		try {
			const response: any = await variantServices.getProductVariantByCategoryId(categoryId);
			console.log(response);
			setDataVariant(response);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};
	useEffect(() => {
		fetchdataVariantType(categoryId);
	}, [categoryId]);

	const fetchdataVariantValue = async (variantId: number) => {
		try {
			const response: any = await variantServices.getProductVariantByTypeId(variantId);
			console.log(response);
			setValueVariant(response);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};
	useEffect(() => {
		fetchdataVariantValue(variantId);
	}, [variantId]);
	const fetchdataCatrgories = async () => {
		try {
			const response: any = await categoryServices.unusedCategories();
			setDataCategories(response);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};
	useEffect(() => {
		fetchdataCatrgories();
	}, []);

	const onSubmit = async (data: any) => {
		setLoading(true); // Bắt đầu loading
		try {
			const img = await uploadImage(fileList[0]?.originFileObj);

			let variantImage: any[] = [];
			if (variantImages.length > 0) {
				variantImage = await Promise.all(
					variantImages.map(async (file: any) => {
						return await uploadImage(file[0].originFileObj);
					}),
				);
			}

			const formatdata: any = {
				...data,
				productDes: productDes,
				img: img,
				shopId: shopdata.shopId,
				variants: data.variants.map((variant: any, index: number) => ({
					...variant,
					img: variantImage[index],
				})),
			};

			const response = await productServices.createProduct(formatdata);
			console.log(response);
			console.log(formatdata);

			notification.success({
				message: 'Thành công',
				description: 'Sản phẩm đã được tạo thành công!',
				placement: 'topRight',
			});

			reset();
			setFileList(null);
			setVariantImages([]);
			setProductDes('');
			setVariantCount(1);
		} catch (error: any) {
			console.error('Error:', error);

			notification.error({
				message: 'Thất bại',
				description: 'Không thể tạo sản phẩm. Vui lòng thử lại!',
				placement: 'topRight',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-base p-6">
			<div className=" mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>
				<Spin spinning={loading}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">
										Tên sản phẩm
									</label>
									<input
										{...register('productName', { required: 'Product name is required' })}
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										type="text"
										placeholder="Enter product name "
									/>
									{errors.productName?.message && (
										<p className="text-red-500 text-[16px] mb-2">
											{typeof errors.productName.message === 'string'
												? errors.productName.message
												: ''}
										</p>
									)}
								</div>

								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">
										loại sản phẩm
									</label>
									<select
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										{...register('categoryId', { required: 'Category is required' })}
										onChange={(event) => {
											setCategoryID(Number(event.target.value));
										}}
									>
										<option value="">Select a category</option>
										{dataCategories.map((category: any) => (
											<option key={category.categoryId} value={category.categoryId}>
												{category.categoryName}
											</option>
										))}
									</select>
									{errors.categoryId && (
										<p className="text-red-500 text-[16px] mb-2">
											{typeof errors.categoryId.message === 'string'
												? errors.categoryId.message
												: ''}
										</p>
									)}
								</div>

								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">giá</label>
									<input
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										{...register('price', { required: 'Price is required' })}
									/>
									{errors.price && (
										<p className="text-red-500 text-[16px] mb-2">
											{typeof errors.price.message === 'string' ? errors.price.message : ''}
										</p>
									)}
								</div>
							</div>

							<div className="space-y-4">
								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">
										ghi chú sản phẩm
									</label>
									<Tiptap onChange={setProductDes} />
								</div>

								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700 ">
										hình ảnh sản phẩm
									</label>
									<Upload
										listType="picture-card"
										fileList={fileList}
										onChange={({ fileList }) => setFileList(fileList)}
									>
										<div>
											<PlusOutlined />
											<div style={{ marginTop: 8 }}>tải lên</div>
										</div>
									</Upload>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<h2 className="text-xl font-semibold mb-4">Biến thể sản phẩm</h2>
							{[...Array(variantCount)].map((_, index) => (
								<div key={index} className="border p-4 rounded-md mb-4 relative">
									{variantCount > 1 && (
										<Button
											type="text"
											danger
											icon={<MinusOutlined />}
											className="absolute right-4 top-2 mb-2"
											onClick={() => {
												if (variantCount > 1) {
													setVariantCount((prev) => prev - 1);
												}
											}}
										>
											Xóa
										</Button>
									)}

									<h3 className="font-medium mb-3">Biến thể {index + 1}</h3>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Loại biến thể
											</label>
											<select
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												onChange={(event) => {
													setVariantID(Number(event.target.value));
												}}
											>
												<option value="">Loại biến thể</option>
												<option value={0}>chọn loại biến thể</option>
												{dataVariant?.map((variant: any) => (
													<option key={variant.typeId} value={variant.typeId}>
														{variant.typeName}
													</option>
												))}
											</select>

											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												giá trị biến thể
											</label>
											<select
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												{...register(`variants.${index}.typeValueId`)}
											>
												<option value="">chọn giá trị biến thể</option>
												{valueVariant?.map((variant: any) => (
													<option key={variant.typeValueId} value={variant.typeValueId}>
														{variant.typeValue}
													</option>
												))}
											</select>
											{errors.variants && (
												<p className="text-red-500 text-[16px] mb-2">
													{typeof errors.variants.message === 'string'
														? errors.variants.message
														: ''}
												</p>
											)}
										</div>

										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Quantity
											</label>
											<input
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												min={0}
												{...register(`variants.${index}.quantity`)}
											/>
											{errors.variants && (
												<p className="text-red-500 text-[16px] mb-2">
													{typeof errors.variants.message === 'string'
														? errors.variants.message
														: ''}
												</p>
											)}
										</div>

										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Variant Price
											</label>
											<input
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												min={0}
												{...register(`variants.${index}.price`)}
											/>
										</div>

										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Variant Image
											</label>
											<Upload
												fileList={variantImages[index] || []}
												onChange={({ fileList }) => handleVariantImageChange(index, fileList)}
												listType="picture-card"
												maxCount={1}
											>
												<div>
													<PlusOutlined />
													<div style={{ marginTop: 8 }}>Upload</div>
												</div>
											</Upload>
										</div>
									</div>
								</div>
							))}

							<Button
								type="dashed"
								onClick={() => setVariantCount((prev) => prev + 1)}
								block
								icon={<PlusOutlined />}
							>
								Thêm biến thể
							</Button>
						</div>

						<div className="flex justify-end space-x-4">
							<Button type="default" size="large">
								Cancel
							</Button>
							<Button type="primary" size="large" htmlType="submit">
								Create Product
							</Button>
						</div>
					</form>
				</Spin>
			</div>
		</div>
	);
};

export default CreateProduct;
