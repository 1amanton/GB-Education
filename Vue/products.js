const product = {
    props: ["product", "image"],

    template:`
        <div class="product">
            <p class="product-price">ID: {{ product.id_product}}</p>
            <img class="product-img" :src="image">
            <h3 class="product-title">Название: {{ product.product_name }}</h3>
            <p class="product-price">Цена: {{ product.price }}</p>            
            <button class="product-buy" @click="$root.$refs.cart.addProduct(product)">Buy!</button>
        </div>`,
};


const products = {
    components: {product},

    data() {
        return {
            catalogUrl: "/catalogData.json",

            products: [],
            filtered: [],

            image: "https://e7.pngegg.com/pngimages/845/855/png-clipart-alerta-mexico-earthquake-computer-desktop-pc-electronics-text-thumbnail.png",
        }
    },

    mounted() {
        this.$root.getJson(`${API}/${this.catalogUrl}`)
        .then(data => {
            for (let product of data) {
                this.products.push(product);
                this.filtered.push(product);
            };
        });

        this.$root.getJson(`getProducts.json`)
            .then(data => {
                for(let product of data){
                    this.products.push(product);
                    this.filtered.push(product);
                }
                console.log (this.filtered)
            });
    },

    methods: {
        searchFilter(value) {
            const regExp = new RegExp(value, "i");
            this.filtered = this.products.filter(product => regExp.test(product.product_name));
        }
    },


    template:`
        <div class="productlist">

            <product 
            v-for="item of filtered"
            :key="item.id_product"
            :image="image"
            :product="item">
            </product>

        </div>
        `
};

