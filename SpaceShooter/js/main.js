// main.js
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let lastTime = 0;

function loop(time=0){
  const dt = time - lastTime;
  lastTime = time;
  if(!gameOver && !gamePaused && Math.random()<0.02) spawnEnemy();
  updatePlayer(dt);
  updateEnemies(dt);
  updateAllies(dt);
  draw();
  requestAnimationFrame(loop);
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(player.currentImage,player.x,player.y,player.width,player.height);
  bullets.forEach(b => ctx.drawImage(b.sprite||loaded.bullet,b.x,b.y,b.width,b.height));
  enemies.forEach(e => ctx.drawImage(loaded.enemy,e.x,e.y,e.width,e.height));
  alliesInGame.forEach(a => { ctx.save(); ctx.translate(a._orbitX,a._orbitY); ctx.rotate(a.spin); ctx.drawImage(a.sprite,-10,-10,20,20); ctx.restore(); });
  for(let i=0;i<lives;i++) ctx.drawImage(loaded.heart,canvas.width-(i+1)*40-10,10,30,30);
  ctx.fillStyle="#fff"; ctx.font="20px monospace";
  ctx.fillText("Score: "+score,canvas.width-130,50);
  ctx.fillText("Kills: "+totalKills,10,30);
}

loop();
