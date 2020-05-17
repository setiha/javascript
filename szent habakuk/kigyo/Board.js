class Board {
  constructor(width, height) {
    //grid inicializalasa
    this.gridElement = document.getElementById("grid");
    this.width = width;
    this.height = height;
    this.InitGrid();

    //esemenyekre feliratkozas
    window.addEventListener("worm/cellAdded", event => {
      this.UpdateCell(event.detail.rowIndex, event.detail.colIndex, "yellow");
    });
    window.addEventListener("worm/cellRemoved", event => {
      this.UpdateCell(event.detail.rowIndex, event.detail.colIndex, "gray");
    });
    window.addEventListener("apple/added", event => {
      this.UpdateCell(event.detail.rowIndex, event.detail.colIndex, "red");
    });
  }

  InitGrid() {
    // sorok beszurasa
    for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
      let newRow = document.createElement("tr");

      //cellak beszurasa
      for (let colIndex = 0; colIndex < this.width; colIndex++) {
        let newCell = document.createElement("td");
        newRow.appendChild(newCell);
      }
      this.gridElement.appendChild(newRow);
    }
  }

  UpdateCell(rowIndex, colIndex, color) {
    //cella kikeresese
    let row = this.gridElement.children[rowIndex],
      cell = row.children[colIndex];

    //szin beallitasa
    cell.style.backgroundColor = color;
  }
}
