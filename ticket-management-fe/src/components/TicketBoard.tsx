import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tickets from "./Tickets";
import Grid from "@mui/material/Grid";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import React, { useState, useEffect } from "react";
import { filterTickets } from "../api/baseapi";
import { getAllTickets, getTicket } from "../api/baseapi";
import { updateTicketStatus } from "../api/baseapi";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Filter from "./filter";

import Ticket from "./Ticket";

export type TicketList = {
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
};

export default function TicketBoard() {
  const [newTicketId, setNewTicketId] = useState<number | null>(null);
  const [showTicket, setShowTicket] = useState(false);
  const handleCreateNewTicket = () => {
    setShowTicket(true);
    setNewTicketId(0);
  };

  let data: TicketList[] = [];

  const [tickets, setTickets] = useState(data);
  const [localtickets, setLocalTickets] = useState(data);

  const getTicketsLength = (status: String) => {
    return 1;
  };
  const [ticketLength, setTicketLength] = useState({
    todo: getTicketsLength("todo"),
    inprogress: getTicketsLength("inprogress"),
    blocked: getTicketsLength("blocked"),
    completed: getTicketsLength("completed"),
  });

  useEffect(() => {
    getAllTickets().then((res) => {
      if (res && res.length > 0) {
        setTickets(res);
        setLocalTickets(res);
      } else {
        setTickets([]);
        setLocalTickets([]);
      }
    });
  }, []);

  const [ticketId, setTicketID] = useState<number | string>("");

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    const sourceStatus = source.droppableId as string;
    const destStatus = destination?.droppableId as string;
    if (
      (sourceStatus === "todo" && destStatus === "completed") ||
      (sourceStatus === "completed" && destStatus === "todo")
    ) {
      toast.error("Invalid Ticket Movement", {
        theme: "dark",
        autoClose: false,
        position: "top-right",
        closeOnClick: true,
      });
      return;
    }

    if (source.droppableId && destination?.droppableId) {
      if (
        destination?.droppableId !== undefined &&
        source.droppableId !== destination?.droppableId!
      ) {
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
              toast("Ticket Status Updated ", {
                theme: "light",
                autoClose: 1500,
                position: "top-right",
              });
            });
          } else {
            setLocalTickets(tickets);
            toast("Error while updating ticket", {
              theme: "light",
              autoClose: 1500,
              position: "top-right",
            });
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {" "}
          <Filter setLocalTickets={setLocalTickets} />
        </span>

        <Button
          sx={{ marginRight: "10px", marginBottom: "5px" }}
          variant="contained"
          onClick={handleCreateNewTicket}
        >
          CREATE NEW TICKET
        </Button>
      </div>

      {/* <ToastContainer position="top-center" autoClose={1000} /> */}

      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          {ticketStatus.map((status) => {
            let badgeTheme;
            let badgeContent;
            switch (status) {
              case "COMPLETED":
                badgeTheme = "success";
                badgeContent = localtickets?.filter(
                  (item) => item.status === "completed"
                ).length;
                break;
              case "INPROGRESS":
                badgeTheme = "warning";
                badgeContent = localtickets?.filter(
                  (item) => item.status === "inprogress"
                ).length;
                break;
              case "BLOCKED":
                badgeTheme = "error";
                badgeContent = localtickets?.filter(
                  (item) => item.status === "blocked"
                ).length;
                break;
              case "TODO":
                badgeTheme = "primary";
                badgeContent = localtickets?.filter(
                  (item) => item.status === "todo"
                ).length;
                break;
            }
            return (
              <Grid item xs={3}>
                <Card sx={{ margin: 1, border: "1px solid #cecece" }}>
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
                        {status == "INPROGRESS" ? "IN PROGRESS" : status}{" "}
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
                          setLocaltickets={setLocalTickets}
                          getTickets={localtickets?.filter((item) => {
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
          setLocaltickets={setLocalTickets}
          id={newTicketId}
          selectedTicket={null}
          setShowTicket={setShowTicket}
          setNewTicketId={setNewTicketId}
        />
      )}
    </Box>
  );
}
