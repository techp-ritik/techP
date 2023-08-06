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
import { getTicket, updateTicketStatus, getAllTickets } from "../api/baseapi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TicketBoard() {
  const [newTicketId, setNewTicketId] = useState<number | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const handleCreateNewTicket = () => {
    setShowTicket(true);
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
  const [localtickets, setLocalTickets] = useState(data);

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

  const [ticketId, setTicketID] = useState<number | string>("");

  useEffect(() => {
    getAllTickets().then((res) => {
      setTickets(res);
      setLocalTickets(res);
    });
  }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (
      source.droppableId !== undefined ||
      (null && destination?.droppableId !== undefined) ||
      null
    ) {
      if (destination?.droppableId !== undefined) {
        let updateTicket = localtickets.map((list) => {
          if (list.id == draggableId) {
            return { ...list, status: destination?.droppableId! };
          }
          return list;
        });
        setLocalTickets(updateTicket);

        let res = updateTicketStatus(draggableId, destination?.droppableId!);
        res.then((response) => {
          if (response?.status === 200) {
            getAllTickets().then((res) => {
              setTickets(res);
              setLocalTickets(res);
              toast("Ticket Status Updated ", { theme: "light" });
            });
          } else {
            setLocalTickets(tickets);
            toast("Error while updating ticket", { theme: "light" });
          }
        });

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
          CREATE NEW TICKET
        </Button>
      </div>

      <ToastContainer position="top-center" autoClose={1000} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          {ticketStatus.map((status) => {
            let badgeTheme;
            let badgeContent;
            switch (status) {
              case "COMPLETED":
                badgeTheme = "success";
                badgeContent = localtickets.filter(
                  (item) => item.status === "completed"
                ).length;
                break;
              case "INPROGRESS":
                badgeTheme = "warning";
                badgeContent = localtickets.filter(
                  (item) => item.status === "inprogress"
                ).length;
                break;
              case "BLOCKED":
                badgeTheme = "error";
                badgeContent = localtickets.filter(
                  (item) => item.status === "blocked"
                ).length;
                break;
              case "TODO":
                badgeTheme = "primary";
                badgeContent = localtickets.filter(
                  (item) => item.status === "todo"
                ).length;
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
                          getTickets={localtickets.filter((item) => {
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
      {newTicketId === 0 && (
        <Ticket
          id={newTicketId}
          selectedTicket={null}
          setShowTicket={setShowTicket}
          setNewTicketId={setNewTicketId}
        />
      )}
    </Box>
  );
}
