// Url of the order
const urlSearchParams = new URLSearchParams(window.location.search);
const ElementOrderId = urlSearchParams.get("orderId");
// number of the order 
 OrderElement = document.getElementById("orderId");
 OrderElement.innerHTML = `${ElementOrderId}`;
 


