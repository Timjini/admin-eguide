import React from 'react';
import {useSelector} from 'react-redux';

export const menuItems = [

  {
    label: 'Channels',
    link: '/agency/channels',
    icon: (
      <span className="material-symbols-outlined">
      podcasts
      </span>
    ),
    className:''
  },
  {
    label: 'Tours',
    link: '/agency/tours',
    icon: (
      <span className="material-symbols-outlined">
      travel_explore
      </span>
    ),
    className:''
  },
  {
    label: 'Members',
    link: '/agency/members',
    icon: (
      <span className="material-symbols-outlined">
      group
      </span>
    ),
    className:''
  },

];
