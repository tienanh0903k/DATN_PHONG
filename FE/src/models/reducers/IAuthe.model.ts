export interface IAuthe {
  isAuthenticated: boolean;
  userInfo: {
    authenticated: Array<string>;
  };
}
export const defaultAuth: Readonly<IAuthe> = {
  isAuthenticated: false,
  userInfo: {
    authenticated: [],
  },
};
