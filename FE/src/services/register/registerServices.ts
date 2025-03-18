import { ServicesBase } from '../servicesBase';

type IVerifyPhone = {
	phone: string;
	token: string;
};

class RegisterServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}

	sendOtp(phone: string) {
		const url = `/sendotp`;
		return this.service.post(url, { phone });
	}

	verifyOtp(data: IVerifyPhone) {
		return this.service.post('/verify-otp', data);
	}
	loginGoogle() {
		return this.service.get('/login/google');
	}
	callbackGoogle(code: string) {
		return this.service.get(`/callback/google/${code}`);
	}
}

export default RegisterServices;
