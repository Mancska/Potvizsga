class Timer {
  constructor(game) {
    this.timerDisplay = document.getElementById('timer');
    this.timer = 60;
    this.timerInterval = null;
    this.game = game;
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.timerDisplay.innerText = this.timer;

      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.game.endGame();
      }
    }, 1000);
  }
}

export default Timer;
