import React, { Component } from 'react'
import { View, Container } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import CheckAlert from "react-native-awesome-alert"
import { URL_API, URL_API_TIENDA } from '../constantes/urlApi'
import { CAMBIAR_DIA } from '../constantes/actionRedux'
import { CalendarList } from 'react-native-calendars';
import { connect } from 'react-redux';
import TouchableScale from 'react-native-touchable-scale';
import { ScrollView } from 'react-native-gesture-handler';

import { withTheme, ListItem, Text } from 'react-native-elements';

var daySelected = '1'

class Calendario extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sucursales: null,
			id: this.props.idUsuario,
			turnosAsignados: null,
			diasReservadosState: null,
			dotsActualizados: this.props.actualizado,
			date: this.props.date
		}
	}

	render() {
		const { date } = this.state
		const { cambiarDiaCalendario, turnosAsignados } = this.props
		return (
			<React.Fragment>
				<CalendarList
					style={{ marginBottom: -40 }}
					markedDates={turnosAsignados}
					markingType={'multi-dot'}
					selected={{ date }}
					horizontal={true}
					marked={{ date }}
					minDate={{ date }}
					theme={{
						textDayFontFamily: 'Nunito',
						textMonthFontFamily: 'Nunito',
						textDayHeaderFontFamily: 'Nunito',
						selectedDayBackgroundColor: 'red'
					}}
					onDayPress={(day) => {
						return (
							cambiarDiaCalendario(day.dateString)
						)
					}}
				/>
			</React.Fragment>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		cambiarDiaCalendario: (dia) => dispatch({ type: CAMBIAR_DIA, data: dia }),
	};
}

const mapStateToProps = state => {
	return {
		idUsuario: state.user.idUsuario,
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Calendario))