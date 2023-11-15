const AdminDashboard = ({user}) => {
    return (
      <div className="p-4 sm:ml-64 text-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-white">
        <div class="dashboard_hero">
                <div class="content">
                    <h2 className="font-blod text-xl"> Dashboard </h2>
                    <span> Welcome, {user.email}</span>
                </div>
        </div>
      </div>
    );
  }
  
  export default AdminDashboard;