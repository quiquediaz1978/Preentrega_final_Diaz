
class ProductoController {
    constructor() {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")

    }



    mostrarEnDOM() {
        //muestro la lista
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
    <div class="card" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">
                ${producto.descripcion}
            </p>
            <p class="card-text">
                $${producto.precio}
            </p>
            <a href="#" class="btn btn-primary" id="escritura${producto.id}">Añadir al carrito</a>
        </div>
    </div>
    `

        })
    }

   
    async levantarJSON (controladorCarrito) {
        let res = await fetch("./js/api_case.json")
        this.listaProductos = await res.json()
        this.mostrarEnDOM()
        this.darEventoAnadirCarrito(controladorCarrito)
    }


    darEventoAnadirCarrito(controladorCarrito) {
        controladorProductos.listaProductos.forEach(producto => {
            const productoAnadido = document.getElementById(`escritura${producto.id}`)

            productoAnadido.addEventListener("click", () => {

                controladorCarrito.anadirProducto(producto)
                //borramos todo
                controladorCarrito.levantarCarrito()
                //mostramos todo
                controladorCarrito.mostrarEnDOM()
                controladorCarrito.mostrarPreciosEnDOM()

                Toastify({
                    text: "Producto añadido al carrito!!!",
                    duration: 3000,
                    gravity: "top",
                    position: "center",
                    style: {
                        background: "linear-gradient(to right, red, blue)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();


            })
        })
    }
}

class CarritoController {
    constructor() {
        //this.CarritoController = new CarritoDOMControler()
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
        this.precio = document.getElementById("precio")
        this.precio_con_iva = document.getElementById("precio_con_iva")
        this.finalizar_compra = document.getElementById("finalizar_compra")
    }

    borrar(producto) {
        let indice = this.listaCarrito.indexOf(producto)
        this.listaCarrito.splice(indice, 1)
    }

    levantarCarrito() {
        let obtenerListaJSON = localStorage.getItem("listaCarrito")

        if (obtenerListaJSON) {
            this.listaCarrito = JSON.parse(obtenerListaJSON)
            return true
        }
        return false

    }

    anadirProducto(producto) {
        let existeProducto = this.listaCarrito.some(elemento => elemento.id == producto.id)

        if (existeProducto) {
            const productoEncontrado = this.buscar(producto.id)
            productoEncontrado.cantidad += 1


        } else {
            this.listaCarrito.push(producto)

        }

        let arrFormatoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrFormatoJSON)
    }

    contenedorHTML(producto) {
        return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button id="borrar${producto.id}"> <i class="fa-regular fa-trash-can position-right"></i> </button>
                        <p class="card-text">cantidad: ${producto.cantidad}</p>
                        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    clearDOM() {
        this.contenedor_carrito.innerHTML = ""

    }

    mostrarEnDOM() {
        //Limpio el contenedor
        this.clearDOM()
        //muestro todo
        this.listaCarrito.forEach(producto => {
            this.contenedor_carrito.innerHTML += this.contenedorHTML(producto)

        })

        this.darOrdenBorrar()

    }

    darOrdenBorrar() {
        this.listaCarrito.forEach(producto => {
            document.getElementById(`borrar${producto.id}`).addEventListener("click", () => {
                //borramos el producto de this.listaProductos
                this.borrar(producto)
                //Actualizamos el storage
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                //Actualizar el DOM
                this.mostrarEnDOM()
                this.mostrarPreciosEnDOM()
            })
        })
    }

    mostrarPreciosEnDOM() {
        this.precio.innerHTML = "$" + this.calcularTotal()
        this.precio_con_iva.innerHTML = "$" + this.calcularPrecioConIVA()

    }

    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0)
    }

    calcularPrecioConIVA() {
        return this.calcularTotal() * 1.21
    }

    limpiar() {
        this.listaCarrito = []
        localStorage.removeItem("listaCarrito")
    }

    buscar(id) {
        return this.listaCarrito.find(producto => producto.id == id)
    }

    finalizarCompra() {
        finalizar_compra.addEventListener("click", () => {

            if (controladorCarrito.listaCarrito.length > 0) {

                this.limpiar()
                this.mostrarEnDOM()
                this.mostrarPreciosEnDOM()

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Compra exitosa!',
                    showConfirmButton: false,
                    timer: 1700
                })

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: 'Debe añadir productos al carrito',
                    showConfirmButton: false,
                    timer: 2000
                })

            }

        })
    }
}

//objetos controladores
const controladorProductos = new ProductoController()
const controladorCarrito = new CarritoController()

//Verificar Storage
//controladorProductos.levantarProductos()-------------ver y borrar si funciona
const levantarDato = controladorCarrito.levantarCarrito()

//DOM (esto se mueven al class productoController y carritoController)
//const contenedor_productos = document.getElementById("contenedor_productos")
//const contenedor_carrito = document.getElementById("contenedor_carrito")
//const finalizar_compra = document.getElementById("finalizar_compra")
//const precio = document.getElementById("precio")
//const precio_con_iva = document.getElementById("precio_con_iva")

//levantar json

controladorProductos.levantarJSON(controladorCarrito)
/*
if (levantarDato) {
    controladorCarrito.mostrarPreciosEnDOM()-------------ver
}
*/
//App JS

//Añadimos eventos a los botones de la CARD
controladorCarrito.mostrarEnDOM()
controladorCarrito.mostrarPreciosEnDOM()
controladorCarrito.finalizarCompra()


