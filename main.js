function visibilidadDeElemento(elemento,valor){
    document.getElementById(elemento).hidden=valor
}    

function bienvenida(nombre) {
    const bienvenido = document.getElementById("bienvenida")
    bienvenido.textContent = `Bienvenido ${nombre}, a nuestro simulador de préstamos.`
    visibilidadDeElemento("inicio",true)
    visibilidadDeElemento("simulaciones",false)
}

function eliminarDatos(modal) {
    const botonSi = document.getElementById("siBoton")
    botonSi.addEventListener("click",()=> {
        localStorage.clear()
        modal.hide()
        location.reload()
    })
}

function salir(){
    const salir = document.getElementById("salir")
    salir.addEventListener("click",()=>{
        const alertaSalida = new bootstrap.Modal(document.getElementById("cerrarSesion"))
        alertaSalida.show()
        eliminarDatos(alertaSalida)
    })
}

function verificarNombre(){
    const nombre = document.getElementById("nombre").value
    if(nombre === "") {
        const modal = document.createElement("div")
        modal.innerHTML = `<div id="alerta" class="modal fade" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-body">
                                        <p>Ingrese un nombre válido.</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>`
        document.body.appendChild(modal)
        const alerta = new bootstrap.Modal(document.getElementById("alerta"))
        alerta.show()
    }else {
        localStorage.setItem("usuario",nombre)
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
function cantidadPrestamos(prestamosGenerados){
    if(prestamosGenerados.length==3){
        const botonSimular = document.getElementById("simular")
        botonSimular.setAttribute("disabled","")
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
        crearTarjetas(prestamosSimulados)}
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
    const botonSimular = document.getElementById("simular")
    document.getElementById("simulacion").addEventListener("submit",function(event){
        event.preventDefault()
    })
    botonSimular.addEventListener("click", ()=>{
        calculoPrestamo(verificarPrestamosGuardados())
    })

}

function iniciar(){
    existeUsuario()
    verificarPrestamosGuardados()
    simular()
    }

iniciar()