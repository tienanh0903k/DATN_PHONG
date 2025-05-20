/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/RatingForm.tsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Rate, Input, Button, message } from 'antd';

import RatingServices from '@/services/rating/ratingServices';
import { URL_SERVICE } from '@/constant/constant';
const { TextArea } = Input;

type FormValues = {
	star: number;
	content: string;
};

type Props = {
	customerId: number;
	billDetailId: number;
	onSuccess: () => void;
};

const RatingForm = ({ customerId, billDetailId, onSuccess }: Props) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = useForm<FormValues>({
		defaultValues: { star: 5, content: '' },
	});
	const [messageApi, messageContextHolder] = message.useMessage();
	const ratingServices = new RatingServices(URL_SERVICE || '', () => {});
	const onSubmit = async (data: FormValues) => {
		const formatData = {
			customerId,
			billDetailId,
			ratingValue: data.star,
			comment: data.content,
		};
		try {
			const response: any = await ratingServices.createRating(formatData);
			console.log(response);
			messageApi.success('Cảm ơn bạn đã đánh giá!');
			reset();
			onSuccess?.();
		} catch (err) {
			console.error(err);
			messageApi.error('Gửi đánh giá thất bại, thử lại nhé!');
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="bg-white w-full p-6 rounded-lg shadow space-y-4 max-w-[400px]"
		>
			{messageContextHolder}
			<h3 className="text-lg font-semibold">Đánh giá sản phẩm</h3>

			<Controller
				name="star"
				control={control}
				rules={{ required: true, min: 1 }}
				render={({ field }) => (
					<div className="flex items-center gap-3">
						<span className="w-24">Chất lượng:</span>
						<Rate {...field} />
					</div>
				)}
			/>

			<Controller
				name="content"
				control={control}
				rules={{
					required: 'Vui lòng nhập nội dung',
					maxLength: {
						value: 500,
						message: 'Tối đa 500 ký tự',
					},
				}}
				render={({ field, fieldState }) => (
					<>
						<TextArea
							autoSize={false}
							rows={4}
							placeholder="Cảm nhận của bạn..."
							{...field}
							maxLength={500}
						/>
						{fieldState.error && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
					</>
				)}
			/>

			<Button htmlType="submit" type="primary" loading={isSubmitting} className="w-full">
				Gửi đánh giá
			</Button>
		</form>
	);
};

export default RatingForm;
