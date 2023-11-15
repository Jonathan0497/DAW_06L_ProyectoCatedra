import {
  SaveJugador,
  getJugador,
  deleteJugador,
  updateJugador,
  onGetJugador,
  db,
  collection,
  query,
  where,
  onAuthStateChanged,
  auth,
  getDocs
} from "./main.js";

function ValidacionJugador() {
  const nombreJug = document.getElementById('jugadorNombre').value;
  const apellidoJug = document.getElementById('jugadorApellido').value;
  const edadJug = document.getElementById('jugadorEdad').value;
  const emailJug = document.getElementById('jugadorEmail').value;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!isNaN(nombreJug) || nombreJug.trim() === "") {
      Swal.fire("Error", "Debe ingresar un nombre para el jugador", "error");
      return false;
  }

  if (!isNaN(apellidoJug) || apellidoJug.trim() === "") {
      Swal.fire("Error", "Debe ingresar un apellido para el jugador", "error");
      return false;
  }

  if (isNaN(edadJug) || edadJug.trim() === "" || edadJug <= 0) {
      Swal.fire("Error", "Debe ingresar una edad válida para el jugador", "error");
      return false;
  }

  if (!emailRegex.test(emailJug)) {
      Swal.fire("Error", "Debe ingresar un e-mail válido", "error");
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

const jugadorList = document.getElementById("tablaJugador");

window.addEventListener("DOMContentLoaded", async () => {
  //Events
  //Listar si el usuario esta autenticado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      
    } else {
      window.location.href = "../html/index.html";
    }
  });

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
        Swal.fire("Eliminado", "Jugador eliminado con éxito", "success");
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



JugadorForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (ValidacionJugador()) {
    const idJugador = document.getElementById("id_jugador").value;
    const nombreJug = document.getElementById("jugadorNombre").value;
    const apellidoJug = document.getElementById("jugadorApellido").value;
    const edadJug = document.getElementById("jugadorEdad").value;
    const emailJug = document.getElementById("jugadorEmail").value;

    if (idJugador === "") {
      if (await emailExists(emailJug)) {
        Swal.fire("Error", "Este correo electrónico ya está registrado", "error");
        return;
      }
      SaveJugador(nombreJug, apellidoJug, edadJug, emailJug);
      Swal.fire("Guardado", "Jugador guardado con éxito", "success");
    } else {
      updateJugador(idJugador, {
        apellido: apellidoJug,
        edad: edadJug,
        email: emailJug,
        nombre: nombreJug,
      });
      Swal.fire("Actualizado", "Jugador actualizado con éxito", "success");
    }

    JugadorForm.reset();
  }
});
