const wordContainer = document.getElementById('wordContainer'); 
const startButton = document.getElementById('startButton');
const usedLettersElement = document.getElementById('usedLetters');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
  [4,2,1,1],
  [4,3,1,2],
  [3,5,1,1],
  [5,5,1,1],
  [3,3,1,1],
  [5,3,1,1]
];

let selectWord;
let usedLetters;
let mistakes;
let hits;

const addLetter = letter => {
  const letterElement = document.createElement('span');//crear elemento span
  letterElement.innerHTML = letter.toUpperCase();
  usedLettersElement.appendChild(letterElement);
}

const addBodyPart = bodyPart => {
ctx.fillStyle = '#fff';//pinta de blanco al mono
ctx.fillRect(...bodyPart);//agrega una parte del cuerpo
};

const wrongLetter = () =>{//error que construye el muñeco
     addBodyPart(bodyParts[mistakes]);
     mistakes++;
     if(mistakes === bodyParts.length) endGame();
}

const endGame = () =>{
     document.removeEventListener('keydown',letterEvent);//evita anotar mas letras
     startButton.style.display = 'block';// muestra boton start
};

const correctLetter = letter =>{//insertamiento de letra en la palabra
 const {children} = wordContainer;//buscar palabra de la letra en contenedor
  for(let i=0; i < children.length; i++){
      if(children[i].innerHTML === letter){
         console.log('letter'+  letter);
         children[i].classList.toggle('hidden');
         children[i].style.display='inline';
         children[i].style='color:white';
         hits++;
      }
  }//si encuentra letra, la destransparenta hasta hayarlas todas
  if(hits === selectWord.length) endGame();
};

const letterInput = letter =>{
     if(selectWord.includes(letter)){//verificar si letra es correcta
     correctLetter(letter);//llama funcion para insertarla en donde vaya en la palabra
     } else{
        wrongLetter();
     }
     addLetter(letter);
};//funcion para insertar letra

const letterEvent = event =>{
   let newLetter = event.key.toUpperCase();
   if(newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)){//condicion si es una letra y no ha sido probrada anteriormente
      letterInput(newLetter);
   };//funciona si se inserta letra no usada
};

const drawWord = () => {
  selectWord.forEach(letter => {//itera sobre cada letra de palabra seleccionada
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();//letras mayusculas
    letterElement.classList.add('letter');//se agrega letra
    letterElement.classList.add('hidden');
    //letterElement.style.display='inline';// none
    //letterElement.style='color:white';
    wordContainer.appendChild(letterElement);//se agrga palabra por spans
  });
};

const selectRandomWord = () =>{//seleccionar al azar una palabra aleatoria en el rango de words
  let word = words[Math.floor((Math.random() * words.length))].toUpperCase();
  selectWord = word.split('');//la palabra seleccionada la divide en silabas
};

const drawHangMan = () =>{
      ctx.canvas.width =120;
      ctx.canvas.height =160;
      ctx.scale(20,20);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#d95d39';//color para pintar la madera del ahorcado
      ctx.fillRect(0,7,4,1);
      ctx.fillRect(1,0,1,8);
      ctx.fillRect(2,0,3,1);
      ctx.fillRect(4,1,1,1);//se dibuja el palo del ahorcado
};

const startGame = () => {
    usedLetters = [];
    mistakes = 0;
    hits =0;
    wordContainer.innerHTML = '';
    usedLettersElement.innerHTML = '';
    startButton.style.display = 'none';  //al iniciar la partida se borra el boton de inicio
    drawHangMan();//se dibuja el ahorcado
    selectRandomWord();//seleccionar palabra al azar de palabras.js
    drawWord();//dibujar palabra
    document.addEventListener('keydown',letterEvent);//llama a la funcion letterEvent por cada letra presionada
  };

startButton.addEventListener('click',startGame);//boton para comenzar el juego