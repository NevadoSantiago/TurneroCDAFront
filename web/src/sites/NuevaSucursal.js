import React from "react";
import { connect } from "react-redux";
import Error from "../servicios/alertas/Error";
import Correcto from "../servicios/alertas/Correcto";
import { URL_API } from "../constantes/urlApi";

class NuevaSucursal extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null,
      correcto: null,
      mapLatitude: -34.6668096591094,
      mapLongitude: -58.571203179224554,
      locationresults: null,
      provincias: null,
      localidades: null,
    };
  }

  validateData = (nombre, direccion) => {
    if (!nombre) {
      return "Ingrese el nombre";
    } else if (!direccion) {
      return "Ingrese una dirección";
    }
  };

  getProvincias = async () => {
    await fetch(URL_API + "/api/locacion/provincias", {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          this.setState({
            provincias: myJson,
          });
        }.bind(this)
      );
  };

  getLocalidades = async (nombreProvincia) => {
    const { provincias } = this.state;

    var idProvincia = null;

    if (provincias !== null) {
      provincias.map((provincia) => {
        if (provincia.nombre === nombreProvincia) {
          idProvincia = provincia.provinciaId;
        }

        return idProvincia;
      });
    }

    var url;

    if (idProvincia === null) {
      idProvincia = 2;
    }

    url = URL_API + "/api/locacion/localidades/" + idProvincia;

    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          console.log(myJson);
          this.setState({
            localidades: myJson,
          });
        }.bind(this)
      );
  };

  createSucursal = async (e) => {
    //const { locationresults } = this.state;
    e.preventDefault();
    const nombre = e.target.elements.nombre.value;
    const direccion = e.target.elements.direccion.value;
    const provincia = e.target.elements.provincia.value;
    const localidad = e.target.elements.localidad.value;

    let latitud = null;
    let longitud = null;
    let locationresults = null;

    let url = new URL("https://nominatim.openstreetmap.org/search");
    let params = new URLSearchParams();
    params.append("q", direccion + ", " + provincia + ", " + localidad);
    params.append("format", "json");

    let error = this.validateData(nombre, direccion);

    await fetch(url.toString() + "?" + params.toString(), {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => (locationresults = data));
    //.then(() => console.log(locationresults))

    if (locationresults !== null) {
      if (locationresults.length === 0) {
        error =
          "No hay resultados para " +
          direccion +
          ", " +
          provincia +
          ", " +
          localidad;
        console.log(error);
        this.setState({ error });
      } else if (locationresults.length === 1) {
        console.clear();
        this.setState({
          error: null,
        });
        console.log(
          "Resultados para " + direccion + ", " + provincia + ", " + localidad
        );
        console.log(locationresults[0]);
        latitud = locationresults[0].lat;
        longitud = locationresults[0].lon;
      } else {
        console.clear();
        var count = 0;
        locationresults.map((data) => {
          if (
            data.display_name.includes("Argentina") &&
            data.display_name.includes(provincia) &&
            data.display_name.includes(localidad)
          ) {
            count++;
          }
          return count;
        });
        console.log(
          "Hay " +
            count +
            " resultados para " +
            direccion +
            " en " +
            provincia +
            ", " +
            localidad +
            ", Argentina"
        );
        locationresults.map((data) => {
          if (
            data.display_name.includes("Argentina") &&
            data.display_name.includes(provincia) &&
            data.display_name.includes(localidad)
          ) {
            console.log(data);
          }
          return data;
        });

        error =
          "Hay " +
          count +
          " resultados para " +
          direccion +
          " en " +
          provincia +
          ", " +
          localidad +
          ", Argentina";
        console.log(error);
        this.setState({ error });
      }
    }

    console.log(latitud);
    console.log(longitud);

    if (error) {
      this.setState({
        error,
      });
      return false;
    } else {
      this.setState({ error: null });
      await fetch(
        URL_API +
          "/api/sucursal/agregar/" +
          direccion +
          "/" +
          nombre +
          "/" +
          latitud +
          "/" +
          longitud,
        {
          method: "GET",
          /*body: JSON.stringify({
            nombre: nombre,
            direccion: direccion,
            latitud: latitud,
            longitud: longitud,
          }),*/
        }
      ).then((response) => {
        if (response.status === 200) {
          response.json().then((myJson) => {
            this.setState({
              correcto: "Sucursal creada correctamente!",
            });
          });
          setTimeout(() => {
            this.props.history.push("/adminSucursales");
          }, 1500);
        } else {
          this.setState({
            error:
              "El servidor respondió con error " + response.status.toString(),
          });
        }
      });
    }
  };

  componentDidMount() {
    this.getProvincias();
    this.getLocalidades();
  }

  render() {
    const {
      error,
      correcto,
      /*mapLatitude,
      mapLongitude,*/
      provincias,
      localidades,
    } = this.state;

    if (provincias !== null && localidades !== null) {
      return (
        <div>
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column">
                <p className="title">Nueva sucursal</p>
              </div>
            </div>
          </div>
          <div
            className="container"
            style={{
              flex: 1,
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "15px",
              marginRight: "15px",
              marginLeft: "15px",
              marginBottom: "15px",
            }}
          >
            <form onSubmit={this.createSucursal}>
              <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                  <input
                    className="input is-black"
                    type="text"
                    placeholder=""
                    name="nombre"
                  ></input>
                </div>
              </div>
              <div className="field">
                <label className="label">Provincia</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth is-black">
                        <select
                          name="provincia"
                          onChange={(e) => {
                            this.getLocalidades(e.target.value);
                          }}
                        >
                          {provincias.map((provincia, i) => {
                            return (
                              <option
                                key={provincia.provinciaId}
                                value={provincia.nombre}
                              >
                                {provincia.nombre}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Localidad</label>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <div className="select is-fullwidth is-black">
                        <select name="localidad">
                          {localidades.map((localidad, i) => {
                            return (
                              <option
                                key={localidad.localidadId}
                                value={localidad.nombre}
                              >
                                {localidad.nombre}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <label className="label">Dirección</label>
                    <div className="control">
                      <input
                        className="input is-black"
                        type="text"
                        placeholder=""
                        /*onChange={(event) =>
                          this.getCoordenadas(event.target.value)
                        }*/
                        name="direccion"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>

              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Confirmar
                  </button>
                </div>
              </div>
              {error && <Error message={error} />}
              {correcto && <Correcto message={correcto} />}
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="hero-body">
          <div className="container" style={{ textAlign: "center" }}>
            <p className="subtitle">Cargando...</p>
          </div>
        </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NuevaSucursal);
