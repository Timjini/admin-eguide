import DrawerForm from "../components/DrawerForm";
import React, { useState } from 'react';

const AgencyAdminDashboard = ({ user }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className="content-wrapper">
        <span> Welcome Back {user.name}</span>
    </div>
  );
};

export default AgencyAdminDashboard;
