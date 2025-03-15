/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useForm } from 'react-hook-form';
type Props = {
	handleEmail: () => void;
};
const VerifyPhone = ({ handleEmail }: Props) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div>
				<div className="mb-5">
					<h2 className="text-[24px] mb-[10px] font-[500]">Xin chào </h2>
					<p className="text-[15px]">Đăng nhập hoặc Tạo tài khoản</p>
				</div>
				<div className="relative after:content-[''] after:absolute left-0 right-0 bottom-0 border-b-[1px] border-solid border-[#e0e0e0]">
					<input
						type="number"
						className="w-full py-[10px] text-[24px] text-[#242424] outline-none appearance-none"
						{...register('phone', { required: true })}
						placeholder="Nhập số điện thoại"
					/>
				</div>
			</div>
			<button
				type="submit"
				className="mt-[30px] mb-[10px] text-[16px] font-[500] text-[#fff] bg-[#ff424e] rounded-[4px] py-[13px] text-center cursor-pointer hover:opacity-80 transition-all duration-300 w-full"
			>
				Tiếp Tục
			</button>
			<p onClick={handleEmail} className="text-[#0d5cb6] text-[14px] cursor-pointer mt-[10px] text-center">
				Đăng nhập bằng gmail
			</p>
			<div className="mt-[80px] mb-[10px] text-center">
				<p className="relative mb-[20px] before:content-[''] before:absolute before:h-[1px] before:w-[100%] before:bg-[#f2f2f2] before:top-[50%] before:left-0 before:transform translate-y-[50%] before:z-1">
					<span className="text-[15px] z-2 text-[#787878]  relative ">Hoặc tiếp tục bằng</span>
				</p>
				<div className="flex justify-center items-center gap-[10px] mb-[10px]">
					<img
						src="https://salt.tikicdn.com/ts/upload/3a/22/45/0f04dc6e4ed55fa62dcb305fd337db6c.png"
						alt="facebook"
						className="w-[58px] h-[58px]"
					/>
					<img
						src="https://salt.tikicdn.com/ts/upload/1c/ac/e8/141c68302262747f5988df2aae7eb161.png"
						alt="google"
						className="w-[58px] h-[58px]"
					/>
				</div>
			</div>
			<p className="text-[12px] text-[#787878] leading-[16px] align-start">
				Bằng việc tiếp tục, bạn đã đọc và đồng ý với{' '}
				<a href="https://hotro.tiki.vn/s/article/dieu-khoan-su-dung">điều khoản sử dụng</a> và{' '}
				<a href="https://tiki.vn/bao-mat-thong-tin-ca-nhan">Chính sách bảo mật thông tin cá nhân</a> của Tiki
			</p>
		</form>
	);
};

export default VerifyPhone;
