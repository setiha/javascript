class Game {
  constructor() {
    //tabla
    this.board = new Board(25, 25);

    //kukac
    this.worm = new Worm(1, 1);
    //game over
    this.gameover = false;

    //almak
    this.appleCell = null;
    this.GenerateApple();

    //esemenyre feliratkozas
    window.addEventListener("keydown", event => {
      this.OnKeyDown(event.key);
    });

    window.addEventListener("tick", () => {
      this.MoveWorm();
    });

    //start timer
    this.tickInterval = null;
    this.StartTick();
  }

  //kukac
  MoveWorm() {
    //ha leterne a tablarol, akkor game over
    if (this.IsNextCellOutOfBoard()) {
      this.gameover = true;
      this.StopTick();
      alert("Game Over");
      return;
    }
    //ha almara ert, akkor novekedjen;
    if (this.IsNextCellApple()) {
      this.worm.Grow(5);
      this.GenerateApple();
    }
    //TODO: ha onmagara fordul, akkor game over;
    this.worm.Move();
  }
  IsNextCellOutOfBoard() {
    let nextCell = this.worm.GetNextCell();

    //felfele
    if (nextCell.row < 0) {
      return true;
    }
    //jobbra
    if (nextCell.col >= this.board.width) {
      return true;
    }
    //lefele

    if (nextCell.row >= this.board.height) {
      return true;
    }
    //balra
    if (nextCell.col < 0) {
      return true;
    }
    return false;
  }

  IsNextCellApple() {
    let nextCell = this.worm.GetNextCell();
    if (nextCell.row != this.appleCell.rowIndex) {
      return false;
    }
    if (nextCell.col != this.appleCell.colIndex) {
      return false;
    }
    return true;
  }
  //almak

  GenerateApple() {
    let rowIndex = Math.round(Math.random() * (this.board.height - 1));
    let colIndex = Math.round(Math.random() * (this.board.width - 1));
    this.appleCell = { rowIndex: rowIndex, colIndex: colIndex };
    this.TriggerAppleAdded(this.appleCell);
  }

  TriggerAppleAdded(cell) {
    window.dispatchEvent(
      new CustomEvent("apple/added", {
        detail: cell
      })
    );
  }

  //esemenykezelok
  OnKeyDown(key) {
    switch (key) {
      case "ArrowUp":
      case "ArrowRight":
      case "ArrowDown":
      case "ArrowLeft":
        let direction = key.replace("Arrow", "").toLowerCase();
        this.worm.SetDirection(direction);
        break;
    }
  }

  //idozito
  StartTick() {
    this.tickInterval = setInterval(() => {
      window.dispatchEvent(new Event("tick"));
    }, 100);
  }
  StopTick() {
    clearInterval(this.tickInterval);
  }
}
