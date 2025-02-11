const { Router } = require("express");
const { Ticket, Pelicula, User } = require("../db");
const { v4: uuidv4 } = require("uuid");

const ticket = Router();

ticket.get("/", async (req, res) => {
  const { id } = req.query;
  if (id) {
    try {
      const ticket = await Ticket.findByPk(id, { raw: true });
      res.status(200).send(ticket);
    } catch (error) {
      res.status(404).json("ocurrio un error: " + error);
    }
  } else {
    try {
      const tickets = await Ticket.findAll();
      res.status(200).send(tickets);
    } catch (error) {
      res.status(404).json("ocurrio un error: " + error);
    }
  }
});

ticket.post("/", async (req, res) => {
  try {
    const {
      numero,
      fecha_hora,
      precio,
      descuento,
      numero_sala,
      userId,
      peliculaId,
      sucursalId,
    } = req.body;

    const newTicket = await Ticket.create({
      id: uuidv4(),
      numero,
      fecha_hora,
      precio,
      descuento,
      numero_sala,
      userId,
      peliculaId,
      sucursalId,
    });
    res.send(newTicket);
  } catch (error) {
    res.status(404).json("ocurrio un error: " + error);
  }
});

ticket.put("/", async (req, res) => {
  const { id } = req.query;
  const {
    numero,
    fecha_hora,
    precio,
    descuento,
    numero_sala,
    userId,
    peliculaId,
  } = req.body;
  try {
    const ticket = await Ticket.findByPk(id);
    await ticket.update({
      numero: numero ? numero : ticket.numero,
      fecha_hora: fecha_hora ? fecha_hora : ticket.fecha_hora,
      precio: precio ? precio : ticket.precio,
      descuento: descuento ? descuento : ticket.descuento,
      numero_sala: numero_sala ? numero_sala : ticket.numero_sala,
      userId: userId ? userId : ticket.userId,
      peliculaId: peliculaId ? peliculaId : ticket.peliculaId,
    });
    res.status(200).send(ticket);
  } catch (error) {
    res.status(404).json("ocurrio un error: " + error);
  }
});

ticket.delete("/", async (req, res) => {
  const { id } = req.query;
  try {
    const ticket = await Ticket.findByPk(id);
    if (!ticket) throw Error("Id incorrecto o ticket inexistente");
    await ticket.destroy();
    res.status(200).send("Ticket eliminado exitosamente!");
  } catch (error) {
    res.status(404).json("ocurrio un error: " + error);
  }
});

module.exports = ticket;
