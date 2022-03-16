Vue.component("cart", {
    props: ["visibility","products","image"],


    template:`
        <div v-show="visibility" class="basket">
            <p v-if="!products.length" class="basket-empty">Корзина пуста</p>

            <cartitem 
            v-for="item of products"
            :key="item.id_product"
            :image="image"
            :item="item">            
            </cartitem>

            
        </div>
        `,

});

Vue.component("cartitem", {
    props: ["item", "image"],

    template:`
        <div class="basket-product">
            <img class="basket-product-img" :src="image">
            <div class="basket-product-text">
                <h3 class="basket-product-title">Наименование:<br>{{ item.product_name }}</h3>
                <p class="basket-product-price">Цена:<br>$ {{ item.price }}</p>
                <p class="basket-product-quanity">Кол-во:<br>{{ item.quantity }}</p>
            </div>                
            <p class="basket-product-allprice">Сумма:<br>$ {{ item.price*item.quantity }} </p>
            <div @click="$root.removeProduct(item)" class="basket-product-delete">X</div>                    
        </div>
        `,

})
