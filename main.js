function visibilidadDeElemento(elemento,valor){
    document.getElementById(elemento).hidden=valor
}    

function bienvenida(nombre) {
    const bienvenido = document.getElementById("bienvenida")
    bienvenido.innerHTML = `Bienvenido <b>${nombre}</b>, a nuestro simulador de préstamos.`
    visibilidadDeElemento("inicio",true)
    visibilidadDeElemento("simulaciones",false)
}

function eliminarDatos() {
        localStorage.clear()
        setTimeout(()=>{
            location.reload()}
            ,2000)
    }

function salir(){
    const salir = document.getElementById("salir")
    salir.addEventListener("click",()=>{
        Swal.fire({
            title: "Cerrar sesión",
            text: "¿Está seguro que desea salir?\nSe borrará su nombre y todas las simulaciones que haya realizado.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "No"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Datos eliminados",
                        text: "Su sesión fue finalizada",
                        icon: "success",
                        showConfirmButton: false,
                        })
                    eliminarDatos()
                }
            });
    })
}

function verificarNombre(){
    const nombre = document.getElementById("nombre").value
    if(nombre === "") {
        Swal.fire("Ingrese un nombre válido","","error")
    }else {
        localStorage.setItem("usuario",nombre)
        Swal.fire({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            icon: "success",
            text: "Ingreso correcto"
        })
        bienvenida(nombre)
    }}

function existeUsuario(){
    if(localStorage.getItem("usuario")!=null) {
        const usuario = localStorage.getItem("usuario")
        bienvenida(usuario)
        salir()
    }else{
        const ingreso = document.getElementById("ingresoNombre")
        ingreso.addEventListener("click",()=>{
            verificarNombre()
            salir()
        })
    }
}

function calculoCuotas(montoTotal,cantidadCuotas) {
        return ((montoTotal+(montoTotal*40/100))/cantidadCuotas)
    }

function Prestamo(monto,cantidadCuotas){
    this.monto = monto;
    this.cantidadCuotas = cantidadCuotas;
    this.valorCuotas = parseInt(calculoCuotas(monto,cantidadCuotas))
    
}
function deshabilitar(id){
    const elementoDeshabilitado = document.getElementById(id)
    elementoDeshabilitado.setAttribute("disabled","")
}
function cantidadPrestamos(prestamosGenerados){
    if(prestamosGenerados.length==3){
        deshabilitar("botonSimular")
        deshabilitar("monto")
        deshabilitar("cuotas")
        const aviso = document.createElement("div")
        aviso.innerHTML=`<h4 class="text-center">Usted ha llegado al límite de simulaciones. Gracias por usar nuestros servicios.</h4>`
        document.body.appendChild(aviso)
    }else{
    }
}
function calculoPrestamo(prestamosSimulados) {
        const montoSolicitado = parseFloat(document.getElementById("monto").value)
        const cuotas = parseInt(document.getElementById("cuotas").value)
        if(isNaN(cuotas) || isNaN(montoSolicitado)|| montoSolicitado<=1000 || montoSolicitado>15000000 ||cuotas<1||cuotas>72){
        }else{
        const nuevoPrestamo = new Prestamo(montoSolicitado,cuotas)
        prestamosSimulados.push(nuevoPrestamo)
        localStorage.setItem("prestamosSimulados",JSON.stringify(prestamosSimulados))
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Simulación creada con éxito!",
            showConfirmButton: false,
            timer: 1200
            })
        crearTarjetas(prestamosSimulados)
        document.getElementById("monto").value = ""
        document.getElementById("cuotas").value = ""}
        cantidadPrestamos(prestamosSimulados)
        }

function verificarPrestamosGuardados(){
        if(localStorage.getItem("prestamosSimulados")!=null){
            const prestamosGuardados = JSON.parse(localStorage.getItem("prestamosSimulados"))
            crearTarjetas(prestamosGuardados)
            cantidadPrestamos(prestamosGuardados)
            return prestamosGuardados
        }else{
            const prestamosNuevos = []
            return prestamosNuevos
        }
    }


function crearTarjetas(prestamosGuardados){
    const presentacion = document.getElementById("presentacion")
    while(presentacion.firstChild){
        presentacion.removeChild(presentacion.firstChild)
    }
    prestamosGuardados.forEach(function(prestamo){
        const tarjeta = document.createElement("div")
        presentacion.className="row row-cols-4 g-4 mt-3 justify-content-center"
        tarjeta.innerHTML = `
                            <div class="col">
                                <div class="card text-dark bg-light mb-3">
                                    <div class="card-body">
                                    <h5 class="card-title">Monto solicitado: ARS$${prestamo.monto}</h5>
                                    <h6 class="card-text">Cantidad de cuotas: ${prestamo.cantidadCuotas}</h6>
                                    <h6 class="card-text">Valor de cuota: ARS$${prestamo.valorCuotas}</h6>
                                    </div>
                                </div>
                            </div>`
        presentacion.appendChild(tarjeta)
    })
}


function simular(){
    const botonSimular = document.getElementById("botonSimular")
    document.getElementById("simulacion").addEventListener("submit",function(event){
        event.preventDefault()
    })
    botonSimular.addEventListener("click", ()=>{
        calculoPrestamo(verificarPrestamosGuardados())
    })

}
function llamadoApi(){
    fetch('https://dolarapi.com/v1/dolares/oficial')
        .then(response => response.json())
        .then(data => {console.log(data)
        })
        .catch(error => {console.error, error
        })

    }

function iniciar(){
    existeUsuario()
    verificarPrestamosGuardados()
    simular()
    llamadoApi()
    }

iniciar()