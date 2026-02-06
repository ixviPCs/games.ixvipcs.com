// allies.js
const alliesInGame = [];
const allyCostLadder = [30,50,70,90];
let allyCount = 0;

const allyImage = new Image(); allyImage.src = "../Images/ally.png";
const allyBulletImage = new Image(); allyBulletImage.src = "../Images/allybullet.png";

function buyAlly(){
  if(allyCount >= 4) return;
  const cost = allyCostLadder[allyCount];
  if(coins < cost){ showShopMessage("Not enough coins!"); return; }

  coins -= cost;
  localStorage.setItem("coins", coins);
  document.getElementById("coinDisplay").innerText = coins;

  alliesInGame.push({ sprite: allyImage, bulletSprite: allyBulletImage, angle: 0, spin: 0, spinSpeed: -0.08, orbitSpeed: 0.03, shootTimer: 0 });
  allyCount++;
  renderShop();
}

function updateAllies(dt){
  const r = 70;
  const count = alliesInGame.length;
  const baseRotation = performance.now() * 0.001;

  alliesInGame.forEach((a, i) => {
    a.spin += a.spinSpeed;

    let offset = 0;
    if(count===2) offset = i===0?0:Math.PI;
    else if(count===3) offset = i*(Math.PI*2/3);
    else if(count===4) offset = i*(Math.PI/2);

    const angle = baseRotation + offset;
    a._orbitX = player.center.x + Math.cos(angle) * r;
    a._orbitY = player.center.y + Math.sin(angle) * r;

    a.shootTimer -= dt;

    if(superBeamActive){
      if(!a.miniBeam) a.miniBeam = { width: 5 };
      enemies.forEach((e, ei) => {
        const beamX = a._orbitX - a.miniBeam.width/2;
        if(e.x + e.width > beamX && e.x < beamX + a.miniBeam.width){
          enemies.splice(ei, 1); enemyDestroyed(true);
        }
      });
    } else {
      if(a.shootTimer <= 0){
        bullets.push({ x: a._orbitX-2, y: a._orbitY-5, width:5, height:5, speed:6, sprite: a.bulletSprite });
        a.shootTimer = 1000;
      }
      a.miniBeam = null;
    }
  });
}
