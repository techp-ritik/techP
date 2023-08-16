import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "@mui/material/Table";

import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import { useEffect } from "react";
import { deleteUserApi } from "../api/baseapi";
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
import { getAllUsers } from "../api/baseapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import TableSortLabel from "@mui/material/TableSortLabel";
import CreateUserModal from "./CreateUserForm";
import { Usercontext } from "../App";
import { Navigate } from "react-router-dom";
interface Column {
  id: "name" | "id" | "email" | "role" | "phone";

  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}
interface SortLabels {
  data: "name" | "id" | "email";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 150 },
  { id: "role", label: "Role", minWidth: 150 },
  { id: "phone", label: "Phone", minWidth: 150 },

  { id: "id", label: "Actions", minWidth: 100 },
];

export type Data = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: number;

  actions: any;
};

export default function Users() {
  const User =React.useContext(Usercontext).user.user;
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchList, setSearchList] = useState("");
  const [sortBy, setSortBy] = useState<
    "name" | "email" | "id" | "phone" | "role"
  >("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [Userlist, setUserList] = useState<Data[]>([]);

  useEffect(() => {
    getAllUsers().then((res) => {
      if (res && res.length > 0) {
        const sortedUsers = res.sort((a: Data, b: Data) => a.id - b.id);

        setUserList(sortedUsers);
      } else {
        setUserList([]);
      }
    });
  }, []);

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchList(query);
    setPage(0);
  };

  const handleSort = (property: "name" | "email" | "id" | "role" | "phone") => {
    const isAsc = sortBy === property && sortOrder === "asc";

    if (property === "email") {
      setUserList((prevList) =>
        [...prevList].sort((a, b) => {
          return isAsc
            ? a.email
                .toLocaleLowerCase()
                .localeCompare(b.email.toLocaleLowerCase())
            : b.email
                .toLocaleLowerCase()
                .localeCompare(a.email.toLocaleLowerCase());
        })
      );
    } else {
      setUserList((prevList) =>
        [...prevList].sort((a, b) => {
          if (property === "name") {
            return isAsc
              ? a.name
                  .toLocaleLowerCase()
                  .localeCompare(b.name.toLocaleLowerCase())
              : b.name
                  .toLocaleLowerCase()
                  .localeCompare(a.name.toLocaleLowerCase());
          } else if (property === "id") {
            return isAsc ? a.id - b.id : b.id - a.id;
          }
          return 0;
        })
      );
    }

    setSortBy(property);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const clearForm = {
    id: 0,
    name: "",
    email: "",
    role: "Select Role*",
    phone: 0,

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
    const handleClose = () => {
      setOpen(false);
    };

    const deleteUser = async (id: number) => {
      try {
        const response = await deleteUserApi(id);
        if (response === 200) {
          getAllUsers()
            .then((res) => {
              const sortedusers = res.sort((a: Data, b: Data) => a.id - b.id);
              setUserList(sortedusers);

              toast("User Deleted Successfully", {
                theme: "light",
                autoClose: 1500,
                position: "top-right",
              });
              handleClose();
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
            });
        } else if (response === 404) {
          toast("Invalid Id", {
            theme: "light",
            autoClose: 1500,
            position: "top-right",
          });
        }
      } catch (error) {
        toast("Error occured while deleting ticket");
      }
    };

    return (
      <div>
        <Dialog
          sx={{ borderRadius: "20px" }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Do you want to delete this User?"}</DialogTitle>
          <DialogContent sx={{ marginTop: "15px" }}>
            <DialogContentText id="alert-dialog-slide-description">
              Name: {user.name}
            </DialogContentText>
            <DialogContentText id="alert-dialog-slide-description">
              Email: {user.email}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              color="error"
              onClick={() => {
                deleteUser(user.id);
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
    <>{User.role!=="admin" && <Navigate to={"/dashboard"} replace />}
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
          value={searchList}
          placeholder="Search User"
          onChange={handleSearchQueryChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={() => setSearchList("")}
                  sx={{ cursor: "pointer" }}
                />
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
                    {column.id === "name" || column.id === "email" ? (
                      <TableSortLabel
                        active={sortBy === column.id}
                        direction={sortOrder}
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Userlist.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="left">
                    No users to display.
                  </TableCell>
                </TableRow>
              ) : (
                Userlist.filter(
                  (item) =>
                    item.name.toLowerCase().includes(searchList) ||
                    item.email.toLowerCase().includes(searchList) ||
                    item.role.toLowerCase().includes(searchList)
                )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          return (
                            <TableCell
                              key={column.id}
                              align={"center"}
                              onClick={() => {
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
                  })
              )}
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
