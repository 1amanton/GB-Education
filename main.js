const products = [
    {
        id: 1,
        title: "MacBook",
        price: 100,
        image: "./img/macbook.png"
    },

    {
        id: 2,
        title: "Watch",
        price: 110,
        image: "./img/watch.png"
    },

    {
        id: 3,
        title: "iPhone",
        price: 120,
        image: "./img/iphone.png"
    },

    {
        id: 4,
        title: "TV",
        price: 130,
        image: "./img/tv.png"
    },
];

const productsDiv = document.querySelector(".productlist");

const renderProduct = product => {
    return `<div class="product">
                <img class="product-img" src="${product.image}">
                <h3 class="product-title">Apple ${product.title}</h3>
                <p class="product-price">$ ${product.price}</p>
                <button class="product-buy">Buy!</button>
            </div>`
};

const renderPage = productlist => {
    productsDiv.innerHTML = productlist.map(product => 
        renderProduct(product)).join("");
};

renderPage(products);