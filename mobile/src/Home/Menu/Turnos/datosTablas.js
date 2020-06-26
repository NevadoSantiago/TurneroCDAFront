
import React, { Component, useState } from 'react'
import { View, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Body, Container } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CheckAlert from "react-native-awesome-alert"
import { connect } from 'react-redux';
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import { withTheme, Overlay, ListItem, Avatar } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import { Button, ThemeProvider, Text } from 'react-native-elements';

/*import {
    Grayscale,
    Sepia,
    Tint,
    ColorMatrix,
    concatColorMatrices,
    invert,
    contrast,
    saturate
  } from 'react-native-color-matrix-image-filters';*/

function getImageFromIdTienda(idTienda) {
    const url = URL_API_TIENDA + "/api/tienda/imagen/" + idTienda
    //console.log(url)
    return url;
}

var turnoColor = {
    primary: 'black',
    secondary: 'black',
    content: 'white',
    chevron: 'white'
}

var turnoSubtitle = null

class DatosTablas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cancelado: false,
            id: this.props.idUsuario,
            cajaAsignada: '1',
            direccionActual: null
        }
    }

    solicitarCaja = async (idQr) => {
        const url = URL_API + '/api/caja/asignar/' + idQr + '/' + 1 + '/' + 1
        await fetch(url, {
            method: "POST"
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                Alert.alert("Caja asignada", "Te hemos asignada la caja número " + myJson + ". Acércate a ella para finalizar con la compra")
                console.log(myJson)
                this.setState({
                    cajaAsignada: myJson
                })
            }.bind(this))
    }

    getSucursales = async (tiendaId) => {
        const url = URL_API + '/api/turno/consultarSucursalesPorTienda/' + tiendaId
        await fetch(url)
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                if (myJson.lenght != 0) {
                    this.setState({
                        sucursales: myJson
                    })
                }
            }.bind(this))
    }

    getDireccionFromSucursalByTiendaNombreSucursal = (tiendaNombreSucursal) => {
        console.log('RECEIVED: ' + tiendaNombreSucursal)
        var direccionActual = []
        this.state.sucursales.forEach((sucursal, i) => {
            if (sucursal.nombre === tiendaNombreSucursal) {
                console.log('HAS ADDRESS: ' + sucursal.direccion)
                direccionActual.push(sucursal.direccion)
            }
        })

        return direccionActual[0]
    }

    cancelarTurno = (idTurno) => {
        const idUsuario = this.state.id
        const url = URL_API + '/api/turno/cancelarTurno/' + idTurno + '/' + idUsuario;
        Alert.alert(
            'Cancelar turno',
            'Seguro que quiere cancelar el turno?',
            [
                {
                    text: 'NO', onPress: () =>
                        console.warn('NO Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'SI', onPress: () => {
                        fetch(url, {
                            method: "put"
                        })
                        this.setState({
                            cancelado: true
                        })
                    }
                },
            ]
        );
    }

    verQR = (turno) => {
        const { id } = this.state
        const { theme, updateTheme, replaceTheme } = this.props;
        const urlQR = URL_API + '/api/turno/QR/' + turno.idTurno + '/' + id;

        if (turno.estado === 'SIN_CONFIRMAR') {
            this.checkAlert.alert("Detalles del turno",
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ width: 250, height: 250, marginTop: -20 }}
                        source={{ uri: urlQR }}
                    />
                    <Container style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Nunito', color: theme.colors.primary }}>
                            {'Fecha y hora: '}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {turno.fechaProgramado + ' - '}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {turno.horario.replace('-', ':')}
                        </Text>
                    </Container>
                    <Container style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Nunito', color: theme.colors.primary }}>
                            {turno.sucursal}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {' - ' + this.getDireccionFromSucursalByTiendaNombreSucursal(turno.sucursal)}
                        </Text>
                    </Container>
                </View>,
                [
                    {
                        text: "Solicitar caja", onPress: () => { /*this.solicitarCaja(1) */ },
                        style: {
                            marginTop: -15,
                            marginBottom: -10,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: '#CCCCCC',
                            padding: 15,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                    {
                        text: "Salir", onPress: () => { },
                        style: {
                            marginTop: -15,
                            marginBottom: -10,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: theme.colors.primary,
                            padding: 15,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                    {
                        text: "Cancelar turno", onPress: () => { this.cancelarTurno(turno.idTurno) },
                        style: {
                            marginTop: -15,
                            marginBottom: -15,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: 'orange',
                            padding: 15,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                ]
            )
        } else {
            this.checkAlert.alert("Detalles del turno",
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        style={{ width: 250, height: 250, marginTop: -20 }}
                        source={{ uri: urlQR }}
                    />
                    <Container style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Nunito', color: theme.colors.primary }}>
                            {'Fecha y hora: '}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {turno.fechaProgramado + ' - '}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {turno.horario.replace('-', ':')}
                        </Text>
                    </Container>
                    <Container style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'Nunito', color: theme.colors.primary }}>
                            {turno.sucursal}
                        </Text>
                        <Text style={{ fontFamily: 'Nunito_bold', color: theme.colors.primary }}>
                            {' - ' + this.getDireccionFromSucursalByTiendaNombreSucursal(turno.sucursal)}
                        </Text>
                    </Container>
                </View>,
                [
                    {
                        text: "Solicitar caja", onPress: () => { this.solicitarCaja(1) },
                        style: {
                            marginTop: -15,
                            marginBottom: -10,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: theme.colors.primary,
                            padding: 15,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                    {
                        text: "Salir", onPress: () => { },
                        style: {
                            marginTop: -15,
                            marginBottom: -10,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: theme.colors.primary,
                            padding: 15,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                    {
                        text: "Cancelar turno", onPress: () => { this.cancelarTurno(turno.idTurno) },
                        style: {
                            marginTop: -15,
                            marginBottom: -15,
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '112%',
                            backgroundColor: 'orange',
                            padding: 15,
                            borderBottomLeftRadius: 5,
                            borderBottomRightRadius: 5,
                            color: 'white',
                            fontFamily: 'Nunito'
                        }
                    },
                ]
            )
        }
    }

    showEstado = (turno, cajaAsignada) => {
        switch (turno.estado) {
            case 'SIN_CONFIRMAR':
                turnoColor.primary = '#757575',
                    turnoColor.secondary = '#BABABA',
                    turnoColor.content = 'white',
                    turnoColor.chevron = 'white'
                turnoSubtitle = turno.detalleDelTurno + ' - ' + turno.horario
                break;
            case 'ACTUAL':
                turnoColor.primary = '#48C774',
                turnoColor.secondary = '#319153',
                turnoColor.content = 'white',
                turnoColor.chevron = 'white'
                turnoSubtitle = turno.detalleDelTurno + ' - ' + turno.horario
                break;
            default:
                turnoColor.primary = 'orange',
                turnoColor.secondary = 'orange',
                turnoColor.content = 'white',
                turnoColor.chevron = 'white'
                turnoSubtitle = turno.detalleDelTurno + ' - ' + turno.horario
                //turnoSubtitle = turno.detalleDelTurno + "\n" + "Caja asignada : " + (cajaAsignada).replace("Caja asignada : null", "")
                break;
        }
    }

    render() {
        const { data } = this.props
        const { cancelado } = this.state
        const { theme, updateTheme, replaceTheme } = this.props;

        this.getSucursales(data.tiendaId)

        if (cancelado) {
            this.props.cancelar()
        }
        if (data != null) {
            if (data.length === 0) {
                return (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontFamily: 'Nunito' }}>No tenés ningún turno</Text>
                    </View>
                )
            } else {
                return (
                    <React.Fragment>
                        <CheckAlert
                            styles={{
                                modalContainer: { backgroundColor: "rgba(49,49,49,0.8)" },
                                modalView: { marginBottom: 10, borderRadius: 5, backgroundColor: 'white' },
                                titleText: {
                                    fontSize: 21,
                                    fontFamily: 'Nunito',
                                    color: theme.colors.primary
                                },
                                buttonContainer: {
                                    fontFamily: 'Nunito',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                },
                            }}
                            ref={ref => (this.checkAlert = ref)}
                            modalProps={{
                                transparent: true,
                                animationType: "slide"
                            }}
                        />
                        {
                            this.showEstado(data, this.state.cajaAsignada)
                        }
                        <ListItem
                            Component={TouchableScale}
                            containerStyle={{ marginLeft: 10, marginRight: 10, margin: 5, borderRadius: 15 }}
                            friction={90}
                            tension={100}
                            activeScale={0.95}
                            linearGradientProps={{
                                colors: [turnoColor.primary, turnoColor.secondary],
                                start: { x: 1, y: 0 },
                                end: { x: 0, y: 5 },
                            }}
                            title={data.sucursal}
                            key={data.idTurno}
                            /*leftAvatar={
                                <Grayscale>
                                    <Image 
                                    style={{ width: 50, height: 50 }}
                                    source={{ uri: getImageFromIdTienda(data.tiendaId) }}
                                    />
                                </Grayscale>
                            }*/
                            leftAvatar={{ source: { uri: getImageFromIdTienda(data.tiendaId) } }}
                            subtitle={turnoSubtitle}
                            subtitleStyle={{ color: turnoColor.content, fontFamily: 'Nunito' }}
                            sub
                            titleStyle={{ color: turnoColor.content, fontFamily: 'Nunito_bold', fontSize: 17 }}
                            chevron={{ color: turnoColor.chevron, size: 20 }}
                            onPress={(e) => {
                                this.verQR(data)
                            }}
                        />
                    </React.Fragment>
                )
            }
        } else {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>
                        No se pueden mostrar los datos
                    </Text>
                </View>
            )
        }
    }
}

const OverlayExample = () => {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        <View>
            <Button title="Open Overlay" onPress={toggleOverlay} />

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                <Text>Hello from Overlay!</Text>
            </Overlay>
        </View>
    );
};

const mapDispatchToProps = dispatch => {
    return {
    };
}
const mapStateToProps = state => {
    return {
        idUsuario: state.user.idUsuario,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(DatosTablas))