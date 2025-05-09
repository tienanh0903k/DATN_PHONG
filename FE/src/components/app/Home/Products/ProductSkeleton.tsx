const ProductSkeleton = () => {
	return (
		<div className="w-[19%] border-[1px] border-solid border-[#ebebf0] bg-white rounded-[8px] overflow-hidden animate-pulse">
			<div className="w-full aspect-square bg-gray-200"></div>
			<div className="p-2">
				<div className="h-[68px]">
					<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded w-1/2"></div>
					<div className="h-[18px] w-20 bg-gray-200 rounded mt-2"></div>
				</div>
				<div className="h-6 bg-gray-200 rounded w-24 mt-2"></div>
			</div>
		</div>
	);
};

export default ProductSkeleton;
