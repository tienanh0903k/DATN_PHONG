export interface Ishop {
	shopId: number;
	shopName: string;
	shopAvatar: string;
	shopDescription: string;
	shopAddress: string;
	shopPhone: string;
	shopEmail: string;
}
export interface Ichat {
	messageId: number;
	senderId: number;
	senderType: string;
	customerId: number;
	shopId: number;
	content: string;
	isRead: boolean;
	createdAt: string;
	updatedAt: string;
}
