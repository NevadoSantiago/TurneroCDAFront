import React, { Component } from "react";
import {
	View,
	Text,
} from "react-native";
import { URL_API_ESPECIALIDAD } from "../constantes/urlApi";
import { connect } from "react-redux";
import TouchableScale from "react-native-touchable-scale";
import { Alert } from 'react-native'
import { withTheme, ListItem, Button } from "react-native-elements";

import styles from '../../../../App.scss'
import MostrarEspecialidades from '../Mostrar/mostrarEspecialidades'
import { ScrollView } from "react-native-gesture-handler";
import { SET_ESPECIALIDAD, SET_COORDENADAS } from '../constantes/actionRedux'

class ListaEspecialidades extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: 'Especialidades',
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

	navigation = () => {
		this.props.navigation.push('ListaEspecialidades')
	}

	encontrarCoordenadas = () => {
		const { setCoordenadas } = this.props
		navigator.geolocation.getCurrentPosition(
			posicion => {
				setCoordenadas(JSON.stringify(posicion))
				console.log(JSON.stringify(posicion.coords))
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	};

	render() {
		const { especialidades, idEspecialidad, especialidadNotSelected } = this.props
		if (especialidades == null) {
			return (
				<View>
					<Text>
						No hay especialidades
          </Text>
				</View>)
		} else {
			//console.log(this.state.coordenadas)
			return (
				<React.Fragment>
					<ScrollView style={{ backgroundColor: styles.white.color }}>
						{
							this.props.especialidades.map((e, i) => {
								return (
									<MostrarEspecialidades especialidad={e} />
								)
							}
							)
						}
					</ScrollView>

					<View style={{ flexDirection: 'row', alignSelf: 'center', backgroundColor: styles.white.color }}>
						<Button
							buttonStyle={{ marginHorizontal: 5, borderRadius: 0 }}
							disabled={especialidadNotSelected}
							title="Distancia"
							onPress={() => this.encontrarCoordenadas()}
						>
						</Button>
						<Button
							buttonStyle={{ marginHorizontal: 5, borderRadius: 0 }}
							disabled={especialidadNotSelected}
							title="Nombre"
							onPress={() => console.warn('Nombre')}
						>
						</Button>
						<Button
							buttonStyle={{ marginHorizontal: 5, borderRadius: 0 }}
							disabled={especialidadNotSelected}
							title="Cantidad de personas"
							onPress={() => console.warn('Cantidad de personas')}
						>
						</Button>
					</View>
				</React.Fragment>
			)
		}
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setEspecialidad: (datos) => dispatch({ type: SET_ESPECIALIDAD, data: datos }),
		setCoordenadas: (datos) => dispatch({ type: SET_COORDENADAS, data: datos })
	};
};

const mapStateToProps = (state) => {
	return {
		especialidades: state.turnos.listaEspecialidades,
		idUsuario: state.user.idUsuario,
		idEspecialidad: state.turnos.idEspecialidad,
		especialidadNotSelected: state.turnos.especialidadNotSelected
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withTheme(ListaEspecialidades));

