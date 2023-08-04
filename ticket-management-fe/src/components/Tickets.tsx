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
          let priorityColor="";
           switch(list.priority){
             case "high":
              priorityColor="red"
              break;
             case "medium":
              priorityColor="orange"
              break; 
             case "low":
                priorityColor="green"
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
                        startIcon={<ReceiptIcon />}
                      >
                        View Ticket
                      </Button>
                    </Typography>
                   <div >
                    <div className="ticketDetail">
                      <div style={{ textAlign: "end" }}>
                        
                      </div>

                      <div className="ticket_title">Title: {list.title}</div>
                      <div>Priority: <span style={{color:priorityColor}}>{list.priority}</span></div>
                      <div className="ticketSubDetail"> <div>Raised By: {list.raisedBy} </div>  <div>{list.status !=="completed"?<> Active Time</>: <>Resolved Time</>} : {list.time_taken} hrs</div></div>
                    </div>

                    
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
