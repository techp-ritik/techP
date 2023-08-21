import React from "react";
import TicketBoard from "./Tickets/TicketBoard";

export default function Dashboard() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <TicketBoard />
      </div>
    </div>
  );
}
