// codes.js
codeBox.addEventListener("keydown", e => {
  if(e.key === "Enter"){
    const code = codeBox.value.trim().toLowerCase();

    if(["tori","default","gio"].includes(code)){
      currentShip = code;
      localStorage.setItem("playerShip", currentShip);
      setShipSprites(currentShip);
    }

    if(code === "zbfc01") zeroBulletCooldown = true;
    if(code === "isb02") infiniteSuperBeam = true;
    if(code === "tl03"){ maxLives = Math.min(10, lives + 10); lives = maxLives; }
    if(code === "ib04") invincibleMode = true;
    if(code === "hpb05") lives = maxLives;

    codeBox.value = "";
    codeBox.style.display = "none";
  }
});
