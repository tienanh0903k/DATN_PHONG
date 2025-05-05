/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { Button, Upload, Spin, notification } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { supabase } from '@/config/supabase.config';
import Tiptap from '@/components/app/shop/Textedit';
import VariantService from '@/services/variant/variantService';
import ProductServices from '@/services/prouduct/productServices';
import CategoryServices from '@/services/categoryServices/categoryServices';
import { URL_SERVICE } from '@/constant/constant';
import { useParams, useRouter } from 'next/navigation';

const UpdateProduct = () => {
	const { productId } = useParams();
	const router = useRouter();
	const [fileList, setFileList] = useState<any>(null);
	const [variantCount, setVariantCount] = useState(1);
	const [productDes, setProductDes] = useState('');
	const [loading, setLoading] = useState(false);
	const [dataCategories, setDataCategories] = useState([]);
	const [dataVariant, setDataVariant] = useState([]);
	const [categoryId, setCategoryID] = useState<number>(0);
	const [variantId, setVariantID] = useState(0);
	const [valueVariant, setValueVariant] = useState([]);
	const [variantImages, setVariantImages] = useState<UploadFile[][]>([]);
	const [variantIds, setVariantIds] = useState<number[]>([]);

	const variantServices = new VariantService(URL_SERVICE, () => {});
	const categoryServices = new CategoryServices(URL_SERVICE, () => {});
	const productServices = new ProductServices(URL_SERVICE, () => {});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm();

	const handleVariantImageChange = (index: number, fileList: UploadFile[]) => {
		setVariantImages((prev) => {
			const updated = [...prev];
			updated[index] = fileList;
			return updated;
		});
	};

	const uploadImage = async (file: File) => {
		try {
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
			setDataVariant(response);
		} catch (error) {
			console.error('Error fetching variants:', error);
		}
	};

	const fetchdataVariantValue = async (variantId: number) => {
		try {
			const response: any = await variantServices.getProductVariantByTypeId(variantId);
			setValueVariant(response);
		} catch (error) {
			console.error('Error fetching variant values:', error);
		}
	};

	const fetchdataCatrgories = async () => {
		try {
			const response: any = await categoryServices.unusedCategories();
			setDataCategories(response);
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};

	const fetchProduct = async () => {
		try {
			setLoading(true);
			const product: any = await productServices.getProductById(Number(productId));
			console.log(product);
			if (product) {
				setValue('productName', product.data.productName);
				setValue('categoryId', product.data.categoryId);
				setCategoryID(product.data.categoryId);
				setProductDes(product.data.productDes || '');
				setValue('price', product.data.price);
				setFileList([{ url: product.data.img }]);

				if (product.data.productVariant && product.data.productVariant.length > 0) {
					setVariantCount(product.data.productVariant.length);
					const ids: number[] = [];
					product.data.productVariant.forEach((variant: any, index: number) => {
						setVariantID(variant.VariantType.typeId);
						ids.push(variant.id);
						setValue(`variants.${index}.typeValueId`, variant.VariantValue.typeValueId);
						setValue(`variants.${index}.quantity`, variant.quantity);
						setValue(`variants.${index}.price`, variant.price);
						setVariantImages((prev) => {
							const updated = [...prev];
							updated[index] = [{ url: variant.img, uid: variant.img, name: variant.img }];
							return updated;
						});
					});
					setVariantIds(ids);
				}
			}
		} catch (error: any) {
			notification.error({
				message: 'Lỗi',
				description: error?.message || 'Không thể tải thông tin sản phẩm!',
				placement: 'topRight',
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProduct();
		fetchdataCatrgories();
	}, [productId]);

	useEffect(() => {
		if (categoryId) {
			fetchdataVariantType(categoryId);
		}
	}, [categoryId]);

	useEffect(() => {
		if (variantId) {
			fetchdataVariantValue(variantId);
		}
	}, [variantId]);

	const onSubmit = async (data: any) => {
		setLoading(true);
		try {
			let img = data.img;
			if (fileList && fileList[0]?.originFileObj) {
				img = await uploadImage(fileList[0].originFileObj);
			}

			let variantImage: any[] = [];
			if (variantImages.length > 0) {
				variantImage = await Promise.all(
					variantImages.map(async (file: any) => {
						if (file && file[0]?.originFileObj) {
							return await uploadImage(file[0].originFileObj);
						}
						return file[0]?.url;
					}),
				);
			}

			const formatdata: any = {
				...data,
				productDes: productDes,
				img: img,
				variants: data.variants?.map((variant: any, index: number) => ({
					...variant,
					id: variantIds[index],
					img: variantImage[index],
				})),
			};

			const response = await productServices.updateProduct(Number(productId), formatdata);

			if (response) {
				notification.success({
					message: 'Thành công',
					description: 'Sản phẩm đã được cập nhật thành công!',
					placement: 'topRight',
					duration: 3,
				});
				router.push('/shop/profile-shop');
			} else {
				throw new Error('Cập nhật sản phẩm thất bại');
			}
		} catch (error: any) {
			notification.error({
				message: 'Thất bại',
				description: error?.message || 'Không thể cập nhật sản phẩm. Vui lòng thử lại!',
				placement: 'topRight',
				duration: 3,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container-base p-6">
			<div className="mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold mb-6">Cập nhật sản phẩm</h1>
				<Spin spinning={loading}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-4">
								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">
										Tên sản phẩm
									</label>
									<input
										{...register('productName', { required: 'Vui lòng nhập tên sản phẩm' })}
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										type="text"
										placeholder="Nhập tên sản phẩm"
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
										Loại sản phẩm
									</label>
									<select
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										{...register('categoryId', { required: 'Vui lòng chọn loại sản phẩm' })}
										onChange={(event) => {
											setCategoryID(Number(event.target.value));
										}}
									>
										<option value="">Chọn loại sản phẩm</option>
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
									<label className="block text-[16px] mb-2 font-medium text-gray-700">Giá</label>
									<input
										className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
										{...register('price', { required: 'Vui lòng nhập giá' })}
										type="number"
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
										Ghi chú sản phẩm
									</label>
									<Tiptap onChange={setProductDes} initialContent={productDes} key={productDes} />
								</div>

								<div>
									<label className="block text-[16px] mb-2 font-medium text-gray-700">
										Hình ảnh sản phẩm
									</label>
									<Upload
										listType="picture-card"
										fileList={fileList}
										onChange={({ fileList }) => {
											setFileList(fileList);
										}}
										beforeUpload={() => false}
									>
										<div>
											<PlusOutlined />
											<div style={{ marginTop: 8 }}>Tải lên</div>
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
												Loại biến thể
											</label>
											<select
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												onChange={(event) => {
													setVariantID(Number(event.target.value));
												}}
											>
												<option value="">Loại biến thể</option>
												{dataVariant?.map((variant: any) => (
													<option key={variant.typeId} value={variant.typeId}>
														{variant.typeName}
													</option>
												))}
											</select>

											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Giá trị biến thể
											</label>
											<select
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												{...register(`variants.${index}.typeValueId`)}
											>
												<option value="">Chọn giá trị biến thể</option>
												{valueVariant?.map((variant: any) => (
													<option key={variant.typeValueId} value={variant.typeValueId}>
														{variant.typeValue}
													</option>
												))}
											</select>
										</div>

										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Số lượng
											</label>
											<input
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												min={0}
												type="number"
												{...register(`variants.${index}.quantity`)}
											/>

											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Giá biến thể
											</label>
											<input
												className="mt-1 w-full border-[1px] border-solid border-[#ccc] rounded-md py-2 px-3"
												min={0}
												type="number"
												{...register(`variants.${index}.price`)}
											/>
										</div>

										<div>
											<label className="block text-[16px] mb-2 font-medium text-gray-700">
												Hình ảnh biến thể
											</label>
											<Upload
												fileList={variantImages[index] || []}
												onChange={({ fileList }) => handleVariantImageChange(index, fileList)}
												listType="picture-card"
												maxCount={1}
												beforeUpload={() => false}
											>
												<div>
													<PlusOutlined />
													<div style={{ marginTop: 8 }}>Tải lên</div>
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
							<Button type="default" size="large" onClick={() => router.back()}>
								Hủy
							</Button>
							<Button type="primary" size="large" htmlType="submit">
								Cập nhật
							</Button>
						</div>
					</form>
				</Spin>
			</div>
		</div>
	);
};

export default UpdateProduct;
