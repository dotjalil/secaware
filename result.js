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
if (percentage < 50) {
  document.querySelector(".result-title").innerText = "تحتاج إلى المساعدة!";
  document.documentElement.style.setProperty(
    "--result-stroke-color",
    "rgba(255, 38, 38, 1)"
  );
  document.documentElement.style.setProperty("--result-bg-color", "#fefcfb");
  document.documentElement.style.setProperty(
    "--result-text-gradient-color-1",
    "rgba(255, 38, 38, 1)"
  );
  document.documentElement.style.setProperty(
    "--result-text-gradient-color-2",
    "rgba(161, 0, 0, 1)"
  );
} else if (percentage < 75) {
  document.querySelector(".result-title").innerText = "جيد!";
  document.documentElement.style.setProperty(
    "--result-stroke-color",
    "rgba(255, 95, 4, 1)"
  );
  document.documentElement.style.setProperty("--result-bg-color", "#ffefe9");
  document.documentElement.style.setProperty(
    "--result-text-gradient-color-1",
    "rgba(255, 207, 38, 1)"
  );
  document.documentElement.style.setProperty(
    "--result-text-gradient-color-2",
    "rgba(255, 95, 4, 1)"
  );
} else {
  // document.documentElement.style.setProperty("--result-stroke-color", );
  // document.documentElement.style.setProperty("--result-bg-color", );
  // document.documentElement.style.setProperty("--result-text-gradient-color-1", );
  // document.documentElement.style.setProperty("--result-text-gradient-color-2", );
}
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
