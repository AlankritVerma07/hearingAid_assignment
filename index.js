const devices = [
  {
    key: "ricS",
    text: "hear.com HORIZON\nAX RIC-S",
    shortText: "AX RIC-S",
    image: "https://www.hear.com/in/wp-content/uploads/sites/17/2022/12/1.-HORIZON-AX-RIC-S.jpg",
  },
  {
    key: "ricR",
    text: "hear.com HORIZON\nAX RIC-R",
    shortText: "AX RIC-R",
    image: "https://www.hear.com/in/wp-content/uploads/sites/17/2022/12/2.-HORIZON-AX-RIC-R.jpg",
  },
  {
    key: "xRic",
    text: "hear.com HORIZON\nX RIC",
    shortText: "X RIC",
    image: "https://www.hear.com/in/wp-content/uploads/sites/17/2022/12/3.-HORIZON-X-RIC.jpg",
  },
  {
    key: "xIterR",
    text: "hear.com HORIZON\nX ITER-R",
    shortText: "X ITER-R",
    image: "https://www.hear.com/in/wp-content/uploads/sites/17/2022/12/4.-HORIZON-AX-ITC-R.jpg",
  },
  {
    key: "xCic",
    text: "hear.com HORIZON\nX CIC",
    shortText: "X CIC",
    image: "https://www.hear.com/in/wp-content/uploads/sites/17/2022/12/5.-HORIZON-X-CIC.jpg",
  },
];

const buttonsContainer = document.querySelector(".device-buttons");
const deviceImage = document.getElementById("device-image");
const deviceText = document.getElementById("device-text");
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

let currentIndex = 0;

function renderButtons() {
  devices.forEach((device, index) => {
    const button = document.createElement("button");
    // button.innerText = device.text;
    button.innerText = device.text.replace("\n", " ");
    button.dataset.index = index;
    button.onclick = () => selectDevice(index);
    buttonsContainer.appendChild(button);
  });
  updateButtonText();
  window.addEventListener("resize", updateButtonText);
}

function updateButtonText() {
  const isMobile = window.innerWidth < 600;
  document.querySelectorAll(".device-buttons button").forEach((button, index) => {
    button.innerText = isMobile ? devices[index].shortText : devices[index].text;
  });
}

function selectDevice(index) {
  currentIndex = index;
  const selectedDevice = devices[index];
  deviceImage.src = selectedDevice.image;
  deviceText.innerText = selectedDevice.text;
  updateActiveButton();
  updateURLParameter();
}

function updateActiveButton() {
  document.querySelectorAll(".device-buttons button").forEach((button, index) => {
    button.classList.toggle("active", index === currentIndex);
  });
}

function updateURLParameter() {
  const selectedDevice = devices[currentIndex];
  const url = new URL(window.location);
  url.searchParams.set("aud_device", selectedDevice.key);
  window.history.pushState({}, "", url);
}

function checkURLParameter() {
  const urlParams = new URLSearchParams(window.location.search);
  const deviceKey = urlParams.get("aud_device");
  if (deviceKey) {
    const deviceIndex = devices.findIndex((device) => device.key === deviceKey);
    if (deviceIndex !== -1) {
      selectDevice(deviceIndex);
    }
  } else {
    selectDevice(0);
  }
}

function handleKeyboardNavigation(event) {
  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % devices.length;
    selectDevice(currentIndex);
  } else if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + devices.length) % devices.length;
    selectDevice(currentIndex);
  }
}

function handleArrowClick(direction) {
  if (direction === "left") {
    currentIndex = (currentIndex - 1 + devices.length) % devices.length;
  } else if (direction === "right") {
    currentIndex = (currentIndex + 1) % devices.length;
  }
  selectDevice(currentIndex);
}

leftArrow.addEventListener("click", () => handleArrowClick("left"));
rightArrow.addEventListener("click", () => handleArrowClick("right"));

document.addEventListener("keydown", handleKeyboardNavigation);

renderButtons();
checkURLParameter();
