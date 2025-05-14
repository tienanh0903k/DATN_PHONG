// /* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { formatPrice } from '@/utils/formatprice';

const styles = StyleSheet.create({
	page: {
		padding: 16,
		fontSize: 12,
		fontFamily: 'Helvetica',
		color: '#000',
		width: '100%',
	},
	section: {
		marginBottom: 10,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	textCenter: {
		textAlign: 'center',
	},
	bold: {
		fontWeight: 'bold',
	},
	borderBox: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#000',
		paddingVertical: 4,
		marginVertical: 8,
	},
	line: {
		marginTop: 20,
		borderBottomWidth: 1,
		width: '100%',
	},
	signatureBox: {
		width: '48%',
		textAlign: 'center',
	},
	footerNote: {
		fontSize: 10,
		marginTop: 12,
	},
});

const InvoicePDF = ({ dataBill }: any) => (
	<Document>
		<Page size="A4" style={styles.page}>
			{/* <Image src="/img/tiki.png" style={{ height: 24, marginBottom: 10 }} /> */}

			<View style={styles.section}>
				<Text>Mã vận đơn: {dataBill.billId}</Text>
				<Text>Mã đơn hàng: {dataBill.billId}</Text>
			</View>

			<View style={styles.row}>
				<View style={{ width: '48%' }}>
					<Text>Từ:</Text>
					<Text>{dataBill.shopName}</Text>
					<Text>{dataBill.shopAddress}</Text>
				</View>
				<View style={{ width: '48%' }}>
					<Text>Đến:</Text>
					<Text>{dataBill.customerName}</Text>
					<Text>{dataBill.address}</Text>
				</View>
			</View>

			<View style={styles.section}>
				<Text>84830774</Text>
			</View>

			<Text style={[styles.textCenter, styles.bold, { fontSize: 16 }]}>19-60-06</Text>

			<View style={styles.borderBox}>
				<Text style={styles.textCenter}>Tuyến giao</Text>
			</View>

			<View style={styles.borderBox}>
				<Text>Nội dung hàng (Tổng SL sản phẩm: {dataBill.quantityBill})</Text>
				<Text>{dataBill.productName}</Text>
			</View>

			<View style={styles.row}>
				<Text>Thu hộ người nhận: {formatPrice(dataBill.totalPrice)}</Text>
				<Text>Trạng thái: {dataBill.statusName}</Text>
			</View>

			<View style={[styles.row, { marginTop: 12 }]}>
				<Text>Khối lượng tịnh: 300g</Text>
				<View style={styles.signatureBox}>
					<Text>Chữ ký người nhận</Text>
					<Text style={styles.line}>______________________</Text>
				</View>
			</View>

			<Text style={styles.footerNote}>
				* Lưu ý: Kiểm tra hàng trước khi ký nhận. Giao xong không hỗ trợ đổi trả.
			</Text>
		</Page>
	</Document>
);

export default InvoicePDF;
