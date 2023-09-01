import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DialogTitle } from "@mui/material";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { editUser } from "../api/baseapi";
import "react-toastify/dist/ReactToastify.css";
import { createUser, getAllUsers } from "../api/baseapi";

import { Data } from "./Users";
import { TicketList } from "./Tickets/TicketBoard";

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
export interface list {
  UserList: Data[];
  setUserList: React.Dispatch<React.SetStateAction<Data[]>>;
  user: Data;
  setUser: React.Dispatch<
    React.SetStateAction<{
      id: number;
      name: string;
      email: string;
      role: string;
      phone: number;

      actions: string;
    }>
  >;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function User({
  setUserList,
  UserList,
  openModal,
  setOpenModal,
  user,
  setUser,
}: list) {
  const clearForm = {
    id: 0,
    name: "",
    email: "",
    role: "Select Role*",
    phone: 0,

    actions: "",
  };

  const handleSubmit = async () => {
    if (!user.name || !user.email || !user.phone || !user.role) {
      toast.error("Fields cannot be empty", {
        theme: "light",
        autoClose: 1500,
        position: "top-right",
      });
      return;
    }
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(user.name)) {
      toast.error("Name can only contain leters", {
        theme: "light",
        autoClose: 1500,
        position: "top-right",
      });
      return;
    }

    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com)$/i;

    if (!emailPattern.test(user.email)) {
      toast.error("Invalid email format", {
        theme: "light",
        autoClose: 1500,
        position: "top-right",
      });
      return;
    }

    if (user.role === "Select Role*") {
      toast.error("Select User Role", {
        theme: "light",
        autoClose: 1500,
        position: "top-right",
      });
      return;
    }

    if (
      user.phone.toString().length > 10 ||
      user.phone.toString().length < 10
    ) {
      toast.error("Contact Number must be exactly 10 digits", {
        theme: "light",
        autoClose: 1500,
        position: "top-right",
      });
      return;
    }

    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
    };

    if (user.id === 0) {
      try {
        const response = await createUser(userData);

        if (response === 201) {
          getAllUsers()
            .then((res: Data[]) => {
              const sortedusers = res.sort((a: Data, b: Data) => a.id - b.id);
              setUserList(sortedusers);

              toast("New User Created Successfully", {
                theme: "light",
                autoClose: 1500,
                position: "top-right",
              });
              setOpenModal(false);
            })
            .catch((error) => {
              console.error("Error in creating user :", error);
            });

          return;
        }

        if (response === 401) {
          toast("Unauthorized");
          return;
        }

        if (response === 403) {
          toast("Access Denied");
          return;
        }
        if (response === 422) {
          toast.error("Enter valid email address ", {
            theme: "light",
            autoClose: 1500,
            position: "top-right",
          });
          return;
        }
        if (response === 400) {
          toast("User with the given email already exists");
          return;
        } else {
          toast("An error occurred while creating the categoy .");
          return;
        }
      } catch (error) {
        throw error;
      }
    } else {
      try {
        const response = await editUser(userData, user.id);

        if (response === 200) {
          getAllUsers()
            .then((res: Data[]) => {
              const sortedusers = res.sort((a: Data, b: Data) => a.id - b.id);
              setUserList(sortedusers);

              toast("User Updated Successfully", {
                theme: "light",
                autoClose: 1500,
                position: "top-right",
              });
              setOpenModal(false);
            })
            .catch((error) => {
              console.error("Error in updating user data:", error);
            });

          return;
        }

        if (response === 401) {
          toast("Unauthorized");
          return;
        }
        if (response === 422) {
          toast("Enter valid Email Address");
          return;
        }

        if (response === 403) {
          toast("Access Denied");
          return;
        }
        if (response === 400) {
          toast("User with the given credentials already exists");
          return;
        } else {
          toast("An error occurred while creating the categoy .");
          return;
        }
      } catch (error) {
        throw error;
      }
    }
    setUser(clearForm);
  };

  return (
    <div>
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
            {user.id === 0 ? "CREATE USER" : "USER DETAILS"}
          </DialogTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, mr: 2, mb: 2, ml: 2 }}
            >
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "55ch" },
                }}
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  defaultValue=""
                />

                {user.id === 0 && (
                  <TextField
                    required
                    id="outlined-required"
                    type={"email"}
                    label="Email"
                    value={user.email}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    defaultValue=""
                  />
                )}

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  required
                  defaultValue="Select Role*"
                  autoFocus
                  name="priority"
                  type="text"
                  value={user.role}
                  sx={{
                    marginBottom: "10px",
                    width: "490px",
                    marginTop: "10px",
                    textAlign: "left",
                  }}
                  onChange={(e) => {
                    setUser({ ...user, role: e.target.value });
                  }}
                >
                  <MenuItem value={"Select Role*"} disabled>
                    Select Role*
                  </MenuItem>
                  <MenuItem value={"admin"}>admin</MenuItem>
                  <MenuItem value={"user"}>user</MenuItem>
                </Select>

                <TextField
                  required
                  id="outlined-required"
                  type="number"
                  label="Phone"
                  error={user.phone.toString().length !== 10}
                  helperText={
                    user.phone.toString().length !== 10
                      ? "Contact number must be exactly 10 digits"
                      : ""
                  }
                  value={user.phone === 0 ? "" : user.phone}
                  onChange={(e) => {
                    setUser({ ...user, phone: parseInt(e.target.value) });
                  }}
                />
                <div style={{ textAlign: "end", marginRight: "15px" }}>
                  <Button
                    style={{ marginTop: "10px" }}
                    size="large"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                    variant="text"
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ marginTop: "10px", height: "30px" }}
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {user.id === 0 ? "Create User" : "Update "}
                  </Button>
                </div>
              </Box>
            </Typography>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
