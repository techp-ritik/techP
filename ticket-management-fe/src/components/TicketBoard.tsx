import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Tickets from "./Tickets";
import Grid from "@mui/material/Grid";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

export default function TicketBoard() {
  let data = [
    {
      id: "#1",
      title: "Website Login Issue",
      description: "I'm unable to log in to my account.",
      status: "inprogress",
      priority: "High",
      raisedBy: "Utkarsh Sethiya",
      createdAt: "July 18 2023",
      completedAt: "",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },

    {
      id: "#2",
      title: "Device Issue",
      description: "My Laptop is not working properly",
      priority: "Low",
      raisedBy: "Atharv",
      createdAt: "July 13 2023",
      completedAt: "",
      status: "todo",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "#3",
      title: "Profile Related Issue",
      description: "My Credentials are wrong",
      priority: "Medium",
      raisedBy: "Ram",
      createdAt: "July 25 2023",
      completedAt: "Aug 3 2023",
      status: "completed",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },

    {
      id: "#4",
      title: "Salary Related Issue",
      description: "Salary Not Credited for last month",
      priority: "Medium",
      raisedBy: "Varun",
      createdAt: "July 26 2023",
      completedAt: "Aug 1 2023",
      status: "completed",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "#5",
      title: "Resource Related Issue",
      description: "Resources are not allocated to the team",
      priority: "Low",
      createdAt: "June 16 2023",
      completedAt: "",
      raisedBy: "Utkarsh",
      status: "blocked",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },
    {
      id: "#6",
      title: "Repo Access Denied",
      description: "Repo not Alloted",
      priority: "Low",
      createdAt: "June 16 2023",
      completedAt: "",
      raisedBy: "Ram",
      status: "todo",
      file: ["mediafile"],
      category: "HR",
      assignee: null,
      updated_at: "2023-07-26T12:39:03.657807",
    },
  ];
  const [tickets, setTickets] = React.useState(data);
  const getTicketsLength = (status: String) => {
    let res = tickets.filter((item) => {
      return item.status === status;
    });
    return res.length;
  };
  const [ticketLength, setTicketLength] = React.useState({
    todo: getTicketsLength("todo"),
    inprogress: getTicketsLength("inprogress"),
    blocked: getTicketsLength("blocked"),
    completed: getTicketsLength("completed"),
  });
  console.log(ticketLength);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (
      source.droppableId !== null ||
      (undefined && destination?.droppableId !== null) ||
      undefined
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

  return (
    <Box sx={{ flexGrow: 1 ,marginTop:4}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
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
                    TODO{" "}
                    <Badge
                      sx={{ marginLeft: "11px", marginBottom: "3px" }}
                      badgeContent={ticketLength.todo}
                      color="primary"
                    ></Badge>
                  </div>
                }
              />
              <Droppable droppableId="todo">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Tickets
                      getTickets={tickets.filter((item) => {
                        return item.status === "todo";
                      })}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>
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
                    IN PROGRESS{" "}
                    <Badge
                      sx={{ marginLeft: "11px", marginBottom: "3px" }}
                      badgeContent={ticketLength.inprogress}
                      color="warning"
                    ></Badge>
                  </div>
                }
              />
              <Droppable droppableId="inprogress">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Tickets
                      getTickets={tickets.filter((item) => {
                        return item.status === "inprogress";
                      })}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>
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
                    BLOCKED{" "}
                    <Badge
                      sx={{ marginLeft: "11px", marginBottom: "3px" }}
                      badgeContent={ticketLength.blocked}
                      color="error"
                    ></Badge>
                  </div>
                }
              />
              <Droppable droppableId="blocked">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Tickets
                      getTickets={tickets.filter((item) => {
                        return item.status === "blocked";
                      })}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>
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
                    COMPLETED{" "}
                    <Badge
                      sx={{ marginLeft: "11px", marginBottom: "3px" }}
                      badgeContent={ticketLength.completed}
                      color="success"
                    ></Badge>
                  </div>
                }
              />
              <Droppable droppableId="completed">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Tickets
                      getTickets={tickets.filter((item) => {
                        return item.status === "completed";
                      })}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </Grid>
        </Grid>
      </DragDropContext>
    </Box>
  );
}
