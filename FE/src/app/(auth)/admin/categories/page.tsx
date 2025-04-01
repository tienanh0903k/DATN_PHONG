'use client';
import React, { useState } from 'react';
import { Table, Drawer, Form, Input, Select, Button, Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ICategory, ICreateCategory } from '@/models/admin/category.model';
import CategoryServices from '@/services/categoryServices/categoryServices';
import { URL_SERVICE } from '@/constant/constant';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, updateCategory, deleteCategory } from '@/reducers/slice/categoriesSlice';

const Categories = () => {
	const dispatch = useDispatch();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [form] = Form.useForm();
	const categoriesdata = useSelector((state: ICategoriesState) => state.categories);
	const [categories, setCategories] = useState<ICategory[]>([
		{ categoryId: 1, categoryName: 'Electronics', parentCategoryId: null, status: 'active' },
		{ categoryId: 2, categoryName: 'Smartphones', parentCategoryId: 1, status: 'active' },
	]);

	const categoryServices = new CategoryServices(URL_SERVICE, () => {});

	const columns: ColumnsType<ICategory> = [
		{
			title: 'ID',
			dataIndex: 'categoryId',
			key: 'categoryId',
			width: 80,
		},
		{
			title: 'Tên danh mục',
			dataIndex: 'categoryName',
			key: 'categoryName',
			sorter: (a, b) => a.categoryName.localeCompare(b.categoryName),
		},
		{
			title: 'Danh mục cha',
			dataIndex: 'parentCategoryId',
			key: 'parentCategoryId',
			render: (parentId: number | null) => {
				if (!parentId) return 'Không có';
				const parent = categories.find((cat) => cat.categoryId === parentId);
				return parent ? parent.categoryName : 'Không có';
			},
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: (status: string) => (
				<Tag color={status === 'active' ? 'success' : 'error'}>
					{status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
				</Tag>
			),
			filters: [
				{ text: 'Hoạt động', value: 'active' },
				{ text: 'Không hoạt động', value: 'inactive' },
			],
			onFilter: (value, record) => record.status === value,
		},
		{
			title: 'Thao tác',
			key: 'action',
			align: 'center',
			render: (_, record) => (
				<Space size="middle">
					<Button type="link" onClick={() => handleEdit(record)}>
						Sửa
					</Button>
					<Button type="link" danger onClick={() => handleDelete(record.categoryId)}>
						Xóa
					</Button>
				</Space>
			),
		},
	];

	const handleEdit = (category: ICategory) => {
		form.setFieldsValue(category);
		setIsDrawerOpen(true);
	};

	const handleDelete = (categoryId: number) => {
		setCategories((prev) => prev.filter((cat) => cat.categoryId !== categoryId));
	};

	const onFinish = async (values: ICreateCategory) => {
		try {
			const response = await categoryServices.createCategory(values);
			dispatch(createCategory(response));
		} catch (error) {
			console.log(error);
		} finally {
			setIsDrawerOpen(false);
			form.resetFields();
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Quản lý danh mục</h1>
				<Button
					type="primary"
					onClick={() => {
						form.resetFields();
						setIsDrawerOpen(true);
					}}
				>
					Thêm danh mục
				</Button>
			</div>

			<Table
				columns={columns}
				dataSource={categories}
				rowKey="categoryId"
				pagination={{
					pageSize: 10,
					showSizeChanger: true,
					showTotal: (total) => `Tổng số ${total} danh mục`,
				}}
			/>

			<Drawer
				title={form.getFieldValue('categoryId') ? 'Sửa danh mục' : 'Thêm danh mục mới'}
				width={820}
				onClose={() => setIsDrawerOpen(false)}
				open={isDrawerOpen}
				extra={
					<Space>
						<Button onClick={() => setIsDrawerOpen(false)}>Hủy</Button>
						<Button type="primary" onClick={() => form.submit()}>
							Lưu
						</Button>
					</Space>
				}
			>
				<Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ status: 'active' }}>
					<Form.Item name="categoryId" hidden>
						<Input />
					</Form.Item>

					<Form.Item
						name="categoryName"
						label="Tên danh mục"
						rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
					>
						<Input placeholder="Nhập tên danh mục" />
					</Form.Item>

					<Form.Item name="parentCategoryId" label="Danh mục cha">
						<Select placeholder="Chọn danh mục cha" allowClear>
							{categories.map((category) => (
								<Select.Option
									key={category.categoryId}
									value={category.categoryId}
									disabled={form.getFieldValue('categoryId') === category.categoryId}
								>
									{category.categoryName}
								</Select.Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item name="status" label="Trạng thái">
						<Select>
							<Select.Option value="active">Hoạt động</Select.Option>
							<Select.Option value="inactive">Không hoạt động</Select.Option>
						</Select>
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default Categories;
