import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { connect } from "react-redux";
import { ListItem, withTheme, Icon, Overlay, ButtonGroup } from "react-native-elements";
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
    this.updateIndex = this.updateIndex.bind(this)
  }

  getSucursales = async () => {
    const { idEspecialidad, setSucursales } = this.props
    var url;
    url = URL_API + "/api/sucursal/filtrar/especialidad/" + idEspecialidad

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

  updateIndex(selectedIndex) {
    this.getSucursales()
    switch (selectedIndex) {
      case 0: // DISTANCIA      
        this.encontrarCoordenadas(FILTRAR_DISTANCIA)
        this.setState({
          isVisible: false
        })
        break;
      case 1: // NOMBRE
        this.props.setFiltro(FILTRAR_NOMBRE);
        { this.props.nav.navigate("ListaSucursales") }
        this.setState({
          isVisible: false
        })
        break;
      case 2: // CANTIDAD DE PERSONAS
        this.encontrarCoordenadas(FILTRAR_CANTIDAD)
        this.setState({
          isVisible: false
        })
        break;
      default:
        break;
    }
    this.setState({ selectedIndex })
  }

  encontrarCoordenadas = (filtro) => {
    const { setCoordenadas } = this.props
    navigator.geolocation.getCurrentPosition(
      posicion => {
        setCoordenadas(posicion, filtro)
        this.props.nav.navigate("ListaSucursales")
      },
      error => {
        this.props.nav.navigate("ListadoPaisesYProv")
        this.props.setFiltro(filtro)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {
    const { especialidad, setEspecialidad, theme, idEspecialidad } = this.props
    const { selectedIndex } = this.state
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
              this.props.setFiltro(FILTRAR_NOMBRE);
              { this.props.nav.navigate("ListaSucursales") }
              this.setState({
                isVisible: false
              })
              
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