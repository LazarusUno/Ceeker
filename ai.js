const alanBtnInstance = alanBtn({
  key: "af2cc98cbeeca9aefbdb94c99f2a404e2e956eca572e1d8b807a3e2338fdd0dc/stage",
  onCommand: function (commandData) {
    if (commandData.command === "image") {
      image();
    }
    if (commandData.command === "news") {
      news();
    }
    if (commandData.command === "home") {
      home();
    }
    if (commandData.command === "ai") {
      ai();
    }
    if (commandData.command === "search") {
      search();
    }
   
  },
  rootEl: document.getElementById("alan-btn"),
});

// Initialize Alan AI

function image() {
  window.location.href = "image.html";
}
function news() {
  window.location.href = "news.html";
}
function ai() {
  window.location.href = "web/chat.html";
}
function home() {
  window.location.href = "index.html";
}
function search() {
  window.location.href = "search.html";
}

// Function to navigate to the specified page
