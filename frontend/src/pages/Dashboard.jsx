import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Briefcase, TrendingUp } from 'lucide-react';
import { getStats } from '../api/api';

const StatCard = ({ title, value, icon: Icon, color, trend, darkMode }) => (
    <div className={`p-6 rounded-3xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1`}>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${color}`}>
                <Icon className="text-white" size={24} />
            </div>
            {trend && (
                <span className="flex items-center gap-1 text-emerald-500 text-sm font-semibold">
                    <TrendingUp size={16} />
                    {trend}
                </span>
            )}
        </div>
        <h3 className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-1`}>{title}</h3>
        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
);

const Dashboard = ({ darkMode }) => {
    const [stats, setStats] = useState({
        totalEmployees: 0,
        totalPayroll: 0,
        averageSalary: 0,
        departments: 0
    });

    useEffect(() => {
        getStats().then(res => setStats(res.data));
    }, []);

    const cards = [
        { title: 'Total Employees', value: stats.totalEmployees, icon: Users, color: 'bg-indigo-600', trend: '+12%' },
        { title: 'Total Payroll', value: `$${stats.totalPayroll.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-600', trend: '+5.4%' },
        { title: 'Avg. Salary', value: `$${Math.round(stats.averageSalary).toLocaleString()}`, icon: TrendingUp, color: 'bg-amber-500', trend: '+2.1%' },
        { title: 'Departments', value: stats.departments, icon: Briefcase, color: 'bg-violet-600' },
    ];

    return (
        <div className="animate-in fade-in duration-700">
            <header className="mb-8">
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Morning, Chief!</h1>
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Here's what's happening in your company today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, i) => (
                    <StatCard key={i} {...card} darkMode={darkMode} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`p-8 rounded-3xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border min-h-[300px]`}>
                    <h2 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Quick Overview</h2>
                    <div className="space-y-4">
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} overflow-hidden`}>
                            <div className="h-full bg-indigo-600 w-3/4 rounded-full"></div>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} overflow-hidden`}>
                            <div className="h-full bg-emerald-600 w-1/2 rounded-full"></div>
                        </div>
                        <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-100'} overflow-hidden`}>
                            <div className="h-full bg-amber-500 w-2/3 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col justify-center items-center p-8 rounded-3xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20`}>
                    <Briefcase size={48} className="mb-4 opacity-50" />
                    <h2 className="font-bold text-2xl text-center mb-2">Grow your team today!</h2>
                    <p className="text-indigo-100 text-center mb-6">Efficiently manage roles and salaries with ManageX features.</p>
                    <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors">
                        Upgrade Pro
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
