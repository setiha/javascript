//konstansok
const gridSize = 9;

//valtozok

let cursorRow = 0, cursorCol = 0,
    stepCount = 0;
let finished = false;

//elemek osszegyujtese

const tableGrid = document.getElementById('grid');
const spanStepCount = document.getElementById('stepCount');
const spanCurrentMark = document.getElementById('currentMark');


//feliratkozas
window.addEventListener('keydown', OnKeyDown);
window.addEventListener('gameFinished', OnGameFinished);
 

//init
RenderGrid();
SetCursor(0, 0);
UpdateCurrentMarkSpan();
////////////////////////////////

function RenderGrid() {
    tableGrid.innerHTML = '';

    //sorok feltoltese
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        let newRow = document.createElement('tr');

        //sorok feltoltese
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {

            let newCell = document.createElement('td');

            newRow.appendChild(newCell);
        }
        tableGrid.appendChild(newRow);
    }
}

function SetCursor(rowIndex, colIndex) {

    //cella osszeszedese
    let rowCollection = tableGrid.children,
        cellCollection = rowCollection[rowIndex].children,
        cell = cellCollection[colIndex];

    //korabbiakrol leszedes
    let oldCursors = document.getElementsByClassName('cursor');
    for (let cursorIndex = 0; cursorIndex < oldCursors.length; cursorIndex++) {
        oldCursors[cursorIndex].className = '';
    }

    //kivalasztottra rarakas
    cell.className = 'cursor';

}

function OnKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
            let direction = event.code;
            direction = direction.replace('Arrow', '');
            MoveCursor(direction);
            break;

        case 'Space':
            PlaceMark();
            break;

    }

}

function OnGameFinished() {
    const message = 'Jatek vege, nyertes: ' + GetCurrentMark();
    alert(message);

}

function MoveCursor(direction) {
    switch (direction) {
        case 'Up':
            cursorRow = Math.max(0, cursorRow - 1);
            break;

        case 'Right':
            cursorCol = Math.min(gridSize - 1, cursorCol + 1);
            break;

        case 'Down':
            cursorRow = Math.min(gridSize - 1, cursorRow + 1);
            break;

        case 'Left':
            cursorCol = Math.max(0, cursorCol - 1);
            break;
    }
    SetCursor(cursorRow, cursorCol);
}

function PlaceMark() {
    if (finished) {
        return;
    }
    SetCellValue(cursorRow, cursorCol, GetCurrentMark());

    if (IsGameFinished()) {
        finished = true;
        TriggerGameFinished();
    }

    IncrementStepCount();

}

function SetCellValue(rowIndex, colIndex, value) {

    let rowCollection = tableGrid.children,
        cellCollection = rowCollection[rowIndex].children,
        cell = cellCollection[colIndex];
    cell.innerText = value;
}

function GetCellValue(rowIndex, colIndex) {

    let rowCollection = tableGrid.children,
        cellCollection = rowCollection[rowIndex].children,
        cell = cellCollection[colIndex];
    return cell.innerText;


}

function IncrementStepCount() {
    stepCount++;
    spanStepCount.innerText = stepCount;
    UpdateCurrentMarkSpan();
}

function GetCurrentMark() {
    return stepCount % 2 == 0 ? 'X' : 'O';
}

function UpdateCurrentMarkSpan() {
    spanCurrentMark.innerText = GetCurrentMark();
};

function IsGameFinished() {

    //fuggoleges ellenorzes
    for (let rowIndex = 2; rowIndex < gridSize - 2; rowIndex++) {
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {

            let cellValues = [
                GetCellValue(rowIndex - 2, colIndex),
                GetCellValue(rowIndex - 1, colIndex),
                GetCellValue(rowIndex, colIndex),
                GetCellValue(rowIndex + 1, colIndex),
                GetCellValue(rowIndex + 2, colIndex),
            ];

            // x vizsgalata
            if (CountValue(cellValues, 'X') == 5) {
                
                return true;
                
            }
            // O vizsgalata
            if (CountValue(cellValues, 'O') == 5) {
               
                return true;
                
            }
           
        }

    }
}

function CountValue(valueCollection, valueToCount) {
    return valueCollection.filter(function (value) {
        return value == valueToCount;

    }).length;

}

function TriggerGameFinished() {
    let event = new Event('gameFinished');
    window.dispatchEvent(event);
};