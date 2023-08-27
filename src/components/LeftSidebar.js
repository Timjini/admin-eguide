import React , {useState} from 'react';
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import '../styles/navbar.css'
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import LogoutIcon from '@mui/icons-material/Logout';
import Navbar from './Navbar';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const drawerWidth = 250;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
  },
}));

export default function RightSidebar({}) {
  const [isOpen, setIsOpen] = useState(true); // Control the open state

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the open state
  };
  return (
    <>
   <div style={{ display: 'flex' }}>
    <StyledDrawer
      variant="permanent"
      anchor="left"
      sx={{ boxShadow: 'none' }}
    >
      <List>
        <div className="logo-container">
          <a href="/">
          <img src="/images/logo.png" className='logo' />
          </a>
        </div>
        <div className="bar-card">

        </div>
        <ListItem className="sidebar-item">
          <ListItemIcon>
            <ConnectedTvIcon />
          </ListItemIcon>
          <ListItemText primary="Broadcast" />
        </ListItem>
        <ListItem className="sidebar-item">
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItem>
        <ListItem className="sidebar-item">
          <a href="/tours">
          <ListItemIcon>
            <AddLocationAltIcon />
          </ListItemIcon>
          </a>
          <ListItemText primary="Tour" />
        </ListItem>
        <ListItem className="sidebar-item">
          <a href="/profile" >
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          </a>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem className="sidebar-item">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </StyledDrawer>
    <div style={{ flex: 1 }}>
      <Navbar />
    </div>
    </div></>
  );
}