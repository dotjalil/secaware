const appEl = document.querySelector("#app");
appEl.innerText = "App will run here";

// Send a message to the parent window
window.parent.postMessage("contentChanged", "*"); // Allow communication with any origin
