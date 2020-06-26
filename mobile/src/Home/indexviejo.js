import React , { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content,Card, CardItem, Button,  Body, Text } from 'native-base';

class index extends Component {
  render() {
    return (
        <Container>
        <Content padder contentContainerStyle={styles.content}>
          <Card  >
            <CardItem header bordered style={styles.card}>
              <Text> Bienvenido </Text>
            </CardItem>
            <CardItem bordered >
              <Body style={styles.card} >
                <Button 
                  block  
                  style={styles.button}  
                  onPress={() => this.props.navigation.navigate('SinTurno')}
                >
                  <Text> Mis turnos </Text>
                </Button>
                <Button block style={styles.button} onPress={() => this.props.navigation.navigate('NuevoTurno')}>
                  <Text> Nuevo turno </Text>
                </Button>
              </Body>
            </CardItem>
            
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    content: {
        flex: 1, 
        justifyContent: 'center'
    },
    button: {
        marginBottom: 20,
        borderRadius: 15  
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})
  

export default index;