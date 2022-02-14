import React from "react";
import Drawer from "@mui/material/Drawer";
import { useHistory } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from '@mui/icons-material/Home';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import Typography from "@mui/material/Typography";


const drawerWidth = 240;
function NavBar({ logOut }) {
  const history = useHistory();

  const handleClickHome = () => {
    history.push("/");
}
  const handleClickTexts = () => {
    history.push("/books");
  }
  const handleClickUpload = () => {
    history.push("/upload");
  }
  const handleClickFC = () => {
    history.push("/flashcards");
  }

  return (
    <>
    
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          color: "black",
       
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#e4e4e4",

          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h4" align="center" fontWeight= 'light' padding= "20px" > reader</Typography>
        <Divider />
        <Toolbar />
        
      

        <List sx={{padding: "5px"}}>
   
          <ListItem sx={{ padding: "20px" }} button onClick={handleClickHome}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#333333" }} />
            </ListItemIcon>
            <Typography sx={{color: "black"}}>
              <ListItemText primary="Home" />
            </Typography>
          </ListItem>
          <Divider />
            {" "}
          <ListItem sx={{ padding: "20px" }} button onClick={handleClickTexts}>
            <ListItemIcon>

              <ImportContactsIcon sx={{ color: "#333333" }}/>

            </ListItemIcon>
            <Typography sx={{ color: "black" }}>
              <ListItemText primary="Texts" />
            </Typography>
          </ListItem>

          {/* <ListItem >  <ListItemIcon><MailIcon /></ListItemIcon> <NavLink className="navlink" to="/read">Story  </NavLink></ListItem> */}
          <Divider />
          <ListItem sx={{ padding: "20px" }} button onClick={handleClickUpload}>
            <ListItemIcon>

              <UploadFileOutlinedIcon sx={{ color: "#333333" }} />
              
            </ListItemIcon>
            <Typography sx={{ color: "black" }}>
              <ListItemText primary="Upload" />
            </Typography>
          </ListItem>
          <Divider />

          <ListItem sx={{ padding: "20px" }} button onClick={handleClickFC}>
            <ListItemIcon>

              <FontDownloadIcon sx={{ color: "#333333" }} />

            </ListItemIcon>
            <Typography sx={{ color: "black" }}>
              <ListItemText primary="Vocabulary" />
            </Typography>
          </ListItem>
        </List>

        <Divider />
      
      </Drawer>
    </>
  );
}

export default NavBar;
