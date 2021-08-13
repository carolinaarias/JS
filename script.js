//AJAX
const prods=[];
const pizzas=[];
const sanguches=[];
const hamburguesas=[];
$(document).ready(function() {
   $.get('productos.json', function(datos){
      //Crear listas 
      datos.forEach(e=>prods.push(e));
      datos.slice(0,6).forEach(e=>pizzas.push(e));
      datos.slice(6,9).forEach(e=>sanguches.push(e));
      datos.slice(9,16).forEach(e=>hamburguesas.push(e));
      //Renderizar productos
      createItems($(`#pizzas`),pizzas,prods);
      createItems($(`#sanguches`),sanguches,prods);
      createItems($(`#hamburguesas`),hamburguesas,prods);
  });
});

//LISTA CARRITO DESDE EL LS
let listaCarrito = JSON.parse(localStorage.getItem('Carrito')) || [];

//ANIMACIONES MENU
$("#btn-pizzas").click(function() {
   scrollTop($("#pizzas"),$("#h3-pizzas"),$("#ordenarPizzasMenor"),$("#ordenarPizzasMayor"));
 });
 $("#btn-sangs").click(function() {
   scrollTop($("#sanguches"),$("#h3-sangs"),$("#ordenarSangsMenor"),$("#ordenarSangsMayor"));
 });
 $("#btn-hamb").click(function() {
   scrollTop($("#hamburguesas"),$("#h3-hamb"),$("#ordenarHambMenor"),$("#ordenarHambMayor"));
 });
function scrollTop (ul,h3,btn,btn2){
   displayNone(h3,btn,btn2)
   $('html').animate({
      scrollTop: $(ul).offset().top - 250
   },1000)
   $(h3).delay(1000);
   $(btn).delay(1000);
   $(btn2).delay(1000);
   titleSlide (h3,btn,btn2);
};
function titleSlide (h3,btn,btn2){
   $(btn).slideDown(800);
   $(btn2).slideDown(800);
   $(h3).slideDown(800);
};
function displayNone(h3,btn,btn2){
   $(h3).css("display","none");
   $(btn).css("display","none");
   $(btn2).css("display","none");
}

//RENDERIZAR PRODUCTOS
function createItems(ul,lista,productos){
   for (const elementos of lista){
      $(ul).append(`<li class='col-12 col-md-6 col-lg-4'> 
                              <div class='carta__products-info-div'>
                                 <div>
                                    <img class="rounded-lg"src='${elementos.img}'></img>
                                 </div>
                                 <div>
                                    <div class="flex-row products-titles">
                                       <h4>${elementos.nombre}</h4>
                                       <span>$ ${elementos.precio}</span>
                                    </div>
                                    <p> ${elementos.descripcion}</p>
                                    <button type="button" id="btn${elementos.id}" class="btn-edit btn btn-outline-success">Agregar a carrito</button>
                                 </div>
                              </div>
                           </li>`);
      $(`#btn${elementos.id}`).on('click', function() {
         //buscar producto por id
         let prodSeleccionado = listaCarrito.find(({id}) => id == elementos.id);
         (prodSeleccionado != undefined) ? prodSeleccionado.cant++ : agregarProd(productos[elementos.id - 1]);
         guardarLS();
         mostrarAlert($("#alert-carrito"));
      });

   }
}

//GUARDAR EN LS
function guardarLS(){
   localStorage.setItem('Carrito', JSON.stringify(listaCarrito));
};

//ORDENAR PRODUCTOS
$("#ordenarPizzasMenor").on('click', function(){
   ordenarMenor(pizzas,$("#pizzas"))
});
$("#ordenarPizzasMayor").on('click', function(){
   ordenarMayor(pizzas,$("#pizzas"))
});
$("#ordenarSangsMenor").on('click', function(){
   ordenarMenor(sanguches,$("#sanguches"))
});
$("#ordenarSangsMayor").on('click', function(){
   ordenarMayor(sanguches,$("#sanguches"))
});
$("#ordenarHambMenor").on('click', function(){
   ordenarMenor(hamburguesas,$("#hamburguesas"))
});
$("#ordenarHambMayor").on('click', function(){
   ordenarMayor(hamburguesas,$("#hamburguesas"))
});
function ordenarMenor(lista,elemento){
   const listaOrdenada = lista.sort(function (a, b){
      return a.precio - b.precio;
   });
   resetItems($(elemento));
   createItems($(elemento),listaOrdenada,prods);
};
function ordenarMayor(lista,elemento){
   const listaOrdenada = lista.sort(function (a, b){
      return b.precio - a.precio;
   });
   resetItems($(elemento));
   createItems($(elemento),listaOrdenada,prods);
};

//VACIAR LISTA
function resetItems(reset){
   $(reset).empty();
};

//AGREGAR AL CARRITO
function agregarProd (producto){
   listaCarrito.push(producto);
}

//MODAL CARRITO
let totalCompra = $('#total-compra');
let totalPromo = $('#total-compra2');
if(listaCarrito.length === 0){
   var total = 0;
   totalCompra.text("$ "+ total);   
}
$("#btn-carrito").on('click', function(){
   modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
   if(listaCarrito.length === 0){
      var total = 0;
      totalCompra.text("$ "+ total);   
   }
   if(total == 0){
      $("#btn-siguiente").css("display","none");
   }else{
      $("#btn-siguiente").css("display","inline-block");
   }
});
$("#btn-vaciar").on('click', function(){
   listaCarrito.forEach(e=> e.cant = 0)
   for (let i = listaCarrito.length; i > 0; i--) {
      listaCarrito.pop();
   }
   if(listaCarrito.length === 0){
      var total = 0;
      totalCompra.text("$ "+ total);   
   }
   if(total == 0){
      $("#btn-siguiente").css("display","none");
   }else{
      $("#btn-siguiente").css("display","inline-block");
   }
   modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
   guardarLS();
});
function modalCarrito(modal,lista,reset){
   resetItems(reset)
   for(const prods of lista){
      $(modal).append(` <tr id="tr-${prods.id}">
                           <td scope="row"> 
                              <img class="modal-img rounded-lg" src="${prods.img}"></img>
                           </td>
                           <td>
                              <h2 class="tit-prods">${prods.nombre}</h2>
                              <p class="precio-prods">$ ${prods.precio}</p>
                           </td>
                           <td class="cant">
                              <p >${prods.cant}</p>
                              <div>
                                 <button id="mas-${prods.id}" type="button" class="btn btn-outline-success"><strong>+</strong></button>
                                 <button  id="menos-${prods.id}" type="button" class="btn btn-outline-danger"><strong>-</strong></button>
                              </div>
                           </td>
                           <td>
                              <p class="total-prods"> $ ${prods.precio * prods.cant}</p>
                           </td>
                        </tr>`);
      $(`#menos-${prods.id}`).on('click', function() {
         let idBoton = parseInt($(this)[0].id.slice(6));
         let productoSeleccionado = listaCarrito.find(prods => prods.id === idBoton);
         (productoSeleccionado.cant != 1) ? productoSeleccionado.cant-- : eliminarItem(idBoton);
         modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
         guardarLS();
         if(listaCarrito.length === 0){
            var total = 0;
            totalCompra.text("$ "+ total);   
         }
         if(total == 0){
            $("#btn-siguiente").css("display","none");
         }else{
            $("#btn-siguiente").css("display","inline-block");
         }
      });
      $(`#mas-${prods.id}`).on('click', function() {
         let idBoton = parseInt($(this)[0].id.slice(4));
         let productoSeleccionado = listaCarrito.find(prods => prods.id === idBoton);
         (productoSeleccionado.cant != 5) ? productoSeleccionado.cant++ : mostrarAlert($("#alert-prod"));
         modalCarrito($("#carrito"),listaCarrito,$("#carrito"));
         guardarLS();
      });
      total = listaCarrito.reduce((acc,{precio,cant}) => acc + precio * cant, 0 )
      totalCompra.text("$ "+ total);   

   }
}
function eliminarItem(boton) {
   listaCarrito = listaCarrito.filter(item => item.id !== boton);
};

//PROMOCIONES
var total2;
$('#btn-siguiente').on('click', function(){
   modalCarrito2($("#modalBody"),$("#modalBody"))
})
function modalCarrito2 (modalBody,reset) {
   resetItems(reset)
   $(modalBody).append(`
                     <div class="input-group  flex-column container">
                        <div  class="flex-row input-container">
                           <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon1">Nombre</span>
                           </div>
                           <input type="text" id="usuario" class="form-control validar" placeholder="Juan Perez" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                        <div  class="flex-row input-container">
                           <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon2">Celular</span>
                           </div>
                           <input type="tel" class="form-control validar" placeholder="+54..." aria-label="celular" aria-describedby="basic-addon2">
                        </div>
                        <div  class="flex-row input-container">
                           <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon3">Email</span>
                           </div>
                           <input type="email" class="form-control validar" placeholder="juanperez@gmail.com" aria-label="celular" aria-describedby="basic-addon3">
                        </div>
                        <div  class="flex-row input-container">
                           <div class="input-group-prepend">
                              <span class="input-group-text" id="basic-addon3">Direccion</span>
                           </div>
                           <input type="text" id="direccion" class="form-control validar" placeholder="Calle 1234" aria-label="direccion" aria-describedby="basic-addon3">
                        </div>
                     </div>
                        `)
   totalPromo.text("$ "+total);
}
$("#efectivo").on('click', function(event){
   let id = event.target.id;
   if(total !== 0){
      promos(id);
   }
   
})
$("#santander").on('click', function(event){
   let id = event.target.id;
   if(total !== 0){
      promos(id);
   }
})
$("#itau").on('click', function(event){
   let id = event.target.id;
   if(total !== 0){
      promos(id);
   }
})
$("#otro").on('click', function(){
   totalPromo.text("$ "+total);
})
function promos(id){
   let descuento; 
   switch(id){
      case id ="itau":
         descuento = 10;
         break;
      case id = "santander":
         descuento = 5;
         break;
      case id = "efectivo":
         descuento = 15;
         break;
      default :
         descuento = 0;
   }
   total2 = calcularPromo(descuento);
   totalPromo.text("$ "+ total2);   
}
function calcularPromo (descuento){
    let porcentaje = ((total * descuento)/100);
    let precioFinal = total - porcentaje;
    return precioFinal;
}

//FORMULARIO
$("#btn-fc").on('click',function(){
   i = validar();
   if (i == false){
      $('.validar').css("border-color","red");
   }else{
      $("#btn-fc").attr("data-dismiss","modal");
      $("#btn-fc").attr("data-toggle","modal");
      $("#btn-fc").attr("data-target","#carritoModal3");
   }
   if(total2 == null){
      totalFc=total;
   }else{
      totalFc=total2;
   }
   modalCarrito3($('#compra-fc'))
})
function validar() {
   let input = $('.validar').val();
   if (input.length == 0) {
     return false;
   }else{
      return true;
   }
 }
 function datos(id){
   var i = $(id).val();
   return i;
 }

 //COMPROBANTE DE FC
 var totalFc;
function modalCarrito3 (modal){
   resetItems(modal)
   var usuario = datos($('#usuario'));
   var direc = datos($('#direccion'));
   $(modal).append(`
                     <h4 class="titulo-usuario" >El Puerto esta preparando tu pedido ${usuario} !</h4>
                     <p>Desembarcamos en:  ${direc}</p>
                     <span>Tu total: $${totalFc} </span>  
                  `)
}
$('#btn-gracias').on('click',function(){
   listaCarrito.forEach(e=> e.cant = 0)
   for (let i = listaCarrito.length; i > 0; i--) {
      listaCarrito.pop();
   }
   guardarLS()
})

//ALERTS
$("#close-carrito").on('click',function(){
   cerrarAlert($("#alert-carrito"));
});
$("#close-prod").on('click',function(){
   cerrarAlert($("#alert-prod"));
});
function mostrarAlert (id){6
   $(id).css("display","block");
}
function cerrarAlert(id){
   $(id).css("display","none");
}


