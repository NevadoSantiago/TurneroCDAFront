import React, {Component} from 'react';
import { withTheme, Overlay, Text, ListItem, Avatar } from 'react-native-elements';
import { View, Container } from 'react-native';


class MostrarEspecialidades extends Component {
    constructor(props) {
      super(props);
    }
 render(){
     var {especialidad} = this.props
    return(
            <View>
                <Text>
                    {especialidad.nombre}
                </Text>
            </View>
    )    
    }
}
export default MostrarEspecialidades