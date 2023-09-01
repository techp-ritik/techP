import React from "react";
import { Meta, Story } from "@storybook/react";

import SignIn from "./Signin";
import { MemoryRouter } from "react-router-dom";

import i18n from "../i18";
import TicketTheme from "./TicketTheme";

import { Usercontext } from "../App";

import { ThemeProvider } from "styled-components";

import { I18nextProvider } from "react-i18next";
import { ToastContainer } from "react-toastify";

const MockUserContext = {
  user: {
    role: "admin",
  },
  setUser: () => {},
};

export default {
  title: "Components/SignIn",
  component: SignIn,
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={TicketTheme}>
    <MemoryRouter>
      <Usercontext.Provider value={MockUserContext}>
        <I18nextProvider i18n={i18n}>
          <ToastContainer position="top-right" autoClose={2000} />
          <SignIn />
        </I18nextProvider>
      </Usercontext.Provider>
    </MemoryRouter>
  </ThemeProvider>
);
export const Default = Template.bind({});
