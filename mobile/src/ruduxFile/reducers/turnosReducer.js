import { addons } from "react-native";
import { OBTENER_ESPECIALIDADES, SET_ESPECIALIDAD, SET_SUCURSALES, CALCULAR_DISTANCIA, SET_SUCURSAL } from '../../Home/Menu/constantes/actionRedux'
import { getDistance } from 'geolib';


const initialState = {
    listaEspecialidades: null,
    sucursales: null,
    sucursalesAMostrar: null,
    Cargando: true,
    idEspecialidad: null,
    especialidadNotSelected: true,
    sucursalSelected: null
};

calcularDistancia = (data, suc) => {
    var distanciaAPersona
    suc.forEach(s => {
        distanciaAPersona = getDistance(
            { latitude: s.configuracion.cordLatitud, longitude: s.configuracion.cordLongitud },
            { latitude: data.coords.latitude, longitude: data.coords.longitude }
        )
        s.distanciaAPersona = distanciaAPersona / 1000
    });
    return suc
}
const TurnosReducer = (state = initialState, action) => {
    switch (action.type) {
        case (OBTENER_ESPECIALIDADES): {
            const { data } = action
            return {
                ...state,
                listaEspecialidades: data,
                Cargando: false,
            }

        }
        case (SET_ESPECIALIDAD): {
            const { data } = action
            return {
                ...state,
                idEspecialidad: data,
                especialidadNotSelected: false
            }
        }
        case (SET_SUCURSALES): {
            const { data } = action
            return {
                ...state,
                sucursales: data,
                sucursalesAMostrar: data
            }
        }
        case (SET_SUCURSAL): {
            const { data } = action
            return {
                ...state,
                sucursalSelected: data
            }
        }
        case (CALCULAR_DISTANCIA): {
            const { data, suc } = action
            const sucursalesActualizadas = this.calcularDistancia(data, suc)
            return {
                ...state,
                sucursalesAMostrar: data,
                sucursales: sucursalesActualizadas
            }
        }
    }
    return {
        ...state
    }
}
export default TurnosReducer