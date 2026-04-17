import React, { useState, useEffect } from 'react';
import { Save, X, ArrowLeft } from 'lucide-react';
import { createEmployee, updateEmployee } from '../api/api';

const EmployeeForm = ({ darkMode, employee, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        department: '',
        salary: ''
    });

    useEffect(() => {
        if (employee) {
            setFormData({
                ...employee,
                salary: employee.salary.toString()
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { ...formData, salary: parseFloat(formData.salary) };
        
        if (employee) {
            await updateEmployee(employee.id, data);
        } else {
            await createEmployee(data);
        }
        onSuccess();
    };

    const inputClass = `w-full px-4 py-3 rounded-2xl outline-none transition-all border ${
        darkMode 
            ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500' 
            : 'bg-white border-slate-200 focus:border-indigo-600'
    }`;

    const labelClass = `block text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-2`;

    return (
        <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
            <button 
                onClick={onCancel}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to List
            </button>

            <div className={`p-10 rounded-[2.5rem] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-xl`}>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-8`}>
                    {employee ? 'Edit Profile' : 'New Employee'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className={labelClass}>Full Name</label>
                            <input 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. John Doe"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Email Address</label>
                            <input 
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="e.g. john@work.com"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Department</label>
                            <input 
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                placeholder="e.g. Engineering"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Job Role</label>
                            <input 
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="e.g. React Developer"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className={labelClass}>Annual Salary ($)</label>
                            <input 
                                name="salary"
                                type="number"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. 100000"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                        <button 
                            type="submit"
                            className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                        >
                            <Save size={20} />
                            {employee ? 'Save Changes' : 'Create Employee'}
                        </button>
                        <button 
                            type="button"
                            onClick={onCancel}
                            className={`px-8 py-4 rounded-2xl font-bold transition-all border ${
                                darkMode ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;
