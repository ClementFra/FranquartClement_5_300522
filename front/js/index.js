export function getCart(){
    let cart = localStorage.getItem("shoppingCart");
    if(cart == null){
        return [];
    }
    return JSON.parse(cart)
}