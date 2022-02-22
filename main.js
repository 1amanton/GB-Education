const productsDiv = document.querySelector(".productlist");

class ProductList {
    constructor(container=productsDiv) {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();
        this.getProductsSum();
    }

    /**
     * fetching goods array
     */
    _fetchProducts() {
        this.goods = [

            {
                id: 1,
                title: "MacBook",
                price: 100,
                image: "./img/macbook.png"
            },
        
            {
                id: 2,
                title: "Watch",
                price: 110,
                image: "./img/watch.png"
            },
        
            {
                id: 3,
                title: "iPhone",
                price: 120,
                image: "./img/iphone.png"
            },
        
            {
                id: 4,
                title: "TV",
                price: 130,
                image: "./img/tv.png"
            },

        ];
    };


    /**
     * fint sum of all products
     */
    getProductsSum() {
        let sum = 0;
        this.goods.forEach(product => {
            sum += product.price;
        });
        console.log(`Сумма всех товаров = ${sum} $`);
    };

    /**
     * render goods on page
     */
    render() {
        this.goods.forEach(product => {
            const item = new ProductItem(product);
            this.container.insertAdjacentHTML("beforeend", item.render());
        });
    };
};


class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.image = product.image;
    };

    /**
     * render product html
     */
    render() {
        return `<div class="product">
                    <img class="product-img" src="${this.image}">
                    <h3 class="product-title">Apple ${this.title}</h3>
                    <p class="product-price">$ ${this.price}</p>
                    <button class="product-buy">Buy!</button>
                </div>`
    };
};

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

class CartItem {

    removeProduct() {

    };
    
    incrementItem() {

    };

    decrementItem() {

    };

};




