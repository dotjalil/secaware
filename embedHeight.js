// Calculate the page scroll height
function calculatePageScrollHeight() {
  return document.documentElement.scrollHeight;
}

// Send a message to the parent window
// when the page is embedded, it communicates the page height
window.parent.postMessage(
  {
    contentChanged: true,
    contentHeight: calculatePageScrollHeight(),
  },
  "*"
); // Allow communication with any origin
