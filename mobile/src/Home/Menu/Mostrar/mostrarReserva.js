import React, { Component } from 'react';
import { withTheme, Overlay, Text, ListItem, Avatar } from 'react-native-elements';
import { View, Dimensions, KeyboardAvoidingView } from 'react-native';
import MapView from "react-native-maps";
import styles from '../../../../App.scss'

class MostrarReserva extends Component {
<<<<<<< HEAD
    constructor(props) {
      super(props);
    }
 render(){
     var {turno} = this.props
    console.warn("Entro al componente")
    return(
            <View>
                <Text>
                    {turno.nombreSucursal}
                    {turno.direccion}
                    {turno.sintomas}
                </Text>
            </View>
    )    
    }
=======

	constructor(props) {
		super(props);
	}

	render() {
		var { turno } = this.props
		console.warn("Entro al componente")

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
				<KeyboardAvoidingView behavior='position' style={{ backgroundColor: styles.black.color }}>
					<MapView
						style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height, }}
						initialRegion={{
							latitude: -34.5571634,
							longitude: -58.4950138,
							longitudeDelta: 0.005,
							latitudeDelta: 0.0,
						}}
					>
						<MapView.Marker
							coordinate={{
								latitude: -34.5571634,
								longitude: -58.4950138,
							}}
							title={turno.nombreSucursal}
							description={turno.direccion}
						></MapView.Marker>
					</MapView>
				</KeyboardAvoidingView>
			</React.Fragment>
		)

	}
>>>>>>> 05225791ea58809ad3aef04001838b92418f3406
}

export default withTheme(MostrarReserva)