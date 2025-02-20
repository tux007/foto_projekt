let imgs = [
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

let imgDescription = [
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

document.addEventListener("DOMContentLoaded", () => {
  generatePhotoAlbum();
});

function generatePhotoAlbum() {
  let photoContainer = document.getElementById("photo_container");
  photoContainer.innerHTML = "";
  for (let i = 0; i < imgs.length; i++) {
    let imgElement = document.createElement("img");
    imgElement.className = "photo";
    imgElement.src = `./img/${imgs[i]}`;
    imgElement.alt = imgDescription[i];
    imgElement.onclick = () => showPhotoDetails(i);
    photoContainer.appendChild(imgElement);
  }
}

function showPhotoDetails(number) {
  toggleOverlay();

  currentPhoto = imgs;
  currentDescription = imgDescription;
  currentNumber = number;

  displayPhoto(currentNumber);

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

function displayPhoto(currentNumber) {
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
                    <p style="text-align: center;">${i + 1} of ${
    currentPhoto.length
  }</p>
                    <img class="current_photo" src="./img/${currentPhoto[i]}">
                    <img class="arrows arrow_left" onclick="lastPhoto()" src="./img/assets/left.png">
                    <img class="arrows arrow_right" onclick="nextPhoto()" src="./img/assets/right.png">
                    <h3 style="text-align: center; margin-top: 0px;">${
                      currentDescription[i]
                    }</h3>
                </div>
            </div>`;
}

function closeCurrentPhoto() {
  showPhotoDetails();
  document.getElementById("overlay").classList.add("d_none");
}

function toggleOverlay() {
  let overlayRef = document.getElementById("overlay");
  overlayRef.classList.toggle("d_none");
}

function lastPhoto() {
  toggleOverlay();

  if (currentNumber - 1 >= 0) {
    showPhotoDetails(currentNumber - 1);
  } else {
    currentNumber = imgs.length - 1;
    showPhotoDetails(currentNumber);
  }
}

function nextPhoto() {
  toggleOverlay();

  if (currentNumber + 1 < imgs.length) {
    showPhotoDetails(currentNumber + 1);
  } else {
    showPhotoDetails(0);
  }
}

function darkmodeToggle() {
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
          lastPhoto();
          break;
        case "ArrowRight":
          nextPhoto();
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
