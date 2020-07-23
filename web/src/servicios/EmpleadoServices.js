import {URL_API} from '../constantes/urlApi'

export const getEspecialidadesPorSucursal = async (idSucursal) =>{

    var especialidades
    const url = URL_API + "/api/especialidad/get/" + idSucursal;
    await fetch(url)
    .then(response=>{return response.json()})
    .then(response=>{
        especialidades = response
    }
    )
    return especialidades;

}
export const getCantGenteEnSucursal = async (idSucursal) =>{

    var cantidad
    const url = URL_API + "/api/sucursal/get/espera/" + idSucursal;
    await fetch(url)
    .then(response=>{return response.json()})
    .then(response=>{
        cantidad = response
    }
    )
    return cantidad;

}
export const getRolesDeUsuario = async () =>{
    var roles
    const url = URL_API + "/api/usuario/get/roles";
    await fetch(url)
    .then(response=>{return response.json()})
    .then(response=>{
        roles = response
    }
    )
    return roles;
}