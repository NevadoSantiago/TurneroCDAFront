import React, { Component } from 'react';
import { withTheme, Text, Button} from 'react-native-elements';
import { View, Dimensions, KeyboardAvoidingView } from 'react-native';
import MapView from "react-native-maps";
import styles from '../../../../App.scss'

class MostrarReserva extends Component {


	constructor(props) {
		super(props);
	}

	render() {
		var { turno } = this.props

		return (
			<React.Fragment>
				<View style={{ paddingBottom: 15, backgroundColor: styles.white.color }}>
					<View style={{ marginHorizontal: 15 }}>
						<View style={{ marginBottom: -10 }}>
							<Text style={styles.text}>Centro médico</Text>
						</View>
						<View style={{ borderRadius: 10, marginTop: 15, backgroundColor: '#F1F1F1' }}>
							<View style={{ marginHorizontal: 10, borderRadius: 10 }}>
								<Text style={styles['h4']}>
									{
										turno.nombreSucursal
									}
								</Text>
							</View>
						</View>
					</View>
					<View style={{ marginHorizontal: 15 }}>
						<View style={{ marginTop: 10, marginBottom: -10 }}>
							<Text style={styles.text}>Dirección</Text>
						</View>
						<View style={{ borderRadius: 10, marginTop: 15, backgroundColor: '#F1F1F1' }}>
							<View style={{ marginHorizontal: 10, borderRadius: 10 }}>
								<Text style={styles['h4']}>
									{
										turno.direccion
									}
								</Text>
							</View>
						</View>
					</View>
					<View style={{ marginHorizontal: 15 }}>
						<View style={{ marginTop: 10, marginBottom: -10 }}>
							<Text style={styles.text}>Síntomas</Text>
						</View>
						<View style={{ borderRadius: 10, marginTop: 15, backgroundColor: '#F1F1F1' }}>
							<View style={{ marginHorizontal: 10, borderRadius: 10 }}>
								<Text style={styles['text.small']}>
									{
										turno.sintomas
									}
								</Text>
							</View>
						</View>
					</View>
				</View>
				<KeyboardAvoidingView behavior='height' style={{ backgroundColor: styles.black.color }}>
					<MapView
						style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, }}
						initialRegion={{
							latitude: parseFloat(turno.latitud),
							longitude: parseFloat(turno.longitud),
							longitudeDelta: 0.005,
							latitudeDelta: 0.0,
						}}
					>
						<MapView.Marker
							coordinate={{
								latitude: parseFloat(turno.latitud),
								longitude: parseFloat(turno.longitud),
							}}
							title={turno.nombreSucursal}
							description={turno.direccion}
						></MapView.Marker>
					</MapView>
				</KeyboardAvoidingView>
			</React.Fragment>
		)

	}
}

export default withTheme(MostrarReserva)