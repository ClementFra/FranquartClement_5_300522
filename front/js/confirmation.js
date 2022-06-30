// Url of the order
const urlSearchParams = new URLSearchParams(window.location.search);
const elementOrderId = urlSearchParams.get("orderId");
// number of the order 
/*if (elementOrderId != null){
    orderElement = document.getElementById("orderId");
    windows.location = "../html/index.html"
}
*/
orderElement = document.getElementById("orderId");
orderElement.innerHTML = `${elementOrderId}`;
 


