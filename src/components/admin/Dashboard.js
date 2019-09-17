import React from 'react';
import AdminLayOut from "../../HOC/AdminLayout";
import AdminLayout from '../../HOC/AdminLayout';

const Dashboard = () => {
    return (
       <AdminLayout>
            <div className="user_dashboard">
                <div>
                    this is the dashboard
                </div>
            </div>
       </AdminLayout>
    );
};

export default Dashboard;