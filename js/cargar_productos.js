let listaProductos = [
    { id: 1, nombre: "lapiz", precio: 90, descripcion: "Lapiz de grafito", cantidad: 1, img: "https://tiotomar.vtexassets.com/arquivos/ids/212028-1600-1600?v=638143077720900000&width=1600&height=1600&aspect=true", alt: "Lapiz" },
    { id: 2, nombre: "lapicera", precio: 100, descripcion: "Boligrafo punta Fina", cantidad: 1, img: "https://tiotomar.vtexassets.com/arquivos/ids/194391-800-800?v=638067461920300000&width=800&height=800&aspect=true", alt: "Boligrafos" },
    { id: 3, nombre: "Marcador", precio: 140, descripcion: "Marcadores de color negro al agua", cantidad: 1, img: "https://tiotomar.vtexassets.com/arquivos/ids/214234-800-800?v=638148192924230000&width=800&height=800&aspect=true", alt: "Maracadores" },
    { id: 4, nombre: "Fibras", precio: 250, descripcion: "Punta fina X 12", cantidad: 1, img: "https://http2.mlstatic.com/D_NQ_NP_2X_868044-MLA50108560188_052022-F.webp", alt: "Marcadores" },
    { id: 5, nombre: "Lapices de colores", precio: 400, descripcion: "Caja x 12 unid.", cantidad: 1, img: "https://http2.mlstatic.com/D_NQ_NP_2X_824349-MLA48873576254_012022-F.webp", alt: "Lapiz ce color" },
    { id: 6, nombre: "Ceritas", precio: 200, descripcion: "Caja x 12", cantidad: 1, img: "https://carrefourar.vtexassets.com/arquivos/ids/235530-800-auto?v=637801983966900000&width=800&height=auto&aspect=true", alt: "Ceritas" },
    { id: 7, nombre: "Marcadores indelebles", precio: 200, descripcion: "Color negro punta gruesa", cantidad: 1, img: "https://http2.mlstatic.com/D_NQ_NP_2X_736405-MLA45518918899_042021-F.webp", alt:"Marcador" },
    { id: 8, nombre: "Lapiz mecanico", precio: 500, descripcion: "Porta mina", cantidad: 1, img: "https://http2.mlstatic.com/D_NQ_NP_2X_693384-MLA45669215488_042021-F.webp", alt: "Lapiz" }
]

const arrEnFormatoJSON = JSON.stringify(listaProductos)

localStorage.setItem("listaProductos", arrEnFormatoJSON)

/*
let listaProductos;
let obtenerListaJSON = localStorage.getItem("listaProductos")

if (obtenerListaJSON) {
    listaProductos = JSON.parse(obtenerListaJSON)
} else {
    listaProductos = []
}

console.log(listaProductos)

const form = document.getElementById("formulario")

form.addEventListener("submit", (e) => {

    e.preventDefault()

    const id = document.getElementById("id").value
    const nombre = document.getElementById("nombre").value
    const precio = document.getElementById("producto").value
    const descripcion = document.getElementById("descripcion").value
    const marca = document.getElementById("marca").value

    listaProductos.push({ id: id, nombre: nombre, precio: precio, descripcion: descripcion, marca: marca })

    const listaProductosJSON = JSON.stringify(listaProductos)

    localStorage.setItem("listaProductos", listaProductosJSON)

    form.reset()

    console.log(listaProductos)

})
*/
