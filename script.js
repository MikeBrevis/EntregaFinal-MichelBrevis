// Función para registrar un usuario
function registerUser(username, password) {
  // Verificamos si el usuario ya existe en el storage
  if (localStorage.getItem(username)) {
    console.log("El usuario ya existe.");
    return;
  }

  // Creamos un objeto con los datos del usuario
  const user = { username, password };

  // Convertimos el objeto a formato JSON y lo almacenamos en el storage
  localStorage.setItem(username, JSON.stringify(user));

  console.log("Usuario registrado correctamente.");
}

// Función para iniciar sesión
function loginUser(username, password) {
  // Obtenemos los datos del usuario desde el storage
  const userData = localStorage.getItem(username);

  // Verificamos si el usuario existe y si la contraseña es correcta
  if (userData) {
    const user = JSON.parse(userData);

    if (user.password === password) {
      console.log("Inicio de sesión exitoso.");
      return true;
    }
  }

  console.log("Nombre de usuario o contraseña incorrectos.");
  return false;
}




//---------------------------------------------------------------------------------------


const words = [
    'wingspan',
'parade',
'harbor',
'machine',
'raincoat',
'tractor',
'compass',
'mansion',
'pedestrian',
'blender',
'grocery',
'nutshell',
'prospect',
'translate',
'admiral',
'portable',
'flagship',
'printer',
'gargoyle',
'president',
'cornfield',
'tablet',
'thriller',
'journal',
'sunflower',
'horizon',
'tourist',
'concert',
'bracket',
'marble',
'octopus',
'voyage',
'captain',
'tornado',
'carnival',
'rooster',
'cemetery',
'platter',
'stairway',
'century',
'guitar',
'tripod',
'backpack',
'palette',
'gymnast',
'doormat',
'village',
'delegate',
'overcoat',
'saddle',
'majesty',
'airplane',
'dolphin',
'linen',
'silverware',
'carousel',
'crimson',
'temple',
'miracle',
'jungle',
'cottage',
'charcoal',
'avenue',
'falcon',
'origami',
'timber',
'pigeon',
'ambassador',
'neighbor',
'premiere',
'hardware',
'nominee',
'cushion',
'galaxy',
'torrent',
'horoscope',
'library',
'bookshelf',
'necktie',
'damask',
'waveform',
'jewelry',
'typewriter',
'groove',
'medicine'
  ];

  //elige una palabra random del array
function randomWords(words){
    let random = Math.floor(Math.random() * words.length);
    return words[random]
};

let palabraAleatoria = randomWords(words);
let time = 10;
let score = 0;

//le damos contenido al h1 
function addToDOM(){
let h1 = document.querySelector('#randomWord');
return h1.textContent = palabraAleatoria;
}
addToDOM();

//creamos un evento para comparar las palabras
let input = document.querySelector('#text');

input.addEventListener('input', function(e){
  let palabraIngresada = input.value;
  if(palabraIngresada === palabraAleatoria){
    let suma3S = document.querySelector('#timeSpan');
    suma3S.innerHTML = `${time+=3}s`;
    input.value = '';
    palabraAleatoria = randomWords(words);   
    addToDOM();
    updateScore();
  }
})

//manipular el tiempo

function actualizarTiempo(){
  
    document.querySelector('#timeSpan').innerHTML = `${time -= 1}s`;
  
    if(time === 0){
    clearInterval(timeInterval);
    gameOver();
  }
}

let timeInterval = setInterval(actualizarTiempo, 1000);

//suma 1 puto por cada palabra correcta
function updateScore(){
  document.querySelector('#score').innerHTML=score+=1
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
}


