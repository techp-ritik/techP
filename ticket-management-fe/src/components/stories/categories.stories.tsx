import React from "react";
import { Meta, Story } from "@storybook/react";
import Categories from "../Categories/Categories";
import { rest } from "msw";
import { mswHandlers } from "../../api/mswhandlers";
import { setupWorker } from "msw";
import { Usercontext } from "../../App";
import { MemoryRouter } from "react-router";

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
        <Categories />
      </MemoryRouter>
    </Usercontext.Provider>
  );
};

export const NoData = () => <Template scenario="no-data" />;
export const Default = () => <Template scenario="default" />;
