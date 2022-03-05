const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class List {
    /**
     * base List structure
     * @param {*} url URL for Fetching
     * @param {*} container render container
     * @param {*} list communications between classes
     */
    constructor(url, container, list = connections) {
        
        this.container = container;
        this.list = list;
        this.url = url;

        this.goods = [];
        this.allProducts = [];

        this._init();       

    };

    /**
     * fetching JSON
     * @param {*} url local JSON file, if parse not from API
     */
    getJson(url) {
        return fetch(url ? url : `${API}/${this.url}`)
        .then(result => result.json())
        .catch(error => {
            console.log("Error");
        })
    };

    /**
     * spread parsed objects(products) in goods array, then render
     * @param {*} data parsed data objects 
     */
    handleData(data) {
        this.goods = [...data];
        this.render();
    };

    render() {
        console.log(this.constructor.name);
        const block = document.querySelector(this.container);

        this.goods.forEach(product => {

            /**
             * call connections object as this.list
             * this.constructor name will be ProductList or Basket
             * it matters who call constructor, ProductList or Basket
             * "this" in "this" object call will be whire like = this.a[this.b]
             * new this.list[this.constructor.name] will be = ProductItem or BasketItem
             */
            const productObj = new this.list[this.constructor.name](product)

            this.allProducts.push(productObj);

            block.insertAdjacentHTML("beforeend", productObj.render());

        });
    };

    /**
     * dummy method - for use polymorph method _init from child classes
     */
    _init() {
        return false
    };
};


class Item {
    constructor(product, image = "./img/macbook.png") {
        this.id = product.id_product;
        this.name = product.product_name;
        this.price = product.price;
        this.image = image;
    };

    render() {
        return `<div class="product" data-id="${this.id}">
                    <img class="product-img" src="${this.image}">
                    <h3 class="product-title">${this.name}</h3>
                    <p class="product-price">$ ${this.price}</p>

                    <button class="product-buy"
                    data-id="${this.id}"
                    data-name="${this.name}"
                    data-price="${this.price}">Buy!</button>
                </div>`
    };
};

class ProductList extends List {
    constructor(cart, url ="/catalogData.json", container=".productlist") {

        //call from parent class List
        super(url, container);

        this.cart = cart;

        this.getJson()
            .then(data => this.handleData(data));

    };

    _init () {
        document.querySelector(this.container).addEventListener("click", e => {
            if(e.target.classList.contains("product-buy")) {

                //call addProduct method from (cart) Basket class
                this.cart.addProduct(e.target);
            }
        });
    };
};

class ProductItem extends Item {

};


class Basket extends List {
    constructor(url="/getBasket.json", container=".basket") {
        super(url, container);

        this.getJson()
            .then(data => {
                this.handleData(data.contents);
                this._updateCartIcon();
            });

    };

    /**
     * 
     * @param {*} element Buy button with product html-data-values
     */
    addProduct(element) {
        //checking access to server by checkFile.json connection
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {

                    //get id fron html data attributes by dataset array
                    let productId = +element.dataset["id"];
                    //find element by id in array of all products
                    let find = this.allProducts.find(product => product.id === productId);
                    if(find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset["price"],
                            product_name: element.dataset["name"],
                            quantity: 1
                        };
                        
                        this.goods = [product];
                        this.render();
                        this._updateCartIcon();
                    };

                } else {
                    alert("Error");
                };
            });

    };

    removeProduct(element) {
        //checking access to server by checkFile.json connection
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1) {

                    //get id fron html data attributes by dataset array
                    let productId = +element.dataset["id"];
                    //find element by id in array of all products
                    let find = this.allProducts.find(product => product.id === productId);
                    if(find.quantity > 1) {
                        find.quantity--;
                        this._updateCart(find);
                    } else {
                        //if quantity < 1 delete product from allProducts array with splice by indexOf
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        
                        //find and remove product from basket html
                        document.querySelector(`.basket-product[data-id="${productId}"]`).remove();
                        this._updateCartIcon();                        
                    };

                } else {
                    alert("Error");
                };
            });

    };


    /**
     * update product quantity and price by click add to cart button
     * @param {*} product
     */
    _updateCart (product) {
        let block = document.querySelector(`.basket-product[data-id="${product.id}"]`);
        block.querySelector(".basket-product-quanity").textContent = `Кол-во: ${product.quantity}`;
        block.querySelector(".basket-product-allprice").textContent = `Цена:$${product.price*product.quantity}`;
    };

    /**
     * cart counter icon updater
     */
    _updateCartIcon() {
        if(this.allProducts.length) {
            document.querySelector(".h-basket-counter").classList.remove("disNone")
            document.querySelector(".h-basket-counter").textContent = `${this.allProducts.length}`;
        } else {
            document.querySelector(".h-basket-counter").classList.add("disNone");
        };
    };

    /**
     * show or hide basket list by basket icon click
     * remove product by clicked target
     */
    _init() {
        document.querySelector(".h-basket").addEventListener("click" , () => {
            document.querySelector(this.container).classList.toggle("disBlock");
        });

        document.querySelector(this.container).addEventListener("click", e => {
            if(e.target.classList.contains("basket-product-delete")) {
                this.removeProduct(e.target);
            };
        });
        
    };
};

class BasketItem extends Item {
    constructor(product, imgage="./img/macbook.png") {
        super(product, imgage);

        this.quantity = product.quantity;
    };

    render() {
        return `<div class="basket-product" data-id="${this.id}">
                    <img class="basket-product-img" src="${this.image}">
                    <div class="basket-product-text">
                        <h3 class="basket-product-title">Наименование:<br>${this.name}</h3>
                        <p class="basket-product-price">Цена: $${this.price}</p>
                        <p class="basket-product-quanity">Кол-во: ${this.quantity}</p>
                    </div>
                    
                    <p class="basket-product-allprice">Сумма: ${this.quantity*this.price}</p>

                    <div class="basket-product-delete"
                    data-id="${this.id}"
                    >X</div>                    
                </div>`
    };

};

/**
 * communication between classes
 * LIST : ITEM
 */
 const connections = {
    ProductList: ProductItem,
    Basket: BasketItem
};


//make composition with Basket and Products for use Basket methods in ProductList
let cart = new Basket();
let products = new ProductList(cart);

