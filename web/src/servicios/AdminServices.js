import { URL_API, URL_API_RESERVA } from "../constantes/urlApi";

export const getEmpleadoBySucursalYRol = async (idSucursal, rol, token) => {
  var empleados;
  const url = URL_API + "/api/sucursal/get/empleado/" + rol + "/" + idSucursal;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      empleados = response;
    });
  return empleados;
};

export const eliminarEmpleadoServ = async (idEmpleado, token) => {
  const url = URL_API + "/api/usuario/eliminar/" + idEmpleado;
  debugger;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    if (response.status == 200) {
      return true;
    } else return false;
  });
};
export const getAllSucursales = async (token) => {
  var empleados;
  const url = URL_API + "/api/sucursal";
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      empleados = response;
    });
  return empleados;
};
export const eliminarAdminDeSucursal = async (idAdmin, token) => {
  const url = URL_API + "/api/sucursal/delete/" + idAdmin;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
const validateData = (datoNuevo, datoAnterior, token) => {
  if (datoNuevo == "") {
    return datoAnterior;
  } else {
    return datoNuevo;
  }
};

export const editarDatos = async (e, location, token) => {
  const { elements } = e.target;
  const { user } = location;
  e.preventDefault();
  const nombre = validateData(elements.nombre.value, user.nombre);
  const apellido = validateData(elements.apellido.value, user.apellido);
  const mail = validateData(elements.mail.value, user.mail);
  const rol = validateData(elements.rol.value, user.rol);
  var respuesta;
  var url = URL_API_RESERVA + "/api/usuario/editar";
  await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },

    body: JSON.stringify({
      idEmpleado: user.idEmpleado,
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      rol: parseInt(rol),
    }),
  }).then((response) => {
    if (response.status === 200) {
      respuesta = true;
    } else {
      respuesta = false;
    }
  });
  return respuesta;
};

export const editarDatosNoRegistrado = async (e, location, token) => {
  const { elements } = e.target;
  const { user } = location;
  e.preventDefault();
  const nombre = validateData(elements.nombre.value, user.nombre);
  const apellido = validateData(elements.apellido.value, user.apellido);
  const rol = validateData(elements.rol.value, user.rol);
  var respuesta;
  var url = URL_API_RESERVA + "/api/usuario/editar";
  await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },

    body: JSON.stringify({
      idEmpleado: user.idEmpleado,
      nombre: nombre,
      apellido: apellido,
      rol: parseInt(rol),
    }),
  }).then((response) => {
    if (response.status === 200) {
      respuesta = true;
    } else {
      respuesta = false;
    }
  });
  return respuesta;
};

export const crearPersona = async (e, location, token) => {
  const { elements } = e.target;
  e.preventDefault();
  const nombre = validateData(elements.nombre.value);
  const apellido = validateData(elements.apellido.value);
  const rol = validateData(elements.rol.value);
  const sucursalId = validateData(elements.sucursal.value);
  var respuesta;
  var url = URL_API_RESERVA + "/api/usuario/create/empleado";
  var json = [];
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },

    body: JSON.stringify({
      idSucursal: parseInt(sucursalId),
      nombre: nombre,
      apellido: apellido,
      idRol: parseInt(rol),
    }),
  }).then(async (response) => {
    if (response.status === 200) {
      //console.log(response.text());
      var res = await response.text();
      json.push(res);
      respuesta = true;
    } else {
      respuesta = false;
    }
  });
  return [respuesta, json, nombre, apellido];
};
export const getAllEmpleadosNoRegistrados = async (token) => {
  var empleados;
  const url = URL_API + "/api/usuario/empleadosNoRegistrados";
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      empleados = response;
    });
  return empleados;
};

export const eliminarSucursal = async (idSucursal, token) => {
  const url = URL_API + "/api/sucursal/borrar/" + idSucursal;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
