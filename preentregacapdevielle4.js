let carrito = [];
let toastComprar= Toastify({
    text: "Articulo añadido al carrito",
    className: "info",
    duration: "3000", 
    style: {
        fontSize: '24px',
        color: 'black',
        background: '#2a6dbf',
        opacity: '1'
    }
  });
  let toastQuitar =  Toastify({
    text: "Articulo retirado del carrito",
    className: "danger",
    duration: "3000",
    style: {
        fontSize: '24px',
        color: 'black',
        background: '#a83242',
        opacity: '0.9'
    }
  });

const carritoExistente = localStorage.getItem("carrito")
if (carritoExistente) {
    carrito = JSON.parse(carritoExistente);
    for (const producto of carrito) {
        mostrarCarrito(producto)
    }
    calcularTotal(carrito);

}

productosApi();

async function productosApi() {
    const res = await fetch("https://dummyjson.com/products/").then((response) => response.json())
    console.log(res.products);
    mostrarProductos(res.products);
}

function mostrarCarrito(producto) {
    let tabla = document.getElementById("tbody");
    let fila = document.createElement("tr");
    fila.id = `fila-${producto.id}`

    let td1 = document.createElement("td");
    let img = document.createElement("img");
    img.src = `${producto.images[0]}`
    td1.appendChild(img);

    let td2 = document.createElement("td");
    let p = document.createElement("p");
    p.innerHTML = producto.title
    td2.appendChild(p);

    let td3 = document.createElement("td");
    td3.innerHTML = producto.cantidad
    td3.id = `cantidad-${producto.id}`

    let td4 = document.createElement("td");
    td4.innerHTML = producto.price

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

function calcularTotal(carrito) {
    const total = document.getElementById("carritoTotal");
    const totalCarrito = carrito.reduce((previous, current) => previous + (current.cantidad * current.price), 0);
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
        toastQuitar.showToast();

    }


}
function mostrarProductos(productos) {

    let filaDeProductos = document.getElementById("filaDeProductos");

    for (const producto of productos) {
        let fila = document.createElement("div");
        fila.classList.add("col-4");

        let div1 = document.createElement("div");
        div1.classList.add("card", "item-box");

        let imgContainer = document.createElement("div");
        imgContainer.classList.add("img-container");

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = producto.images[0]
        imgContainer.appendChild(img);

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let title = document.createElement("h5");
        title.classList.add("card-title");
        title.innerHTML = producto.title

        let description = document.createElement("p");
        description.classList.add("card-text");
        description.innerHTML = producto.description

        let price = document.createElement("span");
        price.classList.add("precio");
        price.innerHTML = producto.price

        let button = document.createElement("button");
        button.classList.add("btn", "btn-primary", "botonCompra");
        button.innerHTML = "Comprar"

        cardBody.appendChild(title);
        // cardBody.appendChild(description);  //mejorar el CCS
        cardBody.appendChild(price);
        cardBody.appendChild(button);

        div1.appendChild(imgContainer);
        div1.appendChild(cardBody);
        fila.appendChild(div1);
        filaDeProductos.append(fila);

        button.addEventListener("click", () => {
            const productoExistente = carrito.find((p) => p.id === producto.id);

            if (productoExistente) {
                productoExistente.cantidad++
                let cantidad = document.getElementById(`cantidad-${productoExistente.id}`);
                    if (cantidad) {
                        cantidad.innerHTML = productoExistente.cantidad
                    }
            }else{
                producto.cantidad = 1
                carrito.push(producto);
                mostrarCarrito(producto);
            }
            localStorage.setItem("carrito", JSON.stringify(carrito));
            calcularTotal(carrito);
            toastComprar.showToast();
        })
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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



