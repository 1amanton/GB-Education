const checkout = document.querySelector("#checkout");

/**
 * element constructor by:
 * name from inputs "value"
 * price and ccal from inputs data-attributes (dataset array)
 */
class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset["price"];
        this.ccal = +element.dataset["ccal"]
    }
};

/**
 * burger constructor by size option and sause from checked inputs
 */
class Burger {
    constructor(size, option, sause) {
        this.size = new Param(this._select(size));
        this.option = this._getOptions(option);
        this.sause = new Param(this._select(sause));
    };

    /**
     * @returns checked input element
     */
    _select (name) {
        return document.querySelector(`input[name=${name}]:checked`);
    };

    /**
     * spread checked options of burger in array
     * @returns array of checked input element
     */
     _selectAll (name) {
        return [...document.querySelectorAll(`input[name=${name}]:checked`)];
    };

    /**
     * create blank array for all burger options object
     * take, coming from _selectAll method, array with checked in html burger options
     * create new object of each element, and push in result array
     * @returns array with objects of selected burger options created with Param constructor
     */
    _getOptions (name) {
        let result = [];
        this._selectAll(name).forEach(option => {
            let obj = new Param(option);
            result.push(obj);
        });
        return result;
    };

    _sumPrice () {
        let money = this.size.price + this.sause.price;
        this.option.forEach(option => {
            money+= option.price;
        });
        return money;
    };

    _sumCcal () {
        let calories = this.size.ccal + this.sause.ccal;
        this.option.forEach(option => {
            calories+= option.ccal;
        });
        return calories;
    };


    showSum (money, calories) {       
        document.querySelector(money).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCcal();
    };
};

/**
 * create new Burger object by names in inputs
 * calculate sum of price and calories by ids
 */
window.onload = () => {
    checkout.addEventListener("click", e => {
        e.preventDefault();
        let order = new Burger("size", "option", "sause");
        order.showSum("#summa", "#summaccal");
    });
};
