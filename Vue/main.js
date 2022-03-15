const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



const ProductList = new Vue({
    el: "#app",

    data: {
        catalogUrl: "/catalogData.json",
        cartUrl: "/getBasket.json",

        products: [],
        filteredProducts: [],
        cartProducts: [],
        

        userSearch: "",

        show: false,
        showCart: false,

        image: "https://e7.pngegg.com/pngimages/845/855/png-clipart-alerta-mexico-earthquake-computer-desktop-pc-electronics-text-thumbnail.png",
    },

    methods: {
        getJson(url) {
            return fetch(url)
            .then(result => result.json())
            .catch(error => {
                console.log("Error");
            })
        },

        addProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if(data.result === 1) {

                    let find = this.cartProducts.find(product => product.id_product == item.id_product);
                    if(find) {
                        find.quantity++;
                    } else {
                        console.log("ELSE");
                        //create new object with item parametrs and quantity=0
                        const prod = Object.assign({quantity: 1}, item);
                        console.log(prod);
                        this.cartProducts.push(prod);
                    };

                } else {
                    alert("Error addProduct");
                };
            });
        },

        removeProduct(item) {
            this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                console.log("removing");
                if(data.result === 1) {
                    if(item.quantity > 1) {
                        item.quantity--;
                    } else {
                        //if quantity < 1 - remove product from array by splice method
                        this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
                    };

                } else {
                    alert("Error removeProduct");
                };
            });
        },

        searchFilter() {
            const regExp = new RegExp(this.userSearch, "i");
            this.filteredProducts = this.products.filter(product => regExp.test(product.product_name));
        },

        countCart() {
            return this.cartProducts.length;
        },
    },

    mounted () {
        this.getJson(`${API}/${this.catalogUrl}`)
        .then(data => {
            for (let product of data) {
                this.products.push(product);
                this.filteredProducts.push(product);
            };
        });

        this.getJson(`${API}/${this.cartUrl}`)
        .then(data => {
            for (let product of data.contents) {
                this.cartProducts.push(product);
            };
        });

    },
});

