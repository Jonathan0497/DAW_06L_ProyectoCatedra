import { SaveJugador, getJugador } from "./main.js";

window.addEventListener("DOMContentLoaded", () => {
  
});

const JugadorForm = document.getElementById("Jugador-Form");

JugadorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Enviado");

  const nombreJug = document.getElementById("jugadorNombre").value;
  const apellidoJug = document.getElementById("jugadorApellido").value;
  const edadJug = document.getElementById("jugadorEdad").value;
  const emailJug = document.getElementById("jugadorEmail").value;

  SaveJugador(nombreJug, apellidoJug, edadJug, emailJug);

  JugadorForm.reset();
});
