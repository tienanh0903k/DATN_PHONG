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
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
	// Data for line charts
	const generateLineData = (label: string, color: string, data: number[]) => ({
		labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
		datasets: [
			{
				label,
				data,
				fill: false,
				borderColor: color,
				tension: 0.4,
			},
		],
	});

	const salesData = {
		value: 424652,
		chartData: generateLineData(
			'Sales',
			'rgb(59, 130, 246)',
			Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 30),
		),
	};

	const expensesData = {
		value: 235312,
		chartData: generateLineData(
			'Expenses',
			'rgb(34, 197, 94)',
			Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 20),
		),
	};

	const profitsData = {
		value: 135965,
		chartData: generateLineData(
			'Profits',
			'rgb(168, 85, 247)',
			Array.from({ length: 30 }, () => Math.floor(Math.random() * 40) + 40),
		),
	};

	// Data for monthly sales bar chart
	const monthlyData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		datasets: [
			{
				label: 'Clothing',
				data: [45, 52, 48, 45, 42, 38, 35, 40, 45, 48, 52, 58],
				backgroundColor: 'rgb(34, 197, 94)',
			},
			{
				label: 'Food Products',
				data: [38, 42, 35, 38, 30, 28, 25, 32, 35, 40, 45, 48],
				backgroundColor: 'rgb(59, 130, 246)',
			},
		],
	};

	// Data for department sales pie chart
	const departmentData = {
		labels: ['Clothing', 'Food Products', 'Electronics', 'Kitchen Utility', 'Gardening'],
		datasets: [
			{
				data: [35, 25, 20, 15, 5],
				backgroundColor: [
					'rgb(34, 197, 94)',
					'rgb(59, 130, 246)',
					'rgb(249, 115, 22)',
					'rgb(239, 68, 68)',
					'rgb(168, 85, 247)',
				],
			},
		],
	};

	// Chart options
	const lineOptions = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
		elements: {
			point: {
				radius: 0,
			},
		},
	};

	const barOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const pieOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'right' as const,
			},
		},
	};

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 0,
		}).format(value);
	};

	return (
		<div className="">
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
				{/* Summary Cards */}
				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-lg font-semibold text-gray-600">Sales</p>
							<h2 className="text-2xl font-bold">{formatCurrency(salesData.value)}</h2>
						</div>
						<span className="text-3xl text-blue-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
								/>
							</svg>
						</span>
					</div>
					<div className="h-[100px]">
						<Line data={salesData.chartData} options={lineOptions} />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-lg font-semibold text-gray-600">Expenses</p>
							<h2 className="text-2xl font-bold">{formatCurrency(expensesData.value)}</h2>
						</div>
						<span className="text-3xl text-green-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
								/>
							</svg>
						</span>
					</div>
					<div className="h-[100px]">
						<Line data={expensesData.chartData} options={lineOptions} />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-lg font-semibold text-gray-600">Profits</p>
							<h2 className="text-2xl font-bold">{formatCurrency(profitsData.value)}</h2>
						</div>
						<span className="text-3xl text-purple-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-8 h-8"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
								/>
							</svg>
						</span>
					</div>
					<div className="h-[100px]">
						<Line data={profitsData.chartData} options={lineOptions} />
					</div>
				</div>
			</div>
			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-lg font-semibold mb-4">Monthly Sales</h3>
					<div className="h-[300px]">
						<Bar data={monthlyData} options={barOptions} />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-md p-6">
					<h3 className="text-lg font-semibold mb-4">Department Sales</h3>
					<div className="flex">
						<div className="h-[300px]">
							<Pie data={departmentData} options={pieOptions} />
						</div>
						<div className="h-[300px]">
							<Pie data={departmentData} options={pieOptions} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
