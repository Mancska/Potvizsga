export default class Duck {
    constructor(row, col, speed) {
      this.row = row;
      this.col = col;
      this.speed = speed;
      this.interval = null;
    }
  
    moveDuck(table) {
      const currentCell = table.rows[this.row].cells[this.col];
      currentCell.innerText = '';
  
      this.col++;
      if (this.col >= 18) {
        clearInterval(this.interval);
      } else {
        const newCell = table.rows[this.row].cells[this.col];
        newCell.innerText = '🦆';
      }
    }
  }
  