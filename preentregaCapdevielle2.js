const listaDeProductos = [
    { nombre: "Tarjeta de video", precio: 1750, stock: 5 },
    { nombre: "Procesador", precio: 3000, stock: 3 },
    { nombre: "Mouse", precio: 550, stock: 6 },
    { nombre: "Audifonos", precio: 700, stock: 4 },
    { nombre: "Teclado", precio: 950, stock: 1 }
]

let productoSeleccionado = ""
const carrito = []

let listaDeProductosAMostrar = ''

//creamos lista de productos a mostrar
listaDeProductos.forEach((producto, indice) => {
    listaDeProductosAMostrar = listaDeProductosAMostrar + `${indice + 1} Nombre: ${producto.nombre} - Precio: ${producto.precio} - Stock: ${producto.stock}\n`
})

let mensajeDeCompra =
    `
Seleccione el producto que desee comprar:
${listaDeProductosAMostrar}
Escribir COMPRAR una vez seleccionados los productos
Escribir SALIR en caso no desee comprar
`

while (productoSeleccionado.toUpperCase() != "COMPRAR" && productoSeleccionado.toUpperCase() != "SALIR") {
    productoSeleccionado = prompt(mensajeDeCompra);

    // si encontramos el producto lo añadimos al carrito
    if (listaDeProductos[productoSeleccionado - 1]) {
        carrito.push(listaDeProductos[productoSeleccionado - 1]);
    } else if (productoSeleccionado.toUpperCase() == "COMPRAR") {
        //si tengo un articulo en el carrito, procesa la compra
        if (carrito.length > 0) {
            const recibo = procesarCompra(carrito);
            alert(recibo);
        } else {
            alert("No hay productos seleccionados");
            productoSeleccionado = ""
        }
    }
    else if (productoSeleccionado.toUpperCase() == "SALIR") {
        alert("Usted ha cancelado la compra.")
    }
}

function procesarCompra(productos) {
    let recibo = "Este es su recibo de compra, gracias por su compra" + "\n";
    
    let total = 0;
    let productosComprados = 'Productos Comprados: ' + '\n'

    // Iteramos los productos / la lista de productos
    productos.forEach(function(producto){
        // Sumamos los productos al total
        total += producto.precio 

        // Añadimos Nombre y Precio de Producto
        productosComprados += producto.nombre + " " + producto.precio + "\n" 
    })

    // Añadimos Total y Productos comprados al recibo
    recibo += productosComprados + "Total: "+ total
    
    return recibo;
}



// //se puede agregar ver carrito