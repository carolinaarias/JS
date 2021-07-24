//AJAX
$(document).ready(function() {
   $.get('productos.json', function(datos){
      createItems($("#pizzas"),datos.slice(0,3),datos)
  });
  $.get('productos.json', function(datos){
      createItems($("#sanguches"),datos.slice(3,7),datos);
   });
});

let listaCarrito = JSON.parse(localStorage.getItem('Carrito')) || [];

//ANIMACIONES MENU
function scrollTop (ul,h3,btn){
   displayNone(h3,btn)
   $('html').animate({
      scrollTop: $(ul).offset().top - 150
   },1000)
   $(h3).delay(1000);
   $(btn).delay(1000);
   titleSlide (h3,btn);
};
function titleSlide (h3,btn){
   $(btn).slideDown(800);
   $(h3).slideDown(800);
};
function displayNone(h3,btn){
   $(h3).css("display","none");
   $(btn).css("display","none");
}

$("#btn-pizzas").click(function() {
   scrollTop($("#pizzas"),$("#h3-pizzas"),$("#ordenarPizzas"));
 });
 $("#btn-sangs").click(function() {
   scrollTop($("#sanguches"),$("#h3-sangs"),$("#ordenarSangs"));
 });

//PLANTILLA DE PRODUCTOS
// class Productos{
//    constructor(img,id,titulo,descripcion,precio){
//       this.img = img;
//       this.id = id;
//       this.titulo = titulo;
//       this.descripcion = descripcion;
//       this.precio = precio;
//    }
//    promociones (banco){
//       let descuento;
//       let precio = this.precio;
//       switch(banco){
//          case banco ="itau":
//             descuento = 10;
//             alert("El banco Itau tiene el 10% de descuento");
//             break;
//          case banco = "santander":
//             descuento = 5;
//             alert("El banco Santander tiene el 5% de descuento");
//             break;
//          case banco = "bbva":
//             descuento = 15;
//             alert("El banco Frances tiene el 15% de descuento");
//             break;
//          default :
//             descuento = 0;
//             alert("Ese banco no posee promociones")
//       }
//       function calcularIva (precio){
//          let costoIva = precio * 1.21;
//          return costoIva;
//       }
//       function calcularPromo (descuento){
//          let costoTotal = calcularIva(precio);
//          let porcentaje = ((costoTotal * descuento)/100);
//          let precioFinal = costoTotal - porcentaje;
//          return precioFinal;
//       }
//       let costoIva = calcularIva(precio);
//       alert("Precio con iva de la pizza: " + this.id+" $" +costoIva);
//       let precioFinal = calcularPromo(descuento);
//       alert("El precio final con el descuento es de $ " + precioFinal)
//    } 
// }
//Crear Productos
// const pizza1 = new Productos("img/comida/Muzza .png",1,"Muzzarella","Queso muzzarella con oregano.",500);
// const pizza2 = new Productos("img/comida/Roque (1).png",2,"Roquefort","Queso roquefort con oregano.",800);
// const pizza3 = new Productos("img/comida/Rucula (1).png",3,"Rucula","Rucula con jamon crudo y muzzarella.",700);
// const sang1 = new Productos("img/comida/Sw-Bondio.png",1,"Bondiola","Bondiola braseada, queso brie y pan de papa.",700);
// const sang2 = new Productos("img/comida/Sw-Coleslow.png",2,"Coleslow","Vacio, muzzarella gratinada y ensalada coleslow.",750);
// const sang3 = new Productos("img/comida/Sw-Crudo.png",3,"Jamon Crudo","Jamon crudo, brie y rucula.",650);


//FUNCION PARA GENERAR HTML DE LOS PRODUCTOS
function createItems(ul,lista,productos){
   for (const elementos of lista){
      $(ul).append(`<li class='col-12 col-md-6 col-lg-4'> 
                              <div class='carta__products-info-div'>
                                 <div>
                                    <img class="rounded-lg"src='${elementos.img}'></img>
                                 </div>
                                 <div>
                                    <h4>${elementos.nombre}</h4>
                                    <span>$ ${elementos.precio}</span>
                                    <p> ${elementos.descripcion}</p>
                                    <button type="button" id="btn${elementos.id}" class="btn-edit btn btn-outline-success">Agregar a carrito</button>
                                 </div>
                              </div>
                           </li>`);
      $(`#btn${elementos.id}`).on('click', function() {
         //buscar producto por id
         let prodSeleccionado = listaCarrito.find(({id}) => id == elementos.id);
         (prodSeleccionado != undefined) ? prodSeleccionado.cant++ : agregarProd(productos[elementos.id - 1]);
         localStorage.setItem('Carrito', JSON.stringify(listaCarrito));
      });
   }
}

//Ordenar Productos
$("#ordenarPizzas").on('click', function(){
   ordenarTodo(pizzas,$("#pizzas"))
});
$("#ordenarSangs").on('click', function(){
   ordenarTodo(sangs,$("#sanguches"))
});
function ordenarTodo(lista,elemento){
   const listaOrdenada = lista.sort(function (a, b){
      return a.precio - b.precio;
   });
   resetItems($(elemento));
   createItems($(elemento),listaOrdenada);
};
function resetItems(reset){
   $(reset).empty();
};

//AGREGAR AL CARRITO
function agregarProd (producto){
   Object.defineProperty(producto, 'cant', { value: 1, writable: true });
   listaCarrito.push(producto);
}

//Modal carrito
$("#btn-carrito").on('click', function(){
   modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
});

function modalCarrito(modal,lista,reset){
   resetItems(reset)
   for(const prods of lista){
      $(modal).append(` <tr>
                           <td scope="row"> <img class="modal-img rounded-lg" src="${prods.img}"></img></td>
                           <td>
                              <h2>${prods.nombre}</h2>
                              <p>$${prods.precio}</p>
                           </td>
                           <td>
                              ${prods.cant}
                              <div>
                                 <button type="button" class="btn btn-outline-success">+</button>
                                 <button  type="button" class="btn btn-outline-danger ${prods.id}">-</button>
                              </div>
                           </td>
                           <td>@mdo</td>
                        </tr>`);
      $(`.${prods.id}`).on('click', function() {
         btnMenos(prods.cant)
      })
   }
}

function btnMenos(cant){
   (cant != 1) ? cant-- : eliminarItem(listaCarrito);
   modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
}
function eliminarItem(lista){
   let prodSeleccionado = lista.find(({id}) => id == elementos.id);
   lista = lista.filter((carritoId) => {
      return carritoId !== prodSeleccionado;
  });

}
// function borrarItemCarrito(evento) {
//    // Obtenemos el producto ID que hay en el boton pulsado
//    const id = evento.target.dataset.item;
//    // Borramos todos los productos
//    carrito = carrito.filter((carritoId) => {
//        return carritoId !== id;
//    });
//    // volvemos a renderizar
//    renderizarCarrito();
//    // Calculamos de nuevo el precio
//    calcularTotal();
//    // Actualizamos el LocalStorage
//    guardarCarritoEnLocalStorage();

// 