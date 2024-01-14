const AgencyAdminDashboard = ({user}) => {
  return (
    <div className="p-4 sm:ml-64 ">
        <div className="content-wrapper">
        <span> Welcome Back {user.name}</span>
        </div>
    </div>
  );
}

export default AgencyAdminDashboard;  