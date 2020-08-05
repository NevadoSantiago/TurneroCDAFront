import { URL_API } from "../constantes/urlApi";

export const getEspecialidadesPorSucursal = async (idSucursal, token) => {
  var especialidades;
  const url = URL_API + "/api/especialidad/get/" + idSucursal;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      especialidades = response;
    });
  return especialidades;
};
export const getAdminstradoresDeSucursal = async (idSucursal, token) => {
  var admins;
  const url = URL_API + "/api/sucursal/admin/" + idSucursal;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      admins = response;
    });
  return admins;
};

export const getCantGenteEnSucursal = async (idSucursal, token) => {
  var cantidad;
  const url = URL_API + "/api/sucursal/get/espera/" + idSucursal;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      cantidad = response;
    });
  return cantidad;
};
export const getListaDeEspera = async (sucursalId, token) => {
  const url = URL_API + "/api/sucursal/get/listadoEspera/" + sucursalId;
  var listaDeEspera = null;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      listaDeEspera = response;
    });
  return listaDeEspera;
};
export const getListaDeEsperaAgrupada = async (sucursalId, token) => {
  const url = URL_API + "/api/sucursal/listadoAgrupado/espera/" + sucursalId;
  var listaDeEsperaAgrupada = null;
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      listaDeEsperaAgrupada = response;
    });
  return listaDeEsperaAgrupada;
};
export const getRolesDeUsuario = async (token) => {
  var roles;
  const url = URL_API + "/api/usuario/get/roles";
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      roles = response;
    });
  return roles;
};
