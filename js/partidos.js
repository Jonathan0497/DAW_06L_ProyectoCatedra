import {
    SavePartidos,
    deletePartido,
    updatePartido,
    onGetPartido,
    onAuthStateChanged,
    onGetJugador,
    onGetTorneo,
    auth
} from "./main.js";

function ValidacionPartidos() {
    const nombreTorneo = document.getElementById("selectTorneo").value;
    const nombreJugador1 = document.getElementById("selectJugador1").value;
    const nombreJugador2 = document.getElementById("selectJugador2").value;
    const fechaEmision = document.getElementById("fechaEmision").value;
    const horaInicio = document.getElementById("horaInicio").value;
    const nombreGanador = document.getElementById("selectGanador").value;
    const resultadoJug1 = document.getElementById("resultado1").value;
    const resultadoJug2 = document.getElementById("resultado2").value;

    if (!nombreTorneo) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar un torneo'
        });
        return false;
    }

    if (!nombreJugador1 || !nombreJugador2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar ambos jugadores'
        });
        return false;
    }

    if (nombreJugador1 === nombreJugador2) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Los jugadores deben ser diferentes'
        });
        return false;
    }

    if (!fechaEmision) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar una fecha de emisión'
        });
        return false;
    }

    if (!horaInicio) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar una hora de inicio'
        });
        return false;
    }

    if (!nombreGanador) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe seleccionar un ganador'
        });
        return false;
    }

    if (resultadoJug1.trim() === "" || resultadoJug2.trim() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debe ingresar el resultado para ambos jugadores'
        });
        return false;
    }
    return true;
}

const partidosList = document.getElementById("tablaPartido");

window.addEventListener("DOMContentLoaded", async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {

        } else {
            window.location.href = "../html/index.html";
        }
    });
    onGetTorneo((querySnapshot) => {
        let torneocmb = document.getElementById("selectTorneo");
        torneocmb.innerHTML = ""; // Limpia el combobox antes de agregar nuevos elementos

        let defaultOption = document.createElement("option");
        defaultOption.textContent = "Seleccione un torneo";
        defaultOption.value = "";
        torneocmb.appendChild(defaultOption); // Agrega una opción predeterminada

        querySnapshot.forEach((doc) => {
            let torneo = doc.data();
            let option = document.createElement("option");
            option.textContent = torneo.nombre; // Establece el texto del combobox como el nombre del torneo
            option.value = torneo.nombre; // Puede cambiar esto para usar otro valor como ID si lo prefiere
            torneocmb.appendChild(option); // Añade la opción al combobox
        });
    });

    onGetJugador((querySnapshot) => {
        let selectJugador1 = document.getElementById("selectJugador1");
        let selectJugador2 = document.getElementById("selectJugador2");
        selectJugador1.innerHTML = ""; // Limpia el combobox antes de agregar nuevos elementos
        selectJugador2.innerHTML = ""; // Limpia el segundo combobox

        // Agrega una opción predeterminada para ambos comboboxes
        ["selectJugador1", "selectJugador2"].forEach(selectId => {
            let defaultOption = document.createElement("option");
            defaultOption.textContent = "Seleccione un jugador";
            defaultOption.value = "";
            document.getElementById(selectId).appendChild(defaultOption);
        });

        querySnapshot.forEach((doc) => {
            let player = doc.data();
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.textContent = `${player.nombre} ${player.apellido}`; // Nombre completo para el primer combobox
            option1.value = `${player.nombre} ${player.apellido}`; // Usa nombre y apellido como valor

            option2.textContent = `${player.nombre} ${player.apellido}`; // Nombre completo para el segundo combobox
            option2.value = `${player.nombre} ${player.apellido}`; // Usa nombre y apellido como valor

            selectJugador1.appendChild(option1); // Añade la opción al primer combobox
            selectJugador2.appendChild(option2); // Añade la opción al segundo combobox
        });
    });

    var selectJugador1 = document.getElementById('selectJugador1');
    var selectJugador2 = document.getElementById('selectJugador2');
    var selectGanador = document.getElementById('selectGanador');

    function actualizarGanador() {
        // Obtener los jugadores seleccionados
        var jugador1 = selectJugador1.value;
        var jugador2 = selectJugador2.value;

        // Limpiar las opciones anteriores del select de Ganador
        selectGanador.innerHTML = '';

        // Agregar las nuevas opciones
        if (jugador1) {
            selectGanador.appendChild(new Option(jugador1, jugador1));
        }
        if (jugador2) {
            selectGanador.appendChild(new Option(jugador2, jugador2));
        }
    }

    // Eventos change para Jugador 1 y Jugador 2
    selectJugador1.addEventListener('change', actualizarGanador);
    selectJugador2.addEventListener('change', actualizarGanador);

    onGetPartido((querySnapshot) => {
        partidosList.innerHTML = ""; // Asegúrate de que partidosList sea el ID de tu elemento de lista de partidos
        querySnapshot.forEach((doc) => {
            let partido = doc.data();
            let row = document.createElement("tr");
            row.innerHTML = `
              <td>${partido.nombreTorneo}</td>
              <td>${partido.nombreJugador1} vs ${partido.nombreJugador2}</td>
              <td>${partido.fechaEmision}</td>
              <td>${partido.horaInicio}</td>
              <td>${partido.nombreGanador}</td>
              <td>${partido.resultadoJug1} - ${partido.resultadoJug2}</td>
              <td><button type="button" class="btn btn-info btn-editPartido"    data-id='${doc.id}'
                                                                                data-nombreTorneo='${partido.nombreTorneo}'
                                                                                data-nombreJugador1='${partido.nombreJugador1}'
                                                                                data-nombreJugador2='${partido.nombreJugador2}'
                                                                                data-fechaEmision='${partido.fechaEmision}'
                                                                                data-horaInicio='${partido.horaInicio}'
                                                                                data-nombreGanador='${partido.nombreGanador}'
                                                                                data-resultadoJug1='${partido.resultadoJug1}'
                                                                                data-resultadoJug2='${partido.resultadoJug2}'>Editar</button></td>
              <td><button type="button" class="btn btn-danger btn-deletePartido" data-id='${doc.id}'>Eliminar</button></td>
            `;
            partidosList.appendChild(row);
        });

        // Botones para eliminar
        const btnDelete = partidosList.querySelectorAll(".btn-deletePartido");
        btnDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deletePartido(dataset.id);
                Swal.fire({
                    icon: 'success',
                    title: '¡Hecho!',
                    text: 'Partido eliminado con éxito'
                });
            });
        });

        // Botones para editar
        const btnEdit = partidosList.querySelectorAll(".btn-editPartido");
        btnEdit.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                document.getElementById("id_partidos").value = dataset.id;
                document.getElementById("selectTorneo").value = dataset.nombretorneo;
                document.getElementById("selectJugador1").value = dataset.nombrejugador1;
                document.getElementById("selectJugador2").value = dataset.nombrejugador2;
                document.getElementById("fechaEmision").value = dataset.fechaemision;
                document.getElementById("horaInicio").value = dataset.horainicio;
                document.getElementById("resultado1").value = dataset.resultadojug1;
                document.getElementById("resultado2").value = dataset.resultadojug2;

                selectJugador1.addEventListener('change', actualizarGanador);
                selectJugador2.addEventListener('change', actualizarGanador);
            });
        });
    });

})

const PartidosForm = document.getElementById("Partidos-Form");

PartidosForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener valores del formulario
    if (ValidacionPartidos()) {
        const idPartidos = document.getElementById("id_partidos").value;
        const nombreTorneo = document.getElementById("selectTorneo").value;
        const nombreJugador1 = document.getElementById("selectJugador1").value;
        const nombreJugador2 = document.getElementById("selectJugador2").value;
        const fechaEmision = document.getElementById("fechaEmision").value;
        const horaInicio = document.getElementById("horaInicio").value;
        const nombreGanador = document.getElementById("selectGanador").value;
        const resultadoJug1 = document.getElementById("resultado1").value;
        const resultadoJug2 = document.getElementById("resultado2").value;

        // Verificar si se trata de un nuevo partido
        if (idPartidos === '') {
            SavePartidos(nombreJugador1, nombreJugador2, nombreTorneo, fechaEmision, horaInicio, nombreGanador, resultadoJug1, resultadoJug2);
            Swal.fire({
                icon: 'success',
                title: '¡Hecho!',
                text: 'Partido guardado con éxito'
            });
        } else {
            updatePartido(idPartidos, {
                nombreTorneo,
                nombreJugador1,
                nombreJugador2,
                fechaEmision,
                horaInicio,
                nombreGanador,
                resultadoJug1,
                resultadoJug2
            });
            Swal.fire({
                icon: 'success',
                title: '¡Hecho!',
                text: 'Partido actualizado con éxito'
            });
        }
    }

        // Restablecer el formulario (opcional)
        document.getElementById("Partidos-Form").reset();
    });
