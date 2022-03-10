class Forma {
    constructor(form) {
        this.form = form;

        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+[0-9]{1}\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/i,
            email: /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]{2,4}$/i,
        };

        this.errors = {
            name: "Имя должно содержать только буквы Латиницы и Кириллицы",
            phone: "Номер телефона должен быть в формате +7(000)000-00-00",
            email: "Почта должена быть в формате mail@host.ru",
        };
        this.errorClass = "inputError";

        this.valid = false;
        this._validateForm()

    };

    /**
     * Firstly remove all errors at start form - spread all elements with errorClass to array and remove them.
     * Then spread all elements with input tagname to array and make _validate method of each input.
     * If have elements with INVALID class in form - spread them in array, and if array is false - make this.valid=true.
     */
    _validateForm() {
        let errors = [...document.getElementById("forma").querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors) {
            error.remove();
        };

        let formFields = [...document.querySelector(this.form).getElementsByTagName('input')];
        for (let field of formFields) {
            this._validate(field);
        };

        if(![...document.querySelector(this.form).querySelectorAll(".invalid")].length) {
            this.valid = true;
        };
    };

    /**
     * Check for input name = patterns param.
     * Check regExp pattern with input value.
     * If regExp testing false - add error paragraph.
     * Then check change of input value.
     * 
     * @param {*} field input from html
     */
    _validate(field) {
        if(this.patterns[field.name]) {
            if(!this.patterns[field.name].test(field.value)) {
                field.classList.add("invalid");
                this._addErrorMsg(field);
                this._watchField(field);
            };
        };
    };

    /**
     * Make error paragraph with errorClass and errorText.
     * Paste paragraph before end of parentNode (label in html).
     * @param {*} field input from html
     */
    _addErrorMsg(field) {
        let error = `<p class="${this.errorClass}">${this.errors[field.name]}</p>`;
        field.parentNode.insertAdjacentHTML("beforeend", error);
    };


    /**
     * Add listener by change input value in field.
     * Make error variable as error paragraph.
     * Check regExp pattern with input value.
     * Make field VALID if regExp true, and remove error paragraph.
     * And make field INVALID and add error paragraph if regExp is false.
     * @param {*} field input from html
     */
    _watchField(field) {
        field.addEventListener("input", () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);

            if(this.patterns[field.name].test([field.value])) {
                field.classList.remove("invalid");
                field.classList.add("valid");
                if(error) {
                    error.remove();
                };
            } else {
                field.classList.remove("valid");
                field.classList.add("invalid");
                if(!error) {
                    this._addErrorMsg(field);
                };
            };
        });
    };


};

window.onload = () => {
    document.querySelector(".contactForm").addEventListener("submit" , e => {
        let form = new Forma(".contactForm");

        if(!form.valid) {
            e.preventDefault();
        };
    });
};

