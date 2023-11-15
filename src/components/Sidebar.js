import React, { useState, useEffect, useRef } from 'react';
import {menuItems} from './NavbarMenu';
import {Link} from 'react-router-dom';
import {API_ROOT_PUBLIC} from '../constant';
import { useSelector } from'react-redux';
import Logout from '../Authentication/Logout';

function Sidebar() {
  const user = useSelector(state => state.user); 

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
    <div>
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isSidebarOpen ? 'sm:translate-x-0' : '-translate-x-full sm:translate-x-0 hidden sm:block'
        }`}
        aria-label="Sidebar"
        ref={sidebarRef} // Reference to the sidebar element
      >
        <div className="h-full flex flex-col px-3 py-4 overflow-y-auto bg-purple-100 dark:bg-gradient-to-b from-gray-700 via-gray-900 to-black p-10">
          <div className="p-5">
            {/* <img src="/images/light-logo.png" alt="Logo" /> */}
            <span className="text-4xl font-bold text-gray-700 dark:text-white">E-Guide</span>
          </div>
          <ul className="space-y-2 font-medium p-2">
            {menuItems.map((item, index) => (
              <li key={index} className={item.class}>
                <Link
                  to={item.link}
                  className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:text-gray-700  hover:bg-gray-100 dark:hover:bg-gray-50 group"
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className=' p-2 mt-auto text-white'><Logout /></div>
        </div>
      </aside>
      <div className={`sm:ml-${isSidebarOpen ? '64' : '0'}`}>
     
     
      <nav class="bg-purple-100 dark:bg-gray-700 sm:block  dark:bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="relative flex h-16 items-center justify-between">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-50 dark:focus:ring-gray-600"
      >
        <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>
          </div>
          <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div class="flex flex-shrink-0 items-center">
              {/* Add image here */}
            </div>
            <div class="hidden sm:ml-6 sm:block">
              {/* Add links here */}
            
            </div>
          </div>
          <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" class="relative rounded-full dark:bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>

            <div class="relative ml-3">
              <div>
                <button type="button" class="relative flex rounded-full dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                  <span class="absolute -inset-1.5"></span>
                  <span class="sr-only">Open user menu</span>
                  <img class="h-10 w-10 rounded-full object-cover" src={`${API_ROOT_PUBLIC}/uploads/${user.user.avatar}`} alt=""/>
                </button>
              </div>
              <div class="hidden absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sm:hidden" id="mobile-menu">
        <div class="space-y-1 px-2 pb-3 pt-2">
          
        </div>
      </div>
    </nav>
      </div>
    </div>
  );
}

export default Sidebar;
