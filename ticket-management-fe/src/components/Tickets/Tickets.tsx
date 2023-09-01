import React from "react";

import { Button } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/Edit";
import Ticket from "./Ticket";
import { useState } from "react";
import { TicketList } from "./TicketBoard";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
export interface TicketDetails {
  assigned_to: { id: number; name: string };
  attachments: [];
  category: { name: string; description: string; id: number };
  completed_at: string;
  created_at: string;
  description: string;
  id: number;
  priority: string;
  status: string;
  time_taken: number;
  title: string;
  user: { id: number; name: string };
}
interface list {
  getTickets: {}[];
  setLocaltickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}
export interface TicketData {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  raisedBy: string;
  createdAt: string;
  completedAt: string;
}
function Tickets(props: list) {
  const [showTicket, setShowTicket] = useState(false);
  const [ticketId, setTicketId] = useState(0);

  const [selectedTicket, setSelectedTicket] = useState<TicketDetails | null>(
    null
  );
  const { t, i18n } = useTranslation();

  const handleViewTicketClick = (list: TicketDetails, id: number) => {
    setShowTicket(true);
    setTicketId(list.id);
    setSelectedTicket(list);
  };
  const splitTime = (hour: number) => {
    if (hour >= 24) {
      var totaldays = hour / 24;
      return Math.round(totaldays) + " day";
    }
    return hour + " hours";
  };
  return (
    <MainBoard>
      {props.getTickets?.length === 0 || undefined ? (
        <NoTickets>
          <>{t("no_tickets")}</>
        </NoTickets>
      ) : (
        props.getTickets?.map((list: any, index: number) => {
          let priorityColor = "";
          switch (list.priority) {
            case "high":
              priorityColor = "red";
              break;
            case "medium":
              priorityColor = " #FF5F15";

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
                >
                  <TicketLayout>
                    <SpecialTypography
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      {t("ticket_no")}
                      {list.id}
                      <Button
                        sx={{ display: "flex", justifyContent: "end" }}
                        size="small"
                        type="submit"
                        variant="text"
                        onClick={() => handleViewTicketClick(list, list.id)}
                      >
                        <EditIcon sx={{ fontSize: 20 }} />
                      </Button>
                    </SpecialTypography>
                    <div>
                      <TicketContent>
                        <div style={{ textAlign: "end" }}></div>

                        <div>
                          {t("ticket_title")}: {list.title}
                        </div>
                        <div>
                          {t("ticket_priority")}:{" "}
                          <span style={{ color: priorityColor }}>
                            {list.priority.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          {" "}
                          <TicketDetails>
                            {t("ticket_raised_by")}: {list.user?.name}{" "}
                            <Time>
                              {list.status == "blocked" ? (
                                <>{t("ticket_time_taken")}</>
                              ) : list.status !== "completed" ? (
                                <>{t("ticket_active_time")}</>
                              ) : (
                                <>{t("ticket_resolved_time")}</>
                              )}{" "}
                              : {splitTime(list.time_taken)}
                            </Time>
                          </TicketDetails>{" "}
                        </div>
                      </TicketContent>
                    </div>
                  </TicketLayout>
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
    </MainBoard>
  );
}
const NoTickets = styled.div`
  position: relative;
  top: 40%;
  text-align: center;
  color: grey;
  font-weight: 500;
  align-items: center;
  vertical-align: middle;
`;
const MainBoard = styled.div`
  height: 400px;
  border: 8px solid #dddddd;
  overflow-y: scroll;

  border-end-end-radius: 6px;
  background-color: rgb(246, 248, 250);
  border-bottom-left-radius: 6px;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(223, 223, 223, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(218, 218, 218);
    outline: 1px solid rgb(245, 250, 255);
  }
`;

const TicketLayout = styled.div`
  margin: 10px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: transform;
  transition-property: transform;
  -webkit-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  background-color: white;
  color: darkslategray;
  border-radius: 12px;
  cursor: grab;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

  &:hover,
  &:focus,
  &:active {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
    transition: (5s);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }
`;

const TicketContent = styled.div`
  font-size: 13px;
  font-weight: 400;
  padding: 4px 10px;
`;

const TicketDetails = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 2px 3px 2px 0px;
`;

const Time = styled.div`
  color: rgb(0, 0, 0);

  font-size: 9px;
  font-weight: bold;
  padding: 1px 3px 2px 0p;
`;

const SpecialTypography = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  padding: 12px 10px 4px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed grey;
  font-family: "Roboto, Arial, sans-serif";
  color: black;
  align-items: center;
`;
export default Tickets;
