// enemies.js

// --- Do NOT redeclare enemies, use the one from main.js ---

// --- Missing globals ---
let superKillCounter = 0;
let lastCoinMilestone = 0;

// --- Spawn an enemy ---
function spawnEnemy() {
  const size = 40;
  enemies.push({
    x: Math.random() * (canvas.width - size),
    y: -size,
    width: size,
    height: size,
    speed: 2
  });
}

// --- When an enemy is destroyed ---
function enemyDestroyed(isSuperKill = false) {
  totalKills++;
  superKillCounter++;
  if(superKillCounter >= 30) canUseSuper = true;
  score += isSuperKill ? 300 : 100;
}

// --- Update all enemies each frame ---
function updateEnemies(dt) {
  for(let i = enemies.length - 1; i >= 0; i--) {
    const e = enemies[i];
    e.y += e.speed;

    // Coin milestone
    const milestone = Math.floor(score / 100);
    if(milestone > lastCoinMilestone){
      coins++;
      lastCoinMilestone = milestone;
      localStorage.setItem("coins", coins);
      document.getElementById("coinDisplay").innerText = coins;
    }

    // Bullet collisions
    for(let j = bullets.length - 1; j >= 0; j--){
      if(checkCollision(e, bullets[j])){
        enemies.splice(i, 1);
        bullets.splice(j, 1);
        enemyDestroyed(false);
        break;
      }
    }

    // Player collision
    if(i < enemies.length && checkPlayerEnemyCollision(player, e)){
      enemies.splice(i, 1);
      if(!invincibleMode){
        lives--;
        if(lives <= 0){
          gameOver = true;
          resetPowerUps();
        }
      }
    }

    // Remove enemies that leave the screen
    if(i < enemies.length && e.y > canvas.height) enemies.splice(i, 1);
  }
}

// --- Reset power-ups ---
function resetPowerUps() {
  zeroBulletCooldown = false;
  infiniteSuperBeam = false;
  invincibleMode = false;
  maxLives = 3;
}
