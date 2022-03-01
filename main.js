const cart = document.querySelector(".h-basket");
const cartCounter = document.querySelector(".h-basket-counter");
const basketWindow = document.querySelector(".basket");
const basketWrapper = document.querySelector(".basket-wrapper");
const basketClose = document.querySelector(".basket-close");

const productsDiv = document.querySelector(".productlist");
const cartDiv = document.querySelector(".basket-window");

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList {
    constructor(container=productsDiv, cartContainer=cartDiv) {
        this.container = container;
        this.cartContainer = cartContainer;

        this.goods = [];
        this.cartGoods = [];

        /**
         * spread data array from API to goods array
         */
        this._fetchProducts()
            .then(data => {
                this.goods = [...data];
                this.renderProducts();
            });

        /**
         * spread data array from API to cartGoods array
         */
        this._fetchCart()
            .then(data => {
                this.cartGoods = [...data.contents];
                console.log(data);
                this.countGoods = data.countGoods;
                this.cartAmount = data.amount;
                this.renderCart();
            });
    }

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

    _fetchCart() {
        return fetch(`${API}/getBasket.json`)
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

    renderCart() {
        this.cartGoods.forEach(product => {
            const item = new CartItem(product);
            this.cartContainer.insertAdjacentHTML("beforeend", item.render());
        });

        this.cartContainer.insertAdjacentHTML("beforeend", `<span class="basket-amount">К оплате: ${this.cartAmount}</span>`);
        this.cartContainer.insertAdjacentHTML("afterbegin", `<span class="basket-amount">Товаров в корзине: ${this.countGoods}</span>`);
        if(this.countGoods) {
            cartCounter.textContent = `${this.countGoods}`;
        } else {
            cartCounter.classList.add("disNone");
        }


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

class CartItem {
    constructor(product, image = "./img/macbook.png") {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.image = image;
    };

    render() {
        return `<div class="basket-product">
                    <img class="basket-product-img" src="${this.image}">
                    <h3 class="basket-product-title">Наименование:<br>${this.title}</h3>
                    <p class="basket-product-price">Цена:<br>$${this.price}</p>
                    <p class="basket-product-quanity">Колличество:<br>${this.quantity}</p>
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

class Cart {

    addProduct() {

    };

    getProductsSum() {

    };

    applyPromocode() {

    };

    makeOrder() {

    };
};


cart.addEventListener("click", () => {
    console.log("cart clicked")
    basketWindow.classList.remove("disNone");
    basketWindow.classList.add("disBlock");
});

basketWrapper.addEventListener("click", () => {
    console.log("window clicked")
    basketWindow.classList.remove("disBlock");
    basketWindow.classList.add("disNone");

});

basketClose.addEventListener("click", () => {
    console.log("close clicked")
    basketWindow.classList.remove("disBlock");
    basketWindow.classList.add("disNone");

});



