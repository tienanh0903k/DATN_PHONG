import { ServicesBase } from '../servicesBase';

class AiServices extends ServicesBase {
	constructor(baseUrl: string, onUnauthenticated: () => void) {
		super(baseUrl, onUnauthenticated);
	}

	chat(message: string) {
		return this.service.post('/chat', { message });
	}
}

export default AiServices;
