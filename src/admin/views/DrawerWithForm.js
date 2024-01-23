import React, { useState } from 'react';
import {
    Button,
    } from "@material-tailwind/react";

const KpiCreationForm = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const addTask = () => {
    // Add your logic for adding another checklist item here
  };

  return (
    <div className="">
      <Button onClick={toggleDrawer} className="flex items-center gap-3 mb-2 primaryBtn rounded-lg px-4">
        Add Agency
      </Button>

      {/* Drawer component */}
      <div
        id="add-kpi-form"
        className={`fixed top-0 right-0 z-40 h-screen overflow-y-auto transition-transform formSideBar shadow ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } drawer`}
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
        style={{
            backdropFilter: isDrawerOpen ? 'blur(5px)' : 'none', // Apply blur when drawer is open
          }}
      >
        <div className='sidebarContent shadow h-full p-4'>

        <h2 id="drawer-right-label" className="inline-flex items-center mb-4 text-base font-semibold">
          Add KPI
        </h2>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="add-kpi-form"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
          {/* Your form content */}
          <form className="space-y-6 p-4 flex flex-col" id="kpi-form" style={{ minHeight: '70vh' }}>
            {/* ... (rest of your form) */}
          </form>
      </div>

        </div>
    </div>
  );
};

export default KpiCreationForm;
