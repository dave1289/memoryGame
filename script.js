const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let picks = []
let ids = []

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let i = 0; i < colorArray.length; i++) {
    // create a new div
    const newDiv = document.createElement("div");
    newDiv.setAttribute('id', `div${i}`);

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(colorArray[i]);

    // call a function handleCardClick when a div is clicked on

    setTimeout(function(){newDiv.addEventListener("click", handleCardClick)},1000);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// gameContainer.addEventListener('click', function(e){
//   if (e.target.tagName              = "DIV");
//   picks.push(e.target.classList);
// })


function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  picks.push(event.target.classList);
  ids.push(event.target.id)
  console.log(ids, picks)
  event.target.style.backgroundColor  = '';
  for (let i = 0; i < picks.length; i++){
    localStorage.setItem(i, picks[i]);
    event.target.style.backgroundColor = picks[i]
  }
  if (picks.length > 1) {
    cardCheck();
  }
}


function divIdCollector(e) {
  return e.target.id;
}


function cardCheck() {
  let pickOne = localStorage.getItem(0);
  let pickTwo = localStorage.getItem(1);
  let idOne = ids[0];
  let idTwo = ids[1];
  let first = document.querySelectorAll(`.${pickOne}`)
  let second = document.querySelectorAll(`.${pickTwo}`)
  if (pickOne !== pickTwo || idOne === idTwo) {
    localStorage.clear();
    picks.length = 0;
    let final = setInterval(function(){
      first[0].style.backgroundColor = '';
      first[1].style.backgroundColor = '';
      second[1].style.backgroundColor = '';
      second[0].style.backgroundColor = '';
      clearInterval(final);
    },1000)

  }
  else {
    localStorage.clear();  
    picks.length = 0;
    ids.length = 0;
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


function throttle(func, interval) {
  var lastCall = 0;
  return function() {
      var now = Date.now();
      if (lastCall + interval < now) {
          lastCall = now;
          return func.apply(this, arguments);
      }
  };
}
