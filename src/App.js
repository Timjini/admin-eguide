import './App.css';
import './styles/mobile.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './Authentication/SignIn';
import UserManagement from './Authentication/UserManagement';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Tours from './pages/Tours';
import Channels from './pages/Channels';
import MembersList from './pages/MembersList';
// import BroadcastPages from './pages/BroadCastPages';
import Sidebar from './components/Navigations/Sidebar';
import ChannelCreate from './agency/management/ChannelCreate';
import AdminAgencies from './pages/AdminAgencies';
import AdminTours from './pages/AdminTour';
import NewTable from './admin/views/NewTable';
import ActivateAccount from './Authentication/ActivateAccount';
import CreateAgency from './agency/management/CreateAgency';


function App() {

  const auth = useSelector(state => state.user);  
  console.log(auth)
  return (
    <BrowserRouter>
      {auth && auth.user && auth.user.agency  && <Sidebar />}
      <Routes>
        {auth && auth.user ? (
          auth.user.type === 'admin' ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/tours" element={<AdminTours />} />
              <Route path="/admin/channels" element={<Channels />} />
              <Route path="/admin/users" element={<MembersList />} />
              <Route path="/agency/channel/create" element={<ChannelCreate/>} />
              <Route path="/admin/agencies" element={<AdminAgencies/>} />
              <Route path="/admin/new" element={<NewTable />} />


              {/* Admin user routes */}
              {/* <Route path="/admin/" element={<AdminDashboard />} /> */}
              {/* <Route path="/admin/users" element={<AdminUsers />} /> */}
              {/* Add more admin routes as needed */}
            </>
          ) : (
            <>
              <Route path="/activate-account/create_agency" element={<CreateAgency />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/agency/tours/:agencyId" element={<Tours />} />
              <Route path="/agency/channels/:agencyId" element={<Channels />} />
              <Route path="/agency/members/:agencyId" element={<MembersList />} />
              <Route path="/members/:userId" element={<Profile/>} />
              <Route path="/agency/channel/create" element={<ChannelCreate/>} />
              {/* <Route path="/agency/tour/create" element={<ChannelCreate/>} /> */}
              {/* <Route path="/agency/member/create" element={<ChannelCreate/>} /> */}
            </>
          )
        ) : (
          <>
            <Route path="/sign_up" element={<UserManagement />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/activate-account" element={<ActivateAccount />} />
          </>
        )}
        <Route path="/*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
