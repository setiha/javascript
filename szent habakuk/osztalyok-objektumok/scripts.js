let szamvaltozo = 123;
let stringvaltozo = 'alma';
let boolvaltozo = true;
let myarray = ['alma'];
myarray.push('korte'); //berakunk egy elemet a vegere
myarray.pop();//kiveszunk az elejerol egy elemet

let myArray2dim = [1, 2];
myArray2dim.push([10, 20]);

//let cartItem = {     //objektum
//    name: 'korte',
//    count: 3,
//    price: 20,
//    totalPrice: 60
//};


class CartItem {
    constructor(name, count, price) {
        this.name = name;
        this.count = count;
        this.price = price;
        
    }
    GetTotalPrice() {
        return this.count * this.price;
    }
    SetCount(count) {
        this.count = count;
        this.Render();
    }
    Render() {

    }
}
let cartItem = new CartItem('korte', 3, 20);
console.log(cartItem);
