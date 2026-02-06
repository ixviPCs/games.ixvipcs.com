function loop(time=0){
  const dt = time - lastTime;
  lastTime = time;
  if(!gameOver && !gamePaused){
    movePlayer(keys, dt);
    updateEnemies(dt);
    updateAllies(dt);
    draw();
  }
  requestAnimationFrame(loop);
}
