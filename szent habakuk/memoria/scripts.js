
//konstansok
const gridSize = 4;


//elemek osszegyujtese
let tableGrid = document.getElementById('grid');


let activeCards = [];

//feliratkozas
window.addEventListener('cardClick', OnCardClick);

RenderGrid();

/////////////////////////
function RenderGrid() {
    tableGrid.innerHTML = '';
    // kartyaertekek osszegyujtese
    let cardValues = [];
    for (let valueIndex = 1; valueIndex <= gridSize * gridSize / 2; valueIndex++) {
        cardValues.push(valueIndex);
        cardValues.push(valueIndex);
    }


    Shuffle(cardValues);

    //sorok
    let cardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
        let newRow = document.createElement('tr');

        //cellak
        for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = cardValues[cardValueIndex];
            newRow.appendChild(newCell);
            new Card(cardValues[cardValueIndex], newCell);
            cardValueIndex++;

        }
        tableGrid.appendChild(newRow);
    }
}

function Shuffle(collection) {
    for (var i = collection.length - 1; i >= 0; i--) {
        let randomIndex = Math.round(Math.random() * i);
        let temp = collection[i];
        collection[i] = collection[randomIndex];
        collection[randomIndex] = temp;

    }
    return collection;
}

function OnCardClick(event) {

    let clickedCard = event.detail;
    activeCards.push(clickedCard);
    console.log(clickedCard);
    console.log( activeCards);

    // ha ket aktiv kartyank van
    if (activeCards.length >= 2) {
        TriggerGameBlocked();

        if (activeCards[0].value == activeCards[1].value) {
            
            while (card = activeCards.pop()) {
                card.SetResolved();
            }
            TriggerGameUnBlocked();
        }
        else {
            
            setTimeout(function () {
                while (card = activeCards.pop()) {
                    card.ToggleColor();
                    TriggerGameUnBlocked()
                }               
            }, 3000);
        }
       
    }
}

function TriggerGameBlocked() {
    window.dispatchEvent(new Event('gameBlocked'));
}

function TriggerGameUnBlocked() {
    window.dispatchEvent(new Event('gameUnBlocked'));
}
