/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';

type Props = {
	categories: any;
	categoryId: any;
};

const Breadcrumb = ({ categories, categoryId }: Props) => {
	const [trail, setTrail] = useState<any>([]);
	console.log(categories, categoryId);

	useEffect(() => {
		getBreadcrumbTrail(categories, categoryId);
	}, [categories, categoryId]);

	const getBreadcrumbTrail = (categories: any, categoryId: any) => {
		const map = new Map(categories.map((c: any) => [c.categoryId, c]));
		const trail = [];

		let current: any = map.get(categoryId);
		while (current) {
			trail.unshift(current);
			current = current.parentCategoryId ? map.get(current.parentCategoryId) : null;
		}

		setTrail(trail);
	};

	return (
		<nav className="text-sm text-gray-500 flex flex-wrap mt-3 gap-1">
			{trail.map((cat: any, index: number) => (
				<span key={cat.categoryId} className="flex items-center">
					{index > 0 && <span className="mx-1">›</span>}
					<div className="hover:underline cursor-pointer text-[#808089]">{cat.categoryName}</div>
				</span>
			))}
		</nav>
	);
};

export default Breadcrumb;
