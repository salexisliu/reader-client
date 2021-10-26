import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";

import MailIcon from "@mui/icons-material/Mail";


import AppBar from "@mui/material/AppBar";


import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";


const drawerWidth = 240;
function NavBar({ logOut }) {
  return (
    <>
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
         
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem>
            {" "}
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <NavLink className="navlink" to="/">
              Home
            </NavLink>{" "}
          </ListItem>

          <ListItem>
            {" "}
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>{" "}
            <NavLink className="navlink" to="/books">
              Texts{" "}
            </NavLink>{" "}
          </ListItem>

          {/* <ListItem >  <ListItemIcon><MailIcon /></ListItemIcon> <NavLink className="navlink" to="/read">Story  </NavLink></ListItem> */}

          <ListItem>
            {" "}
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>{" "}
            <NavLink className="navlink" to="/upload">
              Import Texts{" "}
            </NavLink>
          </ListItem>
          <ListItem>
            {" "}
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>{" "}
            <NavLink className="navlink" to="/flashcards">
              Vocabulary{" "}
            </NavLink>
          </ListItem>
        </List>
        <Divider />
      
      </Drawer>
    </>
  );
}

export default NavBar;
