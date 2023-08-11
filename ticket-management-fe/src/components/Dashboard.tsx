import React from "react";
import TicketBoard from "./TicketBoard";
import { Usercontext } from "../App";


export default function Dashboard() {
  const{user,setUser}=React.useContext(Usercontext)
  console.log(user);
  return (
    <div>
      <div style={{ display: "flex" }}>
        <TicketBoard />
      </div>
    </div>
  );
}
