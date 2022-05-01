import { useState, useEffect } from "react";
import axios from "axios";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`http://localhost:3001/ticket`);
      const allTickets = response.data;
      setTickets(allTickets);
    }
    fetchData();
  }, []);

  return (
    <div>
      {tickets.map((ticket) => {
        return (
          <div>
            <p>Número: {ticket.numero}</p>
            <p>Fecha y hora:{ticket.fecha_hora}</p>
            <p>Precio: {ticket.precio}</p>
            <p>Descuento: {ticket.descuento}</p>
            <p>Número Sala: {ticket.numero_sala}</p>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default Tickets;
