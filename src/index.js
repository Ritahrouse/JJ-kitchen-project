
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
var removeCartItemBtn=document.getElementsByClassName('btn-remove');
for (var i=0;i< removeCartItemBtn.length;i++)
{
    var button=removeCartItemBtn[i];
    button.addEventListener('click',removeCartItem)
}
var quantityInputs=document.getElementsByClassName('cartinput');
for(var i=0 ; i<quantityInputs.length;i++)
{
    var input=quantityInputs[i];
    input.addEventListener('change',quantityChange);
}

var itemmenu=document.getElementsByClassName('order');
for(var i=0;i<itemmenu.length;i++)
{
    var item=itemmenu[i];
    item.addEventListener('click',addToOrderClicked);
}

}
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
    updatePriceTotal();
   
}
function quantityChange(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updatePriceTotal();
   
}
function updatePriceTotal() {
  
    var rows=document.getElementsByClassName('item1');
    var discount=document.getElementById('discount-amt');
     var amt = parseFloat(discount.innerText.replace('$', ''));
    var total=0;
   for(var i=0;i<rows.length;i++)
    {
        var rowElement=rows[i];
        console.log(rowElement )
       var priceElement=rowElement.getElementsByClassName('price-item')[0];
       var price = parseFloat(priceElement.textContent.replace('$', ''));
       var quantityElement=rowElement.getElementsByClassName('cartinput')[0];
        var quantity=quantityElement.value;

         total=total+(price*quantity);
    }
 total = Math.round(total * 100) / 100
    document.getElementById('total-price').innerText = '$' + (total );
    document.getElementById('full-price').innerText = '$' + (total - amt);

}


function addToOrderClicked(event){
var button=event.target;
var shopItem = button.parentElement.parentElement;
var nameItem=shopItem.getElementsByClassName('card-title')[0].innerText;
var priceElement =shopItem.getElementsByClassName('price-tag')[0];
var price=parseFloat(priceElement.textContent.replace('-$', ''));
var imageSrc=shopItem.getElementsByClassName('card-img-top')[0].src;
addItemToOrder(nameItem,price,imageSrc);
updatePriceTotal();
}


function addItemToOrder(nameItem,price,imageSrc){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
     var cartItems = document.getElementsByClassName('item1')[0];

    var cartItemNames = cartItems.getElementsByClassName('carttitle');
     for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
         <div class="row item1">
           <div class="col-sm-4">
            <img src="${imageSrc}" class="card-img-top img-fluid cartimage" alt="kebbeh">
           </div>
        <div class="col-sm-4  mt-3 text-center ">
            <p class="carttitle">${nameItem}</p>
            <p class="price-item">$${price}</p>
        </div>
        <div class="col-sm-4 text-center">
            <div class="row">
                <div class="col-sm-6 mt-3">
                <input type="number" value="2" class="cartinput">
                </div>
                <div class="col-sm-6 mt-3">
                    <a href="#" class="btn btn-primary button1 btn-remove " id="">Remove</a>
                </div>
            
            </div>
        </div>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', quantityChange);

}
