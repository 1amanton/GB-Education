const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



const ProductList = new Vue({
    el: "#app",

    data: {
        cartCounter: 0,
        show: false,
        showCart: false,
        error: false,        
    },

    components: {headerz, error, products, cart, footerz},

    methods: {

        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log("Error");
                    this.error = true;
                })
        },

        postJson(url, data){
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log("Error");
                    this.error = true;
                })
        },

        putJson(url, data){
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log("Error");
                    this.error = true;
                })
        },

        delJson(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    console.log("Error");
                    this.error = true;
                })
        },
    },

    mounted() {
        
    }
});

