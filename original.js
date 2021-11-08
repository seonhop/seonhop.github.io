if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}
function ready() {
    clickAddToBag();
    updateBagCount();
    displayCart();
}

function greet() {
    console.log('Hey there clicker!');
}


function removeItem(event) {
    console.log(event)
    event.parentElement.remove()
    var existingItems = JSON.parse(localStorage.getItem("allItems"));
    const index = event.id;
    qty_val = existingItems[index]["qty"]
    existingItems.splice(index, 1);
    // console.log(existingItems)
    item = existingItems[index];
    var bag_count = parseInt(document.getElementById("bag_item_count").textContent);

    localStorage.setItem("bag_count", bag_count - qty_val);
    localStorage.setItem("allItems", JSON.stringify(existingItems));
    displayCart()
    updateBagCount()
}

function updateBagCount() {
    var bag_count = localStorage.getItem("bag_count")
    if(bag_count == null) {
        bag_count = 0
    }
    document.getElementById("bag_item_count").textContent = bag_count;
}

function clickAddToBag() {
    var productPage = document.querySelector(".add-to-bag-box")
    if(productPage) {
        var container = document.getElementsByClassName("add-to-bag-box")[0];
        document.addEventListener('click', function(event){
        if (container == event.target || container.contains(event.target)) {
            console.log("clicking purchase")
            var selected = document.getElementsByTagName("select");
            var glazing_opt = selected[0]
            var qty_opt = selected[1]
            var glazing_val = glazing_opt.options[glazing_opt.selectedIndex].value;
            var qty_val = parseInt(qty_opt.options[qty_opt.selectedIndex].value)
            console.log(glazing_val);
            console.log(qty_val);
            if (glazing_val == "Please choose" || qty_val == "Pleae choose")
            {
            alert("Please select glazing and/or quantity option");
            } else{
                var item = {"flavor": "original", "price": "1.50", "glazing": glazing_val, "qty": qty_val};
                var bag_count = parseInt(document.getElementById("bag_item_count").textContent);
                console.log(bag_count);
                document.getElementById("bag_item_count").textContent = bag_count + qty_val;
                localStorage.setItem("bag_count", bag_count + qty_val)
                var existingItems = JSON.parse(localStorage.getItem("allItems"));

                if(existingItems == null){
                    existingItems = [];
                }
                existingItems.push(item);
                localStorage.setItem("allItems", JSON.stringify(existingItems));
                console.log(JSON.parse(localStorage.getItem("allItems")));

            }
        }
    })

    }
}

function displayCart() {
    var bagMainPage = document.querySelector(".products-container")
    var bagItems = JSON.parse(localStorage.getItem("allItems"));
    var totalPrice = 0
    if(bagItems && bagMainPage){
        bagMainPage.innerHTML = '';
        bagMainPage.innerHTML += `
        <h2 class="main_text">Bag</h2>
        <div class = "cart-row">
            <span class="cart-item cart-header cart-column">Item</span>
            <span class="cart-price cart-header cart-column">Price</span>
            <span class="cart-quantity cart-header cart-column">Quantity</span>
        </div>
        `
        var i = 0
        Object.values(bagItems).map(item => {
            bagMainPage.innerHTML += `
            <div class = "bag-items">
                <button onclick = "removeItem(this)" class = "remove-btn" id = ${i}>remove</button>
                <div class="item-flavor">${item.flavor};</div>
                <div class="item-glazing">${item.glazing}</div>
                <div class = "item-price">${item.price}</div>
                <div class = "item-qty">${item.qty}</div>

            </div>
            `
            i += 1
            totalPrice += parseFloat(item.price) * parseInt(item.qty)
        })

        bagMainPage.innerHTML += `
        <div class="cart-total">
            <strong class = "cart-total-title">Total:</strong>
            <span id="cart-total-price">$0</span>
        </div>
        <a href="#" class="purchase_button">
        <button>Purchase</button>
        </a>
        `
        document.getElementById("cart-total-price").textContent = "$" + totalPrice;

    }

}

// if(document.getElementById("add-to-bag-box").clicked == true) {
//     var select = document.getElementById("glazing-option")[0].value;
//     if (select.value == "") {
//         console.log(select.val)
//         alert("Please select a card type");
//     }
// }