import React, {Component} from 'react';
import { View, Text} from 'react-native';
import { ListItem, withTheme } from "react-native-elements";
import styles from '../../../../App.scss'
import TouchableScale from "react-native-touchable-scale";


class MostrarEspecialidades extends Component {
    constructor(props) {
      super(props);
    }
 render(){
     const {especialidad, theme} = this.props
    return(
        <ListItem
        Component={TouchableScale}
        containerStyle={{
          marginLeft: 10,
          marginRight: 10,
          margin: 5,
          borderRadius: 15,
        }}
        friction={90}
        tension={100}
        activeScale={0.95}
        linearGradientProps={{
          colors: [theme.colors.primary, theme.colors.primary],
          start: { x: 1, y: 3 },
          end: { x: 0.1, y: 5 },
        }}
        title={especialidad.nombre}
        key={especialidad.especialidadId}
        titleStyle={{
          color: styles.white.color,
          textAlign: "center",
          fontFamily: "Nunito_bold",
          fontSize: 17,
        }}
        chevron={{ color: styles.white.color, size: 20 }}
        onPress={(e) => {
          this.props.navigation.navigate("ListaTurnos", {
            sucursalId: data.sucursalId,
          });
        }}
      />
    )    
    }
}
export default withTheme(MostrarEspecialidades)