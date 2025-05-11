export interface IAuthen {
  userName: string;
  password: string;
  status: string;
  customerName: string;
  numberPhone: string | null;
  avatar: string | null;
  email: string;
  birthday: Date;
  address: null | string;
  gender: null | string;
}
export interface ISignUp {
  userName: string;
  password: string;
}
