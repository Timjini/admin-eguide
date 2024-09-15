import React from 'react';
import { TableCell } from '@mui/material';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'; // Import IconButton
import { API_ROOT_PUBLIC } from '../../constant';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const MemberAvatars = ({ members = [] }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleAvatarClick = (memberId) => {
    // Navigate to the member's profile page (or any other action)
    navigate(`/profile/${memberId}`);
  };

  const validMembers = Array.isArray(members)
    ? members.filter(member => member && member.avatar)
    : [];

  return (
    <TableCell className="p-4">
      <AvatarGroup max={4}>
        {validMembers.map((member) => (
          <IconButton
            key={member._id}
            onClick={() => handleAvatarClick(member._id)}
            aria-label={member.name || 'Unknown'}
            style={{ padding: 0 }} // Remove default padding
          >
            <Avatar
              alt={member.name || 'Unknown'}
              src={member.avatar ? `${API_ROOT_PUBLIC}uploads/${member.avatar}` : undefined}
            />
          </IconButton>
        ))}
      </AvatarGroup>
    </TableCell>
  );
};

export default MemberAvatars;
