// Secuencias de colores
var gameSequence = []; // Secuencia de colores del juego
var playerSequence = []; // Secuencia de colores del jugador
var nivel; // Nivel actual
var puntos; // Puntos actuales
const colors = ['red', 'green', 'blue', 'yellow']; // Colores disponibles

// Inicia el juego
function startGame() {
  // Reinicia las variables
  gameSequence = [];
  playerSequence = [];
  nivel = 0;
  puntos = 0;
  // Actualiza el puntaje y el nivel
  document.getElementById('puntos').innerText = `Puntaje: ${puntos}`;
  document.getElementById('nivel').innerText = `Nivel: ${nivel}`;
  document.getElementById('start').disabled = true;
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
  for(let i = 0; i <= nivel; i++) {
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
      alert('¡Has perdido! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    puntos++;
    document.getElementById('puntos').innerText = `Puntaje: ${puntos}`;
    // Comprueba si el jugador ha ganado
    if(playerSequence.length === gameSequence.length) {
      alert('¡Felicidades, has ganado! Haz clic en Comenzar para jugar de nuevo.');
      document.getElementById('start').disabled = false;
      return;
    }
    // Comprueba si el jugador ha completado el nivel
    if(playerSequence.length === nivel + 1) {
      nivel++;
      playerSequence = [];
      setTimeout(function() {
        displaySequence();
      }, 1000);
    }
    // Actualiza el nivel
    document.getElementById('nivel').innerText = `Nivel: ${nivel}`;
  });
}