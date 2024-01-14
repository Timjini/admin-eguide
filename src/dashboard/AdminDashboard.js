const AdminDashboard = ({user}) => {
    return (
      <div className="p-4 sm:ml-64 ">
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