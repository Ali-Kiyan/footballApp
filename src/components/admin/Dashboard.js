import React from 'react';
import AdminLayout from "../../HoC/AdminLayout";

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