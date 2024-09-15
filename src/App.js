import './App.css';
import './styles/mobile.css';
import { HashRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
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
import AllChannels from './admin/views/AllChannel';
import ErrorPage from './pages/ErrorPage';
import AgencyPage from './agency/views/AgencyPage';
import TourPage from './agency/views/TourPage';
import UserProfile from './agency/views/UserProfile';
import PackagesPage from './pages/PackagesPage';
import PackagePage from './admin/views/PackagePage';
import Subscribe from './components/OffCanvas/Subscribe';
import RequestPage from './pages/RequestPage';

function App() {
  const auth = useSelector(state => state.user);  
  let agencyInactive 
  if(auth && auth.user && auth.user.agency){
    agencyInactive = auth.user.agency.status === 'inactive'
  }
  return (
    <BrowserRouter>
      {agencyInactive && (
        <Subscribe />
      )}
      <div className='ml-0 2xl:ml-36 xl:ml-32 lg:ml-5'>{auth && auth.user &&  <Sidebar />}</div>
      <Routes>
        {auth && auth.user ? (
          auth.user.type === 'admin' ? (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/tours" element={<AdminTours />} />
              <Route path="/admin/channels" element={<AllChannels />} />
              <Route path="/admin/users" element={<MembersList />} />
              <Route path="/agency/channel/create" element={<ChannelCreate/>} />
              <Route path="/admin/agencies" element={<AdminAgencies/>} />
              <Route path="/admin/agencies/:agencyId" element={<AgencyPage/>} />
              <Route path="/admin/new" element={<NewTable />} />
              <Route path="admin/profile/:userId" element={<UserProfile/>} />
              <Route path="admin/packages" element={<PackagesPage/>} />
              <Route path="/tour/:tourId" element={<TourPage/>} />
              <Route path="admin/packages/:packageId" element={<PackagePage/>} />

            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/agency/tours/:agencyId" element={<Tours />} />
              <Route path="/agency/channels/:agencyId" element={<Channels />} />
              <Route path="/agency/members/:agencyId" element={<MembersList />} />
              <Route path="/members/:userId" element={<Profile/>} />
              <Route path="/agency/channel/create" element={<ChannelCreate/>} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/tour/:tourId" element={<TourPage/>} />

            </>
          )
        ) : (
          <>
           <Route path="/request-account" element={<RequestPage />} />
            <Route path="/activate-account/create_agency" element={<CreateAgency />} />
            <Route path="/activate-account" element={<ActivateAccount />} />
            <Route path="/sign_up" element={<UserManagement />} />
            <Route path="/login" element={<SignIn />} />
          </>
        )}
        <Route path="/*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
