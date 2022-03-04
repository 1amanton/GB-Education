const cartCounter = document.querySelector(".h-basket-counter");
const productsDiv = document.querySelector(".productlist");
const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList {
    constructor(container=productsDiv) {
        this.container = container;

        this.goods = [];

        /**
         * spread data array from API to goods array
         */
        this._fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.renderProducts();
            });
    };

    /**
     * connect to products API
     * @returns parsed json as javascript data 
     * if connect failed - catch error
     */
    _fetchProducts() {
      return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => console.log(error))     
    };



    /**
     * render goods on page
     */
    renderProducts() {
        this.goods.forEach(product => {
            const item = new ProductItem(product);
            this.container.insertAdjacentHTML("beforeend", item.render());
        });
    };

    

    /**
     * find sum of all products
     */
    getProductsSum() {
        let sum = 0;
        this.goods.forEach(product => {
            sum += product.price;
        });
        console.log(`Сумма всех товаров = ${sum} $`);
    };
};

class ProductItem {
    constructor(product, image = "./img/macbook.png") {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.image = image;
    };

    /**
     * render product html
     */
    render() {
        return `<div class="product">
                    <img class="product-img" src="${this.image}">
                    <h3 class="product-title">${this.title}</h3>
                    <p class="product-price">$ ${this.price}</p>
                    <button class="product-buy">Buy!</button>
                </div>`
    };
};


class Basket {
    constructor(container=".basket") {
        this.container = container;

        this.basketGoods = [];

        this.countGoods = 0;
        this.countSum = 0;

        this._clickBasket();

        this._fetchBasket()
            .then(data => {
                this.basketGoods = [...data.contents];
                console.log(data);
                this.renderBasket();
            });
    };

    _fetchBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => console.log(error))  
    };

    _clickBasket () {
        document.querySelector(".h-basket").addEventListener("click" , () => {
            document.querySelector(this.container).classList.toggle("disBlock");
        });
    };

    renderBasket() {
        this.basketGoods.forEach(product => {
            const item = new BasketItem();
            document.querySelector(this.container).insertAdjacentHTML("beforeend", item.render(product));
        });

        this._renderCounter();
        this._getBasketPriceSum();       

        document.querySelector(this.container).insertAdjacentHTML("beforeend", `<span class="basket-price">К оплате: ${this.countSum}</span>`);
        document.querySelector(this.container).insertAdjacentHTML("afterbegin", `<span class="basket-quantity">Товаров в корзине: ${this.countGoods}</span>`);
    };

    _getBasketPriceSum() {
        this.basketGoods.forEach(product => {
            this.countSum += product.price;
        });
        return this.countSum;
    };

    _getBasketQuantitySum() {
        this.basketGoods.forEach(product => {
            this.countGoods += product.quantity;
        });
        return this.countGoods;
    };

    _renderCounter() {
        this._getBasketQuantitySum();

        if(this.countGoods) {
            cartCounter.textContent = `${this.countGoods}`;
        } else {
            cartCounter.classList.add("disNone");
        };
    };

    addProduct() {

    };

    applyPromocode() {

    };

    makeOrder() {

    };

};

class BasketItem {
    /** render basket item
     * @param {object} product 
     * @returns html basket item
     */
    render(product) {
        return `<div class="basket-product">
                    <img class="basket-product-img" src="">
                    <div class="basket-product-text">
                        <h3 class="basket-product-title">Наименование:<br>${product.product_name}</h3>
                        <p class="basket-product-price">Цена:<br>$${product.price}</p>
                        <p class="basket-product-quanity">Колличество:<br>${product.quantity}</p>
                    </div>
                    
                </div>`
    };

    removeProduct() {

    };
    
    incrementItem() {

    };

    decrementItem() {

    };
}

let list = new ProductList();

new Basket()

