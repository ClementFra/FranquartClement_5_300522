// Information for the Id of product
const getIdProduct = () => {
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("id");
  return itemId;
};

// Product information form the Api
const getProduct = () => {
  fetch(`http://localhost:3000/api/products/${getIdProduct()}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((product) => {
      displayInfos(product);
      addToCart(product);
    })
    .catch(function (err) {
      const products = document.querySelector("item");
      products.innerHTML = `Une erreur est survenue (${err})`;
    });
};

getProduct();

// Display information for the product page
const displayInfos = (product) => {
  const item__img = document.querySelector(
    "body > main > div > section > article > div.item__img"
  );

  // Element information of products
  const productImage = document.createElement("img");
  const productName = document.getElementById("title");
  const productPrice = document.getElementById("price");
  const productDesc = document.getElementById("description");
  const colorSelector = document.getElementById("colors");

  // change element of product

  // element image change
  productImage.src = product.imageUrl;
  item__img.appendChild(productImage);

  // element information
  productName.innerHTML = product.name;
  productPrice.innerHTML = product.price;
  productDesc.innerHTML = product.description;

  // color element of product
  product.colors.forEach((color) => {
    const colorChoice = document.createElement("option");
    colorChoice.value = color;
    colorChoice.innerHTML = color;
    colorSelector.appendChild(colorChoice);
  });
};

// creation of shopping cart
const addToCart = (product) => {
  const addButton = document.getElementById("addToCart");
  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    item = {};

    // Update quantity and information on the page product
    const itemQuantity = document.getElementById("quantity").value;

    if (isNaN(itemQuantity) || !(itemQuantity > 0 && itemQuantity < 101)) {
      // error quantity if the quantity value is not good
      alert("Quantité invalide");
      return;
    }

    item.quantity = Number(itemQuantity);

    // Color infoamtion for the product page
    const itemColor = document.getElementById("colors").value;

    if (!itemColor) {
      // error color if the color value is not good
      alert("Veuillez choisir une couleur.");
      return;
    }

    item.color = itemColor;

    item.id = product._id;

    const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

    const itemInCart = cart.find(
      (inCartItem) =>
        inCartItem.id === item.id && inCartItem.color === item.color
    );
    if (!itemInCart) {
      cart.push(item);
    } else {
      itemInCart.quantity += item.quantity;
      if (itemInCart.quantity > 100) {
        // error quantity if the quantity value is too hight
        alert(
          "Il est impossible d'acheter plus de 100 exemplaires d'un même article."
        );
        return;
      }
    }
    // update of the shopping cart for the cart page
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
    alert(`Votre commande est effectuée`);
  });
};
