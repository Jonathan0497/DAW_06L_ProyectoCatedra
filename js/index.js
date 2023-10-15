import { SaveJugador, getJugador } from "./main.js";


window.addEventListener("DOMContentLoaded", async () => {
    const jugadorList = document.getElementById("tablaJugador");
    
    const querySnapshot = await getJugador();
    querySnapshot.forEach((doc) => {
      let player = doc.data();
      let row = document.createElement('tr');
      row.innerHTML = `
        <td>${player.nombre}</td>
        <td>${player.apellido}</td>
        <td>${player.edad}</td>
        <td>${player.email}</td>
      `;
      jugadorList.appendChild(row);
    });
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
