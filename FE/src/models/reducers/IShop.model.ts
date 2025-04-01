export interface IShop {
	shopInfo: {
		shopName: string;
		shopAddress: string;
		shopAvatar: string;
		shopBanner: string;
		shopNumberPhone: string;
		emailShop: string;
		totalSales: number;
		totalProduct: number;
		status: string;
	};
}

export const defaultShop: Readonly<IShop> = {
	shopInfo: {
		shopName: '',
		shopAddress: '',
		shopAvatar: '',
		shopBanner: '',
		shopNumberPhone: '',
		emailShop: '',
		totalSales: 0,
		totalProduct: 0,
		status: '',
	},
};
