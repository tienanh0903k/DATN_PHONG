import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
interface Product {
	productId: number;
	productName: string;
	categoryId: number;
	productDes: string;
	shopId: number;
	img: string;
	price: number;
	status: string;
	Categories: {
		categoryId: number;
		categoryName: string;
	};
}

interface ListProductProps {
	products: Product[];
}

const ListProduct: React.FC<ListProductProps> = ({ products }) => {
	const handleDelete = (productId: number) => {
		console.log(productId);
	};
	const productData = products.map((product) => ({
		...product,
		...product.Categories,
	}));
	const columns: ColumnsType<Product> = [
		{
			title: 'ID',
			dataIndex: 'productId',
			key: 'productId',
		},
		{
			title: 'Tên sản phẩm',
			dataIndex: 'productName',
			key: 'productName',
		},
		{
			title: 'Danh mục',
			dataIndex: 'categoryName',
			key: 'categoryName',
			align: 'center',
		},
		{
			title: 'Hình ảnh',
			dataIndex: 'img',
			key: 'img',
			width: 100,
			render: (img: string) => <Image src={img} alt="Hình ảnh" width={100} height={100} />,
		},
		{
			title: 'Giá',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => `${price.toLocaleString('vi-VN')} VNĐ`,
			align: 'center',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
		},

		{
			title: 'Hành động',
			key: 'action',
			render: (_, record) => (
				<div className="flex gap-2 justify-center">
					<Link href={`/shop/update-product/${record.productId}`}>
						<Button type="primary" icon={<EditOutlined />}>
							Chỉnh sửa
						</Button>
					</Link>
					<Button type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete(record.productId)}>
						Xóa
					</Button>
				</div>
			),
			align: 'center',
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={productData}
			rowKey="productId"
			expandable={{
				expandedRowRender: (record) => (
					<div className="p-4">
						<h3 className="font-bold mb-2">Mô tả sản phẩm:</h3>
						<div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: record.productDes }} />
					</div>
				),
				rowExpandable: (record) => record.productDes !== '',
			}}
		/>
	);
};

export default ListProduct;
