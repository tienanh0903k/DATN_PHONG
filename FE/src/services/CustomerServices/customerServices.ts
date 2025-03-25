import { ServicesBase } from '../servicesBase';
interface IChangeNumberPhone {
	numberPhone: string;
	customerId: number;
}
interface IChangeEmail {
	email: string;
	customerId: number;
}
interface IChangeAddress {
	address: string;
	customerId: number;
}
interface IChangeInfo {
	customerId: number;
	customerName: string;
	avatar: string;
	birthday: string;
	gender: string;
}
class CustomerServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	changeInfo(data: IChangeInfo) {
		console.log(data);
		return this.service.put(`/change-infor/${data.customerId}`, data);
	}
	changeNumberPhone(data: IChangeNumberPhone) {
		return this.service.put(`/change-number-phone/${data.customerId}`, data);
	}
	changeEmail(data: IChangeEmail) {
		return this.service.put(`/change-email/${data.customerId}`, data);
	}
	changeAddress(data: IChangeAddress) {
		return this.service.put(`/change-address/${data.customerId}`, data);
	}
}

export default CustomerServices;
