/* eslint-disable jsx-a11y/alt-text */
// /* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

import { formatPrice } from '@/utils/formatprice';
Font.register({
	family: 'Roboto',
	src: '/font/Roboto-Regular.ttf',
	fontWeight: 'normal',
});
const styles = StyleSheet.create({
	page: {
		padding: 18,
		fontSize: 12,
		fontFamily: 'Roboto',
		color: '#000',
		width: '100%',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 8,
	},
	logo: {
		width: 80,
		height: 28,
	},
	shopeeXpress: {
		fontSize: 16,
		fontWeight: 'bold',
		marginLeft: 8,
	},
	barcodeBox: {
		alignItems: 'flex-end',
	},
	section: {
		marginBottom: 8,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 2,
	},
	col: {
		width: '49%',
	},
	label: {
		fontWeight: 'bold',
	},
	borderBox: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: '#000',
		padding: 6,
		marginVertical: 8,
	},
	textCenter: {
		textAlign: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
	bigText: {
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 4,
	},
	money: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#000',
		marginVertical: 6,
	},
	line: {
		borderBottomWidth: 1,
		borderColor: '#000',
		marginVertical: 8,
		width: '100%',
	},
	signatureBox: {
		marginTop: 16,
		alignItems: 'flex-end',
	},
	signatureText: {
		fontSize: 11,
		marginBottom: 18,
	},
	footerNote: {
		fontSize: 9,
		marginTop: 10,
		textAlign: 'center',
	},
});

const InvoicePDF = ({ dataBill }: any) => (
	<Document>
		<Page size="A6" style={styles.page}>
			<View style={styles.header}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					{/* Thay src logo nếu có file logo Shopee */}
					<Image style={styles.logo} src="/img/tiki.png" />
					<Text style={styles.shopeeXpress}>Tiki</Text>
				</View>
				<View style={styles.barcodeBox}>
					<Text style={{ fontSize: 10 }}>Mã vận đơn:</Text>
					<Text style={{ fontSize: 13, fontWeight: 'bold' }}>{dataBill.billId}</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={{ fontSize: 10 }}>
					Mã đơn hàng: <Text style={styles.bold}>{dataBill.orderId}</Text>
				</Text>
			</View>

			<View style={styles.row}>
				<View style={styles.col}>
					<Text style={styles.label}>Từ:</Text>
					<Text>{dataBill.shopName}</Text>
					<Text>{dataBill.shopAddress}</Text>
					<Text>SĐT: {dataBill.shopPhone}</Text>
				</View>
				<View style={styles.col}>
					<Text style={styles.label}>Đến:</Text>
					<Text>{dataBill.customerName}</Text>
					<Text>{dataBill.address}</Text>
					<Text>SĐT: {dataBill.customerPhone}</Text>
				</View>
			</View>

			<View style={styles.row}>
				<Text style={styles.bigText}>{dataBill.routeCode || 'HN-XX-XX-XXXX'}</Text>
				<Text style={{ fontSize: 12, fontWeight: 'bold' }}>{dataBill.warehouseCode || 'CNE-04'}</Text>
			</View>

			<View style={styles.borderBox}>
				<Text style={styles.label}>Nội dung hàng (Tổng SL sản phẩm: {dataBill.quantityBill}):</Text>
				<Text>{dataBill.productName}</Text>
				{dataBill.productNote && <Text>Ghi chú: {dataBill.productNote}</Text>}
			</View>

			<Text style={styles.money}>{formatPrice(dataBill.totalPrice)} VND</Text>

			<View style={styles.row}>
				<View>
					<Text style={{ fontSize: 10 }}>Trạng thái: {dataBill.statusName}</Text>
					<Text style={{ fontSize: 10 }}>Ngày giao: {dataBill.deliveryDate || 'dd-mm-yyyy'}</Text>
				</View>
				<View>
					<Text style={{ fontSize: 10 }}>Mã vận đơn nhỏ:</Text>
					<Text style={{ fontSize: 10 }}>{dataBill.billId}</Text>
				</View>
			</View>

			<View style={styles.signatureBox}>
				<Text style={styles.signatureText}>Chữ ký người nhận</Text>
				<Text>_________________________</Text>
			</View>

			<Text style={styles.footerNote}>
				* Lưu ý: Vui lòng kiểm tra hàng hóa trước khi ký nhận. Đơn hàng đã giao không hỗ trợ đổi/trả.
			</Text>
		</Page>
	</Document>
);

export default InvoicePDF;
