// shop.js

let shopOpen = false;
const codeBox = document.getElementById("codeBox"); // make sure you have this element

// --- Open/Close Shop ---
function openShop() {
  shopOpen = true;
  if(codeBox) codeBox.style.display = "none";
  document.getElementById("shop").style.display = "block";
  document.getElementById("coinDisplay").innerText = coins;
  pauseGame();
  renderShop();
}

function closeShop() {
  shopOpen = false;
  document.getElementById("shop").style.display = "none";
  resumeGame();
}

// --- Pause/Resume helpers ---
function pauseGame() { gamePaused = true; }
function resumeGame() { gamePaused = false; }

// --- Render shop items ---
function renderShop() {
  const container = document.getElementById("shopItems");
  container.innerHTML = "";

  // Ally shop item
  const cost = allyCount < 4 ? allyCostLadder[allyCount] : "MAX";
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.justifyContent = "space-between";
  div.style.background = "#222";
  div.style.padding = "8px";
  div.style.borderRadius = "6px";

  div.innerHTML = `<span><img src="../Images/ally.png" style="width:16px;height:16px;"> Ally - ${cost}💰</span><button>${cost === "MAX" ? "MAX" : "Buy"}</button>`;

  const btn = div.querySelector("button");
  if(cost !== "MAX") btn.onclick = buyAlly;
  else btn.disabled = true;

  container.appendChild(div);
}

// --- Shop messages ---
function showShopMessage(msg) {
  const container = document.getElementById("shopItems");
  const p = document.createElement("p");
  p.style.color = "red";
  p.innerText = msg;
  container.appendChild(p);
  setTimeout(() => {
    if(container.contains(p)) container.removeChild(p);
  }, 1500);
}
