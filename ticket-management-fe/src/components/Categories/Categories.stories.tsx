import React from "react";
import { Meta, Story } from "@storybook/react";
import Categories from "./Categories";
import { rest } from "msw";
import { mswHandlers } from "../../api/mswhandlers";
import { setupWorker } from "msw";
import { Usercontext } from "../../App";
import { MemoryRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/private-theming";
import TicketTheme from "../TicketTheme";

export default {
  title: "Components/Categories",
  component: Categories,
} as Meta;
type scenarioProps = {
  scenario: "no-data" | "default";
};

const MockUserContext = {
  user: {
    role: "admin",
  },
};

const worker = setupWorker(...mswHandlers([]));
worker.start();

const Template: React.FC<scenarioProps> = ({ scenario }) => {
  React.useEffect(() => {
    worker.resetHandlers(...mswHandlers(scenario));
  }, [scenario]);

  return (
    <Usercontext.Provider value={MockUserContext}>
      <MemoryRouter>
        <ToastContainer position="top-right" autoClose={2000} />
        <ThemeProvider theme={TicketTheme}>
          <Categories />
        </ThemeProvider>
      </MemoryRouter>
    </Usercontext.Provider>
  );
};

export const NoData = () => <Template scenario="no-data" />;
export const Default = () => <Template scenario="default" />;
