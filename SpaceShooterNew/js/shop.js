// shop.js
const shopItemsData = [{ name: "Ally", sprite: "<img src='ally.png'>", action: buyAlly }];

function openShop(){ shopOpen=true; codeBox.style.display="none"; document.getElementById("shop").style.display="block"; document.getElementById("coinDisplay").innerText=coins; pauseGame(); renderShop(); }
function closeShop(){ shopOpen=false; document.getElementById("shop").style.display="none"; resumeGame(); }

function renderShop(){
  const container = document.getElementById("shopItems");
  container.innerHTML = "";
  const cost = allyCount < 4 ? allyCostLadder[allyCount] : "MAX";
  const div = document.createElement("div");
  div.style.display="flex"; div.style.justifyContent="space-between"; div.style.background="#222"; div.style.padding="8px"; div.style.borderRadius="6px";
  div.innerHTML = `<span><img src="ally.png" style="width:16px;height:16px;"> Ally - ${cost}💰</span><button>${cost==="MAX"?"MAX":"Buy"}</button>`;
  const btn = div.querySelector("button");
  if(cost !== "MAX") btn.onclick = buyAlly; else btn.disabled = true;
  container.appendChild(div);
}

function showShopMessage(msg){
  const container = document.getElementById("shopItems");
  const p = document.createElement("p"); p.style.color="red"; p.innerText = msg;
  container.appendChild(p); setTimeout(()=>container.removeChild(p),1500);
}
