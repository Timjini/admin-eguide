import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UsersTable from '../admin/views/UsersTable'
import AgencyMembers from '../agency/views/AgencyMembers';
import MemberDashboard from '../dashboard/MemberDashboard';
import { useParams } from 'react-router-dom';


export default function Dashboard(props) {
  const user = useSelector(state => state.user.user);

  switch (user.type) { 
    case 'admin':
      return <UsersTable  user={user}/>;
    case 'owner':
      return <AgencyMembers user={user} />;
    default:
      return <MemberDashboard  user={user}/>;
  }

}
