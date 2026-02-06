const player = {
  x: canvas.width/2 - 25,
  y: canvas.height - 120,
  width: 50,
  height: 50,
  speed: 5,
  currentImage: loaded.playerStraightDefault,
  get center() { return { x: this.x + this.width/2, y: this.y + this.height/2 }; }
};

function movePlayer(keys, dt) {
  if(keys["ArrowLeft"]) player.x -= player.speed;
  else if(keys["ArrowRight"]) player.x += player.speed;
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}
