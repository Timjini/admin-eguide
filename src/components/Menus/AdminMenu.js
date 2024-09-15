import React, { useState, useEffect, useRef } from 'react';
import {menuItems} from './NavbarMenu';
import {Link} from 'react-router-dom';
import {API_ROOT_PUBLIC} from '../../constant';
import { useSelector } from'react-redux';

const AdminMenu = () => {

    const adminMenuItems = [
      {
        label: 'Agencies',
        link: '/admin/agencies',
        icon: (
          <span className="material-symbols-outlined">
          domain_add
          </span>
        ),
        className:''
      },
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
          {
            label: 'Packages',
            link: '/admin/packages',
            icon: (
              <span className="material-symbols-outlined">
              card_membership
              </span>
            ),
            className:''
          },
          {
            label: 'All Users',
            link: '/admin/users',
            icon: (
              <span className="material-symbols-outlined">
              group
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
          <span className="ml-3 block xs:hidden sm:hidden md:hidden lg:block xl:block ">{item.label}</span>
        </Link>
      </li>
    ))}

    </>
)

}

export default AdminMenu;