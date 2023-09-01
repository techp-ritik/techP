import React from "react";
import { Meta, Story } from "@storybook/react";
import Category from "./Category";
import { ThemeProvider } from "@emotion/react";
import TicketTheme from "../TicketTheme";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import { TicketProps } from "./Category";
import { Usercontext } from "../../App";
import { MemoryRouter } from "react-router";
export default {
  title: "Components/Category",
  component: Category,
  parameters: {},
} as Meta;
const MockUserContext = {
  user: {
    role: "admin",
  },
};
const Template: Story<TicketProps> = (args) => (
  <Usercontext.Provider value={MockUserContext}>
    <MemoryRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <ThemeProvider theme={TicketTheme}>
        <Category {...args} />
      </ThemeProvider>
    </MemoryRouter>
  </Usercontext.Provider>
);

export const _CreateNewCategory = Template.bind({});
_CreateNewCategory.args = {
  isModalOpen: true,
  handleCloseModal: () => {},
  category: {
    name: "",
    description: "",
    id: 0,
  },
  setCategories: () => {},
  setCategory: () => {},
};

export const _EditCategory = Template.bind({});
_EditCategory.args = {
  isModalOpen: true,
  handleCloseModal: () => {},
  category: {
    id: 1,
    name: "Category Name",
    description: "Category Description",
  },
  setCategories: () => {},
  setCategory: () => {},
};
