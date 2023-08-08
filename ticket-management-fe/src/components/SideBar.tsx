import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";

type Anchor = "top" | "left" | "bottom" | "right";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      onClose();
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        borderRadius: "0px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListSubheader
        component="div"
        sx={{
          textAlign: "center",
          backgroundColor: "#3f51b5",
          color: "white",
          display: "flex",
          alignItems: "center",
          height: "64px",
        }}
      >
        TICKET MANAGEMENT SYSTEM
      </ListSubheader>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0, paddingTop: 2 }}>
          <Link
            to="/categories"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem sx={{ padding: 0, paddingTop: 2 }}>
          <Link
            to="/users"
            style={{ textDecoration: "none", color: "black", width: "100%" }}
          >
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>

      <Divider />
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={isOpen && anchor === "left"}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
