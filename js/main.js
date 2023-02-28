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

// Random Background Option

let backgroundOption = true;

// Variable To Control The Background Interval

let backgroundInterval;

// Check If There's Local Storage Random Background Item

let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove Active Class From All Spans

  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Function To Randomize Imgs

function randomizeImgs() {
  if (backgroundOption === true) {
    // Change Background Image Url

    backgroundInterval = setInterval(() => {
      // Get Random Number

      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("../imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

randomizeImgs();

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

    // Add Active Class On Element With Data Color === Local Storage Item

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
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Skills Selector

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height

  let windowHeight = this.innerHeight;

  // Window ScrollTop

  let windowScrollTop = this.scrollY;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup With The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append Overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      imgHeading.style.marginBottom = "20px";
      imgHeading.style.color = "var(--main-color)";
      imgHeading.style.textAlign = "center";
      imgHeading.style.fontSize = "23px";
      imgHeading.style.fontWeight = "bold";
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append The Text To The Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append The Popup Box To Body
    document.body.appendChild(popupBox);
    // Create The Close Span
    let closeBtn = document.createElement("span");
    // Create The Close Button Text
    let closeBtnText = document.createTextNode("X");
    // Append Text To Close Button
    closeBtn.appendChild(closeBtnText);
    // Add Class To Close Button
    closeBtn.className = "close-btn";
    // Add Close Button To The Popup Box
    popupBox.appendChild(closeBtn);
  });
});

// Close Popup

document.addEventListener("click", (e) => {
  if (e.target.className === "close-btn") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links

const allLinks = document.querySelectorAll(".links a");

function scrollToASection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToASection(allBullets);
scrollToASection(allLinks);
