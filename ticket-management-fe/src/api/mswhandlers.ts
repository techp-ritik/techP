import { rest } from "msw";
import { baseUrl, getAllTickets } from "./baseapi";
import { positions } from "@mui/system";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const mswHandlers = (scenario: {}) => [
  rest.get(`${baseUrl}categories`, (req, res, ctx) => {
    switch (scenario) {
      case "no-data":
        return res(ctx.status(200), ctx.json([]));

      default:
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: 3,
              name: "Category 3",
              description:
                "This is a very  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsumlong description that exceeds the usual length of descriptions.",
            },
            { id: 0, name: "atharv", description: "vaspate" },
            { id: 1, name: "utkarsh", description: "sethiya" },
            { id: 9, name: "Category 1", description: "Description 1" },
            { id: 8, name: "Category 2", description: "Description 2" },
            { id: 322, name: "Category 3", description: "Description 3" },
            { id: 4, name: "Category 4", description: "Description 4" },
            { id: 5, name: "Category 5", description: "Description 5" },
            { id: 6, name: "Category 6", description: "Description 6" },
            { id: 7, name: "Category 7", description: "Description 7" },
          ])
        );
    }
  }),
  rest.post(`${baseUrl}categories`, (req, res, ctx) => {
    const category = req.body;

    return res(ctx.status(201), ctx.json({ id: 4, category }));
  }),
  rest.put(`${baseUrl}categories/:id`, (req, res, ctx) => {
    const category = req.body;

    return res(ctx.status(200), ctx.json({ id: 4, category }));
  }),
];
let tic= [
  {
    'id': 16,
    'title': "Test Ticket",
    'description': "This is a test ticket.",
    'category': {
      'name': "HR department s",
      'description': "HR department stu33",
    },
    'status': "inprogress",
    'priority': "high",
    'assigned_to': {
      'id': 1,
      'name': "Vaishnavi Ranbhare",
    },
    'user': {
      'id': 2,
      'name': "Vaishnavi",
    },
    'completed_at': null,
    'created_at': "2023-08-23T04:41:53.97292",
    'attachments': [
      // {
      //   'id': 48,
      //   'filename': "picture.jpg",
      //   'filepath':
      //     "uploads/61f69a70-59ac-4685-ae25-e2dd2f449e45_picture.jpg",
      // },
    ],
    'time_taken': 122,
  },
]
export const mockTickets = (props:any) => [
  rest.get(`${baseUrl}tickets`, (req, res, ctx) => {
  console.log(props)
    return res(
      ctx.status(200),
      ctx.json(
       props
       )
    );
  }),
  rest.get(`${baseUrl}categories`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "HR UT department s",
          description: "HR department s",
          id: 33,
        },
      ])
    );
  }),
  rest.get(`${baseUrl}users`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 133,
          name: "utkarsh TechP",
          email: "utkarsh.sethiya@techprescient.com",
          role: "user",
          phone: 9845374536,
        },
      ])
    );
  }),
  rest.get(`${baseUrl}users/assignees/`, (req, res, ctx) => {
    return res(
      ctx.json([
      
          {id: 1, name: 'Vaishnavi Ranbhare'}
      
      ])
    );
  }),
  rest.post(`${baseUrl}ticket`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json([
        {
          id: 133,
          name: "utkarsh TechP",
          email: "utkarsh.sethiya@techprescient.com",
          role: "user",
          phone: 9845374536,
        },
      ])
    );
  }),
];
