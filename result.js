const urlParams = new URLSearchParams(window.location.search);
const score = urlParams.get("score");
const total = urlParams.get("total");
document.querySelector("#score").innerText = score;
document.querySelector("#total").innerText = total;

function initProgressCounter() {
  const counterElement = document.querySelector(".quiz-header__counter");
  const progressDivElement = document.createElement("div");
  progressDivElement.classList.add("progress-bar");
  const progressSpanElement = document.createElement("span");
  progressSpanElement.innerText = "1";
  progressDivElement.appendChild(progressSpanElement);
  const progressElement = document.createElement("progress");
  progressElement.setAttribute("value", "0");
  progressElement.setAttribute("min", "0");
  progressElement.setAttribute("max", "100");
  progressElement.setAttribute(
    "style",
    "visibility: hidden; height: 0; width: 0;"
  );
  progressElement.innerText = "76%";
  progressDivElement.appendChild(progressElement);
  counterElement.appendChild(progressDivElement);
}

initProgressCounter();
