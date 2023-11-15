import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignIn from './Authentication/SignIn';
import { useSelector } from 'react-redux';
import UserManagement from './Authentication/UserManagement';
import Profile from './pages/Profile';
import Tours from './pages/Tours';
import Channels from './pages/Channels';
import Sidebar from './components/Sidebar';
import MembersList from './pages/MembersList';


function App() {

  const user = useSelector(state => state.user);
  console.log(user);
  

  return (
    <>
      <BrowserRouter>
      {user && user.user && <Sidebar />}
      <Routes>
        {user && user.user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/members" element={<MembersList />} />
          </>
        ) : (
          <>
            <Route path="/sign_up" element={<UserManagement />} />
            <Route path="/login" element={<SignIn />} />
          </>
        )}
        <Route path="/*" element={<SignIn />} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
