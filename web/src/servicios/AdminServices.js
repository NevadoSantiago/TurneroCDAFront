import {URL_API,URL_API_RESERVA} from '../constantes/urlApi'

export const getEmpleadoBySucursalYRol = async (idSucursal, rol) =>{
    var empleados
    const url = URL_API + "/api/sucursal/get/empleado/" + rol +"/" + idSucursal;
    await fetch(url)
    .then(response=>{return response.json()})
    .then(response=>{
        empleados = response
    }
    )
    return empleados;
}

export const eliminarEmpleadoServ = async (idEmpleado)=>{
    const url = URL_API + "/api/usuario/eliminar/" + idEmpleado
    await fetch(url,{
        method:"POST"
    }).then(response=>
        {
            if(response.status == 200){
                return true
            }else return false
        })
}
export const getAllSucursales = async ()=>{
    var empleados
    const url = URL_API + "/api/sucursal";
    debugger
    await fetch(url) 
    .then(response=>{return response.json()})
    .then(response=>{
        empleados = response
    }
    )
    return empleados;

}
const validateData = (datoNuevo,datoAnterior) => {
if(datoNuevo == ""){
    return datoAnterior
}else{
    return datoNuevo;
}
}

export const editarDatos = async (e, location) => {
    const {elements} = e.target
    const {user}=location;
    e.preventDefault();
    const nombre = validateData(elements.nombre.value, user.nombre)
    const apellido = validateData(elements.apellido.value, user.apellido)
    const mail = validateData(elements.mail.value, user.mail)
    const rol = validateData(elements.rol.value, user.rol)
    var respuesta
        var url = URL_API_RESERVA + '/api/usuario/editar'
        await fetch(
            url, {
            method: 'PATCH',
            body: JSON.stringify({
                idEmpleado: user.idEmpleado,
                nombre: nombre,
                apellido: apellido,
                mail: mail,
                rol: parseInt(rol)
            })
        }
        ).then(response => {
           if(response.status == 200){
               respuesta = true
           }else{
             respuesta= false
           }
        })
        return respuesta
    };
