import React from "react";
import TicketBoard from "./TicketBoard";
import { Usercontext } from "../App";

export default function Dashboard() {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <TicketBoard />
      </div>
    </div>
  );
}
