import React from "react";
import IconButton from "@mui/material/IconButton"; // Import IconButton
import { API_ROOT_PUBLIC } from "../../constant";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { Avatar } from "@mui/material";

const CustomAvatar = (user) => {
  console.log("user", user);
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

  const statusColors = {
    online: '#44b700',  
    offline: '#d32f2f',
    away: '#ffa000', 
  };

  console.log(`${API_ROOT_PUBLIC}uploads/${user.user.avatar}`);

    return (
        <IconButton
        key={user._id}
        // onClick={() => handleAvatarClick(user._id)}
        aria-label={user?.user.name || "Unknown"}
        style={{ padding: 0 }}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          color={statusColors[user?.user.status] || "default"}
        >
          <Avatar
            alt={user.name || "Unknown"}
            src={
                user?.user.avatar
                ? `${API_ROOT_PUBLIC}uploads/${user.user.avatar}`
                : undefined
            }
          />
        </StyledBadge>
      </IconButton>
    )
}

export default CustomAvatar;