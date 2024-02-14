const imageList = document.querySelectorAll("section.screen div.img-container");
const chatList = document.querySelectorAll(".chatText");
const character = document.querySelector(".character");
const leftButton = document.querySelector(".arrow-left");
const rightButton = document.querySelector(".arrow-right");
const startScreen = document.getElementById("start");
const scene1 = document.getElementById("scene1");
const scene1Text = document.getElementById("scene1Text");
const startSound = document.getElementById("startSound");
const clickSound = document.getElementById("clickSound");
const maleCharacter = document.querySelector(".male");
const modal = document.querySelector(".modal");
const modalButtons = document.querySelectorAll(".modal button");
const backgroundMusic = document.getElementById("bgMusic");
const buttonAClick = document.querySelector(".button-a");
const scene1TextWords = document.getElementById("scene1Text");
const scene2TextWords = document.getElementById("scene2Text");

let shouldModalOpen = true;
let index = 0;
let chatIndex = 0;
let shouldRestrictMovement = false;
// To align with index starting at 0
let frameLimit = imageList.length - 1;

const keyClick = () => {
  modal.classList.add("hidden");
  shouldRestrictMovement = false;
};

// Both do the same shit handler
modalButtons[0].addEventListener("click", keyClick);
modalButtons[1].addEventListener("click", keyClick);

const displayModal = (characterLocationValue) => {
  if (
    index === 1 &&
    characterLocationValue > imageList[index].offsetWidth - 150 &&
    shouldModalOpen
  ) {
    shouldRestrictMovement = shouldModalOpen ? true : false;
    modal.classList.remove("hidden");
    shouldModalOpen = false;
  }
};

const keyHandler = (e) => {
  const characterLocationValue = parseInt(character.style.left, 10);

  if (e.key === " ") {
    console.log("test");
    startScreen.classList.add("hidden");
    scene1.classList.remove("hidden");
    character.classList.remove("hidden");
    scene1Text.classList.remove("hidden");
  }

  if (e.key === "ArrowRight") {
    if (!shouldRestrictMovement) {
      character.style.left = characterLocationValue + 15 + "px";
    }
    displayModal(characterLocationValue);
  }

  if (e.key === "ArrowLeft") {
    if (!shouldRestrictMovement) {
      character.style.left = characterLocationValue - 15 + "px";
    }
  }

  // Next Screen
  if (
    characterLocationValue > imageList[index].offsetWidth &&
    index !== frameLimit
  ) {
    character.style.left = 0;
    imageList[index].classList.add("hidden");
    index++;
    imageList[index].classList.remove("hidden");
  }
  // Prevent going back a screen
  if (characterLocationValue < 0) {
    character.style.left = 0;
  }

  if (imageList[index] === imageList[2]) {
    character.remove();
  }
};
document.addEventListener("keydown", (e) => keyHandler(e));

// Button Functions

function playStartSound() {
  startSound.volume = 0.06;
  startSound.play();

  backgroundMusic.load();
  backgroundMusic.play();
  backgroundMusic.volume = 0.05;
}

function playClickSound() {
  clickSound.volume = 0.08;
  clickSound.play();
}

function buttonLeft() {
  if (startScreen.classList.contains("hidden") === true) {
    const characterLocationValue = parseInt(character.style.left, 10);
    if (!shouldRestrictMovement) {
      character.style.left = characterLocationValue - 25 + "px";
    }
    if (
      characterLocationValue > imageList[index].offsetWidth &&
      index !== frameLimit
    ) {
      character.style.left = 0;
      imageList[index].classList.add("hidden");
      index++;
      imageList[index].classList.remove("hidden");
    }
    if (characterLocationValue < 0) {
      character.style.left = 0;
    }
    if (imageList[index] === imageList[2]) {
      character.remove();
    }
  }
}

function buttonRight() {
  if (startScreen.classList.contains("hidden") === true) {
    const characterLocationValue = parseInt(character.style.left, 10);
    if (!shouldRestrictMovement) {
      character.style.left = characterLocationValue + 25 + "px";
    }

    displayModal(characterLocationValue);
    if (
      characterLocationValue > imageList[index].offsetWidth &&
      index !== frameLimit
    ) {
      character.style.left = 0;
      imageList[index].classList.add("hidden");
      index++;
      imageList[index].classList.remove("hidden");
    }
    if (characterLocationValue < 0) {
      character.style.left = 0;
    }
    if (imageList[index] === imageList[2]) {
      character.remove();
    }
  }
}

function selectButton() {
  window.location.reload();
}

function startButton() {
  startScreen.classList.add("hidden");
  scene1.classList.remove("hidden");
  character.classList.remove("hidden");
  scene1Text.classList.remove("hidden");
}

function pause() {
  if (startScreen.classList.contains("hidden") === true) {
    if (document.hasFocus() === false) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
      backgroundMusic.volume = 0.05;
    }
  }
}
setInterval(pause, 100);
