const cartitem = {
    props: ["item"],

    template:`
        <div class="basket-product">
            <img class="basket-product-img" :src="item.imgPath">
            <div class="basket-product-text">
                <h3 class="basket-product-title">Наименование:<br>{{ item.product_name }}</h3>
                <p class="basket-product-price">Цена:<br>$ {{ item.price }}</p>
                <p class="basket-product-quanity">Кол-во:<br>{{ item.quantity }}</p>
            </div>                
            <p class="basket-product-allprice">Сумма:<br>$ {{ item.price*item.quantity }} </p>
            <div @click="$parent.removeProduct(item)" class="basket-product-delete">X</div>                    
        </div>
        `
};

const cart = {
    props: ["visibility"],
    components: {cartitem},

    data() {
        return {
            cartUrl: "/getBasket.json",

            cartProducts: [],
        };
    },

    mounted() {
        this.$root.getJson(`/api/cart`)
        .then(data => {
            for (let product of data.contents) {
                this.cartProducts.push(product);
            };
            this.updateCounter();
        });
    },

    methods: {
        addProduct(item){
            let find = this.cartProducts.find(el => el.id_product === item.id_product);
            if(find){
                this.$root.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                //create new object with item parametrs and quantity=0
                const prod = Object.assign({quantity: 1}, item);
                this.$root.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartProducts.push(prod)
                            this.updateCounter();
                        }
                    })
            }
        },    

        removeProduct(item) {

            if(item.quantity > 1) {
                this.$root.putJson(`/api/cart/${item.id_product}`, {quantity: -1})
                    .then(data => {
                        if (data.result) {
                            item.quantity--;
                        }
                    })
            } else {
                this.$root.delJson(`/api/cart/${item.id_product}`, item)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                            this.updateCounter();
                        } else {
                            console.log('Error');
                        }
                    })
            }
        },

        updateCounter() {
            return this.$root.cartCounter = this.cartProducts.length
        },
    },

    template:`
        <div v-show="visibility" class="basket">
            <p v-if="!cartProducts.length" class="basket-empty">Корзина пуста</p>

            <cartitem 
            v-for="item of cartProducts"
            :key="item.id_product"
            :item="item">            
            </cartitem>

        </div>
        `
};
