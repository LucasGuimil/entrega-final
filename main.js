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
        modal.innerHTML = `<div id="alerta" class="modal fade" tabindex="-1" aria-hidden="true">
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

function iniciar(){
    existeUsuario()
    }

iniciar()