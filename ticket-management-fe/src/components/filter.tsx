import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterListIcon from "@mui/icons-material/FilterList";
import InputLabel from "@mui/material/InputLabel";
import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { filterTickets, getAllTickets } from "../api/baseapi";
import { TicketList } from "./TicketBoard";
import { validate } from "@babel/types";
import { getAllCategories } from "../api/baseapi";

interface props {
  setLocalTickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}

export default function Filter({ setLocalTickets }: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [filterData, setFilterData] = React.useState({
    priority: "all",
    category: "all",
    created_at: "",
    completed_at: "",
  });

  const [priority, setPriority] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [createDate, setcreateDate] = React.useState("");
  const [completeDate, setCompleteDate] = React.useState("");

  React.useEffect(() => {
    getAllCategories().then((res) => {
      if (res && res.length > 0) {
        setCategories(res);
      } else {
        // If res is null or the array is empty, set the state with an empty array.
        setCategories([]);
        // toast.error("Error occured while fetching categories ", {
        //   theme: "dark",
        //   autoClose: false, // Set autoClose to false to keep the toast open
        //   position: "top-center",
        //   closeOnClick: true, // Allow users to close the toast by clicking
        // });
        // console.log("Error fetching Tickets");
      }

      // setCategories(res);
    });
  }, []);

  console.log(categories);
  const handleChange = (event: SelectChangeEvent) => {
    let priority = event.target.value;

    if (event.target.value != "all") {
      filterTickets("priority", priority).then((res) => {
        setLocalTickets(res);
      });
    } else {
      getAllTickets().then((res) => {
        setLocalTickets(res);
      });
    }
    handleClose();
  };
  const handleChangeCategories = (event: SelectChangeEvent) => {
    let category = event.target.value;
    console.log(category);
    if (category !== "all") {
      console.log(category);
      filterTickets("category", category).then((res) => {
        setLocalTickets(res);
      });
    } else {
      console.log(category);
      getAllTickets().then((res) => {
        setLocalTickets(res);
      });
    }
    handleClose();
  };
  const handleChangeDate = (event: SelectChangeEvent) => {
    console.log(filterData.created_at);
    handleClose();
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span className="filter" onClick={handleClick}>
        <FilterListIcon color="primary" />
      </span>

      {/* <Button
        startIcon={<FilterListIcon color="primary" />}
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
      ></Button> */}
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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Priority
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                sx={{ minWidth: 150 }}
                id="demo-simple-select-standard"
                value={filterData.priority}
                onChange={(e) => {
                  handleChange(e);
                  setFilterData({ ...filterData, priority: e.target.value });
                }}
                label="Age"
              >
                <MenuItem value="all">
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
                sx={{ minWidth: 150 }}
                id="demo-simple-select-standard"
                value={filterData.category}
                onChange={(e) => {
                  setFilterData({ ...filterData, category: e.target.value });
                  handleChangeCategories(e);
                }}
                label="Age"
              >
                <MenuItem value="all">
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
            {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <label style={{fontSize:"12px" ,color:"grey",fontWeight:"500",marginBottom:"2px"}}>
                Start Date
                </label>
            <input
                style={{padding:"5px",outline:"grey"}}
                type="date"
                onChange={(e) => {
                  setFilterData({...filterData,created_at:e.target.value})
                  handleChangeDate(e);
                }}
              />
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <label style={{fontSize:"12px" ,color:"grey",fontWeight:"500",marginBottom:"2px"}}>
                End Date 
                </label>
            <input
                style={{padding:"5px",outline:"grey"}}
                type="date"
                onChange={(e) => {
                  filterTickets("created_at",e.target.value).then((res)=>{
                    console.log(e.target.value)
                    console.log(res)
                  })
                }}
              />
              </FormControl> */}
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
