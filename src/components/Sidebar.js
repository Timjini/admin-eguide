import React, { useState, useEffect, useRef } from 'react';
import {menuItems} from './NavbarMenu';
import {Link} from 'react-router-dom';
import {API_ROOT_PUBLIC} from '../constant';
import { useSelector } from'react-redux';
import Logout from '../Authentication/Logout';

function Sidebar() {
  const user = useSelector(state => state.user); 
  const reduxAgencyId = useSelector(state => state.user.user.agency._id);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };



  useEffect(() => {
    // Add the event listener when the component mounts
    document.addEventListener('mousedown', closeSidebar);
    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener('mousedown', closeSidebar);
    };
  }, []);


  return (

    <>
    <nav className="navigation">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center ">
            <button
          onClick={toggleSidebar}
          className="items-center p-2 mt-2 ml-3 text-sm  rounded-lg inline-flex  md:inline-flex  lg:inline-flex  xl:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200  dark:focus:ring-gray-600"
        >
          <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* Add image here */}
              </div>
              <div className="hidden sm:ml-6 sm:block">
                {/* Add links here */}
              
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button type="button" className="relative rounded-full  p-1   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strockWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button type="button" className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img className="h-10 w-10 rounded-full object-cover" src={`${API_ROOT_PUBLIC}/uploads/${user.user.avatar}`} alt=""/>
                  </button>
                </div>
                <div className="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                  <a href="#" className="block px-4 py-2 text-sm " role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm " role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                  <a href="#" className="block px-4 py-2 text-sm " role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            
          </div>
        </div>
    </nav>
    
    <div className="">
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 md:w-24 lg:w-24 xl:w-64 h-screen transition-transform  ${
          isSidebarOpen ? 'sm:translate-x-0' : '-translate-x-full sm:translate-x-0 hidden lg:block'
        }`}
        aria-label="Sidebar"
        ref={sidebarRef} // Reference to the sidebar element
      >
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto p-10">
          <div className="p-5 hidden md:hidden lg:hidden xl:block">
            <img className='rounded-full h-auto w-24' src="/images/eguide-logo.png" alt="Logo" />
            {/* <h2 className="text-4xl font-bold ">E-Guide</h2><label className="text-sm text-italic">Solutions</label> */}
          </div>
          <div className="p-5 block md:block lg:block xl:hidden">
          <img className='rounded-full h-auto w-12' src="/images/eguide-logo.png" alt="Logo" />
            {/* <h2 className="text-2xl font-bold ">EG</h2> */}
          </div>

          <ul className="space-y-2 font-medium p-4">
            <li>
              <Link to="/" className="flex items-center p-2 rounded-lg  group">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ml-3 block xs:block lg:hidden xl:block ">Dashboard</span>
              </Link>
            </li>
            {menuItems.map((item, index) => (
              <li key={index} className={item.className}>
                <Link
                  to={`${item.link}/${reduxAgencyId}`}
                  className="flex items-center p-2 rounded-lg  group"
                >
                  {item.icon}
                  <span className="ml-3 block xs:block lg:hidden xl:block ">{item.label}</span>
                </Link>
              </li>
            ))}

            <li>
              <Link to="/profile" className="flex items-center p-2 rounded-lg  group">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strockWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
                <span className="ml-3 block xs:block lg:hidden xl:block ">Profile</span>
              </Link>
            </li>

          </ul>
          <div className=' p-2 mt-auto'><Logout /></div>
        </div>
      </aside>
      <div className={`sm:ml-${isSidebarOpen ? '64' : '0'}`}>
      </div>
    </div>
    </>
  );
}

export default Sidebar;
