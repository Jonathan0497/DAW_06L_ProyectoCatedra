// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
//FireAuth import
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
//FireStore import
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWJAaqh3RQtIGpT7f9QGhCSsvYcFv7fXc",
  authDomain: "pingpong-79d2f.firebaseapp.com",
  projectId: "pingpong-79d2f",
  storageBucket: "pingpong-79d2f.appspot.com",
  messagingSenderId: "568323009332",
  appId: "1:568323009332:web:0f6f37f1e6c0d0b1eb1361",
  measurementId: "G-KCZJYV8SGS",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const provider = new GoogleAuthProvider();
export const SaveJugador = (nombre, apellido, edad, email) => {
  addDoc(collection(db, "Jugador"), { nombre, apellido, edad, email });
};

export const getJugador = () => getDocs(collection(db, "Jugador"));

// Evento Registrarse
const SingupForm = document.querySelector("#singup-form");

SingupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = document.querySelector("#singup-email").value;
  const clave = document.querySelector("#singup-password").value;

  createUserWithEmailAndPassword(auth, correo, clave)
    .then((userCredential) => {
      //resetea el formulario
      SingupForm.reset();
      var modalElement = document.getElementById("SingupModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();

      console.log("signed up");
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
});

//Evento Iniciar Sesion
const LoginForm = document.querySelector("#login-form");

LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const correo = document.querySelector("#login-email").value;
  const clave = document.querySelector("#login-password").value;

  signInWithEmailAndPassword(auth, correo, clave)
    .then((userCredential) => {
      //resetea el formulario
      SingupForm.reset();
      var modalElement = document.getElementById("SinginModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();

      // Ahora puedes usar modalInstance para interactuar con el modal:
      SingupModal.hide();
      console.log("signed in");
    })
    .catch((error) => {
      console.error("Error: ", error.message);
    });
});

//Evento Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth).then(() => {
    console.log("sing out");
  });
});

//Google Login
const googleButton = document.getElementById("googleLogin");
googleButton.addEventListener("click", (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      var modalElement = document.getElementById("SinginModal");
      var SingupModal = bootstrap.Modal.getInstance(modalElement);
      SingupModal.hide();
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

//Publicaciones
const postsList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
                <li class="list-group-item list-group-item-action">
                    <h5>${post.Title}</h5>
                    <p>${post.Descripcion}</p>
                </li>
            `;
      html += li;
    });
    postsList.innerHTML = html;
  } else {
    postsList.innerHTML =
      '<p class="text-center">Inicia sesion para ver las publicaciones</p>';
  }
};

const jugadorList = document.getElementById("tablaJugador");
const setUpJugadores = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const td = `
      <td>${post.nombre}</td>
      <td>${post.apellido}</td>
      <td>${post.edad}</td>
      <td>${post.email}</td>
            `;
      html += td;
    });
    jugadorList.innerHTML = html;
  } else {
    jugadorList.innerHTML =
      '<td class="text-center">Inicia sesion para ver las publicaciones</td>';
  }
};

//Login check
const loggedOut = document.querySelectorAll(".logged-out");
const loggedIn = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedIn.forEach((link) => (link.style.display = "block"));
    loggedOut.forEach((link) => (link.style.display = "none"));
  } else {
    loggedIn.forEach((link) => (link.style.display = "none"));
    loggedOut.forEach((link) => (link.style.display = "block"));
  }
};

//Events
//Listar si el usuario esta autenticado
onAuthStateChanged(auth, (user) => {
  if (user) {
    const postCollection = collection(db, "Post");
    getDocs(postCollection).then((snapshot) => {
      console.log(snapshot.docs);
      setupPosts(snapshot.docs);
      loginCheck(user);
    });
    const jugadorCollection = collection(db, "Jugador");
    getDocs(jugadorCollection).then((snapshot) => {
      console.log(snapshot.docs);
      setUpJugadores(snapshot.docs);
      loginCheck(user);
    });
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});
