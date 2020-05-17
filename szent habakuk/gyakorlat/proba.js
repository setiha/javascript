let gridSize = 10;

let tableGrid = document.getElementById('grid');
RenderGrid();


function RenderGrid() {
    tableGrid.innerHTML = '';
    let cardValues = [];
    for (let valueIndex = 1; valueIndex <= gridSize * gridSize / 2; valueIndex++) {
        cardValues.push(valueIndex);
        cardValues.push(valueIndex);
      
       
    }
    Shuffle(cardValues);
    let CardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++){
        let newRow = document.createElement('tr');
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = cardValues[CardValueIndex];
            newRow.appendChild(newCell);
            CardValueIndex++;
            
        }
        tableGrid.appendChild(newRow);
    }
}

function Shuffle(collection) {
    for (let i = collection.length - 1; i>=0; i--){
        let randomIndex = Math.round(Math.random() * i);
        console.log(randomIndex);
        let temp = collection[i];
        console.log(temp);
        console.log(collection);
        collection[i] = collection[randomIndex];
        console.log(collection[i]+'uj i a randombol');
        collection[randomIndex] = temp;
        console.log(temp + 'uj temp');
        console.log(collection);
        

        
    }
}