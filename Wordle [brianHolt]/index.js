// declare all the Querry we need

const letters = document.querySelectorAll(".score-letter");
const loadingDiv = document.querySelectorAll(".info-bar");
const ANSWER_LENGHT = 5;

// work on typing

async function init() {
  let currentGuess = "";
  let currenRow = 0;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGHT) {
      //add letter to the end
      currentGuess += letter;
    } else {
      //replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }
    letters[ANSWER_LENGHT * currenRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length !== ANSWER_LENGHT) {
      // do nothing
      return;
    }

    // TODO validate the word

    // TODO do all the marking : "wrong" "close" "right"

    // TODO did they win or lose

    currenRow++;
    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGHT * currenRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    console.log(action);

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toLocaleUpperCase());
    } else {
      //do nothin
    }
  });
}

// Functions
function isLetter(letter) {
  // Regex.test return a boolean value
  return /^[a-zA-Z]$/.test(letter);
}

init();
