// declare all the Querry we need

const letters = document.querySelectorAll(".score-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGHT = 5;
const ROUNDS = 6;

// work on typing

async function init() {
  let currentGuess = "";
  let currenRow = 0;
  let isLoading = true;

  // U only req the word of the day once,(when the page is loaded)
  //res= coomon shorthand for response
  // if u want a new word each time
  // const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=1");
  const res = await fetch("https://words.dev-apis.com/word-of-the-day");
  const resObj = await res.json();
  const word = resObj.word.toUpperCase();
  const wordParts = word.split("");
  // console.log(word);
  let done = false;
  setLoading(false);
  isLoading = false;

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

    // validate the word
    isLoading = true;
    setLoading(isLoading);
    const res = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      body: JSON.stringify({ word: currentGuess }),
    });

    const resObj = await res.json();
    const validWord = resObj.validWord;
    // const {validWord} = resObj;

    isLoading = false;
    setLoading(isLoading);

    if (!validWord) {
      markInValinWord();
      return;
    }

    //do all the marking : "wrong" "close" "right"
    const guessParts = currentGuess.split("");
    const map = makeMap(wordParts);
    // console.log(map);

    for (let i = 0; i < ANSWER_LENGHT; i++) {
      //Mark as correct
      if (guessParts[i] === wordParts[i]) {
        letters[ANSWER_LENGHT * currenRow + i].classList.add("correct");
        map[guessParts[i]]--;
      }
    }

    for (let i = 0; i < ANSWER_LENGHT; i++) {
      if (guessParts[i] === wordParts[i]) {
        // alredy done
      } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
        //mark it as close
        letters[ANSWER_LENGHT * currenRow + i].classList.add("close");
        map[guessParts[i]]--;
      } else {
        letters[ANSWER_LENGHT * currenRow + i].classList.add("wrong");
      }
    }

    currenRow++;

    // TODO did they win or lose
    if (currentGuess === word) {
      //win
      alert("U win!");
      document.querySelector(".title").classList.add("winner");
      done = true;
      return;
    } else if (currenRow === ROUNDS) {
      alert(`U loose the word was ${word}`);
      done = true;
    }
    currentGuess = "";
  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);
    letters[ANSWER_LENGHT * currenRow + currentGuess.length].innerText = "";
  }
  function markInValinWord() {
    // alert("not a valid word");

    for (let i = 0; i < ANSWER_LENGHT; i++) {
      letters[ANSWER_LENGHT * currenRow + i].classList.remove("invalid");

      // how long we want to keep the invalid class
      setTimeout(function () {
        letters[ANSWER_LENGHT * currenRow + i].classList.add("invalid", 10);
      });
    }
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    // console.log(action);

    if (done || isLoading) {
      // do nothing
      return;
    }

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
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

function setLoading(isLoading) {
  //if it is Loading then it's not hidden
  loadingDiv.classList.toggle("show", isLoading);
}

function makeMap(array) {
  const obj = {};
  for (let i = 0; i < array.length; i++) {
    if (obj[array[i]]) {
      obj[array[i]]++;
    } else {
      obj[array[i]] = 1;
    }
  }
  return obj;
}

init();
