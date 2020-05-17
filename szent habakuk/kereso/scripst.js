//elemek osszegyujtese
let inputNameFilter = document.getElementById('nameFilter');
let listItemList = document.getElementById('itemList');
//valtozok
let nameFilter = '';


let itemlist =
    [
        'Elso film',
        'Apró mesék',
        'Alita: A harc angyala',
        'A Lego- kaland 2',
        'Marvel Kapitány',
        'Üveg',
        'Boldog halálnapot! 2.',
        'Ashad Ka Ek Din',
        'Családi bunyó',
        'A csodagyerek',
        'Végtelen útvesztő'
    ];

itemlist.sort(function (a, b) {
    return a.localeCompare(b);
});

//feliratkozas

inputNameFilter.addEventListener('keyup', onInputKeyup);


//init
RenderList();

 //render

function RenderList() {
    
    listItemList.innerText = '';
    let filteredItemList = itemlist.filter(function (item, index) {
        let lowercaseItem = item.toLowerCase();
        let LowerCaseNameFilter = nameFilter.toLowerCase();
        let position = lowercaseItem.indexOf(LowerCaseNameFilter);
        
      

        return !(position == -1)
    });


    filteredItemList.forEach(function (item, index) {
        RenderListItem(item);
    });
};

function RenderListItem(text) {
    let newListItem = document.createElement('li');
    newListItem.innerText = text;
    listItemList.appendChild(newListItem);
};

//esemenyre reagalo fuggveny

function onInputKeyup() {
    nameFilter = inputNameFilter.value;
    RenderList();
}