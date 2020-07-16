import React, { Component } from "react";
import { View, Text } from 'react-native'
import { connect } from "react-redux";
import { withTheme } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import styles from '../../../../App.scss'

class IngresoSintomas extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    static navigationOptions = {
        title: 'Ingreso de síntomas',
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

    render() {
        const { sucursalSelected } = this.props
        console.log(sucursalSelected)
        return (
            <View>
                <View>
                    <Text style={styles.text}>{sucursalSelected.nombre}</Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

const mapStateToProps = (state) => {
    return {
        sucursalSelected: state.turnos.sucursalSelected
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTheme(IngresoSintomas));