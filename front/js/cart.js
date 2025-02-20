import * as index from "./index.js"
//define variables
let cart = index.getCart();
const totalQuantityElement = document.getElementById("totalQuantity");
const totalPriceElement = document.getElementById("totalPrice");

function emptycart() {
  if ( cart.length === 0){
    document.getElementsByClassName ("cart")[0].innerHTML = "Le panier est vide "
  }
}
emptycart();
//Product information form Api for the cart items
function getProducts(){
  cart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((fullProduct) => {
        fullProduct.color = product.color;
        fullProduct.quantity = product.quantity;
        createItemInCart(fullProduct);
      })
      .catch(function (err) {
        const cartItemEl = document.getElementById("cart__items");
        cartItemEl.innerHTML = `Une erreur est survenue : ${err}`;
      });
  });
};

getProducts();

// display details for cart items
const createItemInCart = (product) => {
  // element of cart items
  const itemArticle = document.createElement("article");
  const itemDivImg = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemDivContent = document.createElement("div");
  const itemDivContentDesc = document.createElement("div");

  // element of product
  const itemDivContentDescName = document.createElement("h2");
  const itemDivContentDescColor = document.createElement("p");
  const itemDivContentDescPrice = document.createElement("p");
  const itemDivContentSettings = document.createElement("div");

  // element quantity of product
  const itemDivContentSettingsQty = document.createElement("div");
  const itemDivContentSettingsQtyValue = document.createElement("p");
  const itemDivContentSettingsQtyInput = document.createElement("input");

  // element for remove product of cart
  const itemDivContentSettingsDel = document.createElement("div");
  const itemDivContentSettingsDelText = document.createElement("p");

  // change element
  itemArticle.classList.add("cart__item");
  itemArticle.dataset.id = product._id;
  itemArticle.dataset.color = product.color;
  itemDivImg.classList.add("cart__item__img");
  itemImg.src = product.imageUrl;
  itemDivContent.classList.add("cart__item__content");
  itemDivContentDesc.classList.add("cart__item__content__description");
  itemDivContentDescName.innerHTML = product.name;
  itemDivContentDescColor.innerHTML = product.color;
  itemDivContentDescPrice.innerHTML = `${product.price * product.quantity} €`;
  itemDivContentSettings.classList.add("cart__item__content__settings");

  // change element for quantity of product
  itemDivContentSettingsQty.classList.add(
    "cart__item__content__settings__quantity"
  );
  itemDivContentSettingsQtyValue.innerHTML = "Qté : ";
  itemDivContentSettingsQtyInput.type = "number";
  itemDivContentSettingsQtyInput.classList.add("itemQuantity");
  itemDivContentSettingsQtyInput.name = "itemQuantity";
  itemDivContentSettingsQtyInput.min = 1;
  itemDivContentSettingsQtyInput.max = 100;
  itemDivContentSettingsQtyInput.value = product.quantity;

  // update quantity of product
  itemDivContentSettingsQtyInput.addEventListener("change", updateQuantity);

  // change element for remove the product of cart
  itemDivContentSettingsDel.classList.add(
    "cart__item__content__settings__delete"
  );
  itemDivContentSettingsDelText.addEventListener("click", deleteItem);
  itemDivContentSettingsDelText.innerHTML = "Supprimer";

  //child element
  itemDivContentDesc.appendChild(itemDivContentDescName);
  itemDivContentDesc.appendChild(itemDivContentDescColor);
  itemDivContentDesc.appendChild(itemDivContentDescPrice);

  // child element for quantity
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyValue);
  itemDivContentSettingsQty.appendChild(itemDivContentSettingsQtyInput);
  itemDivContentSettings.appendChild(itemDivContentSettingsQty);

  // child element for remove product of cart
  itemDivContentSettingsDel.appendChild(itemDivContentSettingsDelText);
  itemDivContentSettings.appendChild(itemDivContentSettingsDel);
  itemDivContent.appendChild(itemDivContentDesc);
  itemDivContent.appendChild(itemDivContentSettings);

  // child element product img
  itemDivImg.appendChild(itemImg);
  itemArticle.appendChild(itemDivImg);
  itemArticle.appendChild(itemDivContent);

  const cart = document.getElementById("cart__items");
  cart.appendChild(itemArticle);
};

// Remove the shopping cart form the cart page

function deleteItem(delButton) {
  if (window.confirm("Voulez-vous supprimer ce produit ?")) {
    const cartItem = delButton.target.closest(".cart__item");
    const id = cartItem.dataset.id;
    const color = cartItem.dataset.color;
    cartItem.parentNode.removeChild(cartItem);
    cart.splice(
      cart.indexOf(
        cart.find((item) => item.id === id && item.color === color)
      ),
      1
    );

    // update the shopping cart
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    updateTotal();
    emptycart();
  }
};

//update the  quantity of cart
function updateQuantity(e){
   const newQuantity = Number(e.target.value);
   const article = e.target.closest(".cart__item");
  cart.map((product) => {
    if (
      product.id == article.dataset.id &&
      product.color == article.dataset.color
    ) {
      product.quantity = newQuantity;
      return product;
    }
  });

  // update the shopping cart after the update of quantity
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  updateTotal();
};

// Update the total after the update of quantity
function updateTotal (product){
  let totalQuantity = 0;
  let totalPrice = 0;
  cart.forEach((product) => {
    fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((productFound) => {
        totalQuantity += product.quantity;
        totalPrice += product.quantity * productFound.price;
        totalQuantityElement.innerHTML = totalQuantity;
        totalPriceElement.innerHTML = totalPrice;
      })
      .catch(function (err) {
        alert(`Une erreur est survenue: ${err}`);
      });
  });

  totalQuantityElement.innerHTML = totalQuantity;
  totalPriceElement.innerHTML = totalPrice;
};
updateTotal();

// ** formulaire check and validation ** //

//define Regex for the form
const nameRegex = new RegExp("^[A-Za-zÀ-ú'-\\s]{2,}$", "g"); 
const addressRegex = new RegExp("^[\\wÀ-ú'-\\s]{2,}$", "g"); 
const mailRegex = new RegExp("^[\\w.-]+[@]{1}[\\w.-]+[.]{1}[a-z]{2,10}$", "g"); 

//check the regex match
function checkRegex(input, regex, message){
  let regexTest = new RegExp(regex).test(input.value);
  let errorMsg = input.nextElementSibling; 
  if (!regexTest) {
    errorMsg.innerHTML = message;
    return false;
  } else {
    errorMsg.innerHTML = "";
    return true;
  }
};

//value for the form
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// submit for the form
const orderButton = document.getElementById("order");
orderButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    checkRegex(firstName, nameRegex, "Saisir un prenom valide") &&
    checkRegex(lastName, nameRegex, "Saisir un nom valide") &&
    checkRegex(address, addressRegex, "Saisir une adresse valide") &&
    checkRegex(city, nameRegex, "Saisir une ville valide") &&
    checkRegex(email, mailRegex, "Saisir un email valide ")
  ) {
    orderSending();
  }
});

// creation of order with the form information
const orderSending = () => {
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  let products = [];
  cart.forEach((product) =>{
    products.push(product.id);
  });
  let order = { contact, products };

  fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((product) => {
      localStorage.clear();
      // redirection user to the confirmation page
      location.href = `./confirmation.html?orderId=${product.orderId}`;
    })
    .catch(function (err) {
      alert(`Une erreur est survenue: ${err}`);
    });
};
