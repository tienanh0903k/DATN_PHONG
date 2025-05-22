/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { IoSearchOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

type Props = {
	setIsSearchFocused: (isSearchFocused: boolean) => void;
	onSearchChange?: (value: string) => void;
};
const HeaderSearch = ({ setIsSearchFocused, onSearchChange }: Props) => {
	const { register, handleSubmit } = useForm();
	const router = useRouter();

	const onSubmit = async (data: any) => {
		console.log(data.contentSearch);
		router.push(`/search?q=${data.contentSearch}`);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="header-search flex border border-[#ccc] rounded-[8px] h-[40px] flex-1 items-center "
		>
			<IoSearchOutline className="text-[#828181] text-[20px] ml-[18px]" />
			<input
				placeholder="Tìm kiếm sản phẩm"
				{...register('contentSearch')}
				type="text"
				className="w-full outline-none text-[#333] mx-2"
				onFocus={() => setIsSearchFocused(true)}
				onChange={(e) => onSearchChange?.(e.target.value)}
				onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
			/>
			<button
				type="submit"
				className="bg-[#fff] h-full text-[14px] w-[92px] rounded-md max-h-9 text-center text-[#0a68ff] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[1px] before:h-5 before:bg-[#ddd] hover:bg-[#0a68ff33] active:bg-[#0a68ff66]"
			>
				Tìm kiếm
			</button>
		</form>
	);
};

export default HeaderSearch;
