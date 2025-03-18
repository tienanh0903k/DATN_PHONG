import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
const Timeout = 1 * 60 * 100000;

class ServicesBase {
	service: AxiosInstance;
	onUnauthenticated: () => void;
	constructor(baseURL: string, onUnauthenticated: () => void) {
		const service = axios.create({
			headers: {
				csrf: 'token',
				'Content-Type': 'application/json',
			},
			baseURL,
			timeout: Timeout,
		});
		service.interceptors.request.use(this.requestSuccess);
		service.interceptors.response.use(this.handleSuccess, this.handleError);
		this.service = service;
		this.onUnauthenticated = onUnauthenticated;
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	requestSuccess = (config: any) => {
		const token = localStorage.getItem('token');
		// const token = Cookies.get('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	};

	handleSuccess(response: AxiosResponse) {
		return response.data;
	}
	handleError = (error: AxiosError | undefined) => {
		switch (error?.response?.status) {
			case 401:
			case 403:
				this.onUnauthenticated();
				break;

			default:
				break;
		}
		return Promise.reject(error);
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	redirectTo = (document: any, path: string) => {
		document.location = path;
	};
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	request = (config: any) => {
		return this.service(config);
	};
}
export { ServicesBase };
