import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeForm from './pages/EmployeeForm';

function App() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(true);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setActiveTab('edit');
    };

    const handleSuccess = () => {
        setEditingEmployee(null);
        setActiveTab('employees');
    };

    return (
        <div className={`flex min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} font-sans transition-colors duration-300`}>
            {/* Sidebar */}
            <Sidebar 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                darkMode={darkMode} 
                setDarkMode={setDarkMode} 
            />

            {/* Main Content */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    {activeTab === 'dashboard' && <Dashboard darkMode={darkMode} />}
                    
                    {activeTab === 'employees' && (
                        <EmployeeList 
                            darkMode={darkMode} 
                            onEdit={handleEdit} 
                        />
                    )}
                    
                    {(activeTab === 'add' || activeTab === 'edit') && (
                        <EmployeeForm 
                            darkMode={darkMode} 
                            employee={editingEmployee} 
                            onCancel={() => {
                                setEditingEmployee(null);
                                setActiveTab('employees');
                            }}
                            onSuccess={handleSuccess}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
