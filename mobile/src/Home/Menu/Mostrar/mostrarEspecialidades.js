import React, { Component } from 'react';
import { connect } from "react-redux";
import { ListItem, withTheme } from "react-native-elements";
import styles from '../../../../App.scss'
import TouchableScale from "react-native-touchable-scale";
import { URL_API } from '../constantes/urlApi'
import {
  SET_SUCURSALES,
  SET_ESPECIALIDAD, SET_COORDENADAS, FILTRAR_CANTIDAD, FILTRAR_DISTANCIA, SET_FILTRO, FILTRAR_NOMBRE
} from '../constantes/actionRedux'

class MostrarEspecialidades extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lista: [],
      isVisible: false,
      selectedIndex: null,
      sucursalesCargadas: null
    }
  }


  getSucursalesOrdenadoCantidad = async (idEspecialidad) => {
    const { setSucursales } = this.props
    var url;
    url = URL_API + "/api/sucursal/filtrar/cantidadPersonas/" + idEspecialidad

    await fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (myJson) {
          setSucursales(myJson);
        }.bind(this)
      );
  }

  async navegarListaSucursales(idEspecialidad) {
    await this.getSucursalesOrdenadoCantidad(idEspecialidad)
    this.encontrarCoordenadas(FILTRAR_DISTANCIA)
  }
  
  encontrarCoordenadas = async (filtro) => {
    const { setCoordenadas } = this.props
    await navigator.geolocation.getCurrentPosition(
      posicion => {
        setCoordenadas(posicion, filtro)
        console.log(posicion)
        this.props.nav.navigate("ListaSucursales")
      },
      error => {
        this.props.nav.navigate("ListadoPaisesYProv")
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const { especialidad, setEspecialidad } = this.props
    var color, textColor
    color = styles.gray.color
    textColor = styles.dark.color

    return (
      <React.Fragment>
        <ListItem
          Component={TouchableScale}
          containerStyle={{
            marginLeft: 10,
            marginRight: 10,
            margin: 5,
            borderRadius: 15,
          }}
          friction={90}
          tension={100}
          activeScale={0.95}
          linearGradientProps={{
            colors: [color, color],
            start: { x: 1, y: 3 },
            end: { x: 0.1, y: 5 },
          }}
          title={especialidad.nombre}
          key={especialidad.especialidadId}
          titleStyle={{
            color: textColor,
            textAlign: "center",
            fontFamily: "Nunito_bold",
            fontSize: 17,
          }}
          onPress={(e) => {
            setEspecialidad(especialidad.especialidadId)
            this.navegarListaSucursales(especialidad.especialidadId);
          }}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setEspecialidad: (datos) => dispatch({ type: SET_ESPECIALIDAD, data: datos }),
    setSucursales: (datos) => dispatch({ type: SET_SUCURSALES, data: datos }),
    setFiltro: (datos) => dispatch({ type: SET_FILTRO, data: datos }),
    setCoordenadas: (datos, tipoBusqueda) => dispatch({ type: SET_COORDENADAS, busqueda: tipoBusqueda, data: datos })
  };
};

const mapStateToProps = (state) => {
  return {
    colores: state.turnos.botonesEspecialidades,
    idEspecialidad: state.turnos.idEspecialidad,
    ubicacion: state.user.ubicacion
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(MostrarEspecialidades));