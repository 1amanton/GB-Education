const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



const ProductList = new Vue({
    el: "#app",

    data: {
        catalogUrl: "/catalogData.json",

        products: [],
        filteredProducts: [],

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

        searchFilter() {
            
            console.log("search submited");
            const regExp = new RegExp(this.userSearch, "i")

            this.filteredProducts = this.products.filter(product => regExp.test(product.product_name))
            console.log(this.filteredProducts);

        },

        countCart() {
            return this.products.length;
        },
    },

    mounted () {
        this.getJson(`${API}/${this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                    this.filteredProducts.push(product);
                    // console.log(this.products);
                    // console.log(this.filteredProducts);
                };
            });

    },
});

