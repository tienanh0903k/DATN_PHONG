import { ServicesBase } from '../servicesBase';
interface IChangeNumberPhone {
	numberPhone: string;
	customerId: number;
}
interface IChangeEmail {
	email: string;
	customerId: number;
}
class CustomerServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	changeNumberPhone(data: IChangeNumberPhone) {
		return this.service.put(`/change-number-phone/${data.customerId}`, data);
	}
	changeEmail(data: IChangeEmail) {
		return this.service.put(`/change-email/${data.customerId}`, data);
	}
}

export default CustomerServices;
