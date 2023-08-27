import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './Authentication/SignIn';
import { useSelector } from 'react-redux';
import UserManagement from './Authentication/UserManagement';
import Navbar from './components/Navbar';
import LeftSideBar from './components/LeftSidebar';
import Profile from './pages/Profile';
import Tours from './pages/Tours';


function App() {

  const user = useSelector(state => state.user);
  

  return (
    <>
      <BrowserRouter>
      {user && user.user && <LeftSideBar />}
      <Routes>
        {user && user.user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tours" element={<Tours />} />
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
