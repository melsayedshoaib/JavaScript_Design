// Select Landing Page Element

let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs

let imgsArray = [
  "work-1.jpg",
  "work-2.jpg",
  "work-3.jpg",
  "work-4.jpg",
  "work-5.jpg",
  "work-6.jpg",
];

// Change Background Image Url

setInterval(() => {
  // Get Random Number

  let randomNumber = Math.floor(Math.random() * imgsArray.length);
  landingPage.style.backgroundImage = `url("../imgs/${imgsArray[randomNumber]}")`;
}, 10000);

// Select Settings Box

let settingsBox = document.querySelector(".settings-box");

// Select The Toggle Settings To Show Settings Box

let toggleSettings = document.querySelector(".toggle-settings");

// Select The Gear Icon

let gearIcon = document.querySelector(".toggle-settings #gear");

// Display Settings Box

toggleSettings.addEventListener("click", () => {
  if (settingsBox.classList.contains("open")) {
    settingsBox.classList.remove("open");
    gearIcon.classList.remove("fa-spin");
  } else {
    settingsBox.classList.add("open");
    gearIcon.classList.add("fa-spin");
  }
});

// Check If There Is A Local Storage Color Option

let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove Active Class From All Colrs List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class On Element With Data Color --- Local Storage Item

    if (element.dataset.color === mainColor) {
      // Add Active Class

      element.classList.add("active");
    }
  });
}

// Switch Colors

const colorsLi = Array.from(document.querySelectorAll(".colors-list li"));

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add Active Class On Target
    e.target.classList.add("active");
  });
});

// Switch Random Background Option

const randomBackEl = Array.from(
  document.querySelectorAll(".random-backgrounds span")
);

randomBackEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add Active Class On Target
    e.target.classList.add("active");
  });
});
