const product = {
    props: ["product"],

    template:`
        <div class="product">
            <p class="product-id">ID: {{ product.id_product}}</p>
            <img class="product-img" :src="product.image">
            <h3 class="product-title">{{ product.product_name }}</h3>
            <p class="product-price">Цена: {{ product.price }}</p>            
            <button class="product-buy" @click="$root.$refs.cart.addProduct(product)">Buy!</button>
        </div>`
};


const products = {
    components: {product},

    data() {
        return {
            catalogUrl: "/catalogData.json",

            products: [],
            filtered: [],
        }
    },

    mounted() {

        this.$root.getJson(`/api/products`)
            .then(data => {
                console.log(data);
                for(let product of data){
                    this.products.push(product);
                    this.filtered.push(product);
                }
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
            :product="item">
            </product>

        </div>
        `
};

