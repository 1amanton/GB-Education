class Forma {
    constructor(container = ".contactForm") {
        this.container = container;

        this.regExpName = /^[a-zа-яё]+$/i;
        this.regExpPhone = /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/i;
        this.regExpMail = /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,4}$/i;

        this.formSubmit();

    };

    formSubmit() {
        document.querySelector(this.container).addEventListener("submit", e => {
            e.preventDefault();
            this.nameCheck(document.querySelector("#name").value)
            this.mailCheck(document.querySelector("#mail").value)
            this.phoneCheck(document.querySelector("#phone").value)      

        });
    };

    nameCheck(username) {
        if(this.regExpName.test(username)) {
            document.querySelector(".name-error").classList.add("disNone");
            console.log("Имя прошло проверку");
        } else {
            console.log("Неверное имя");
            document.querySelector(".name-error").classList.remove("disNone");
            document.querySelector(".name-error").classList.add("disBlock");
        };
    };

    phoneCheck(userphone) {
        if(this.regExpPhone.test(userphone)) {
            document.querySelector(".phone-error").classList.add("disNone");
            console.log("Телефон прошел проверку");
        } else {
            console.log("Неверный телефон");
            document.querySelector(".phone-error").classList.remove("disNone");
            document.querySelector(".phone-error").classList.add("disBlock");
        };
    };

    mailCheck(usermail) {
        if(this.regExpMail.test(usermail)) {
            document.querySelector(".mail-error").classList.add("disNone");
            console.log("Email прошел проверку");
        } else {
            console.log("Неверный email");
            document.querySelector(".mail-error").classList.remove("disNone");
            document.querySelector(".mail-error").classList.add("disBlock");
        };
    };

};


new Forma();
