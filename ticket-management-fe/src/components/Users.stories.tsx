import React from "react";
import { Meta, Story } from "@storybook/react";
import i18n from "../i18";
import Categories from "./Categories/Categories";
import { rest } from "msw";
import { I18nextProvider } from "react-i18next";
import { mswHandlers } from "../api/mswhandlers";
import { setupWorker } from "msw";

import { Usercontext } from "../App";
import { MemoryRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/private-theming";
import TicketTheme from "./TicketTheme";
import Users from "./Users";

export default {
  title: "Components/Users",
  component: Users,
} as Meta;

type scenarioProps = {
  scenario: "no-data" | "default";
};

const MockUserContext = {
  user: {
    role: "admin",
    user: "admin",
  },
};

const worker = setupWorker(...mswHandlers([]));
worker.start();

const Template: React.FC<scenarioProps> = ({ scenario }) => {
  React.useEffect(() => {
    worker.resetHandlers(...mswHandlers(scenario));
  }, [scenario]);

  return (
    <ThemeProvider theme={TicketTheme}>
      <MemoryRouter>
        <Usercontext.Provider value={MockUserContext}>
          <I18nextProvider i18n={i18n}>
            <ToastContainer position="top-right" autoClose={2000} />
            <Users />
          </I18nextProvider>
        </Usercontext.Provider>
      </MemoryRouter>
    </ThemeProvider>
  );
};

export const NoData = () => <Template scenario="no-data" />;
export const Default = () => <Template scenario="default" />;
