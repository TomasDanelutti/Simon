StrictMode = true;
// Secuencias de colores
var gameSequence = []; // Secuencia de colores del juego
var playerSequence = []; // Secuencia de colores del jugador
var level; // Nivel actual
var score; // Puntos actuales
var namePlayer= '';
var namePlayerErrorLabel = document.getElementById("namePlayerErrorLabel");
const colors = ['red', 'green', 'blue', 'yellow']; // Colores disponibles

// Inicia el juego
 function startGame() {
document.getElementById('start').addEventListener('click', function() {
  // Obtiene el nombre del jugador
  var namePlayer = document.getElementById('namePlayer').value;
  namePlayer = namePlayer.toUpperCase();
  if (namePlayer < 3) {
    namePlayerErrorLabel.style.display = "block";
    document.getElementById('namePlayer').disabled = false;
  } else {
    namePlayerErrorLabel.style.display = "none";
    reset();
    start();
  }
});
   document.getElementById('aceptar').addEventListener('click', function() {
     document.getElementById('modalError').style.display = 'none';
   });
 }

 function reset() {
  // Reinicia las variables
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
   document.getElementById('score').innerText = `Puntaje: ${score}`;
   document.getElementById('level').innerText = `Nivel actual: ${level}`;
}

function start() {
  // Actualiza el puntaje y el nivel
  document.getElementById('score').innerText = `Puntaje: ${score}`;
  document.getElementById('level').innerText = `Nivel actual: ${level}`;
  document.getElementById('start').disabled = true;
  document.getElementById('namePlayer').disabled = true;
  // Agrega 20 colores aleatorios a la secuencia
  for(let i = 0; i < 20; i++) {
    gameSequence.push(colors[Math.floor(Math.random() * 4)]);
  }
  // Muestra la secuencia
  displaySequence();
}

// Agrega un evento de clic al botón de inicio
document.getElementById('start').addEventListener('click', startGame);

// Muestra la secuencia
function displaySequence() {
  for(let i = 0; i <= level; i++) {
    setTimeout(function() {
      flashButton(gameSequence[i]);
    }, i * 1000);
  }
}

// Resalta un botón agregando una clase para mostrar el color
function flashButton(color) {
  let button = document.getElementById(color);
  button.classList.add('pressed');
  setTimeout(function() {
    button.classList.remove('pressed');
  }, 500);
}

// Obtiene los botones
var buttons = document.getElementsByClassName('game-button');

// Agrega eventos de clic a los botones
for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(e) {
    e.target.classList.add('pressed');
    setTimeout(function() {
      e.target.classList.remove('pressed');
    }, 500);
    playerSequence.push(e.target.id);
    // Comprueba si el jugador ha perdido
    if(playerSequence[playerSequence.length - 1] !== gameSequence[playerSequence.length - 1]) {
      document.getElementById('mensajeError').textContent = "¡Has perdido! Nivel: " + level + " Puntaje: " + score +" Haz clic en Comenzar para jugar de nuevo.";
      document.getElementById('modalError').style.display = 'block';
      document.getElementById('start').disabled = false;
      document.getElementById('namePlayer').disabled = false;
      document.getElementById('namePlayer').value = '';
      reset();
      return;
    }
    score++;
    document.getElementById('score').innerText = `Puntaje: ${score}`;
    // Comprueba si el jugador ha ganado
    if(playerSequence.length === gameSequence.length) {
      document.getElementById('mensajeError').textContent = "¡Felicidades, has ganado! Haz clic en Comenzar para jugar de nuevo.";
      document.getElementById('modalError').style.display = 'block';
      document.getElementById('start').disabled = false;
      document.getElementById('namePlayer').disabled = false;
      document.getElementById('namePlayer').value = '';
      return;
    }
    // Comprueba si el jugador ha completado el nivel
    if(playerSequence.length === level + 1) {
      level++;
      playerSequence = [];
      setTimeout(function() {
        displaySequence();
      }, 1000);
    }
    // Actualiza el nivel
    document.getElementById('level').innerText = `Nivel actual: ${level}`;
  });
}


//Funciones para el Formulario
function validateForm() {
  var nameInput = document.getElementById("nameForm");
  var nameErrorLabel = document.getElementById("nameErrorLabel");
  var email = document.getElementById('validateEmail').value;
  var emailErrorLabel = document.getElementById('emailErrorLabel');
  var comentario = document.getElementById('textArea').value;
  var comentarioErrorLabel = document.getElementById('comentarioErrorLabel');
  var validName = /^[A-Za-z\s]+$/.test(name);
  var emailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);
  var destinatario = 'tomasdanelutti12@gmail.com';
  var affair = 'Consulta desde el formulario de la página';
  var mailtoLink = 'mailto:' + destinatario + '?subject=' + encodeURIComponent(affair) + '&body=' + encodeURIComponent(comentario);


  if (nameInput.value === "") {
    nameErrorLabel.style.display = "block";
  } else {
    nameErrorLabel.style.display = "none";
  }

  if (email === "") {
    emailErrorLabel.style.display = "block";
  } else {
    emailErrorLabel.style.display = "none";
  }

  if (comentario === "") {
    comentarioErrorLabel.style.display = "block";
  } else {
    comentarioErrorLabel.style.display = "none";
  }
}
