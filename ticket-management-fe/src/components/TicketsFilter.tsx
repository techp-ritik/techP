import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { filterTickets, getAllUsers } from "../api/baseapi";
import { TicketList } from "./Tickets/TicketBoard";
import { getAllCategories } from "../api/baseapi";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Usercontext } from "../App";
import { useState, useContext } from "react";

interface props {
  setLocalTickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}

export default function TicketsFilter({ setLocalTickets }: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
 

  const [params, setParams] = useState({
    priority: "",
    category: "",
    created_at: "",
    completed_at: "",
    query: "",
    user: "",
    assignee: "",
    admin_data: false,
  });
  let filters = [
    {
      key: "priority",
      value: params.priority,
    },
    {
      key: "category",
      value: params.category,
    },
    {
      key: "start_date",
      value: params.created_at,
    },
    {
      key: "end_date",
      value: params.completed_at,
    },
    {
      key: "query",
      value: params.query,
    },
    {
      key: "admin_data",
      value: params.admin_data,
    },
    {
      key: "user",
      value: params.user,
    },
    {
      key: "assignee",
      value: params.assignee,
    },
  ];

  const [categories, setCategories] = React.useState([]);
  const [userList, setUserList] = React.useState([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    getAllCategories().then((res) => {
      if (res && res.length > 0) {
        setCategories(res);
      } else {
        setCategories([]);
      }
    });
    getAllUsers().then((res) => {
      if (res && res.length > 0) {
        setUserList(res);
      } else {
        setUserList([]);
      }
    });
    filterTickets(filters).then((res) => {
      if (res && res.length > 0) {
        setLocalTickets(res);
      } else {
        setLocalTickets([]);
      }
    });
  }, [params]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  
  return (
    <div>
      <FilterIcon onClick={handleClick}>
        <FilterListIcon color="primary" />
      </FilterIcon>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Typography>
          <div
            style={{
              maxWidth: 700,
              padding: "10px",
              alignItems: "center",
            }}
          >
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 100, marginTop: "25px" }}
            >
              <TextField
                onChange={(e) => {
                  setParams({ ...params, query: e.target.value });
                }}
                sx={{ maxWidth: 200 }}
                id="standard-basic"
                placeholder="Search Ticket"
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                sx={{ minWidth: 200 }}
                id="demo-simple-select-standard"
                value={params.priority}
                onChange={(e) => {
                  setParams({ ...params, priority: e.target.value });
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                <MenuItem value={"high"}>High</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              {" "}
              <InputLabel id="demo-simple-select-standard-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                sx={{ minWidth: 200 }}
                id="demo-simple-select-standard"
                value={params.category}
                onChange={(e) => {
                  setParams({ ...params, category: e.target.value });
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {categories.length > 0 &&
                  categories.map((item: any) => {
                    return (
                      <MenuItem value={item.id}>
                        {item?.name.toUpperCase()}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
       
              <>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                  {" "}
                  <InputLabel id="demo-simple-select-standard-label">
                    Raised by
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    sx={{ minWidth: 200 }}
                    id="demo-simple-select-standard"
                    value={params.user}
                    onChange={(e) => {
                      setParams({ ...params, user: e.target.value });
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {userList.length > 0 &&
                      userList.map((item: any) => {
                       
                        return (
                          <MenuItem value={item.id}>
                            {item?.name.toUpperCase()}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                  {" "}
                  <InputLabel id="demo-simple-select-standard-label">
                    Assigned To
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    sx={{ minWidth: 200 }}
                    id="demo-simple-select-standard"
                    value={params.assignee}
                    onChange={(e) => {
                      setParams({ ...params, assignee: e.target.value });
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>

                    {userList.length > 0 &&
                      userList.map((item: any) => {
                       
                        return (
                          <MenuItem value={item.id}>
                            {item?.name.toUpperCase()}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
               
              </>
           

            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "grey",
                  fontWeight: "500",
                  marginBottom: "2px",
                }}
              >
                Start Date
              </label>
              <input
                value={params.created_at}
                style={{ padding: "5px" }}
                type="date"
                onChange={(e) => {
                  setParams({ ...params, created_at: e.target.value });
                }}
              />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
              <label
                style={{
                  fontSize: "12px",
                  color: "grey",
                  fontWeight: "500",
                  marginBottom: "2px",
                }}
              >
                End Date
              </label>
              <input
                style={{ padding: "5px", outline: "grey" }}
                type="date"
                value={params.completed_at}
                onChange={(e) => {
                  setParams({ ...params, completed_at: e.target.value });
                }}
              />
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, position: "relative", top: "5px" }}
            >
              <Button
                style={{ marginTop: "10px" }}
                size="large"
                onClick={() => {
                  setParams({
                    priority: "",
                    category: "",
                    created_at: "",
                    completed_at: "",
                    query: "",
                    admin_data: false,
                    assignee: "",
                    user: "",
                  });
                }}
                variant="text"
              >
                Clear
              </Button>
             
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, position: "relative", top: "5px" }}
            >
               <Button
                style={{ marginTop: "10px" }}
                variant="contained"
                size="medium"
                onClick={handleClose}
              >
                Close
              </Button>
            </FormControl>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
const FilterIcon = styled.span`
  cursor: pointer;
  padding: 5px;

  &:hover {
    background-color: #ebe8ff7b;
  }
`;
