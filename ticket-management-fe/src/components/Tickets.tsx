import React from "react";
import "./Tickets.css";
import { Button } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import Ticket from "./Ticket";
import { useState } from "react";

interface list {
  getTickets: {}[];
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
  return (
    <div className="ticketList">
      {props.getTickets.length == 0 ? (
        <div className="no_tickets">
          <>No Tickets</>
        </div>
      ) : (
        props.getTickets.map((list: any, index: number) => {
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
                      Ticket {list.id}
                      <Button
                        size="small"
                        type="submit"
                        // sx={{color:'white'}}
                        variant="text"
                        onClick={() => handleViewTicketClick(list, list.id)}
                        startIcon={<ReceiptIcon />}
                      >
                        View Ticket
                      </Button>
                    </Typography>

                    <div className="ticketDetail">
                      <div style={{ textAlign: "end" }}></div>

                      <div className="ticket_title">Title: {list.title}</div>
                      <div>Priority: {list.priority}</div>
                      <div>Raised By: {list.raisedBy}</div>
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

      {showTicket && <Ticket id={ticketId} selectedTicket={selectedTicket} />}
    </div>
  );
}

export default Tickets;
