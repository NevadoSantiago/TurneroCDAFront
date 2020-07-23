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