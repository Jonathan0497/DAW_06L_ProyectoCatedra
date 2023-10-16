import {
  SaveJugador,
  getJugador,
  deleteJugador,
  updateJugador,
  onGetJugador,
} from "./main.js";

const jugadorList = document.getElementById("tablaJugador");

window.addEventListener("DOMContentLoaded", async () => {
  //const querySnapshot = await getJugador();

  onGetJugador((querySnapshot) => {
    jugadorList.innerHTML = "";
    querySnapshot.forEach((doc) => {
      let player = doc.data();
      let row = document.createElement("tr");
      row.innerHTML = `
          <td>${player.nombre}</td>
          <td>${player.apellido}</td>
          <td>${player.edad}</td>
          <td>${player.email}</td>
          <td><button type="button" class="btn btn-info btn-editJugador"    data-id='${doc.id}'
                                                                            data-nombre='${player.nombre}'
                                                                            data-apellido='${player.apellido}'
                                                                            data-edad='${player.edad}'
                                                                            data-email='${player.email}'>Editar</button></td>
          <td><button type="button" class="btn btn-danger btn-deleteJugador" data-id='${doc.id}'>Eliminar</button></td>
        `;
      jugadorList.appendChild(row);
    });
    const btnDelete = jugadorList.querySelectorAll(".btn-deleteJugador");
    btnDelete.forEach((btn) => {
      btn.addEventListener("click", ({ target: { dataset } }) => {
        deleteJugador(dataset.id);
      });
    });

    const btnEdit = jugadorList.querySelectorAll(".btn-editJugador");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const { id, nombre, apellido, edad, email } = e.target.dataset;
        document.getElementById("id_jugador").value = id;
        document.getElementById("jugadorNombre").value = nombre;
        document.getElementById("jugadorApellido").value = apellido;
        document.getElementById("jugadorEdad").value = edad;
        document.getElementById("jugadorEmail").value = email;
      });
    });
  });
});

const JugadorForm = document.getElementById("Jugador-Form");

JugadorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const idJugador = document.getElementById("id_jugador").value;
  const nombreJug = document.getElementById("jugadorNombre").value;
  const apellidoJug = document.getElementById("jugadorApellido").value;
  const edadJug = document.getElementById("jugadorEdad").value;
  const emailJug = document.getElementById("jugadorEmail").value;

  if (idJugador === "") {
    SaveJugador(nombreJug, apellidoJug, edadJug, emailJug);
  } else {
    updateJugador(idJugador, {
      apellido: apellidoJug,
      edad: edadJug,
      email: emailJug,
      nombre: nombreJug,
    });
  }
});
