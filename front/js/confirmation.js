// Url of the order
const urlSearchParams = new URLSearchParams(window.location.search);
const elementOrderId = urlSearchParams.get("orderId");
// number of the order
// the user get the number of the order
if (elementOrderId != null) {
  orderElement = document.getElementById("orderId");
  orderElement.innerHTML = `${elementOrderId}`;
  // if the order == null the user was be redirected in the index
} else {
  window.location = "../html/index.html";
}
