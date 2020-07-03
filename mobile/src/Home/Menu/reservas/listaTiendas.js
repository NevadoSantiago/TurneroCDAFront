import React, { Component } from 'react'
import { View, ActivityIndicator, Image } from 'react-native';
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { ScrollView } from 'react-native-gesture-handler';

import { withTheme, ListItem, Text } from 'react-native-elements';
import styles from '../../../../App.scss'

function getImageFromIdTienda(idTienda) {
    const url = URL_API_TIENDA + "/api/tienda/imagen/" + idTienda
    return url;

}

class ListaTiendas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiendas: null,
            id: this.props.idUsuario
        }
    }

    static navigationOptions = {
        title: 'Seleccione una tienda',
        headerStyle: {
            backgroundColor: styles.white.color,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerTintColor: styles.primary.color,
        headerTitleStyle: {
            fontWeight: 'normal',
            fontFamily: 'Nunito',
            color: styles.primary.color
        },
    };

    async componentDidMount() {
        await fetch(URL_API_TIENDA + '/api/tienda/consultarTiendas')
            .then(function (response) {
                return response.json()
            })
            .then(function (myJson) {
                this.setState({
                    tiendas: myJson
                })
            }.bind(this))
    }

    render() {
        const { tiendas } = this.state

        if (tiendas != null) {
            //const ruta = '../../../../assets/' + '${data.nombreTienda}' + '.jpg';
            return (
                <View style={styles['flex.white']}>
                    <ScrollView>
                        {
                            tiendas.map((data, i) => {
                                let tiendaColorStart, tiendaColorEnd, tiendaColorChevron
                                switch (data.nombre) {
                                    case 'Disco':
                                        tiendaColorStart = '#ff554d'
                                        tiendaColorEnd = '#a8120a'
                                        tiendaColorChevron = styles.white.color
                                        break;
                                    case 'Easy':
                                        tiendaColorStart = '#fffc40'
                                        tiendaColorEnd = '#ffa900'
                                        tiendaColorChevron = styles.black.color
                                        break;
                                    case 'Jumbo':
                                        tiendaColorStart = '#48C774'
                                        tiendaColorEnd = '#319153'
                                        tiendaColorChevron = styles.white.color
                                        break;
                                    default:
                                        break;
                                }

                                return (
                                    <ListItem
                                        Component={TouchableScale}
                                        containerStyle={{ marginHorizontal: 10, paddingVertical: 0, margin: 5, borderRadius: 15, borderColor: '#EEEEEE', borderWidth: 1 }}
                                        friction={90}
                                        tension={100}
                                        activeScale={0.95}
                                        linearGradientProps={{
                                            colors: ['#F3F3F3', '#F3F3F3'],
                                            start: { x: 1, y: 0 },
                                            end: { x: 0, y: 5 },
                                        }}
                                        //leftAvatar={{ rounded: true, source: { uri: getImageFromIdTienda(data.tiendaId)}}} 
                                        leftAvatar={
                                            <Image
                                                style={{ width: 100, height: 100 }}
                                                source={{ uri: getImageFromIdTienda(data.tiendaId) }}
                                            />
                                        }
                                        title={data.nombre}
                                        key={data.tiendaId}
                                        titleStyle={{ color: 'black', fontFamily: 'Nunito', fontSize: 23 }}
                                        chevron={{ color: 'black', size: 20 }}
                                        onPress={(e) => {
                                            this.props.navigation.navigate('ListaSucursales', {
                                                tiendaId: data.tiendaId
                                            });
                                        }}
                                    />
                                )
                            }
                            )
                        }
                    </ScrollView>
                </View>
            )
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


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ListaTiendas))