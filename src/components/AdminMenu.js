import React, { useState, useEffect, useRef } from 'react';
import {menuItems} from './NavbarMenu';
import {Link} from 'react-router-dom';
import {API_ROOT_PUBLIC} from '../constant';
import { useSelector } from'react-redux';

const AdminMenu = () => {

    const adminMenuItems = [
        {
            label: 'Channels',
            link: '/admin/channels',
            icon: (
              <span className="material-symbols-outlined">
              podcasts
              </span>
            ),
            className:''
          },
          {
            label: 'Tours',
            link: '/admin/tours',
            icon: (
              <span className="material-symbols-outlined">
              travel_explore
              </span>
            ),
            className:''
          },

    ]

return (
    <>
    { adminMenuItems.map((item, index) => (
        <li key={index} className={item.className}>
        <Link
          to={`${item.link}`}
          className="flex items-center p-2 rounded-lg  group"
        >
          {item.icon}
          <span className="ml-3 block xs:block lg:hidden xl:block ">{item.label}</span>
        </Link>
      </li>
    ))}

    </>
)

}

export default AdminMenu;