
// const counterItems = document.getElementById('counterItems');
//   let arrayStore = localStorage.getItem('countProduct');
//  // console.log(typeof(arrayStore));
//   let changeArray = (JSON.parse(arrayStore));
//   //console.log(changeArray);
//   let countItems = changeArray.length;
//   counterItems.innerText = countItems;
//   calculateTotal(changeArray);


  
const counterItems = document.getElementById('counterItems');
let arrayStore = localStorage.getItem('addcartProduct');
// console.log(typeof(arrayStore));
let changeArray = (JSON.parse(arrayStore));
//console.log(changeArray);
let countItems = changeArray.length;
counterItems.innerText = countItems;
calculateTotal(changeArray);

  
function calculateTotal(array) {
  //como le hacemos para extraer toda
  //de cantidades de los elementos
  //en mi carrito
  console.log(array);
  let priceTotal = 0;
  let containerTable = document.getElementById('container-table');
  let templateTotal = ``;
  array.forEach(element => {
    let title = element.title;
    let price = element.price;
    console.log(title);
    priceTotal += price;
    console.log(priceTotal);
    
    templateTotal += `
       <tr>
         <th scope="row">${title}</th>
         <td>$${price}</td>
       </tr>
       <tr>
            <td></td>
            <td></td>
            <td>$${priceTotal}</td>
          </tr>
       `;
  containerTable.innerHTML = templateTotal;

  });
  payPal(priceTotal);
  

  
}


const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); 
vaciarCarritoBtn.addEventListener('click', function vaciarLocalStorage() {
  localStorage.clear();
  let containerTable = document.getElementById("container-table");
  containerTable.innerHTML="";
});




function payPal(priceTotal) {
  paypal.Button.render({
    env: 'sandbox', // sandbox | production

    // PayPal Client IDs - replace with your own
    // Create a PayPal app: https://developer.paypal.com/developer/applications/create
    client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
        production: 'AdHnjwFAeSTLUjemTdVWMfo0P0kcfj6NXUorLoZk5qUWwGEuNvTTxpp6yimhrSoJ4zZK49oxQQnNMUOX'
    },

    // Show the buyer a 'Pay Now' button in the checkout flow
    commit: true,

    // payment() is called when the button is clicked
    payment: function(data, actions) {

        // Make a call to the REST api to create the payment
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: priceTotal, currency: 'MXN' }
                    }
                ]
            }
        });
    },

    // onAuthorize() is called when the buyer approves the payment
    onAuthorize: function(data, actions) {

        // Make a call to the REST api to execute the payment
        return actions.payment.execute().then(/*function(data) {
            console.log(data);
            window.alert('Payment Complete!');
            
            return data;
        }*/ getData);
       
        //console.log(data);
      printReceipt(data);
        
    }

}, '#paypal-button-container');
}


 function getData(data) {
    console.log(data);
    printReceipt(data);
 }
 
function printReceipt(data) {
    console.log(data);
    let dataId = data.id;
    console.log(dataId);
    let firstName =  data["payer"]["payer_info"].first_name;
    console.log(firstName);
    let lastName = data["payer"]["payer_info"].last_name;
    console.log(lastName);
    let totalAmount = data.transactions[0]["amount"].total;
    console.log(totalAmount);
    let currency = data.transactions[0]["amount"].currency;
    console.log(totalAmount);
   
    let templateReceipt = ``;
    templateReceipt = `
   <h4>${dataId} </h4>
   <p>Nombre : ${firstName} ${lastName}<p>
   <h5> Cantidad total: </h5>
   <p>$${totalAmount} ${currency}</p>
 `;

 let containerPage = document.getElementById("cont-table-complete");
 containerPage.innerHTML= "";
 let finalContainer = document.createElement("div");
 finalContainer.className = "col text-center";
 finalContainer.innerHTML = templateReceipt;
 containerPage.appendChild(finalContainer);
    
}