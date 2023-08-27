import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignIn from './Authentication/SignIn';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element= {<Dashboard />} />
          <Route path="/sign_in" element= {<SignIn />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
