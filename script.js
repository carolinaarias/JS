var anio = 2021;

calcularEdad(anio,parseInt(prompt("Este sitio contiene bebidas alcohólicas, ingresá el año de tu nacimiento:")))
function calcularEdad (anio,anioNacimiento){
   let edad = anio - anioNacimiento;
   if (edad<18){
      alert("No tendras acceso a las bebidas con alcohol.");
   }else if(edad>=18){
      alert("Ya podes comprar.");
   }else{
      alert("Inavlido");
   }
}

class Productos{
   constructor(img,id,descripcion,precio){
      this.img = img;
      this.id = id;
      this.descripcion = descripcion;
      this.precio = precio;
   }
   promociones (banco){
      let descuento;
      let precio = this.precio;
      switch(banco){
         case banco ="itau":
            descuento = 10;
            alert("El banco Itau tiene el 10% de descuento");
            break;
         case banco = "santander":
            descuento = 5;
            alert("El banco Santander tiene el 5% de descuento");
            break;
         case banco = "bbva":
            descuento = 15;
            alert("El banco Frances tiene el 15% de descuento");
            break;
         default :
            descuento = 0;
            alert("Ese banco no posee promociones")
      }
      function calcularIva (precio){
         let costoIva = precio * 1.21;
         return costoIva;
      }
      function calcularPromo (descuento){
         let costoTotal = calcularIva(precio);
         let porcentaje = ((costoTotal * descuento)/100);
         let precioFinal = costoTotal - porcentaje;
         return precioFinal;
      }
      let costoIva = calcularIva(precio)
      alert("Precio con iva de la pizza: " + this.id+" $" +costoIva);
      let precioFinal = calcularPromo(descuento);
      alert("El precio final con el descuento es de $ " + precioFinal)
   } 
}
const pizza1 = new Productos("img/comida/Muzza .png","Muzzarella","Queso muzzarella con oregano.",500);
const pizza2 = new Productos("img/comida/Roque (1).png","Roquefort","Queso roquefort con oregano.",700);
const pizza3 = new Productos("img/comida/Rucula (1).png","Rucula","Rucula con jamon crudo y muzzarella.",800);
const pizzas = [pizza2,pizza3,pizza1]
const sang1 = new Productos("img/comida/Sw-Bondio.png","Bondiola","Bondiola braseada, queso brie y pan de papa.",700);
const sang2 = new Productos("img/comida/Sw-Coleslow.png","Coleslow","Vacio, muzzarella gratinada y ensalada coleslow.",700);
const sang3 = new Productos("img/comida/Sw-Crudo.png","Jamon Crudo","Jamon crudo, brie y rucula.",650);
const sangs = [sang1,sang2,sang3]

let contenedor = document.getElementById("pizzas");
for (const pizza of pizzas){
   let li = document.createElement("li");
   li.setAttribute("class", "col-12 col-md-6 col-lg-4");
   contenedor.appendChild(li);

   let contenedorProducto = document.createElement("div");
   contenedorProducto.setAttribute("class","carta__products-info-div");
   li.appendChild(contenedorProducto);

   let contenedorImg = document.createElement("div");
   contenedorProducto.appendChild(contenedorImg);
   let img = document.createElement("img");
   img.src = pizza.img;
   contenedorImg.appendChild(img);

   let contenedorTexto = document.createElement("div");
   contenedorProducto.appendChild(contenedorTexto);
   contenedorTexto.innerHTML = ` <h4>${pizza.id}</h4>
                                 <span>$ ${pizza.precio}</span>
                                 <p> ${pizza.descripcion}</p>
                                 <button type="button" onclick="carrito()" class="btn-edit btn btn-outline-success">Agregar a carrito</button>`;
}
let contenedor2 = document.getElementById("sanguches");
for (const sang of sangs){
   let li = document.createElement("li");
   li.setAttribute("class", "col-12 col-md-6 col-lg-4");
   contenedor2.appendChild(li);

   let contenedorProducto = document.createElement("div");
   contenedorProducto.setAttribute("class","carta__products-info-div");
   li.appendChild(contenedorProducto);

   let contenedorImg = document.createElement("div");
   contenedorProducto.appendChild(contenedorImg);
   let img = document.createElement("img");
   img.src = sang.img;
   contenedorImg.appendChild(img);

   let contenedorTexto = document.createElement("div");
   contenedorProducto.appendChild(contenedorTexto);
   contenedorTexto.innerHTML = ` <h4>${sang.id}</h4>
                                 <span>$ ${sang.precio}</span>
                                 <p> ${sang.descripcion}</p>
                                 <button type="button" onclick="carrito()" class="btn-edit btn btn-outline-success">Agregar a carrito</button>`;
}

let ordenarBoton=document.getElementById("ordenar");
ordenarBoton.addEventListener("click", ordenar);
function ordenar(){
   console.log("De menor a mayor precio: ")
   const listaPizzasPrecio = [pizzas.sort(function (a, b){
      return a.precio - b.precio;
   })]
   const listaSangPrecio = [sangs.sort(function (a, b){
      return a.precio - b.precio;
   })]
   console.log(listaPizzasPrecio);
   console.log(listaSangPrecio);
}
const listaCarrito = [ ];
function agregarCarrito(productoCarrito){
   switch(productoCarrito){
      case productoCarrito = "muzzarella":
         listaCarrito.push(pizza1);
         alert("Producto agregado exitosamente");
         break;
      case productoCarrito = "roquefort":
         listaCarrito.push(pizza2);
         alert("Producto agregado exitosamente");
         break;
      case productoCarrito = "rucula":
         listaCarrito.push(pizza3);
         alert("Producto agregado exitosamente");
         break;
      case productoCarrito = "bondiola":
         listaCarrito.push(sang1);
         alert("Producto agregado exitosamente");
         break;
      case productoCarrito = "coleslow":
         listaCarrito.push(sang2);
         alert("Producto agregado exitosamente");
         break;
      case productoCarrito = "jamon crudo":
         listaCarrito.push(sang3);
         alert("Producto agregado exitosamente");
         break;
      default:
         alert("No contamos con ese producto");
   }
}
function carrito () {
   let cantProductos = parseInt(prompt("Ingrese la cantidad de productos que vas a comprar"));
   for(i=1; i<=cantProductos; i++){
      productoCarrito = prompt("Ingrese el gusto del producto Ej.Rucula").toLowerCase();
      agregarCarrito(productoCarrito);
   }
   for (let i = 0; i < listaCarrito.length; i++) {
      listaCarrito[i].promociones(prompt("Ingrese su banco para ver promociones Itau-BBVA-Santander").toLowerCase());
   }
}

let verBoton=document.getElementById("ver");
verBoton.addEventListener("click", verCarrito);
function verCarrito(){
   console.log("Productos agregados al carrito:");
   console.log(listaCarrito);
}

