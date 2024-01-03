const urlParams = new URLSearchParams(window.location.search);
const score = urlParams.get("score");
const total = urlParams.get("total");
const answers = urlParams.get("answers");

// set css variable for the pecentage cercle outer line
const percentage = Math.floor((score * 100) / total);
document.documentElement.style.setProperty(
  "--result-percentage",
  `${percentage}%`
);

// show score and total
// document.querySelector("#score").innerText = score;
// document.querySelector("#total").innerText = total;

function initProgressCounter() {
  const counterElement = document.querySelector(".result-header__counter");
  const progressDivElement = document.createElement("div");
  progressDivElement.classList.add("progress-bar");
  const progressSpanElement = document.createElement("span");
  progressSpanElement.innerText = percentage;
  progressDivElement.appendChild(progressSpanElement);
  const progressElement = document.createElement("progress");
  progressElement.setAttribute("value", percentage);
  progressElement.setAttribute("min", "0");
  progressElement.setAttribute("max", "100");
  progressElement.setAttribute(
    "style",
    "visibility: hidden; height: 0; width: 0;"
  );
  progressElement.innerText = percentage + "%";
  progressDivElement.appendChild(progressElement);
  counterElement.appendChild(progressDivElement);
}

initProgressCounter();

const reviewBtn = document.querySelector(".results .card__actions .primary");
reviewBtn.addEventListener("click", () => {
  window.open(`./quiz.html?mode=preview&answers=${answers}`, "_self");
});
