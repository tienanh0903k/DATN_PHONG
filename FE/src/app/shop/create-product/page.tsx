/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import Tiptap from '@/components/app/shop/Textedit';

interface IProductForm {
	productName: string;
	categoryId: number;
	productDes: string;
	price: number;
	img: string;
	variants: Array<{
		typeValueId: number;
		quantity: number;
		price: number;
		img: string;
	}>;
}

const CreateProduct = () => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [variantCount, setVariantCount] = useState(1);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IProductForm>();

	const onSubmit = async (data: IProductForm) => {
		try {
			console.log(data);
			message.success('Product created successfully');
		} catch (error: any) {
			message.error('Failed to create product', error.message);
		}
	};

	return (
		<div className="container-base p-6">
			<div className=" mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<label className="block text-[16px] mb-2 font-medium text-gray-700">Tên sản phẩm</label>
								<Input
									{...register('productName', { required: 'Product name is required' })}
									className="mt-1"
									placeholder="Enter product name"
								/>
								{errors.productName && (
									<p className="text-red-500 text-[16px] mb-2">{errors.productName.message}</p>
								)}
							</div>

							<div>
								<label className="block text-[16px] mb-2 font-medium text-gray-700">
									loại sản phẩm
								</label>
								<Select
									className="w-full"
									placeholder="Select category"
									{...register('categoryId', { required: 'Category is required' })}
								>
									{/* Add your categories here */}
									<Select.Option value={1}>Category 1</Select.Option>
									<Select.Option value={2}>Category 2</Select.Option>
								</Select>
							</div>

							<div>
								<label className="block text-[16px] mb-2 font-medium text-gray-700">giá</label>
								<Input
									className="w-full"
									min={0}
									{...register('price', { required: 'Price is required' })}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-[16px] mb-2 font-medium text-gray-700">
									ghi chú sản phẩm
								</label>
								<Tiptap />
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

					{/* Product Variants */}
					<div className="mt-8">
						<h2 className="text-xl font-semibold mb-4">Product Variants</h2>
						{[...Array(variantCount)].map((_, index) => (
							<div key={index} className="border p-4 rounded-md mb-4">
								<h3 className="font-medium mb-3">Variant {index + 1}</h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-[16px] mb-2 font-medium text-gray-700">
											Variant Type
										</label>
										<Select
											className="w-full"
											placeholder="Select variant type"
											{...register(`variants.${index}.typeValueId` as const)}
										>
											{/* Add your variant types here */}
											<Select.Option value={1}>Size</Select.Option>
											<Select.Option value={2}>Color</Select.Option>
										</Select>
									</div>

									<div>
										<label className="block text-[16px] mb-2 font-medium text-gray-700">
											Quantity
										</label>
										<Input
											className="w-full"
											min={0}
											{...register(`variants.${index}.quantity` as const)}
										/>
									</div>

									<div>
										<label className="block text-[16px] mb-2 font-medium text-gray-700">
											Variant Price
										</label>
										<Input
											className="w-full"
											min={0}
											{...register(`variants.${index}.price` as const)}
										/>
									</div>

									<div>
										<label className="block text-[16px] mb-2 font-medium text-gray-700">
											Variant Image
										</label>
										<Upload listType="picture-card" maxCount={1}>
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
							Add Variant
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
			</div>
		</div>
	);
};

export default CreateProduct;
