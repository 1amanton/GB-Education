Vue.component("products", {
    props: ["filtered", "image"],


    template:`
        <div class="productlist">

            <product 
            v-for="item of filtered"
            :key="item.id_product"
            :image="image"
            :product="item">
            </product>

        </div>
        `,

});

Vue.component("product", {
    props: ["product", "image"],

    template:`
        <div class="product">
            <p class="product-price">ID: {{ product.id_product}}</p>
            <img class="product-img" :src="image">
            <h3 class="product-title">Название: {{ product.product_name }}</h3>
            <p class="product-price">Цена: {{ product.price }}</p>
            <button class="product-buy" @click="$root.addProduct(product)">Buy!</button>
            
        </div>`,

})
