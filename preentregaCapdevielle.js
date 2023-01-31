const nombre_producto_uno = "tarjeta de video"
const precio_producto_uno = 1750
const nombre_producto_dos = "procesador"
const precio_producto_dos = 3000
const nombre_producto_tres = "mouse"
const precio_producto_tres = 550
const nombre_producto_cuatro = "audifonos"
const precio_producto_cuatro = 700


let producto_seleccionado = ""
let carrito = ""
let total = 0
let productos_totales = 0

let datos = "seleccione el producto que desee comprar: " + "\n" +
    "1- " + nombre_producto_uno + " " + precio_producto_uno + "\n" +
    "2- " + nombre_producto_dos + " " + precio_producto_dos + "\n" +
    "3- " + nombre_producto_tres + " " + precio_producto_tres + "\n" +
    "4- " + nombre_producto_cuatro + " " + precio_producto_cuatro + "\n" +
    "Escribir COMPRAR una vez seleccionados los productos" + "\n" +
    "Escribir SALIR en caso no desee comprar" + "\n" 



while (
    producto_seleccionado.toUpperCase() != "COMPRAR" && producto_seleccionado.toUpperCase() != "SALIR")
{
    producto_seleccionado = prompt(datos);

    if (producto_seleccionado > 0 && producto_seleccionado <= 4) {
        sumar_carrito(producto_seleccionado);
         productos_totales ++
    }
    else if(producto_seleccionado.toUpperCase() == "COMPRAR"){
        procesar_compra();
    }else if(producto_seleccionado.toUpperCase() == "SALIR"){
        alert("Usted ha cancelado la compra.")
    }
}

function procesar_compra(){
    const recibo = "Este es su recibo de compra, gracias por su compra" + "\n" + carrito + "Este es su total: " + total + "\n" + "total de productos: " + productos_totales 
    alert(recibo);
}

function sumar_carrito(producto) {

    console.log("el usuario selecciono el producto: ", producto);
    if (producto == 1) {
        carrito = carrito + nombre_producto_uno + " " + precio_producto_uno + "\n";
        total = total + precio_producto_uno;

    } else if (producto == 2) {
        carrito = carrito + nombre_producto_dos+ " " + precio_producto_dos + "\n";
        total = total + precio_producto_dos;

    } else if (producto == 3) {
        carrito = carrito + nombre_producto_tres+ " " + precio_producto_tres + "\n";
        total = total + precio_producto_tres;

    } else{
        carrito = carrito + nombre_producto_cuatro +" " + precio_producto_cuatro + "\n";
        total = total + precio_producto_cuatro;
    }
}













