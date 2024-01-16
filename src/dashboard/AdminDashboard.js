const AdminDashboard = ({user}) => {
    return (
      <article className="">
        <div class="dashboard_hero">
                <div class="content">
                    <h2 className="font-blod text-xl"> Dashboard </h2>
                    <span> Welcome, {user.email}</span>
                </div>
        </div>
      </article>
    );
  }
  
  export default AdminDashboard;