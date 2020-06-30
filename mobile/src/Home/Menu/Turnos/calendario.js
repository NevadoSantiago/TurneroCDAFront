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
		const { theme, cambiarDiaCalendario, turnosAsignados } = this.props
		return (
			<React.Fragment>
				<CalendarList
					style={[
						{
							height: 350,
							borderBottomWidth: 0,
							borderBottomColor: 'lightgrey'
						}
					]}
					markedDates={turnosAsignados}
					markingType={'multi-dot'}
					selected={{ date }}
					horizontal={true}
					marked={{ date }}
					minDate={{ date }}
					theme={{
						calendarBackground: '#ffffff',
						textSectionTitleColor: '#b6c1cd',
						textSectionTitleDisabledColor: '#d9e1e8',
						selectedDayBackgroundColor: '#00adf5',
						selectedDayTextColor: '#ffffff',
						todayTextColor: theme.colors.primary,
						dayTextColor: 'black',
						textDisabledColor: '#d9e1e8',
						arrowColor: 'orange',
						disabledArrowColor: '#d9e1e8',
						monthTextColor: theme.colors.primary,
						indicatorColor: theme.colors.primary,
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