import React from "react";
import "./Tickets.css";
import { Button } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";

interface list {
  getTickets: {}[];
}

function Tickets(props: list) {
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
                        startIcon={<ReceiptIcon />}
                      >
                        View Ticket
                      </Button>
                    </Typography>
                   
                    <div className="ticketDetail">
                      <div style={{ textAlign: "end" }}>
                        
                      </div>

                      <div className="ticket_title">Title: {list.title}</div>
                      <div>Priority: {list.priority}</div>
                      <div>Raised By: {list.raisedBy}</div>
                    </div>

                    <div className="ticketSubDetail">
                      
                    </div>
                  </div>
                  <div className="ticketShadow"></div>
                </div>
              )}
            </Draggable>
          );
        })
      )}
    </div>
  );
}

export default Tickets;
