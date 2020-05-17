//elemek osszegyujtese

let inputItemName = document.getElementById('itemName');
let inputItemCount = document.getElementById('itemCount');
let inputItemBasePrice = document.getElementById('itemBasePrice');
let buttonAdd = document.getElementById('buttonAdd');
let listItemList = document.getElementById('itemList');
let spanSum = document.getElementById('sum');
let ossz =null;

//valtozok
let itemNamelist = ['tej' ,'kenyer'];
let itemCountlist = [1,2];
let itemBasePricelist = [200, 300];

//rendereles
RenderList();


function RenderList() {
    listItemList.innerHTML = '';
    let mappedItemList = itemNamelist.map(function (name, index) {
        let mappedValue = name;
        mappedValue += '- ';
        mappedValue += itemCountlist[index] + ' db';
        mappedValue += ' x  ';
        mappedValue += itemBasePricelist[index] + ' Ft';
        mappedValue += '-';
        mappedValue += itemCountlist[index] * itemBasePricelist[index] + ' Ft';

        return mappedValue;
    });

    mappedItemList.forEach(function (name, index) {
        RenderListItem(name);

    });
    spanSum.innerText = GetSum();
}

function RenderListItem(text) {
    let newListItem = document.createElement('li');
    newListItem.innerText = text;
    listItemList.appendChild(newListItem);
}

//feliratkozas

buttonAdd.addEventListener('click', OnButtonClicked);

//feliratkozo fuggvenyek

function OnButtonClicked() {
    AddItem();
}

//uj elem hozzaadasa;
function AddItem() {

    //validalas
    if (!(inputItemName.value
        && inputItemCount.value
        && inputItemBasePrice.value
    )) {
        console.log('invalid');
        return
    }

    itemNamelist.push(inputItemName.value);
    itemCountlist.push(+inputItemCount.value);
    itemBasePricelist.push(+inputItemBasePrice.value);
    RenderList();
}

//szummazas
function GetSum() {
    
    return itemCountlist.reduce(function (acc, itemCount, index) {

        if (index == 1) {

            acc = acc * itemBasePricelist[0];
        }

        return acc + itemCount * itemBasePricelist[index];
    });
}