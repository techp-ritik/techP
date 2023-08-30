import React from "react";
import Dashboard from "../Dashboard";

import SideBar from "../SideBar";
import { I18nextProvider } from "react-i18next";
import { rest } from "msw";
import { mockTickets } from "../../api/mswhandlers";
import { setupWorker } from "msw";
import { MemoryRouter } from "react-router";
import App, { Usercontext } from "../../App";
import Navbar from "../Navbar";
import TicketBoard from "../Tickets/TicketBoard";
import Categories from "../Categories/Categories";
import Users from "../Users";
import { getAllTickets } from "../../api/baseapi";
import { ToastContainer } from "react-toastify";
export default {
  title: "Components/Dashboard",
  component: Dashboard,
  argTypes: {},
  // parameters: {
  //   msw: [
  //     rest.get(
  //       "https://8fe2-103-177-83-247.ngrok-free.app/v1/tickets",
  //       (_req, res, ctx) => {
  //         return res(
  //           ctx.json(
  //             [
  //             {
  //               'id': 90,
  //               'title': "Test Ticket",
  //               'description': "This is a test ticket.",
  //               'category': {
  //                 'name': "HR department s",
  //                 'description': "HR department s",
  //               },
  //               'status': "inprogress",
  //               'priority': "high",
  //               'assigned_to': {
  //                 'id': 1,
  //                 'name': "Vaishnavi Ranbhare",
  //               },
  //               'user': {
  //                 'id': 2,
  //                 'name': "Vaishnavi",
  //               },
  //               'completed_at': null,
  //               'created_at': "2023-08-23T04:41:53.97292",
  //               'attachments': [
  //                 {
  //                   'id': 48,
  //                   'filename': "picture.jpg",
  //                   'filepath':
  //                     "uploads/61f69a70-59ac-4685-ae25-e2dd2f449e45_picture.jpg",
  //                 },
  //               ],
  //               'time_taken': 122,
  //             },
  //           ])
  //         );
  //       }
  //     ),
  //     rest.get(
  //       "https://8fe2-103-177-83-247.ngrok-free.app/v1/categories",
  //       (_req, res, ctx) => {
  //         return res(
  //           ctx.json([
  //             {
  //               name: "HR department s",
  //               description: "HR department s",
  //               id: 33,
  //             },
  //           ])
  //         );
  //       }
  //     ),
  //     rest.get(
  //       "https://8fe2-103-177-83-247.ngrok-free.app/v1/users",
  //       (_req, res, ctx) => {
  //         return res(
  //           ctx.json([
  //             {
  //               id: 133,
  //               name: "utkarsh TechP",
  //               email: "utkarsh.sethiya@techprescient.com",
  //               role: "user",
  //               phone: 9845374536,
  //             },
  //           ])
  //         );
  //       }
  //     ),
  //   ],
  // },
};
const MockUserContext = {
  user: {
    role: "admin",
  },
};

// Initialize MSW worker with the defined handlers
// const worker = setupWorker(...mswHandlers([]));
// worker.start();

const worker = setupWorker(
  ...mockTickets([
    {
      id: 16,
      title: "Test Ticket",
      description: "This is a test ticket.",
      category: {
        name: "HR department s",
        description: "HR department stu33",
      },
      status: "inprogress",
      priority: "high",
      assigned_to: {
        id: 1,
        name: "Vaishnavi Ranbhare",
      },
      user: {
        id: 2,
        name: "Vaishnavi",
      },
      completed_at: null,
      created_at: "2023-08-23T04:41:53.97292",
      attachments: [
        // {
        //   'id': 48,
        //   'filename': "picture.jpg",
        //   'filepath':
        //     "uploads/61f69a70-59ac-4685-ae25-e2dd2f449e45_picture.jpg",
        // },
      ],
      time_taken: 122,
    },
  ])
);
worker.start();
const Template2: any = () => {
  // React.useEffect(() => {
  //   getAllTickets().then((res)=>{
  //     worker.resetHandlers(...mockTickets(res));

  //   })

  // }, []);
  return (
    <>
      <Usercontext.Provider value={MockUserContext}>
        <MemoryRouter>
        <ToastContainer />
          <Dashboard />
        </MemoryRouter>
      </Usercontext.Provider>
    </>
  );
};
export const Default = Template2.bind({});

// Default.args = {};
