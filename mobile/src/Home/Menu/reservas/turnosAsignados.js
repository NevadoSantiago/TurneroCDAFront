import React, { Component, Fragment } from 'react';
import { AppLoading } from 'expo';
import { StyleSheet, FlatList, ScrollView,ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Container, Header, Content, Card, Body, CardItem, List, ListItem, Text, Left, Right, Icon, View } from 'native-base';
import { Button, ThemeProvider } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import DatosTablas from './datosTablas'
import { URL_API } from '../constantes/urlApi'
import { connect } from 'react-redux';
import styles from "../../../../App.scss";

class TurnosAsignados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      turnos: null,
      idUsuario: this.props.idUsuario
    };

  }

  cancelarTurno = () => {
    this.props.navigation.navigate('Turnos')
  }

  async componentDidMount() {
    const idUsuario = this.state.idUsuario
    await fetch(URL_API + '/api/turno/consultarTurnosCliente/' + idUsuario)
      .then(function (response) {
        return response.json()
      })
      .then(function (myJson) {
        this.setState({
          turnos: myJson
        })
      }.bind(this))
  }

  render() {
   
    const state = this.state
    const { theme, updateTheme, replaceTheme } = this.props;
    if (state.turnos != null) {
     
      if (state.turnos.length === 0) {
        return (
         
          <View style={ styles['center-flex.white'] }>
            <Text style= {{ fontSize: 20, fontFamily: 'Nunito' }}>
              No tiene turnos asignados
            </Text>
          </View>
        )
      }
      else {
        return (
          <ScrollView style={ styles['center-flex.white'] }>
            {
              state.turnos.map((turno, i) => (
                <DatosTablas data={turno} cancelar={this.cancelarTurno} key={turno.idTurno}></DatosTablas>
              ))
            }
          </ScrollView>
        )
      }
    } else {
      return (
        <View style={ styles['center-flex.white'] }>
          <ActivityIndicator size="large" color={ styles.primary.color } />
        </View>
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
  };
}
const mapStateToProps = state => {
  return {
    idUsuario: state.user.idUsuario,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(TurnosAsignados))
