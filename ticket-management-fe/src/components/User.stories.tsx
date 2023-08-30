import React from "react";
import { Meta, Story } from "@storybook/react";
import User, { list } from "./User";
import { ThemeProvider } from "@emotion/react";
import TicketTheme from "./TicketTheme";
import { I18nextProvider } from "react-i18next";

import { ToastContainer } from "react-toastify";
export default {
  title: "Components/User",
  component: User,
} as Meta;

const Template: Story<list> = (args) => (
  <ThemeProvider theme={TicketTheme}>
    <ToastContainer position="top-right" autoClose={2000} />
    <User {...args} />;
  </ThemeProvider>
);

export const CreateNewUser = Template.bind({});
CreateNewUser.args = {
  openModal: true,
  setOpenModal: () => {},
  user: {
    id: 0,
    name: "",
    email: "",
    role: "Select Role*",
    phone: 0,
    actions: "",
  },
  setUserList: () => {},
  UserList: [],
  setUser: () => {},
};

export const EditUser = Template.bind({});
EditUser.args = {
  openModal: true,
  setOpenModal: () => {},
  user: {
    id: 1,
    name: "User Name",
    email: "user@example.com",
    role: "user",
    phone: 1234567890,
    actions: "",
  },
  setUserList: () => {},
  UserList: [],
  setUser: () => {},
};
