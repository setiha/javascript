class Worm {
  constructor(startRowIndex, startColIndex) {
    //kukac darabjai
    this.cellCollection = [{ row: startRowIndex, col: startColIndex }];

    this.TriggerCellAdded(this.GetFirstCell());

    //irany
    this.direction = null;

    //novekedes
    this.growCounter = 4;
  }
  //getterek

  GetFirstCell() {
    return this.cellCollection[0];
  }

  GetNextCell() {
    let nextrow = this.GetFirstCell().row,
      nextcol = this.GetFirstCell().col;

    switch (this.direction) {
      case "up":
        nextrow--;
        break;

      case "right":
        nextcol++;
        break;

      case "down":
        nextrow++;
        break;

      case "left":
        nextcol--;
        break;
    }
    return { row: nextrow, col: nextcol };
  }
  //setter
  SetDirection(newDirection) {
    this.direction = newDirection;
    this.GetNextCell();
  }
  //mozgas
  Move() {
    if (this.direction == null) {
      return;
    }
    //unshift
    let newFirstCell = this.GetNextCell();
    this.cellCollection.unshift(newFirstCell);
    this.TriggerCellAdded(newFirstCell);

    //pop
    if (this.growCounter == 0) {
      let lastCell = this.cellCollection.pop();
      this.TriggerCellRemoved(lastCell);
    } else {
      this.growCounter--;
    }
  }
  Grow(value){
    this.growCounter +=value;
  }

  //esemeny tuzelo fuggvenyek

  TriggerCellAdded(cell) {
    window.dispatchEvent(
      new CustomEvent("worm/cellAdded", {
        detail: {
          rowIndex: cell.row,
          colIndex: cell.col
        }
      })
    );
  }

  TriggerCellRemoved(cell) {
    window.dispatchEvent(
      new CustomEvent("worm/cellRemoved", {
        detail: {
          rowIndex: cell.row,
          colIndex: cell.col
        }
      })
    );
  }
}
