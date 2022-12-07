let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);
/// 1

const nameForm = document.querySelector(".name-form");
const nameFormInput = nameForm.querySelector("input");
const userName = document.querySelector(".user-name");

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const val = nameFormInput.value;
  if (val !== "") {
    userName.textContent = `Salut, ${formatName(val)} !`;
    userName.classList.add("active");
    nameFormInput.value = "";
  }
});
function formatName(input) {
  return input[0].toUpperCase() + input.slice(1);
}

//2

const cuurentTimeDom = document.querySelector(".current-time");

function getDate() {
  const date = new Date();
  let hours = date.getHours();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  seconds = formatDate(seconds);
  hours = formatDate(hours);
  minutes = formatDate(minutes);
  cuurentTimeDom.innerHTML = `Cuurent time: <br> ${hours} : ${minutes} : ${seconds}`;
}

getDate();
setInterval(getDate, 1000);

function formatDate(value) {
  return value > 10 ? value : "0" + value;
}

///3

const ageForm = document.querySelector(".age-form");
const ageFormInput = ageForm.querySelector("input");
const age = document.querySelector(".user-age");
// const comboDOM = document.querySelector(".combo");
ageForm.addEventListener("submit", calculateAge);

function calculateAge(e) {
  e.preventDefault();
  if (ageFormInput.value !== "") {
    const dateSplitted = ageFormInput.value.split("-");
    const userDate = new Date(
      dateSplitted[0],
      dateSplitted[1] - 1,
      dateSplitted[2],
      0,
      0,
      0,
      0
    );
    const date = Date.now();
    let numberYearsToSubstract = new Date().getFullYear() - dateSplitted[0];
    const userTime = userDate.getTime();
    let userAgeTime = date - userTime;

    for (let i = 0; i < numberYearsToSubstract; i++) {
      userAgeTime -= 432000000;
    }

    let year, month, day, hour, minute, second;
    second = Math.floor(userAgeTime / 1000);
    minute = Math.floor(second / 60);
    second = second % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    month = Math.floor(day / 30);
    day = day % 30;
    year = Math.floor(month / 12);
    month = month % 12;
    if (second > 0) {
      age.innerHTML = `Your age is: <br> ${year} years, ${month} months, ${day} days,${hour} hours, ${minute} minutes, ${second} seconds , <span style="color: white">approximately</span>`;
    } else {
      age.innerHTML = "Invalid date";
    }
  }
}

// 4

const content = document.querySelector(".content");
const goToComboBtn = document.querySelector(".toForm");
const goBack = document.querySelector(".back");
const comboDOM = document.querySelector(".combo");

goToComboBtn.addEventListener("click", () => {
  content.style.transform = "translateX(100%)";
  comboDOM.style.transform = "translateX(0)";
});

goBack.addEventListener("click", () => {
  content.style.transform = "translateX(0)";
  comboDOM.style.transform = "translateX(-100%)";
});

//

const comboForm = document.querySelector(".combo-form");
const modal = document.querySelector(".combo-modal");
const closeModalButton = document.querySelector("#close");
const comboUsername = document.querySelector("#username");
const comboCity = document.querySelector("#city");
const comboCheckbox = document.querySelector(".check #cat");
const comboRadioButtons = [...document.querySelectorAll('[type="radio"]')];
const comboSelections = [...document.querySelectorAll("select option")];
const modalContent = document.querySelector(".modal-content");
const selectedOption = comboSelections.find((combo) => combo.selected);

comboForm.addEventListener("submit", openModal);
closeModalButton.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
function openModal(e) {
  e.preventDefault();
  modal.style.visibility = "visible";
  modal.style.opacity = "1";
  const user = comboUsername.value;
  const city = comboCity.value;
  const userLikesCats = comboCheckbox;
  const userAnswer = comboRadioButtons.find((item) => item.checked);
  const output = userAnswer.dataset.value;
  const userPreference = comboSelections.find((combo) => combo.selected);
  modalContent.innerHTML = `
    <div class="u-i">Salut, ${user} din ${city}!</div>
    <div class='message'>${
      output == "adevarat"
        ? "Da, 1 + 1 == 2 😂 "
        : "1 + 1 == 4 returns false 😅 "
    }</div>
    <div class="pref">Activitatea preferata de tine ${
      userPreference.value == "niciuna"
        ? "nu este inclusa aici."
        : `este ${showPreference(userPreference.value)}.`
    }</div>
    ${
      userLikesCats.checked
        ? "<div class='img-container'><img src='cats.png'></div>"
        : ""
    }
  `;
}

function closeModal() {
  modal.style.visibility = "hidden";
  modal.style.opacity = "0";
}

function showPreference(message) {
  switch (message) {
    case "sport":
      return "sa faci sport";
    case "film":
      return "sa te uiti la filme";
    case "plimb":
      return "sa te plimbi";
  }
}
