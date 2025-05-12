'use client';
import React from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { EcommerceMetrics } from '@/components/app/Admin/dashboard/EcommerceMetrics';
import MonthlySalesChart from '@/components/app/Admin/dashboard/MonthlySalesChart';
import MonthlyTarget from '@/components/app/Admin/dashboard/MonthlyTarget';
import RecentOrders from '@/components/app/Admin/dashboard/RecentOrders';
import DemographicCard from '@/components/app/Admin/dashboard/DemographicCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
	return (
		<div className="grid grid-cols-12 gap-4 md:gap-6">
			<div className="col-span-12 space-y-6 xl:col-span-7">
				<EcommerceMetrics />

				<MonthlySalesChart />
			</div>

			<div className="col-span-12 xl:col-span-5">
				<MonthlyTarget />
			</div>

			<div className="col-span-12 xl:col-span-5">
				<DemographicCard />
			</div>

			<div className="col-span-12 xl:col-span-7">
				<RecentOrders />
			</div>
		</div>
	);
};

export default Dashboard;
