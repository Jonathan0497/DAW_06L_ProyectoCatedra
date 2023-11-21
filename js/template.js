const header = document.querySelector('header')
const footer = document.querySelector('footer')

header.innerHTML = `<!--Nav-->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
        <a class="navbar-brand" href="index.html"><i class="fas fa-table-tennis"></i> Ping Pong</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav"> <!-- Esta lista está alineada a la izquierda por defecto -->
                <li class="nav-item logged-in" style="display: none;">
                    <a class="navbar-brand" href="Jugadores.html"><i class="fas fa-user"></i> Jugadores</a>
                    <a class="navbar-brand" href="Torneo.html"><i class="fas fa-trophy"></i> Torneos</a>
                    <a class="navbar-brand" href="partidos.html"><i class="fa-solid fa-medal"></i> Partidos</a>
                    <a class="navbar-brand logged-out" href="Reglas.html"><i class="fa-solid fa-list-ol"></i> Reglas</a>
                </li>
                <li class="nav-item">
                    <a class="navbar-brand" href="Reglas.html"><i class="fa-solid fa-list-ol"></i> Reglas</a>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto"> <!-- Esta lista está alineada a la derecha -->
                <!-- Porfavor no quitar la clase logged-out -->
                <li class="nav-item logged-out" style="display: none;">
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#SinginModal">Iniciar
                        Sesión</a>
                </li>
                <!-- Porfavor no quitar la clase logged-out -->
                <li class="nav-item logged-out" style="display: none;">
                    <a class="nav-link" href="#" data-bs-toggle="modal"
                        data-bs-target="#SingupModal">Registrarse</a>
                </li>
                <!-- Porfavor no quitar la clase logged-in -->
                <li class="nav-item logged-in" style="display: none;">
                    <a class="nav-link" href="index.html" id="logout">Cerrar Sesión</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!-- Modal Singup -->
<div class="modal fade" id="SingupModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Registrate</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="" id="singup-form">
                    <div class="form-group">
                        <input type="text" id="singup-email" class="form-control" placeholder="Email" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="password" id="singup-password" class="form-control" placeholder="Password"
                            required>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Singup</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Modal Singin -->
<div class="modal fade" id="SinginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Iniciar Sesion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="" id="login-form">
                    <div class="form-group">
                        <input type="text" id="login-email" class="form-control" placeholder="Email" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <input type="password" id="login-password" class="form-control" placeholder="Password"
                            required>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary btn-block">Inicia Sesion</button>
                    <button type="button" class="btn btn-info btn-block" id="googleLogin">Inicia Sesion con
                        Google</button>
                </form>
            </div>
        </div>
    </div>
</div>`

footer.innerHTML = `<div class="container">
            <div class="row mb-3">
                <div class="col-12">
                    <p class="text-uppercase fw-bold mb-0">©Proyecto de Cátedra - 2023</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <a class="text-white text-decoration-none" href="Contactanos.html">
                                <i class="fas fa-envelope me-2"></i>CONTACTANOS
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-white text-decoration-none"
                                href="https://github.com/Jonathan0497/DAW_06L_ProyectoCatedra">
                                <i class="fab fa-github me-2"></i>GITHUB
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a class="text-white text-decoration-none"
                                href="https://trello.com/b/czwVuYXC/proyecto-daw-catedra">
                                <i class="fab fa-trello me-2"></i>TRELLO
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>`