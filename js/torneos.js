import {
    SaveTorneos,
    deleteTorneo,
    updateTorneo,
    onGetTorneo,
    onAuthStateChanged,
    auth
} from "./main.js";

// SweetAlert CDN incluido en tu archivo HTML
// <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

function ValidacionTorneo() {
    const TorneoNombre = document.getElementById('TorneoNombre').value;
    const DireccionTorneo = document.getElementById('DireccionTorneo').value;

    if (!isNaN(TorneoNombre) || TorneoNombre.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar un nombre para el torneo'
        });
        return false;
    }

    if (!isNaN(DireccionTorneo) || DireccionTorneo.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar una dirección para el torneo'
        });
        return false;
    }

    return true;
}

const torneoList = document.getElementById("tablaTorneo");
window.addEventListener("DOMContentLoaded", async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          
        } else {
          window.location.href = "../html/index.html";
        }
      });
    onGetTorneo((querySnapshot) => {
        torneoList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            let player = doc.data();
            let row = document.createElement("tr");
            row.innerHTML = `
          <td>${player.nombre}</td>
          <td>${player.cantidadJugadores}</td>
          <td>${player.estado}</td>
          <td>${player.fechaInicio}</td>
          <td>${player.direccion}</td>
          <td><button type="button" class="btn btn-info btn-editTorneo"    data-id='${doc.id}'
                                                                            data-nombre='${player.nombre}'
                                                                            data-cantidadJugadores='${player.cantidadJugadores}'
                                                                            data-estado='${player.estado}'
                                                                            data-fechaInicio='${player.fechaInicio}'
                                                                            data-direccion='${player.direccion}'>Editar</button></td>
          <td><button type="button" class="btn btn-danger btn-deleteTorneo" data-id='${doc.id}'>Eliminar</button></td>
        `;
            torneoList.appendChild(row);
        });
        const btnDelete = torneoList.querySelectorAll(".btn-deleteTorneo");
        btnDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteTorneo(dataset.id);
                Swal.fire({
                    icon: 'success',
                    title: '¡Hecho!',
                    text: 'Torneo eliminado con éxito'
                });
            });
        });
        const btnEdit = torneoList.querySelectorAll(".btn-editTorneo");
        btnEdit.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                document.getElementById("id_torneo").value = dataset.id;
                document.getElementById("TorneoNombre").value = dataset.nombre;
                document.getElementById("CantidadJugadoresTorneos").value = dataset.cantidadjugadores;
                document.getElementById("estadoTorneo").value = dataset.estado;
                document.getElementById("FechaInicioTorneo").value = dataset.fechainicio;
                document.getElementById("DireccionTorneo").value = dataset.direccion;
            });
        });
    });
})

const TorneoForm = document.getElementById("Torneo-Form");
TorneoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const selectedValue = document.getElementById('CantidadJugadoresTorneos').value;
    const fechaInicio = document.getElementById('FechaInicioTorneo').value;
    if (selectedValue !== "4" && selectedValue !== "8" && selectedValue !== "12") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, seleccione 4, 8 o 12 jugadores'
        });
        return;
    }
    if (!fechaInicio) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese una fecha de inicio'
        });
        return;
    }

    if (ValidacionTorneo()) {
        const id_torneo = document.getElementById("id_torneo").value;
        const TorneoNombre = document.getElementById("TorneoNombre").value;
        const CantidadJugadoresTorneos = document.getElementById("CantidadJugadoresTorneos").value;
        const estadoTorneo = document.getElementById("estadoTorneo").value;
        const FechaInicioTorneo = document.getElementById("FechaInicioTorneo").value;
        const DireccionTorneo = document.getElementById("DireccionTorneo").value;

        if (id_torneo === '') {
            SaveTorneos(TorneoNombre, CantidadJugadoresTorneos, estadoTorneo, FechaInicioTorneo, DireccionTorneo);
            Swal.fire({
                icon: 'success',
                title: '¡Hecho!',
                text: 'Torneo agregado con éxito'
            });
        } else {
            updateTorneo(id_torneo, {
                nombre: TorneoNombre,
                cantidadJugadores: CantidadJugadoresTorneos,
                estado: estadoTorneo,
                fechaInicio: FechaInicioTorneo,
                direccion: DireccionTorneo
            });
            TorneoForm.reset();
            Swal.fire({
                icon: 'success',
                title: '¡Hecho!',
                text: 'Torneo actualizado con éxito'
            });
        }
    }
});
