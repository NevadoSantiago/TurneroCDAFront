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
    fetch(url,{
        method:"POST"
    }).then(response=>
        {
            if(response.status == 200){
                return true
            }else return false
        })
}
export const getEmpleado = async (idEmpleado)=>{

}
const validateData = (nombre, apellido, mail) => {
    if (!nombre) {
        return "Ingrese un nombre";
    }
    else if (!apellido) {
        return "Ingrese un apellido";
    }
    else if (!mail) {
        return "Ingrese un correo electrónico";
    }
}

export const editarDatos = async e => {
    const { location } = this.props
    e.preventDefault();
    const nombre = e.target.elements.nombre.value;
    const apellido = e.target.elements.apellido.value;
    const mail = e.target.elements.mail.value;
    const rol = e.target.elements.rol.value;

    const error = validateData(nombre, apellido, mail,rol);
    if (error) {
        this.setState({
            error
        });
        return false;
    } else {
        var url = URL_API_RESERVA + '/api/usuario/editar'
        this.setState({ error: null })
        await fetch(
            url, {
            method: 'PATCH',
            body: JSON.stringify({
                idEmpleado: location.user.idEmpleado,
                nombre: nombre,
                apellido: apellido,
                mail: mail,
                rol: parseInt(rol)
            })
        }
        ).then(response => {
            if (response.status == 200) {
                const json = response.json()
                    .then(myJson => {
                        this.setState({
                            correcto: 'Datos editados correctamente!'
                        })
                    })
            } else {
                this.setState({ error: "El servidor respondió con error " + response.status.toString() })
            }
        })
    };
}
