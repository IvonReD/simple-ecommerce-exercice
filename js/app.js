
/* Pinta los elementos de la data */
function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}


/* Crea los productos y los inserta en el HTML*/
function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button data-product-id=${product.id}
      onclick="addToCart(this,${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}

drawProducts(data);




/*  Funcion para agregar numero de productos al contador del carrito */


// let countProduct = 0;
// let countProduct = [];

// function addToCart(id) {
//   /* cuando agrego a carrito, tengo que:
//   1) Incrementar en uno mi contador del menu
//   2) Guardar mi producto en algun lugar
//   3) Cambiar el boton de agregar a carrito
//   por quitar del carrito
//   */
// //  countProduct ++;
// //  console.log("Numero de Item: " + item);
// //  console.log("Numero de productos selecciondos: " + countProduct);
// //  localStorage.setItem("countProduct", JSON.stringify(countProduct));


//  let products = data.products[id]; // ingresa al id
//  console.log(id);
//  countProduct.push(products); // se agrega al arreglo vacio
//  localStorage.setItem("countProduct", JSON.stringify(countProduct)); // Se guarda en localStorage despues de JSON stringificarlo
//  increaseCounter();
// }




// function removeFromCart() {
//   /* cuando agrego a carrito, tengo que:
//   1) Decrementar en uno mi contador del menu
//   2) Borrar mi producto de algun lugar
//   3) Cambiar el boton de quitar del carrito
//   por agregar a carrito
//   */

 
 
// }

// function increaseCounter() {
//   /* como accedemos al HTML del contador
//   y como lo incrementamos*/ 
//   const counterItems = document.getElementById('counterItems'); //contenedor de conteo de productos seleccionados
//   let arrayStore = localStorage.getItem('countProduct');
//   console.log(arrayStore);
//   let changeArray = (JSON.parse(arrayStore)); // Se parsea para poder ser usado en js con JSON.parse
//   let countItems = changeArray.length; // se hace en conteo de los items (id) seleccionados
//   counterItems.innerText = countItems; // se imprime en span los items seleccionados
// }

// function decreaseCounter() {
//   /* como accedemos al HTML del contador
//   y como lo incrementamos*/
// }

// function changeButtonStatus() {
//   /* esta funcion deberia recibir un boton y
//   cambiar su estatus
//     Si el boton esta en agregar al carrito
//       cambia el texto a quitar del carrito
//     Y viceversa
//   */

// }

let addcartProduct = [];

function addToCart(eventBtn, productId) {

  if (eventBtn.classList.contains('clicked') == false) {
    increaseCounter();
    changeButtonStatus(eventBtn, false);

    let newArray = data.products.filter(function (element) {
      if (productId == element.id) {
        addcartProduct.push(element);
      }
    })
    console.log(addcartProduct);

  } else if (eventBtn.classList.contains('clicked') == true) {
    decreaseCounter()
    changeButtonStatus(eventBtn, true);
    removeFromCart(productId)
    console.log(addcartProduct);
  }

}

function removeFromCart(productId) {
  addcartProduct = addcartProduct.filter(function (element) {
    return element.id !== productId
    console.log(newArray);
  });
 
}

function increaseCounter() {
  /* como accedemos al HTML del contador
  y como lo incrementamos*/
  let counter = parseInt(document.getElementById('counterItems').textContent);
  let counterIncrease = document.getElementById('counterItems');
  counter += 1
  counterIncrease.innerHTML = counter;
}

function decreaseCounter() {
  /* como accedemos al HTML del contador
  y como lo incrementamos*/
  let counter = parseInt(document.getElementById('counterItems').textContent);
  let counterIncrease = document.getElementById('counterItems');
  counter -= 1
  counterIncrease.innerHTML = counter;
}

function changeButtonStatus(btnChange, boolean) {
if(boolean == false){
  btnChange.innerText = ("Qutar del carrito");
  btnChange.classList.toggle('clicked');
}else if (boolean == true) {
  btnChange.innerText = ("Agregar al carrito");
 
 }
}