/* 

//elige una palabra random del array
function randomWords(words) {
  let random = Math.floor(Math.random() * words.length);
  return words[random]
};

let palabraAleatoria = randomWords(words);
let time = 10;
let score = 0;

//le damos contenido al h1 
function addToDOM() {
  let h1 = document.querySelector('#randomWord');
  return h1.textContent = palabraAleatoria;
}
addToDOM();

//creamos un evento para comparar las palabras
let input = document.querySelector('#text');

input.addEventListener('input', function (e) {
  let palabraIngresada = input.value;
  if (palabraIngresada === palabraAleatoria) {
    let suma3S = document.querySelector('#timeSpan');
    suma3S.innerHTML = `${time += 3}s`;
    input.value = '';
    palabraAleatoria = randomWords(words);
    addToDOM();
    updateScore();
  }
})

//manipular el tiempo

function actualizarTiempo() {

  document.querySelector('#timeSpan').innerHTML = `${time -= 1}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

let timeInterval = setInterval(actualizarTiempo, 1000);

//suma 1 puto por cada palabra correcta
function updateScore() {
  document.querySelector('#score').innerHTML = score += 1
}

//fin del juego cuando se acaba el tiempo
function gameOver() {
  let endGame = document.querySelector('#end-game-container');
  let h2 = document.createElement('h2');
  h2.textContent = '¡TIEMPO!';
  let scorePara = document.createElement('p');
  scorePara.textContent = `Tu puntaje es: ${score}`;
  let levelPara = document.createElement('p');

  endGame.appendChild(h2);
  endGame.appendChild(scorePara);
  endGame.appendChild(levelPara);

  if (score <= 3) {
    levelPara.textContent = "Puedes hacerlo más rápido!";
  } else if (score <= 6) {
    levelPara.textContent = "Increíble, ¿podrás hacerlo mejor la próxima vez?";
  } else {
    levelPara.textContent = "¡Flash no se compara contigo!";
  }

  let boton = document.createElement('button')
  boton.setAttribute('onclick', 'location.reload()');
  boton.textContent = 'Volvé a empezar';

  endGame.appendChild(boton);
}  */

function randomWords(words) {
  let random = Math.floor(Math.random() * words.length);
  return words[random];
}

let palabraAleatoria = randomWords(words);
let time = 10;
let score = 0;

function addToDOM() {
  let h1 = document.querySelector("#randomWord");
  return (h1.textContent = palabraAleatoria);
}

function actualizarTiempo() {
  document.querySelector("#timeSpan").innerHTML = `${(time -= 1)}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function updateScore() {
  document.querySelector("#score").innerHTML = (score += 1);
}

function displayTopScores() {
  let topScoresList = document.querySelector("#topScoresList");
  topScoresList.innerHTML = "";

  let username = localStorage.getItem("username");
  if (username) {
    const key = username + "-scores";
    let scores = JSON.parse(localStorage.getItem(key)) || [];

    scores.slice(0, 3).forEach((score, index) => {
      let li = document.createElement("li");
      li.textContent = `Puntaje ${index + 1}: ${score}`;
      topScoresList.appendChild(li);
    });
  }
}

function startGame() {
  let gameContainer = document.querySelector("#game-container");
  gameContainer.style.display = "block";

  let registerContainer = document.querySelector("#register-container");

  let username = localStorage.getItem("username");
  if (!username) {
    let usernameInput = document.querySelector("#username");
    username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem("username", username);
    } else {
      alert("Por favor, ingresa un nombre de usuario.");
      gameContainer.style.display = "none";
      return;
    }
  } else {
    registerContainer.style.display = "none";
  }

  addToDOM();
  timeInterval = setInterval(actualizarTiempo, 1000);

  let input = document.querySelector("#text");
  input.addEventListener("input", function (e) {
    let palabraIngresada = input.value;
    if (palabraIngresada === palabraAleatoria) {
      let suma3S = document.querySelector("#timeSpan");
      suma3S.innerHTML = `${(time += 3)}s`;
      input.value = "";
      palabraAleatoria = randomWords(words);
      addToDOM();
      updateScore();
    }
  });

  displayTopScores();
}

function saveScore(username, score) {
  const key = username + "-scores";
  let scores = JSON.parse(localStorage.getItem(key)) || [];
  scores.push(score);
  scores.sort((a, b) => b - a);
  scores = scores.slice(0, 3);
  localStorage.setItem(key, JSON.stringify(scores));
}

function gameOver() {
  let endGame = document.querySelector("#end-game-container");
  let h2 = document.createElement("h2");
  h2.textContent = "¡TIEMPO!";
  let scorePara = document.createElement("p");
  scorePara.textContent = `Tu puntaje es: ${score}`;
  let levelPara = document.createElement("p");

  endGame.appendChild(h2);
  endGame.appendChild(scorePara);
  endGame.appendChild(levelPara);

  if (score <= 3) {
    levelPara.textContent = "Puedes hacerlo más rápido!";
  } else if (score <= 6) {
    levelPara.textContent = "Increíble, ¿podrás hacerlo mejor la próxima vez?";
  } else {
    levelPara.textContent = "¡Flash no se compara contigo!";
  }

  let boton = document.createElement("button");
  boton.textContent = "Volvé a empezar";
  boton.addEventListener("click", function () {
    endGame.innerHTML = "";
    time = 10;
    score = 0;
    startGame();
  });

  endGame.appendChild(boton);

  let username = localStorage.getItem("username");
  saveScore(username, score);
  displayTopScores();
}

let registerButton = document.querySelector("#register-button");
registerButton.addEventListener("click", startGame);
