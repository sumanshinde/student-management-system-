import React, { useEffect, useState } from 'react';
import { Search, Edit2, Trash2, Filter, MoreVertical } from 'lucide-react';
import { getEmployees, deleteEmployee } from '../api/api';

const EmployeeList = ({ darkMode, onEdit }) => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        setLoading(true);
        try {
            const res = await getEmployees();
            setEmployees(res.data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this employee?')) {
            await deleteEmployee(id);
            loadEmployees();
        }
    };

    const filtered = employees.filter(e => 
        e.name.toLowerCase().includes(search.toLowerCase()) || 
        e.department.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Employees</h1>
                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>You have {employees.length} employees in total.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search name, department..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`pl-10 pr-4 py-3 rounded-2xl w-full md:w-64 outline-none transition-all border ${
                                darkMode ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' : 'bg-white border-slate-200 focus:border-indigo-600'
                            }`}
                        />
                    </div>
                    <button className={`p-3 rounded-2xl border ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'}`}>
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            <div className={`rounded-3xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`${darkMode ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-50 text-slate-500'} text-sm font-semibold`}>
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Salary</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/10 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading data...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No employees found.</td>
                                </tr>
                            ) : filtered.map((emp) => (
                                <tr key={emp.id} className={`group hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 transition-colors`}>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">
                                                {emp.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{emp.name}</p>
                                                <p className="text-xs text-slate-500">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {emp.department}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-5 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{emp.role}</td>
                                    <td className={`px-6 py-5 text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>${emp.salary.toLocaleString()}</td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => onEdit(emp)}
                                                className="p-2 text-indigo-500 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 rounded-xl transition-colors"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(emp.id)}
                                                className="p-2 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-xl transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
