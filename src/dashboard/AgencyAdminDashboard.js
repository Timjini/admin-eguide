const AgencyAdminDashboard = ({user}) => {
  return (
    <div className="p-4 sm:ml-64 text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white">
        <span> Welcome Back {user.name}</span>
    </div>
  );
}

export default AgencyAdminDashboard;  