/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Rate } from 'antd';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
type Props = {
	dataRating: any;
};

const RatingList = ({ dataRating }: Props) => {
	const getRatingLabel = (value: number) => {
		switch (value) {
			case 5:
				return 'Cực kỳ hài lòng';
			case 4:
				return 'Hài lòng';
			case 3:
				return 'Bình thường';
			case 2:
				return 'Không hài lòng';
			case 1:
				return 'Rất tệ';
			default:
				return 'Chưa đánh giá';
		}
	};
	return (
		<div className="h-auto w-full">
			{dataRating.map((item: any, index: number) => (
				<div key={index} className="flex py-4 gap-6 border-t-[1px] items-center border-[#f2f2f2] border-solid">
					<div className="w-2/5">
						<div className="flex items-start gap-2">
							<img src={item.Customer.avatar} className="w-10 h-10 rounded-full" alt="" />
							<div className="">
								<span className="text-[16px] leading-[24px] font-[500]">
									{item.Customer.customerName}
								</span>
								<p className="text-[12px] leading-[16px] font-[400]">
									{formatDistanceToNow(new Date(item.createdAt), {
										addSuffix: true,
										locale: vi,
									})}
								</p>
							</div>
						</div>
					</div>
					<div className="w-3/5">
						<div className="mb-1">
							<Rate disabled value={item.ratingValue} />
							<span className="text-[16px] leading-[20px] font-[500] ml-2">
								{getRatingLabel(item.ratingValue)}
							</span>
						</div>
						<div className="">
							<p className="text-[14px] leading-[20px] font-[400]">{item.comment}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default RatingList;
