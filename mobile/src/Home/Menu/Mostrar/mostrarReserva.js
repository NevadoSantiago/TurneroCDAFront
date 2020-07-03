import React, {Component} from 'react';
import { withTheme, Overlay, Text, ListItem, Avatar } from 'react-native-elements';
import { View, Container } from 'react-native';


class MostrarReserva extends Component {
    constructor(props) {
      super(props);
    }
 render(){
     var {turno} = this.props
    console.warn("Entro al componente")
    return(
            <View>
                <Text>
                    {turno.nombreClinica}
                    {turno.nombreSucursal}
                    {turno.direccion}
                    {turno.sintomas}
                </Text>
            </View>
    )    
    }
}
export default MostrarReserva