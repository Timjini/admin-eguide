import DrawerForm from "../components/DrawerForm";
import React, { useState } from 'react';

const AgencyAdminDashboard = ({ user }) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <div className='content-wrapper'>
      <div className="p-4 flex flex-row flex-wrap mx-auto ml-4 md:ml-48 gap-5" >
        <a
          href="#"
          className="block max-w-sm p-6  border  rounded-lg shadow "
        >
          <div className="flex flex-row justify-between items-center	 dahboard_card_content">
            <div>
            <h5 className="mb-2 text-4xl font-bold tracking-tight ">
              37
            </h5>
            </div>
            <span className="material-symbols-outlined dahboard_icon">
                space_dashboard
              </span>
          </div>
          <p className="font-normal ">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in
            reverse chronological order.
          </p>
        </a>

        <a
          href="#"
          className="block max-w-sm p-6  border  rounded-lg shadow "
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight ">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal ">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in
            reverse chronological order.
          </p>
        </a>
          <a
            href="#"
            className="block max-w-sm p-6  border  rounded-lg shadow "
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight ">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal ">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in
              reverse chronological order.
            </p>
          </a>
      </div>
    </div>
  

  );
};

export default AgencyAdminDashboard;
