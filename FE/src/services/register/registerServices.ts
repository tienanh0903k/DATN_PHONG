/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServicesBase } from '../servicesBase';

type IVerifyEmail = {
	email: string;
	otp: string;
};
type ISignUp = {
	email: string;
	password: string;
};

class RegisterServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}
	Register(data: ISignUp) {
		return this.service.post('sign-up', data);
	}
	sendOtp(email: string) {
		const url = `/send-otp`;

		return this.service.post(url, { email });
	}

	verifyOtp(data: IVerifyEmail) {
		return this.service.post('/verify-otp', data);
	}
	loginGoogle(redirectPath: string) {
		const path = redirectPath === '/' ? '' : redirectPath;
		const queryParams = path ? `?redirect_to=${path}` : '';
		return this.service.get(`/login/google${queryParams}`);
	}
	callbackGoogle(code: string) {
		return this.service.get(`/callback/google/${code}`);
	}
	signIn(email: string) {
		return this.service.post('/signin', { email });
	}
	login(data: any) {
		return this.service.post('/login', data);
	}
	getCustomer(token: string) {
		return this.service.get('/customer', {
			headers: {
				authorization: token,
			},
		});
	}
}

export default RegisterServices;
