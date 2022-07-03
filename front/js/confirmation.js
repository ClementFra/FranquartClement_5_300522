// Url of the order
const urlSearchParams = new URLSearchParams(window.location.search);
const elementOrderId = urlSearchParams.get("orderId");
// number of the order
// if the order = null the user was be redirected in the index 
if (elementOrderId == null) {
  window.location = "../html/index.html";
  // the user get the number of the order
} else {
  orderElement = document.getElementById("orderId");
  orderElement.innerHTML = `${elementOrderId}`;
}
