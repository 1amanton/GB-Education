const forma = document.querySelector(".forma");

const sizeStandart = document.querySelector("#sizeStandart");
const sizeBig = document.querySelector("#sizeBig");

const cheese = document.querySelector("#cheese");
const salad = document.querySelector("#salad");
const potato = document.querySelector("#potato");
const tomato = document.querySelector("#tomato");
const caesar = document.querySelector("#caesar");
const checkout = document.querySelector("#checkout");

const summa = document.querySelector("#summa");
const summaccal = document.querySelector("#summaccal");

class Burger {
    constructor() {
        this.burg = {size: "standart", price: 50, ccal:20};
    };
   
    changeSize() {
        this.burg.price +=50;
        this.burg.ccal +=20;
        console.log("burger size changed to big");
        sizeStandart.removeAttribute("checked");
    };

    addCheese() {
        this.burg.price +=10;
        this.burg.ccal +=20;
        console.log("cheese added");
    };

    addSalad() {
        this.burg.price +=20;
        this.burg.ccal +=5;
        console.log("salad added");
    };

    addPotato() {
        this.burg.price +=15;
        this.burg.ccal +=10;
        console.log("potato added");
    };

    addTomatoSause() {
        this.burg.price +=15;
        this.burg.ccal +=0;
        console.log("tomato sause added");
    };

    addCaesarSause() {
        this.burg.price +=20;
        this.burg.ccal +=5;
        console.log("caesar sause added");
    };

};


let order = new Burger();

sizeBig.addEventListener("click", () => {
    order.changeSize();
});

cheese.addEventListener("click", () => {
    order.addCheese();
});

salad.addEventListener("click", () => {
    order.addSalad();
});

potato.addEventListener("click", () => {
    order.addPotato();
});

tomato.addEventListener("click", () => {
    order.addTomatoSause();
});

caesar.addEventListener("click", () => {
    order.addCaesarSause();
});

checkout.addEventListener("click", e => {
    e.preventDefault();
    summa.textContent = `${order.burg.price}`;
    summaccal.textContent = `${order.burg.ccal}`;
    console.log(`Цена бургера сосиавит: ${order.burg.price}`);
    console.log(`Каллорийность бургера сосиавит: ${order.burg.ccal}`);

});
