const urlParams = new URLSearchParams(window.location.search);
const score = urlParams.get("score");
const total = urlParams.get("total");
document.querySelector("#score").innerText = score;
document.querySelector("#total").innerText = total;
