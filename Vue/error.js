Vue.component("error", {
    props:["status"],

    template:`
        <div v-show="status" class="errorz">
        ОШИБКА ПОДКЛЮЧЕНИЯ
        </div>
    `,

});
