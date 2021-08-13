
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
