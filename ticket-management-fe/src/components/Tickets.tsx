import React from "react";
import "./Tickets.css";
import { Button } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
import { useState } from "react";
import { TicketList } from "./TicketBoard";

interface list {
  getTickets: {}[];
  setLocaltickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}

function Tickets(props: list) {
  const [showTicket, setShowTicket] = useState(false);
  const [ticketId, setTicketId] = useState(0);
  interface TicketData {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    raisedBy: string;
    createdAt: string;
    completedAt: string;
  }
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);

  // Step 2: Update the state variable when the "View Ticket" button is clicked
  const handleViewTicketClick = (list: any, id: number) => {
    setShowTicket(true);
    setTicketId(list.id);
    setSelectedTicket(list);
  };
  const splitTime = (hour: number) => {
    if (hour >= 24) {
      var totaldays = hour / 24;
      return Math.round(totaldays) + " days";
    }
    return hour + " hours";
  };
  return (
    <div className="ticketList">
      {props.getTickets?.length === 0 || undefined ? (
        <div className="no_tickets">
          <>No Tickets</>
        </div>
      ) : (
        props.getTickets?.map((list: any, index: number) => {
          let priorityColor = "";
          switch (list.priority) {
            case "high":
              priorityColor = "red";
              break;
            case "medium":
              priorityColor = "#f75700";
              break;
            case "low":
              priorityColor = "#e3cc00";
              break;
          }

          return (
            <Draggable
              key={list.id}
              draggableId={list.id.toString()}
              index={index}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  className="ticketContainer"
                >
                  <div className="ticket">
                    <Typography sx={{}} className="ticketTitle">
                      Ticket #{list.id}
                      <Button
                        size="small"
                        type="submit"
                        // sx={{color:'white'}}
                        variant="text"
                        onClick={() => handleViewTicketClick(list, list.id)}
                        startIcon={<ReceiptIcon />}
                      >
                        Edit Ticket
                      </Button>
                    </Typography>
                    <div>
                      <div className="ticketDetail">
                        <div style={{ textAlign: "end" }}></div>

                        <div className="ticket_title">Title: {list.title}</div>
                        <div>
                          Priority:{" "}
                          <span style={{ color: priorityColor }}>
                            {list.priority.toUpperCase()}
                          </span>
                        </div>
                        <div className="ticketSubDetail">
                          {" "}
                          <div>
                            Raised By: {list.user?.name.toUpperCase()}{" "}
                          </div>{" "}
                          <div>
                            {list.status == "blocked" ? (
                              <>Time Taken</>
                            ) : list.status !== "completed" ? (
                              <> Active Time</>
                            ) : (
                              <>Resolved Time</>
                            )}{" "}
                            : {splitTime(list.time_taken)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ticketSubDetail"></div>
                  </div>
                  <div className="ticketShadow"></div>
                </div>
              )}
            </Draggable>
          );
        })
      )}

      {showTicket && (
        <Ticket
          setLocaltickets={props.setLocaltickets}
          id={ticketId}
          selectedTicket={selectedTicket}
          setShowTicket={setShowTicket}
          setNewTicketId={setTicketId}
        />
      )}
    </div>
  );
}
export default Tickets;
