import React from 'react';
import { LayoutDashboard, Users, UserPlus, Settings, LogOut, Moon, Sun } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, darkMode, setDarkMode }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'employees', label: 'All Employees', icon: Users },
        { id: 'add', label: 'Add Employee', icon: UserPlus },
    ];

    return (
        <div className={`h-screen w-64 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r flex flex-col transition-colors duration-300`}>
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
                        E
                    </div>
                    <span className={`font-bold text-xl tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>ManageX</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                            activeTab === item.id
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                                : darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                        }`}
                    >
                        <item.icon size={20} />
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-800/10 dark:border-slate-800">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        darkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                    }`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium mt-2 text-slate-400 hover:text-rose-500 transition-all`}>
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
