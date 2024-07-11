import React, { useState, useEffect, useRef } from 'react';
import {menuItems} from './NavbarMenu';
import {Link} from 'react-router-dom';
import {API_ROOT_PUBLIC} from '../../constant';
import { useSelector } from'react-redux';


const UserMenu = ({reduxAgencyId}) => {
      // const reduxAgencyId = useSelector(state => state.user.user.agency._id);

      return (
        <>
        {menuItems.map((item, index) => (
            <li key={index} className={item.className}>
              <Link
                to={`${item.link}/${reduxAgencyId}`}
                className="flex items-center p-2 rounded-lg  group"
              >
                {item.icon}
                <span className="ml-3 block xs:hidden sm:hidden md:hidden lg:hidden xl:block ">{item.label}</span>
              </Link>
            </li>
          ))}
        </>

      )



}

export default UserMenu;