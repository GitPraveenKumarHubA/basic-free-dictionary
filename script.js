/*
https://api.dictionaryapi.dev/api/v2/entries/en/

*/

let myform = document.querySelector(".form");
let clearBtn = document.querySelector("#clearBtn");
let word = document.querySelector("#word");
let partofSpeech = document.querySelector("#partofSpeech");
let phoneticsText = document.querySelector("#textPh");
let def = document.querySelector("#def");
let synonyms = document.querySelector("#synonyms");
let antonyms = document.querySelector("#antonyms");
let wordList = document.querySelector(".wordList");
let audiodiv = document.getElementById("phonetics");
document.querySelector("#phonetics").style.display = "none";


myform.addEventListener("submit", (e) => {
  e.preventDefault();

  let searchText = document.querySelector(".searchText");

  if (
    word.innerText.toString().trim().toLowerCase() ==
    searchText.value.toString().trim().toLowerCase()
  ) {
    alert("Try searching new word");
    return;
  }

  getData(searchText.value);
});


wordList.addEventListener("click", (e) => {
  if (e.target.nodeName == "I") {
    e.target.parentElement.remove();
  }
});

/**

clearBtn.addEventListener("click", (e) => {
  clearData();
});


audiodiv.addEventListener("click", (e) => {
  var wordsound = document.getElementById("wordsound");
  wordsound.load();
  wordsound.play();
});


function getData(word) {
  const fetchPromise = fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  fetchPromise
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // we get data.title only when there is No Definitions for word
      if (data.title != null) {
        alert(data.message);
        return;
      }
      fillData(data);
    })
    .catch((error) => {
      clearData();
      console.log(error);
      alert("Error while fetching data!. Please try later", error);
    });
}


function fillData(data) {
  let word = document.querySelector("#word");
  let partofSpeech = document.querySelector("#partofSpeech");

  let def = document.querySelector("#def");
  let synonyms = document.querySelector("#synonyms");
  let antonyms = document.querySelector("#antonyms");
  word.innerText = data[0].word;
  fillPhonetics(data[0].phonetics);
  partofSpeech.innerText = data[0].meanings[0].partOfSpeech;
  def.innerText = data[0].meanings[0].definitions[0].definition;
  synonyms.innerText = isempty(data[0].meanings[0].synonyms[0]);
  antonyms.innerText = isempty(data[0].meanings[0].antonyms[0]);
  addRecentlySearched(data[0].word);
}


function clearData() {
  word.innerText = "";
  phoneticsText.innerText = "";
  partofSpeech.innerText = "";
  def.innerText = "";
  synonyms.innerText = "";
  antonyms.innerText = "";
  document.querySelector("#phonetics").style.display = "none";
}
function isempty(data) {
  if (data != null && data.length != 0) {
    return data;
  }
  return "Not Available";
}


function fillPhonetics(data) {
  let phoneticsText = document.querySelector("#textPh");
  let audiosrc = document.querySelector("#audiosrc");

  data.forEach((item) => {
    let audioel = document.getElementById("phonetics");
    if (item.text != null && item.audio != null && item.audio.length != 0) {
      phoneticsText.innerText = item.text;
      audiosrc.setAttribute("src", item.audio);

      if (audioel != null || audioel != undefined)
        audioel.style.display = "block";
      return;
    }
    phoneticsText.innerText = "";
    audiosrc.setAttribute("src", "");
    if (audioel != null || audioel != undefined) audioel.style.display = "none";
  });
}


function addRecentlySearched(word) {
  wordList = document.querySelector(".wordList");
  let newWord = document.createElement("li");
  newWord.innerText = word;
  let close_el = document.createElement("i");
  close_el.setAttribute("class", "fa fa-times");
  newWord.append(close_el);
  wordList.prepend(newWord);
}
