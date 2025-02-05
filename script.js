let Imgs = [
  "Backsquat.jpg",
  "barbell.jpg",
  "biking.jpg",
  "clean.jpg",
  "coaching.jpg",
  "dumbells.jpg",
  "dynamic.jpg",
  "jumpropes.jpg",
  "kettlebell.jpg",
  "pistolsquat.jpg",
  "pushup.jpg",
  "rings.jpg",
  "ropeclimb.jpg",
  "rowing.jpg",
  "running.jpg",
  "stretching.jpg",
  "teamworkout.jpg",
  "tireflip.jpg",
  "trx.jpg",
  "wallball.jpg",
  "yoga.jpg",
];

let Name = [
  "Backsquat",
  "Barbell (Hantelstange)",
  "Biking",
  "Clean",
  "Coaching",
  "Dumbells",
  "Dynamisches Training",
  "Jump Ropes",
  "Kettlebell",
  "Pistol Squat",
  "Pushup",
  "Rings",
  "Rope climb",
  "Rowing",
  "Running",
  "Stretching",
  "Teamworkout",
  "Tireflip",
  "TRX",
  "Medball",
  "Yoga",
];

let currentPhoto = [];
let currentDescription = [];
let currentNumber = [];

function renderFiltered(number) {
  toggleOverlay();

  currentPhoto = Imgs;
  currentDescription = Name;
  currentNumber = number;

  render(currentNumber);

  if (
    document
      .getElementById("darkmode_toggle")
      .classList.contains("darkmode_off") &&
    number >= 0
  ) {
    document
      .getElementById("current_element")
      .classList.add("lightmode_footer_header");
  }
}

function render(currentNumber) {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";
  for (let i = currentNumber; i < currentNumber + 1; i++) {
    contentRef.innerHTML += getNoteTemplate(i);
  }
}

function getNoteTemplate(i) {
  return `<div class="current_element" id="current_element">
                <button id="close_btn" onclick="closeCurrentPhoto()"> x </button>
                <div>
                    <img class="current_photo" src="./img/${currentPhoto[i]}">
                    <img class="arrows arrow_left" onclick="LastPhoto()" src="./img/assets/left.png">
                    <img class="arrows arrow_right" onclick="NextPhoto()" src="./img/assets/right.png">
                    <h3> ${currentDescription[i]} </h3>
                </div>
            </div>`;
}

function closeCurrentPhoto() {
  renderFiltered();
  document.getElementById("overlay").classList.add("d_none");
}

function toggleOverlay() {
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.toggle("d_none");
}

function LastPhoto() {
  toggleOverlay();

  if (currentNumber - 1 >= 0) {
    renderFiltered(currentNumber - 1);
  } else {
    currentNumber = Imgs.length - 1;
    renderFiltered(currentNumber);
  }
}

function NextPhoto() {
  toggleOverlay();

  if (currentNumber + 1 < Imgs.length) {
    renderFiltered(currentNumber + 1);
  } else {
    renderFiltered(0);
  }
}

function DarkmodeToggle() {
  document.getElementById("darkmode_toggle").classList.toggle("darkmode_off");
  document.getElementById("header").classList.toggle("lightmode_footer_header");
  document.getElementById("footer").classList.toggle("lightmode_footer_header");
  document.getElementById("main").classList.toggle("lightmode_main");
}

document.addEventListener(
  "keydown",
  (event) => {
    if (document.getElementById("overlay").classList.contains("d_none")) {
    } else {
      switch (event.key) {
        case "ArrowLeft":
          LastPhoto();
          break;
        case "ArrowRight":
          NextPhoto();
          break;
        case "Escape":
          closeCurrentPhoto();
          break;
      }
      event.preventDefault();
    }
  },
  true
);
