const taxRate = 0.18;
const shippingPrice = 15.0;
const shippingFreePrice = 300.0;

window.addEventListener("load", () => {
    calculateCartTotal();
    //set item to LocalStorage
    localStorage.setItem("taxRate", taxRate);
    localStorage.setItem("shippingPrice", shippingPrice);

    //set item to SessionStorage
    sessionStorage.setItem("taxRate", taxRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);

});

//capturing method
const productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (event) => {
    if (event.target.className == "fa-solid fa-minus") {
        if (event.target.nextElementSibling.innerText > 1) {
            event.target.nextElementSibling.innerText--;
            //parameter == selected productDiv
            calculateProductAndCartTotal(event.target.parentElement.parentElement.parentElement);
        }
        else {
            if (confirm("Product will be deleted?")) {
                event.target.parentElement.parentElement.parentElement.remove();
                calculateCartTotal();
            }
        }
        // console.log(typeof event.target.nextElementSibling.innerText);
        // console.log("minus button clicked");
    }
    else if (event.target.classList.contains("fa-plus")) {
        event.target.previousElementSibling.innerText++;
        //parameter == selected productDiv
        calculateProductAndCartTotal(event.target.parentElement.parentElement.parentElement);
        // console.log("plus button clicked");
    }
    else if (event.target.classList.contains("remove-product")) {
        if (confirm("Product will be deleted?")) {
            event.target.parentElement.parentElement.parentElement.remove();
            calculateCartTotal();
        }
        // console.log("remove button clicked");
    }
    else {
        console.log("other element is clicked");
    }
});


//calculate cart and product totals
const calculateProductAndCartTotal = (productDiv) => {
    //product calculation
    // console.log(productInfoDiv);
    const price = productDiv.querySelector("strong").innerText;
    const quantity = productDiv.querySelector(".quantity-controller p").innerText;
    const productTotalDiv = productDiv.querySelector(".product-line-price");
    productTotalDiv.innerText = (price * quantity).toFixed(2);
    //cart calculation
    calculateCartTotal();
}

//calculate cart totals
const calculateCartTotal = () => {
    //nodeList Div
    const productsTotalPriceDivs = document.querySelectorAll(".product-line-price");
    // console.log(productsTotalPriceDivs);
    let subtotal = 0;
    productsTotalPriceDivs.forEach(eachProductTotalDiv => {
        subtotal += parseFloat(eachProductTotalDiv.innerText)
    });
    console.log(subtotal);
    const taxPrice = subtotal * localStorage.getItem("taxRate");
    console.log(taxPrice);

    const shippingPrice = (subtotal > 0 && subtotal < shippingFreePrice ? parseFloat(localStorage.getItem("shippingPrice")) : 0);

    const cartTotal = subtotal + taxPrice + shippingPrice;

    document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shippingPrice.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = cartTotal.toFixed(2);

}





