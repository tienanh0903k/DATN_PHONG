import { ServicesBase } from '../servicesBase';

type IVerifyEmail = {
	email: string;
	otp: string;
};

class RegisterServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
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
}

export default RegisterServices;
