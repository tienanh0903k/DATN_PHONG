/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { Table, Drawer, Form, Input, Select, Button, Space, message, Tabs } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TabsProps } from 'antd';
import { URL_SERVICE } from '@/constant/constant';
import VariantService from '@/services/variant/variantService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { IVariantType, IVariantValue } from '@/models/admin/variant.model';

const VariantManagement = () => {
	const [isTypeDrawerOpen, setIsTypeDrawerOpen] = useState(false);
	const [isValueDrawerOpen, setIsValueDrawerOpen] = useState(false);
	const [typeForm] = Form.useForm();
	const [valueForm] = Form.useForm();
	const [isUpdate, setIsUpdate] = useState(false);

	const [loading, setLoading] = useState(false);
	const dataCategories = useSelector((state: RootState) => state.categories.categories);
	const [dataVariantType, setDataVariantType] = useState<IVariantType[]>([]);
	const variantService = new VariantService(URL_SERVICE, () => {});

	const [variantValues, setVariantValues] = useState<IVariantValue[]>([]);

	const typeColumns: ColumnsType<IVariantType> = [
		{
			title: 'ID',
			dataIndex: 'typeId',
			key: 'typeId',
			width: 80,
		},
		{
			title: 'Tên loại biến thể',
			dataIndex: 'typeName',
			key: 'typeName',
			sorter: (a, b) => a.typeName.localeCompare(b.typeName),
		},
		{
			title: 'Thuộc loại sản phẩm',
			dataIndex: 'categoryName',
			key: 'categoryName',
			sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
		},

		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button type="link" onClick={() => handleEditType(record)}>
						Sửa
					</Button>
					<Button type="link" danger onClick={() => handleDeleteType(record.typeId)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	const valueColumns: ColumnsType<IVariantValue> = [
		{
			title: 'ID',
			dataIndex: 'typeValueId',
			key: 'typeValueId',
			width: 80,
		},
		{
			title: 'Loại biến thể',
			dataIndex: 'typeName',
			key: 'typeName',
			sorter: (a, b) => a.typeName.localeCompare(b.typeName),
		},
		{
			title: 'Giá trị',
			dataIndex: 'typeValue',
			key: 'typeValue',
			sorter: (a, b) => a.typeValue.localeCompare(b.typeValue),
		},

		{
			title: 'Thao tác',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Button type="link" onClick={() => handleEditValue(record)}>
						Sửa
					</Button>
					<Button type="link" danger onClick={() => handleDeleteValue(record.typeValueId)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];
	const fetchDataType = async () => {
		const response = await variantService.getVariantType();
		setDataVariantType(response.data);
		const dataMerge = response.data.map((item: any) => ({
			...item,
			categoryName: item.Categories.categoryName,
		}));
		setDataVariantType(dataMerge);
	};
	const fetchValueData = async () => {
		const response = await variantService.getVariantValue();
		console.log(response);
		const dataMerge = response.data.map((item: any) => ({
			...item,
			typeName: item.VariantType.typeName,
		}));
		setVariantValues(dataMerge);
	};
	useEffect(() => {
		fetchValueData();
	}, [variantValues.length]);
	useEffect(() => {
		fetchDataType();
	}, [dataVariantType.length]);
	const handleEditType = (variantType: IVariantType) => {
		setIsUpdate(true);
		typeForm.setFieldsValue(variantType);
		setIsTypeDrawerOpen(true);
	};

	const handleDeleteType = async (typeId: number) => {
		try {
			setLoading(true);
			setDataVariantType((prev) => prev.filter((type) => type.typeId !== typeId));
			setVariantValues((prev) => prev.filter((value) => value.typeId !== typeId));
			message.success('Xóa loại biến thể thành công!');
		} catch (error: any) {
			message.error('Có lỗi xảy ra khi xóa loại biến thể!', error);
		} finally {
			setLoading(false);
		}
	};

	const handleEditValue = (variantValue: IVariantValue) => {
		setIsUpdate(true);
		valueForm.setFieldsValue(variantValue);
		setIsValueDrawerOpen(true);
	};

	const handleDeleteValue = async (typeValueId: number) => {
		try {
			setLoading(true);
			setVariantValues((prev) => prev.filter((value) => value.typeValueId !== typeValueId));
			message.success('Xóa giá trị biến thể thành công!');
		} catch (error: any) {
			message.error('Có lỗi xảy ra khi xóa giá trị biến thể!', error);
		} finally {
			setLoading(false);
		}
	};

	const onFinishType = async (values: IVariantType) => {
		try {
			setLoading(true);
			if (isUpdate) {
				await variantService.updateVariantType(values);
				setDataVariantType((prev) => prev.map((type) => (type.typeId === values.typeId ? values : type)));
				message.success('Cập nhật loại biến thể thành công!');
			} else {
				const newVariantType: any = await variantService.createVariantType(values);

				setDataVariantType((prev) => [...prev, newVariantType.data]);
				message.success('Thêm loại biến thể mới thành công!');
			}
			setIsTypeDrawerOpen(false);
			typeForm.resetFields();
			setIsUpdate(false);
		} catch (error) {
			message.error('Có lỗi xảy ra. Vui lòng thử lại!');
			console.error('Error:', error);
		} finally {
			setLoading(false);
			fetchDataType();
		}
	};

	const onFinishValue = async (values: IVariantValue) => {
		try {
			setLoading(true);
			if (isUpdate) {
				await variantService.updateVariantValue(values);
				setVariantValues((prev) =>
					prev.map((value) => (value.typeValueId === values.typeValueId ? values : value)),
				);
				message.success('Cập nhật giá trị biến thể thành công!');
			} else {
				const newVariantValue: any = await variantService.createVariantValue(values);

				setVariantValues((prev) => [...prev, newVariantValue]);
				message.success('Thêm giá trị biến thể mới thành công!');
			}
			setIsValueDrawerOpen(false);
			valueForm.resetFields();
			setIsUpdate(false);
		} catch (error) {
			message.error('Có lỗi xảy ra. Vui lòng thử lại!');
			console.error('Error:', error);
		} finally {
			setLoading(false);
		}
	};

	const items: TabsProps['items'] = [
		{
			key: '1',
			label: 'Loại biến thể',
			children: (
				<div>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800">Danh sách loại biến thể</h2>
						<Button
							type="primary"
							onClick={() => {
								typeForm.resetFields();
								setIsTypeDrawerOpen(true);
								setIsUpdate(false);
							}}
						>
							Thêm loại biến thể
						</Button>
					</div>
					<Table
						columns={typeColumns}
						dataSource={dataVariantType}
						rowKey="typeId"
						pagination={{
							pageSize: 10,
							showSizeChanger: true,
							showTotal: (total) => `Tổng số ${total} loại biến thể`,
						}}
					/>
				</div>
			),
		},
		{
			key: '2',
			label: 'Giá trị biến thể',
			children: (
				<div>
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl font-semibold text-gray-800">Danh sách giá trị biến thể</h2>
						<Button
							type="primary"
							onClick={() => {
								valueForm.resetFields();
								setIsValueDrawerOpen(true);
								setIsUpdate(false);
							}}
						>
							Thêm giá trị biến thể
						</Button>
					</div>
					<Table
						columns={valueColumns}
						dataSource={variantValues}
						rowKey="typeValueId"
						pagination={{
							pageSize: 10,
							showSizeChanger: true,
							showTotal: (total) => `Tổng số ${total} giá trị biến thể`,
						}}
					/>
				</div>
			),
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Quản lý biến thể</h1>
			</div>

			<Tabs defaultActiveKey="1" items={items} />

			<Drawer
				title={isUpdate ? 'Sửa loại biến thể' : 'Thêm loại biến thể mới'}
				width={820}
				onClose={() => {
					setIsTypeDrawerOpen(false);
					setIsUpdate(false);
				}}
				open={isTypeDrawerOpen}
				extra={
					<Space>
						<Button
							onClick={() => {
								setIsTypeDrawerOpen(false);
								setIsUpdate(false);
							}}
						>
							Hủy
						</Button>
						<Button type="primary" onClick={() => typeForm.submit()} loading={loading}>
							Lưu
						</Button>
					</Space>
				}
			>
				<Form form={typeForm} layout="vertical" onFinish={onFinishType}>
					<Form.Item name="typeId" hidden>
						<Input />
					</Form.Item>

					<Form.Item
						name="typeName"
						label="Tên loại biến thể"
						rules={[{ required: true, message: 'Vui lòng nhập tên loại biến thể' }]}
					>
						<Input placeholder="Nhập tên loại biến thể" />
					</Form.Item>

					<Form.Item
						name="categoryId"
						label="Danh mục"
						rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
					>
						<Select placeholder="Chọn danh mục">
							{dataCategories.map((category: any) => (
								<Select.Option key={category.categoryId} value={category.categoryId}>
									{category.categoryName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Drawer>

			<Drawer
				title={isUpdate ? 'Sửa giá trị biến thể' : 'Thêm giá trị biến thể mới'}
				width={820}
				onClose={() => {
					setIsValueDrawerOpen(false);
					setIsUpdate(false);
				}}
				open={isValueDrawerOpen}
				extra={
					<Space>
						<Button
							onClick={() => {
								setIsValueDrawerOpen(false);
								setIsUpdate(false);
							}}
						>
							Hủy
						</Button>
						<Button type="primary" onClick={() => valueForm.submit()} loading={loading}>
							Lưu
						</Button>
					</Space>
				}
			>
				<Form form={valueForm} layout="vertical" onFinish={onFinishValue}>
					<Form.Item name="typeValueId" hidden>
						<Input />
					</Form.Item>

					<Form.Item
						name="typeId"
						label="Loại biến thể"
						rules={[{ required: true, message: 'Vui lòng chọn loại biến thể' }]}
					>
						<Select placeholder="Chọn loại biến thể">
							{dataVariantType.map((type) => (
								<Select.Option key={type.typeId} value={type.typeId}>
									{type.typeName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item
						name="typeValue"
						label="Giá trị"
						rules={[{ required: true, message: 'Vui lòng nhập giá trị biến thể' }]}
					>
						<Input placeholder="Nhập giá trị biến thể" />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default VariantManagement;
