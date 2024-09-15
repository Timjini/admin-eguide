import React from "react";
import { TableCell } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import { API_ROOT_PUBLIC } from "../../constant";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';



const MemberAvatars = ({ members = [] }) => {
  const navigate = useNavigate(); 

//   const color = (status) => {
//     switch (status) {
//       case "online":
//         return "#44b700";
//       case "offline":
//         return "#d32f2f";
//       case "away":
//         return "#ffa000";
//       default:
//         return "#000";
//     }
//   };

  const statusColors = {
    online: '#44b700',  
    offline: '#d32f2f',
    away: '#ffa000', 
  };

  const StyledBadge = styled(Badge)(({ theme , color }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: color,
      color: color,
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

  const handleAvatarClick = (memberId) => {
    // Navigate to the member's profile page (or any other action)
    navigate(`/admin/profile/${memberId}`);
  };

  const validMembers = Array.isArray(members)
    ? members.filter((member) => member && member.avatar)
    : [];

  return (
    <TableCell className="p-4">
      <AvatarGroup max={4}>
        {validMembers.map((member) => (
          <IconButton
            key={member._id}
            onClick={() => handleAvatarClick(member._id)}
            aria-label={member.name || "Unknown"}
            style={{ padding: 0 }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color={statusColors[member.status] || "default"}
            >
              <Avatar
                alt={member.name || "Unknown"}
                src={
                  member.avatar
                    ? `${API_ROOT_PUBLIC}uploads/${member.avatar}`
                    : undefined
                }
              />
            </StyledBadge>
          </IconButton>
        ))}
      </AvatarGroup>
    </TableCell>
  );
};

export default MemberAvatars;
