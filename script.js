// Dark Mode Toggle
const darkModeButton = document.getElementById("toggleDarkMode");
const body = document.body;

darkModeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

window.addEventListener("load", () => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    body.classList.add("dark-mode");
  }
});

// Tutorial Overlay
const tutorialOverlay = document.getElementById("tutorialOverlay");
const startTutorialButton = document.getElementById("startTutorial");
const nextStepButtons = document.querySelectorAll(".next-btn");
const closeTutorialButton = document.getElementById("closeTutorial");
const tutorialSteps = document.querySelectorAll(".tutorial-step");

let currentStepIndex = 0;

function showTutorialOverlay() {
  tutorialOverlay.style.display = "flex";
  currentStepIndex = 0;
  showCurrentStep();
}

function showCurrentStep() {
  tutorialSteps.forEach((step, index) => {
    step.style.display = index === currentStepIndex ? "block" : "none";
  });
}

function nextStep() {
  currentStepIndex++;
  if (currentStepIndex < tutorialSteps.length) {
    showCurrentStep();
  } else {
    tutorialOverlay.style.display = "none";
  }
}

function closeTutorial() {
  tutorialOverlay.style.display = "none";
}

startTutorialButton.addEventListener("click", showTutorialOverlay);
nextStepButtons.forEach((button) => button.addEventListener("click", nextStep));
closeTutorialButton.addEventListener("click", closeTutorial);

// Search Functionality
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  fetch("/search?query=" + encodeURIComponent(query))
    .then((response) => response.json())
    .then((data) => {
      displaySearchResults(data.results);
    });
});

function displaySearchResults(results) {
  searchResults.innerHTML = "";
  if (results.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((result) => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.innerHTML = `<h3>${result.title}</h3><p>${result.description}</p>`;
      searchResults.appendChild(item);
    });
  }
}

// Chatbox Interaction
const chatInput = document.getElementById("chatInput");
const sendChatButton = document.getElementById("sendChat");
const chatbox = document.querySelector(".chatbox");

sendChatButton.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    appendMessage("user", message);
    chatInput.value = "";
    fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        appendMessage("bot", data.reply);
      });
  }
});

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `${sender}-message`;
  messageDiv.textContent = message;
  chatbox.appendChild(messageDiv);
  chatbox.scrollTop = chatbox.scrollHeight;
}

// Profile Update
const profileUpdateButton = document.getElementById("profileUpdate");
const profileNameInput = document.getElementById("profileName");
const profilePhotoInput = document.getElementById("profilePhoto");
const profileSection = document.querySelector(".profile");

profileUpdateButton.addEventListener("click", () => {
  const name = profileNameInput.value.trim();
  const photo = profilePhotoInput.files[0];
  if (name && photo) {
    const reader = new FileReader();
    reader.onload = () => {
      profileSection.innerHTML = `
                <h2>${name}</h2>
                <img src="${reader.result}" alt="Profile Photo" style="width: 100px; height: 100px; border-radius: 50%;">
            `;
    };
    reader.readAsDataURL(photo);
  }
});

// Initialize dark mode on page load
document.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    body.classList.add("dark-mode");
  }
});
