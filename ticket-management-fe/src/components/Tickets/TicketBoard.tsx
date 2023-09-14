import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tickets from "./Tickets";
import Grid from "@mui/material/Grid";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useState, useEffect, useRef, useCallback } from "react";
import { getAllTickets } from "../../api/baseapi";
import { updateTicket as updateTicketStatus } from "../../api/baseapi";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import TicketsFilter from "../TicketsFilter";
import Ticket from "./Ticket";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";

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

const formData = new FormData();

export default function TicketBoard() {
  const [newTicketId, setNewTicketId] = useState<number | null>(null);
  const butRef = useRef(null);
  const [showTicket, setShowTicket] = useState(false);
  const handleCreateNewTicket = useCallback(() => {
    setShowTicket(true);
    setNewTicketId(0);
  }, []);

  const {
    data: ticketsALL,
    isLoading,
    isError,
    error,
    status,
  } = useQuery({
    queryKey: ["ticket"],
    queryFn: () => getAllTickets(),
  });
  // console.log(status);
  let data: TicketList[] = [];

  const [tickets, setTickets] = useState(ticketsALL);
  const [localtickets, setLocalTickets] = useState(data);
  const { t, i18n } = useTranslation();
  const getTicketsLength = (status: String) => {
    return 1;
  };
  const [ticketLength, setTicketLength] = useState({
    todo: getTicketsLength("todo"),
    inprogress: getTicketsLength("inprogress"),
    blocked: getTicketsLength("blocked"),
    completed: getTicketsLength("completed"),
  });
  // console.log(ticketsALL, status, error);
  useEffect(() => {
    // getAllTickets().then((res) => {
    //   if (res && res.length > 0) {
    //     setTickets(res);

    //     setLocalTickets(res);
    //   } else {
    //     setTickets([]);
    //     setLocalTickets([]);
    //   }
    // });
    switch (status) {
      case "success":
        setLocalTickets(ticketsALL);
        setTickets(ticketsALL);
        break;

      case "error":
        setLocalTickets([]);
        setTickets([]);
        toast.error("Error While Fetching Tickets . Try Again", {
          autoClose: 1500,
          position: "top-center",
        });

        break;
    }
  }, [status]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    const sourceStatus = source.droppableId as string;
    const destStatus = destination?.droppableId as string;
    if (
      (sourceStatus === "todo" && destStatus === "completed") ||
      (sourceStatus === "completed" && destStatus === "todo")
    ) {
      toast.error(t("toast_invalid_ticket_movement"), {
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
        formData.append("status", destination?.droppableId);
        let res = updateTicketStatus(draggableId, formData);
        res.then((response) => {
          if (response === 200) {
            getAllTickets().then((res: TicketList[]) => {
              setTickets(res);
              setLocalTickets(res);
              toast(t("toast_ticketstatus_update"), {
                theme: "light",
                autoClose: 1500,
                position: "top-right",
              });
            });
          } else {
            setLocalTickets(tickets);
            toast(t("toast_ticketstatus_update_error"), {
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
  const ticketStatus = [
    t("status_todo"),
    t("status_inprogress"),
    t("status_blocked"),
    t("status_completed"),
  ];

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
          <TicketsFilter setLocalTickets={setLocalTickets} />
        </span>

        <Button
          sx={{ marginRight: "10px", marginBottom: "5px" }}
          variant="contained"
          onClick={handleCreateNewTicket}
        >
          {t("create_ticket_button")}
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
                        {status === "INPROGRESS" ? "IN PROGRESS" : status}{" "}
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
                          isLoading={isLoading}
                          isError={isError}
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
