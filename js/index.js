import { SaveJugador, getJugador, db, collection, query, where, getDocs } from "./main.js";

function ValidacionJugador() {
  const nombreJug = document.getElementById('jugadorNombre').value;
  const apellidoJug = document.getElementById('jugadorApellido').value;
  const edadJug = document.getElementById('jugadorEdad').value;
  const emailJug = document.getElementById('jugadorEmail').value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!isNaN(nombreJug) || nombreJug.trim() === "") {
    alert("Debe ingresar un nombre para el jugador");
    return false;
  }

  if (!isNaN(apellidoJug) || apellidoJug.trim() === "") {
    alert("Debe ingresar un apellido para el jugador");
    return false;
  }

  if (isNaN(edadJug) || edadJug.trim() === "" || edadJug <= 0) {
    alert("Debe ingresar una edad para el jugador");
    return false;
  }

  if (!emailRegex.test(emailJug)) {
    alert("Debe ingresar un email valido");
    return false;
  }

  return true;
}
const JugadorForm = document.getElementById("Jugador-Form");
async function emailExists(email) {
  const jugadorCollection = collection(db, "Jugador");
  const query2 = query(jugadorCollection, where("email", "==", email));
  const querySnapshot = await getDocs(query2);
  JugadorForm.reset();
  return !querySnapshot.empty;
}

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


JugadorForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (ValidacionJugador()) {
    const nombreJug = document.getElementById("jugadorNombre").value;
    const apellidoJug = document.getElementById("jugadorApellido").value;
    const edadJug = document.getElementById("jugadorEdad").value;
    const emailJug = document.getElementById("jugadorEmail").value;

    if (await emailExists(emailJug)) {
      alert("Este correo electrónico ya está registrado");
      return;
    }
    console.log("Enviado");

    SaveJugador(nombreJug, apellidoJug, edadJug, emailJug);

    JugadorForm.reset();
    window.onload();
  }
});
