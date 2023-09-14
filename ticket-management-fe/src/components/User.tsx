import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DialogTitle } from "@mui/material";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { countries } from "./CountryCodes";
import { useState } from "react";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { editUser } from "../api/baseapi";
import "react-toastify/dist/ReactToastify.css";
import { createUser } from "../api/baseapi";
import { Data } from "./Users";
import { useMutation } from "react-query";
import { queryClient } from "../";
import { Phone } from "@mui/icons-material";

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
      phone: string;
      country_code: string;
      actions: string;
    }>
  >;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const User = React.memo(
  ({
    setUserList,

    openModal,
    setOpenModal,
    user,
    setUser,
  }: list) => {
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      country_code: user.country_code,
    };
    const [counterycode, setContryCode] = useState("Select Code*");
    const createUserMutation = useMutation(
      (params: { userData: any }) => createUser(params.userData),

      {
        onSuccess(data, variables, context) {
          setOpenModal(false);
          queryClient.invalidateQueries("allUsers");
          toast(data);
        },

        onError(error) {
          toast.error("" + error);
        },
      }
    );

    const editUserMutation = useMutation(
      (params: { userId: number; userData: any }) =>
        editUser(params.userData, params.userId),
      {
        onSuccess: (data, variables, context) => {
          toast(data);
          queryClient.invalidateQueries("allUsers");
          setOpenModal(false);
          setUser(clearForm);
        },
        onError: (error) => {
          toast.error("" + error);
        },
      }
    );

    const clearForm = {
      id: 0,
      name: "",
      email: "",
      role: "Select Role*",
      phone: "",
      country_code: "Select CountryCode*",
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

      if (user.id === 0) {
        try {
          createUserMutation.mutate({ userData });
        } catch (error) {
          toast("ërror check");
        }
      } else {
        try {
          let userId = user.id;
          editUserMutation.mutate({ userId, userData });
        } catch (error) {
          throw error;
        }
      }
    };

    return (
      <div>
        <Modal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setContryCode("Select Code*");
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
                  <div
                    style={{
                      display: "flex",
                      marginBottom: "10px",

                      marginTop: "10px",
                      marginLeft: "15px",
                      textAlign: "center",
                      marginRight: "10px",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      required
                      autoFocus
                      name="country_code"
                      value={user.country_code}
                      defaultValue="Select CountryCode*"
                      type="text"
                      sx={{
                        marginBottom: "10px",
                        width: "100px",
                        marginTop: "10px",
                        textAlign: "left",
                      }}
                      // onChange={(e) => {
                      //   setContryCode(e.target.value);
                      // }}
                      onChange={(e) => {
                        setUser({ ...user, country_code: e.target.value });

                        console.log(e.target.value);
                      }}
                      // renderValue={() => counterycode}
                    >
                      <MenuItem value={"Select Code*"} disabled>
                        Select Code*
                      </MenuItem>

                      {countries.map((countrycode) => (
                        <MenuItem
                          key={countrycode.code}
                          value={countrycode.code}
                        >
                          {countrycode.code} - {countrycode.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <TextField
                      required
                      id="outlined-required"
                      type="number"
                      label="Phone"
                      value={user.phone === "" ? "" : user.phone}
                      onChange={(e) => {
                        setUser({ ...user, phone: e.target.value });
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "end", marginRight: "15px" }}>
                    <Button
                      style={{ marginTop: "10px" }}
                      size="large"
                      onClick={() => {
                        setOpenModal(false);
                        setContryCode("Select Code*");
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
);
export default User;
