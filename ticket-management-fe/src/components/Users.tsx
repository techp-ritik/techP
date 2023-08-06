import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import CreateUserModal from "./CreateUserForm";

interface Column {
  id:
    | "name"
    | "id"
    | "email"
    | "username"
    | "phone"
    | "ticketsCreated"
    | "ticketsAssigned";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "username", label: "Username", minWidth: 150 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "ticketsCreated", label: "Tickets Created", minWidth: 100 },
  { id: "ticketsAssigned", label: "Tickets Assigned", minWidth: 100 },
  { id: "id", label: "Actions", minWidth: 100 },
];

export type Data = {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  ticketsCreated: number;
  ticketsAssigned: number;
  actions: any;
};

export default function Users() {
  // useEffect(() => {
  //   fetch(`ticketapi/UserList`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUserList(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchList, setSearchList] = useState("");
  const [Userlist, setUserList] = useState<Data[]>([
    {
      id: "#1",
      name: "Utkarsh",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
    {
      id: "#2",
      name: "Ram",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
    {
      id: "#3",
      name: "Atharv",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
    {
      id: "#4",
      name: "Varun",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
    {
      id: "#5",
      name: "Shyam",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
    {
      id: "#6",
      name: "Aditya",
      email: "sethiyautkarsh@gmail.com",
      username: "utkarsh111",
      phone: "9999999999",
      ticketsCreated: 5,
      ticketsAssigned: 7,
      actions: "",
    },
  ]);
  const clearForm = {
    id: "",
    name: "",
    email: "",
    username: "",
    phone: "",
    ticketsCreated: 0,
    ticketsAssigned: 0,
    actions: "",
  };
  const [user, setUser] = useState(clearForm);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);

  function DeleteModal() {
    // const deleteUserHandler = (user.id) => {
    //   fetch(`ticketsapi/users/${user.id}`, {
    //     method: "DELETE",
    //   }).then(()=>{
    //     setUserList(
    //       Userlist.filter((list) => {
    //         return list.id !== user.id;
    //       })
    //     )
    //   }

    //   );

    //   setUser(clearForm)
    //   toast("User Deleted Deleted Successfully", { theme: "light" });
    // };
    const handleClose = () => {
      setOpen(false);
    };
    const deleteUser = () => {
      let newList = Userlist.filter((list) => {
        return list.id !== user.id;
      });
      //deleteUserHandler();
      setUserList(newList);
      toast("User Deleted Successfully", { theme: "light" });
      handleClose();
    };

    return (
      <div>
        <ToastContainer position="top-center" autoClose={1000} />
        <Dialog
          sx={{ borderRadius: "20px" }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Do you want to delete this user ?"}</DialogTitle>
          <DialogContent sx={{ marginTop: "15px" }}>
            <DialogContentText id="alert-dialog-slide-description">
              Name- {user.name}
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Email- {user.email}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              color="error"
              onClick={() => {
                deleteUser();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <>
      <DeleteModal />
      <div style={{ textAlign: "end", margin: "20px" }}>
        <CreateUserModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          user={user}
          setUser={setUser}
          setUserList={setUserList}
          UserList={Userlist}
        />
      </div>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "22px",
          alignItems: "center",
        }}
      >
        <TextField
          type="text"
          style={{ marginRight: "1px" }}
          sx={{ width: "300px" }}
          id="search"
          name="search"
          placeholder="Search User"
          onChange={(e) => {
            setSearchList(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          onClick={() => {
            setOpenModal(true);
            setUser(clearForm);
          }}
          variant="contained"
        >
          Add New User
        </Button>
      </Typography>
      <Typography className="table" sx={{ margin: "20px" }}>
        <TableContainer sx={{ maxHeight: 480, borderRadius: "10px" }}>
          <Table stickyHeader aria-label="sticky customized table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      background: "#d4d4d4",
                      color: "black",
                      fontWeight: "600",
                    }}
                    key={column.id}
                    align={"center"}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Userlist.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
                .filter((item) => {
                  return searchList.toLowerCase() === ""
                    ? item
                    : item.name
                        .toLowerCase()
                        .includes(searchList.toLowerCase());
                })
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            key={column.id}
                            align={"center"}
                            onClick={() => {
                              console.log(row);
                              setUser(row);
                              if (column.label !== "Actions") {
                                setOpenModal(true);
                              }
                            }}
                          >
                            {column.label === "Actions" ? (
                              <Button
                                sx={{ color: "crimson" }}
                                onClick={() => {
                                  setOpen(true);
                                  setUser(row);
                                }}
                                startIcon={<DeleteIcon />}
                              ></Button>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={Userlist.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Typography>
    </>
  );
}
