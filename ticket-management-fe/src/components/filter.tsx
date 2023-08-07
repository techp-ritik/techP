import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import FilterListIcon from "@mui/icons-material/FilterList";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { filterTickets, getAllTickets } from "../api/baseapi";
import { TicketList } from "./TicketBoard";
import { getAllCategories } from "../api/baseapi";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";

interface props {
  setLocalTickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}

export default function Filter({ setLocalTickets }: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [params, setParams] = React.useState({
    priority: "",
    category: "",
    created_at: "",
    completed_at: "",
    query:""
  });
  let filters = [
  
    {
      key: "priority",
      value: params.priority
    },
    {
      key: "category",
      value: params.category
    },
    {
      key: "start_date",
      value: params.created_at
    },
    {
      key: "end_date",
      value: params.completed_at
    },
    {
      key:"query",
      value:params.query
    }
  ];

  


  const [categories, setCategories] = React.useState([]);

  let api=`https://1a0a-103-177-83-247.ngrok-free.app/v1/tickets?${filters.map((item,index)=>{
    if(item.value!==''){
    let param= `${index==0?'':'&'}`+item.key +'=' + item.value
    return param
    }
    return '';
  })}`
  api=api.replaceAll(',','')
  console.log(api)
  React.useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res);
    });
  }, []);
  

  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

React.useEffect(()=>{
  filterTickets(api).then((res)=>{
    setLocalTickets(res)
  })
},[api])

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <span className="filter" onClick={handleClick}>
        <FilterListIcon color="primary" />
      </span>

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
                sx={{ minWidth: 150 }}
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

            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
              <TextField
                 onChange={(e) => {
                  setParams({ ...params, query: e.target.value });
                  
                }}
                id="standard-basic"
                label="Search Ticket"
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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
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
            <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
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
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
