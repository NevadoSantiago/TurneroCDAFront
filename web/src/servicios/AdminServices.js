import {URL_API} from '../constantes/urlApi'

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

export const eliminarEmpleado = async (idEmpleado)=>{
    const url = URL_API + "/api/usuario/eliminar/" + idEmpleado
    fetch(url,{
        method:"POST"
    }).then(response=>
        {
            if(response.status == 200){
                console.log(response.json())
            }
        })
}
export const getEmpleado = async (idEmpleado)=>{

}