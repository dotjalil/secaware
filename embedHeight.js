const body = document.querySelector("body");

// Calculate the page scroll height
function calculatePageScrollHeight() {
  return document.documentElement.scrollHeight;
}

function sendMessage() {
  // Send a message to the parent window
  // when the page is embedded, it communicates the page height
  window.parent.postMessage(
    {
      contentChanged: true,
      contentHeight: calculatePageScrollHeight(),
    },
    "*"
  ); // Allow communication with any origin
}

const observer = new ResizeObserver(function () {
  console.log("New scrollHeight", body.scrollHeight);
  sendMessage();
});

// This is the critical part: We observe the size of all children!
observer.observe(body);
