const productos = [
    {
        nombre: "Tarjeta de video",
        precio: 1750,
        stock: 5,
        id: 1,
        img: "tarjeta",
        descripcion: "Placa De Video Gigabyte Nvidia Geforce Rtx 4090 Gaming Oc 24g",
        cantidad: 0
    },
    {

        nombre: "Procesador",
        precio: 3000,
        stock: 3,
        id: 2,
        img: "procesador",
        descripcion: "Micro Procesador Amd Ryzen 9 7950x 64mb 5.7ghz Am5",
        cantidad: 0
    },
    {
        nombre: "Mouse",
        precio: 550,
        stock: 6,
        id: 3,
        img: "mouse",
        descripcion: "Mouse de juego recargable Corsair Harpoon Wireless negro",
        cantidad: 0
    },
    {
        nombre: "Audifonos",
        precio: 700,
        stock: 4,
        id: 4,
        img: "audifonos",
        descripcion: "Auriculares gamer inalámbricos Logitech G Series G733 blanco con luz rgb LED",
        cantidad: 0
    },
    {
        nombre: "Teclado",
        precio: 950,
        stock: 1,
        id: 5,
        img: "teclado",
        descripcion: "Teclado gamer HyperX Alloy Origins Core QWERTY HX Blue inglés US color negro con luz RGB",
        cantidad: 0
    }
]
let carrito = [];

const carritoExistente = localStorage.getItem("carrito")
if (carritoExistente) {
    carrito = JSON.parse(carritoExistente);
    for (const producto of carrito) {
        mostrarCarrito(producto)
    }
    calcularTotal(carrito);

}

function agregar_a_carrito(evento) {

    const id = evento.target.getAttribute("id");
    const productoSeleccionado = productos.find((producto) => producto.id === parseInt(id));
    const productoExistente = carrito.find((producto) => producto.id === productoSeleccionado.id);

    if (productoExistente) {
        productoExistente.cantidad++
    }

    if (!productoExistente) {
        productoSeleccionado.cantidad++
        mostrarCarrito(productoSeleccionado);
        carrito.push(productoSeleccionado);
    } else {
        let cantidad = document.getElementById(`cantidad-${productoSeleccionado.id}`);
        if (cantidad) {
            cantidad.innerHTML = productoExistente.cantidad
        }
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal(carrito);

}

function mostrarCarrito(producto) {
    let tabla = document.getElementById("tbody");
    let fila = document.createElement("tr");
    fila.id = `fila-${producto.id}`

    let td1 = document.createElement("td");
    let img = document.createElement("img");
    img.src = `${producto.img}.jpg`
    td1.appendChild(img);

    let td2 = document.createElement("td");
    let p = document.createElement("p");
    p.innerHTML = producto.nombre
    td2.appendChild(p);

    let td3 = document.createElement("td");
    td3.innerHTML = producto.cantidad
    td3.id = `cantidad-${producto.id}`

    let td4 = document.createElement("td");
    td4.innerHTML = producto.precio

    let td5 = document.createElement("td");
    let button = document.createElement("button");
    button.id = `borrar-${producto.id}`
    button.innerHTML = "Borrar"
    button.addEventListener("click", borrar_producto);
    button.classList.add("btn", "btn-danger");
    td5.appendChild(button);


    fila.appendChild(td1);
    fila.appendChild(td2);
    fila.appendChild(td3);
    fila.appendChild(td4);
    fila.appendChild(td5);


    tabla.append(fila);
}
// CALCULAR EL TOTAL DEL CARRITO ---> REDUCE

function calcularTotal(carrito) {
    const total = document.getElementById("carritoTotal");
    const totalCarrito = carrito.reduce((previous, current) => previous + (current.cantidad * current.precio), 0);
    total.innerHTML = `Total: ${totalCarrito}`
}


function borrar_producto(evento) {

    const id = evento.target.getAttribute("id").replace("borrar-", "");

    const fila = document.getElementById(`fila-${id}`);


    if (fila) {
        carrito = carrito.filter((producto) => producto.id !== parseInt(id));
        fila.remove();
        localStorage.setItem("carrito", JSON.stringify(carrito));
        calcularTotal(carrito);
        const productoSeleccionado = productos.find((producto) => producto.id === parseInt(id));
        if (productoSeleccionado) {
            productoSeleccionado.cantidad = 0

        }
    }


}
let filaDeProductos = document.getElementById("filaDeProductos");

for (const producto of productos) {
    let fila = document.createElement("div");
    fila.classList.add("col-4");
    fila.innerHTML = `<div class="card item-box"> 
    <div class="img-container">
        <img src="${producto.img}.jpg" class="card-img-top" alt="...">
    </div>
    <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <span class="precio">${producto.precio}</span>
        <a href="#" id="${producto.id}" class="btn btn-primary botonCompra">Comprar</a>
    </div>
</div>`
    filaDeProductos.append(fila);
}


let btn_compra = document.querySelectorAll(".botonCompra");


for (let boton of btn_compra) {

    boton.addEventListener("click", agregar_a_carrito);

}

let btn_carrito = document.getElementById("mostrar_carrito");

btn_carrito.addEventListener("click", function () {


    let carrito = document.getElementById("carrito");

    if (carrito.style.display != "none") {

        carrito.style.display = "none";
    }
    else {
        carrito.style.display = "block";
    }

})
