import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tickets from "./Tickets";
import Grid from "@mui/material/Grid";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";
import { Button } from "@mui/material";

export default function TicketBoard() {
  const [newTicketId, setNewTicketId] = useState<number | null>(null);

  const handleCreateNewTicket = () => {
    setNewTicketId(0);
  };
  interface TicketList {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    raisedBy: string;
    createdAt: string;
    completedAt: string;
    file: [string];
    category: string;
    assignee: string;
    updated_at: string;
  }

  let data: TicketList[] = [
    {
      id: "1",
      title: "Website Login Issue",
      description: "I'm unable to log in to my account.",
      status: "inprogress",
      priority: "High",
      raisedBy: "Utkarsh Sethiya",
      createdAt: "July 18 2023",
      completedAt: "",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },

    {
      id: "2",
      title: "Device Issue",
      description: "My Laptop is not working properly",
      priority: "Low",
      raisedBy: "Atharv",
      createdAt: "July 13 2023",
      completedAt: "",
      status: "todo",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "36",
      title: "Profile Related Issue",
      description: "My Credentials are wrong",
      priority: "Medium",
      raisedBy: "Ram",
      createdAt: "July 25 2023",
      completedAt: "Aug 3 2023",
      status: "completed",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },

    {
      id: "4",
      title: "Salary Related Issue",
      description: "Salary Not Credited for last month",
      priority: "Medium",
      raisedBy: "Varun",
      createdAt: "July 26 2023",
      completedAt: "Aug 1 2023",
      status: "completed",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "5",
      title: "Resource Related Issue",
      description: "Resources are not allocated to the team",
      priority: "Low",
      createdAt: "June 16 2023",
      completedAt: "",
      raisedBy: "Utkarsh",
      status: "blocked",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "6",
      title: "Repo Access Denied",
      description: "Repo not Alloted",
      priority: "Low",
      createdAt: "June 16 2023",
      completedAt: "",
      raisedBy: "Ram",
      status: "todo",
      file: ["mediafile"],
      category: "HR",
      assignee: "null",
      updated_at: "2023-07-26T12:39:03.657807",
    },
  ];
  const [tickets, setTickets] = useState(data);
  const getTicketsLength = (status: String) => {
    let res = tickets.filter((item) => {
      return item.status === status;
    });
    return res.length;
  };
  const [ticketLength, setTicketLength] = useState({
    todo: getTicketsLength("todo"),
    inprogress: getTicketsLength("inprogress"),
    blocked: getTicketsLength("blocked"),
    completed: getTicketsLength("completed"),
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      source.droppableId !== undefined ||
      (null && destination?.droppableId !== undefined) ||
      null
    ) {
      let listIndex = tickets.findIndex(
        (item) => item.id === result.draggableId
      );
      if (
        typeof tickets[listIndex].status == "string" &&
        destination?.droppableId !== undefined
      ) {
        let res = tickets;
        res[listIndex].status = destination?.droppableId!;
        setTickets(res);
        setTicketLength({
          todo: getTicketsLength("todo"),
          inprogress: getTicketsLength("inprogress"),
          blocked: getTicketsLength("blocked"),
          completed: getTicketsLength("completed"),
        });
      }
    }
  };
  const ticketStatus = ["TODO", "INPROGRESS", "BLOCKED", "COMPLETED"];

  return (
    <Box
      sx={{
        flexGrow: 1,
        marginTop: 4,
        display: "flex",
        flexDirection: "column",

        margin: "20px",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" onClick={handleCreateNewTicket}>
          CREATE NEW CATEGORY
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          {ticketStatus.map((status) => {
            let badgeTheme;
            let badgeContent;
            switch (status) {
              case "COMPLETED":
                badgeTheme = "success";
                badgeContent = ticketLength.completed;
                break;
              case "INPROGRESS":
                badgeTheme = "warning";
                badgeContent = ticketLength.inprogress;
                break;
              case "BLOCKED":
                badgeTheme = "error";
                badgeContent = ticketLength.blocked;
                break;
              case "TODO":
                badgeTheme = "primary";
                badgeContent = ticketLength.todo;
                break;
            }

            return (
              <Grid item xs={3}>
                <Card sx={{ margin: 1 }}>
                  <CardHeader
                    sx={{ background: " #dddddd" }}
                    title={
                      <div
                        style={{
                          fontSize: "15px",
                          textAlign: "center",
                          fontWeight: "600",
                        }}
                      >
                        {status}{" "}
                        <Badge
                          sx={{ marginLeft: "11px", marginBottom: "3px" }}
                          badgeContent={badgeContent}
                          color="primary"
                        ></Badge>
                      </div>
                    }
                  />
                  <Droppable droppableId={status.toLowerCase()}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Tickets
                          getTickets={tickets.filter((item) => {
                            return item.status === status.toLowerCase();
                          })}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      {newTicketId === 0 && <Ticket id={newTicketId} selectedTicket={null} />}
    </Box>
  );
}
