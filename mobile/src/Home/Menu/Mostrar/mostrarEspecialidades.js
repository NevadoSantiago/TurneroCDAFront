import React, {Component} from 'react';
import { View, Text} from 'react-native';


class MostrarEspecialidades extends Component {
    constructor(props) {
      super(props);
    }
 render(){
     const {especialidad} = this.props
     console.log(especialidad)
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