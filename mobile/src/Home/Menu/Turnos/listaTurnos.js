import React, { Component } from 'react'
import { View, ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CheckAlert from "react-native-awesome-alert"
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import {OBTENER_TURNOS} from '../constantes/actionRedux'
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { ScrollView } from 'react-native-gesture-handler';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import { withTheme, ListItem, Text } from 'react-native-elements';
import moment from 'moment'

const testIDs = require('./testIDs');

var days = {

}

const theme = {
    colors: {
        primary: 'rgb(4, 116, 186)'
    }
};
var date = moment().format("YYYY-MM-DD");

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyDate: {
        height: 15,
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    text: {
        fontFamily: 'Nunito',
        backgroundColor: 'transparent',
    },
    bold: Platform.OS === 'ios' ? {
        fontFamily: 'Nunito',
        fontWeight: 'bold'
    } : {
            fontFamily: 'Nunito_bold'
        },
});

class ListaTurnos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            turnos: null,
            id: this.props.idUsuario,
            turnoSolicitado: null,
            items: {}
        }
    }

    // TODO: GET DE TURNOS DISPONIBLES
    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = this.timeToString(time);
                var turnosDisponibles = []
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    this.state.turnos.forEach((turno, i) => {
                        if (turno.fecha === strTime) {
                            turnosDisponibles.push(turno)
                        }
                    })
                    for (let j = 0; j < turnosDisponibles.length; j++) {
                        this.state.items[strTime].push({
                            name: strTime,
                            id: turnosDisponibles[j].turnoId,

                            horario: turnosDisponibles[j].horario,
                            height: 35
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
            this.setState({
                items: newItems
            });
        }, 1000);
    }

    renderItem(item) {
        return (
            <TouchableOpacity
                testID={testIDs.agenda.ITEM}
                style={[styles.item, { height: item.height }]}
                onPress={() => {
                    Alert.alert(

                        'Confirmar turno?',
                        'Fecha: ' + item.name +
                        '\nHora: ' + item.horario.replace('-', ':'),
                        [
                            {
                                text: 'NO', onPress: () =>
                                    console.warn('NO Pressed'),
                                style: 'cancel'
                            },
                            {
                                text: 'SI', onPress: () =>
                                    this.reservarTurno(item.id)
                            },
                        ]
                    );
                }}
            >

                <Text style={{ fontFamily: 'Nunito_bold', flexDirection: 'column', alignSelf: 'flex-start' }}>
                    {item.horario.replace('-', ':') + 'hs'}
                </Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text style={{ fontFamily: 'Nunito' }}>No hay turnos disponibles</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }


    static navigationOptions = {
        title: 'Seleccione un turno',
        headerStyle: {
            backgroundColor: '#FFFFFF',
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTintColor: 'rgb(4, 116, 186)',
        headerTitleStyle: {
            fontWeight: 'normal',
            fontFamily: 'Nunito',
            color: 'rgb(4, 116, 186)'
        },
    };

    async componentDidMount() {
        const { sucursalId } = this.props.navigation.state.params;
        const url = URL_API + '/api/turno/listarTurno/' + sucursalId + '/' + date;
        await fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                myJson.forEach(json => {
                    days[json.fecha] =
                    {
                        marked: true,
                        //selected: true,
                        selectedColor: theme.colors.primary,
                        customStyles: {
                            text: {
                                color: 'black',
                                fontWeight: 'bold'
                            }
                        }
                    }
                });
                //console.log(days);
                this.setState({
                    turnos: myJson,
                })
            }.bind(this))
    }

    obtenerListadoTurnos = async (id) => {
        const {guardarTurnos} = this.props
        await fetch(URL_API + '/api/turno/consultarTurnosCliente/' + id)
        .then(function (response) {
          return response.json()
        })
        .then(function (myJson) {
          guardarTurnos(myJson)
        }
      )
    }

    async reservarTurno(turnoId) {
        const idUsuario = this.props.idUsuario
        try {
            const response = await fetch(URL_API + '/api/turno/asignarTurno/' + turnoId + '/' + idUsuario, {
                method: "PATCH"
            })
            console.log(response.status)
            if (response.status == 200) {
                this.obtenerListadoTurnos(idUsuario);
                this.props.navigation.navigate('Turnos')
            } else if(response.status== 226) {
                
                Alert.alert(
                    "Turno ya solicitado",
                    "No puede reservar 2 veces el mismo turno",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
            }else{
                this.setState({
                    error : "Hubo un error al crear el turno"
                })
            }

        } catch (err) {

        }
    }

    render() {
        const { turnos,error } = this.state
        const { theme, updateTheme, replaceTheme } = this.props;

        if (turnos != null) {
            //const ruta = '../../../../assets/' + '${data.nombreTienda}' + '.jpg';
            if (turnos.length === 0) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Nunito' }}>No hay turnos disponibles</Text>
                    </View>
                )
            } else {
                if (error) {
                    return (
                        <React.Fragment>
                            <Text>{error}</Text>
                        <Agenda
                            testID={testIDs.agenda.CONTAINER}
                            items={this.state.items}
                            minDate={{date}}
                            loadItemsForMonth={this.loadItems.bind(this)}
                            renderItem={this.renderItem.bind(this)}
                            renderEmptyDate={this.renderEmptyDate.bind(this)}
                            rowHasChanged={this.rowHasChanged.bind(this)}
                            markedDates={days}
                        />
                        </React.Fragment>
                    )
                } else {
                    return (
                        <React.Fragment>
                        <Agenda
                            testID={testIDs.agenda.CONTAINER}
                            items={this.state.items}
                            minDate={{date}}
                            loadItemsForMonth={this.loadItems.bind(this)}
                            renderItem={this.renderItem.bind(this)}
                            renderEmptyDate={this.renderEmptyDate.bind(this)}
                            rowHasChanged={this.rowHasChanged.bind(this)}
                            markedDates={days}
                        />
                        </React.Fragment>
                    )
                }
            }
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#045ba3" />
                </View>
            )
        }
    }
}
const mapDispatchToProps = dispatch => {
    return {
        guardarTurnos: (turnos) => dispatch({ type: OBTENER_TURNOS, data: turnos }),
    };
}

const mapStateToProps = state => {
    return {
        idUsuario: state.user.idUsuario,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ListaTurnos))