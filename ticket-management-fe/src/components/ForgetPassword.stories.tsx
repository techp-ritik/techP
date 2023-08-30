import React from "react";
import { Meta, Story } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18";
import { Usercontext } from "../App";
import Forgetpassword from "./Forgetpassword";
import { ThemeProvider } from "@emotion/react";
import TicketTheme from "./TicketTheme";
import { ToastContainer } from "react-toastify";
const MockUserContext = {
  user: {
    role: "admin",
  },
};

export default {
  title: "Components/ForgetPassword",
  component: Forgetpassword,
} as Meta;

const Template: Story = () => (
  <ThemeProvider theme={TicketTheme}>
    <MemoryRouter>
      <Usercontext.Provider value={MockUserContext}>
        <I18nextProvider i18n={i18n}>
          <ToastContainer position="top-right" autoClose={2000} />
          <Forgetpassword />
        </I18nextProvider>
      </Usercontext.Provider>
    </MemoryRouter>
  </ThemeProvider>
);
export const Default = Template.bind({});
