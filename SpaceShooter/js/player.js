// player.js
const playerSprites = {};
let currentShip = localStorage.getItem("playerShip") || "default";

function setShipSprites(ship) {
  if (ship === "tori") {
    playerSprites.straight = loaded.toriSprite;
    playerSprites.left = loaded.toriSprite;
    playerSprites.right = loaded.toriSprite;
  } else if (ship === "gio") {
    playerSprites.straight = loaded.gioStraight;
    playerSprites.left = loaded.gioLeft;
    playerSprites.right = loaded.gioRight;
  } else {
    playerSprites.straight = loaded.playerStraightDefault;
    playerSprites.left = loaded.playerLeftDefault;
    playerSprites.right = loaded.playerRightDefault;
  }
}

setShipSprites(currentShip);

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 120,
  width: 50,
  height: 50,
  speed: 5,
  get center() { return { x: this.x + this.width/2, y: this.y + this.height/2 }; },
  currentImage: playerSprites.straight
};

function updatePlayer(dt) {
  if(keys["ArrowLeft"]){ player.x -= player.speed; player.currentImage = playerSprites.left; }
  else if(keys["ArrowRight"]){ player.x += player.speed; player.currentImage = playerSprites.right; }
  else player.currentImage = playerSprites.straight;
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

  if(keys["ArrowUp"] && performance.now() - lastFireTime > (zeroBulletCooldown ? 0 : 200)){
    bullets.push({ x: player.x + player.width/2 - 2, y: player.y, width: 4, height: 10, speed: 7 });
    lastFireTime = performance.now();
  }

  // Super beam activation
  if(keys["ArrowDown"] && (canUseSuper || infiniteSuperBeam) && !superBeamActive){
    superBeamActive = true;
    superBeamTimer = infiniteSuperBeam ? 5000 : 2500;
  }
