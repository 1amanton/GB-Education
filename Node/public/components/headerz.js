const logo = {
    
    template:`
        <div class="h-left">
                <span class="h-logo">10 TH PLANET RUSSIA STORE</span>
        </div>
    `
};

const search = {

    data() {
        return {
            userSearch: ""
        };
    },

    template:`
        <form @submit.prevent="$root.$refs.products.searchFilter(userSearch)" action="#" class="h-search">
            <input  v-model="userSearch" type="text" placeholder="Search..." class="h-search-field">
            <button type="submit" class="h-search-icon-btn">
                <i class="fa-solid fa-magnifying-glass h-search-icon"></i>
            </button>
        </form>
    `
};

const carticon = {

    template:`
        <div class="h-right">          
            <svg @click="$root.showCart=!$root.showCart" class="h-basket" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.45896 7.62555L0 32H32L30.541 7.62555H1.45896V7.62555ZM3.81867 10.1885H28.1825L29.3345 29.437H2.66548L3.81748 10.1885H3.81867Z" fill="black"/>
                <path d="M21.5917 7.78886C21.5917 4.89439 19.3019 2.53982 16.4871 2.53982C13.6723 2.53982 11.3825 4.89439 11.3825 7.78886H8.9126C8.9126 3.49408 12.3105 0 16.4871 0C20.6637 0 24.0616 3.49408 24.0616 7.78886H21.5917Z" fill="black"/>
            </svg>
            <span v-show="$root.cartCounter" class="h-basket-counter">{{ $root.cartCounter }}</span>
        </div>
    `
};

           

const headerz = {

    components: {logo, search, carticon},

    template:`
        <header class="h">

            <logo></logo>

            <search></search>

            <carticon><carticon>

        </header>
    `
};



