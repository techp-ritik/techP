import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DialogTitle } from "@mui/material";
import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "./Users";


const style = {
  position: "absolute" as "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  bgcolor: "background.paper",
  borderRadius: "8px",
  padding: "0px 0px 20px 0px",
};
interface list {
  UserList: Data[];
  setUserList: React.Dispatch<React.SetStateAction<Data[]>>;
  user: Data;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: string;
      name: string;
      email: string;
      username: string;
      phone: string;
      ticketsCreated: number;
      ticketsAssigned: number;

      actions: string;
    }>
  >;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CreateUserModal({
  setUserList,
  UserList,
  openModal,
  setOpenModal,
  user,
  setUser,
}: list) {
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

  // const addUser = async () => {
  //   fetch("ticketapi/UserList", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       username: user.username,
  //       phone: user.phone,
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((newData) => {
  //       setUserList([...UserList, newData]);
  //     });
  // };

  const handleSubmit = () => {
    if (user.id == "") {
      let newUser = user;
      newUser.id = `#${UserList.length + 1}`;
      let newUserData = [...UserList, newUser];
      setUserList(newUserData);
      setOpenModal(false);
      //addUser()
      toast("User Data Added Successfully", { theme: "light" });
    } else {
      let res = UserList.map((list) => {
        return list.id === user.id
          ? {
              ...list,
              name: user.name,
              email: user.email,
              username: user.username,
              phone: user.phone,
            }
          : list;
      });
      setUserList(res);
      setOpenModal(false);
      toast("User Updated Successfully", { theme: "light" });
    }
    setUser(clearForm);
  };

  return (
    <div>
      <ToastContainer position="top-center" autoClose={2000} />

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle
            sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
          >
            {" "}
            {/* <AccountCircleIcon sx={{ position: "relative", top: "5px" }} /> */}
            {user.id == "" ? "Create User" : "Update User"}
          </DialogTitle>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <form className="user_create_form">
                <div>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    value={user.name}
                    onChange={(e) => {
                      setUser({ ...user, name: e.target.value });
                    }}
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="outlined-required"
                    type="email"
                    label="Email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    defaultValue=""
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="User Name"
                    defaultValue=""
                    value={user.username}
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    defaultValue=""
                    value={user.phone}
                    onChange={(e) => {
                      setUser({ ...user, phone: e.target.value });
                    }}
                  />
                </div>
                <div style={{ textAlign: "end", padding: "10px" }}>
                  <Button
                    style={{ marginTop: "10px" }}
                    size="large"
                    type="submit"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    variant="text"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ marginTop: "10px" }}
                    size="large"
                    onClick={() => {
                      handleSubmit();
                    }}
                    variant="contained"
                  >
                    {user.id == "" ? "Create User" : "Update "}
                  </Button>
                </div>
              </form>
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
