import Duck from './duck.js';
import Timer from './timer.js';

export default class Game {
  constructor() {
    this.table = document.getElementById('game-table');
    this.scoreDisplay = document.getElementById('score');
    this.score = 0;
    this.ducks = [];
    this.timerInterval = null;
    this.timer = null;
    this.duckInterval = null;
    this.tombstoneCells = [];
  }

  initialize() {
    this.createTable();
    this.startTimer();
  }
  createTable() {
    for (let i = 0; i < 9; i++) {
      const row = this.table.insertRow();
      for (let j = 0; j < 18; j++) {
        const cell = row.insertCell();
        if (j === 0) {
          const img = document.createElement('img');
          img.src = 'kep/tomb.jpg'; // Replace with the actual image path
          img.width = 30; // Adjust the width of the image
          img.height = 30; // Adjust the height of the image
          cell.appendChild(img);
          cell.classList.add('tombstone');
          this.tombstoneCells.push(cell);
        } else {
          cell.addEventListener('click', () => this.onClickDuck(i, j));
        }
      }
    }
  }
  
  
  
  
  
  

  createDuck() {
    const randomRow = Math.floor(Math.random() * 9);
    const fixedSpeed = 500; // Fixed speed for ducks
    const duck = new Duck(randomRow, 0, fixedSpeed);
    this.ducks.push(duck);

    // Start moving the duck
    duck.interval = setInterval(() => {
      duck.moveDuck(this.table, this);
    }, duck.speed);
  }

  onClickDuck(row, col) {
    const cell = this.table.rows[row].cells[col];
    if (cell.innerText === '🦆') {
      // Remove the duck from the table
      cell.innerText = '';
  
      // Clear the interval for the clicked duck
      const clickedDuckIndex = this.ducks.findIndex(duck => duck.row === row && duck.col === col);
      if (clickedDuckIndex !== -1) {
        clearInterval(this.ducks[clickedDuckIndex].interval);
        this.ducks.splice(clickedDuckIndex, 1);
        this.score++; // Increase the score
        this.scoreDisplay.innerText = this.score; // Update the score display
  
        // Create a new duck in the first column but in a random row if there are fewer than 5 ducks
        if (this.ducks.length < 5) {
          this.createDuckOnLeft();
        }
      }
    }
  }
  

  createDuckOnLeft() {
    if (this.ducks.length < 5) {
      let randomRow;
      do {
        randomRow = Math.floor(Math.random() * 9);
      } while (this.ducks.some(duck => duck.row === randomRow));

      const fixedSpeed = 500;
      const duck = new Duck(randomRow, 0, fixedSpeed);
      this.ducks.push(duck);

      // Start moving the new duck
      duck.interval = setInterval(() => {
        duck.moveDuck(this.table, this);
      }, duck.speed);
    }
  }

  deductPoint() {
    if (this.score > 0) {
      this.score--;
      this.scoreDisplay.innerText = this.score;
    }
  }

  startTimer() {
    this.timer = new Timer(this);
    this.timer.startTimer();

    // Spawn ducks from tombstones
    this.duckInterval = setInterval(() => {
      this.createDuckFromTombstone();
    }, 2500);
  }

  createDuckFromTombstone() {
    if (this.ducks.length < 5) {
      const randomTombstoneIndex = Math.floor(Math.random() * this.tombstoneCells.length);
      const randomRow = randomTombstoneIndex;
      const fixedSpeed = 500;
      const duck = new Duck(randomRow, 0, fixedSpeed);
      this.ducks.push(duck);

      // Start moving the new duck
      duck.interval = setInterval(() => {
        duck.moveDuck(this.table, this);
      }, duck.speed);
    }
  }

  endGame() {
    clearInterval(this.timerInterval);
    clearInterval(this.duckInterval);

    // Clear all duck intervals
    this.ducks.forEach((duck) => {
      clearInterval(duck.interval);
    });

    alert('Game Over! Your final score: ' + this.score);
  }
}
