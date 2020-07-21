import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Error from '../servicios/alertas/Error'
import {INICIAR_SESION} from '../constantes/actionRedux'
import {URL_API} from '../constantes/urlApi'

 class Login extends React.Component {
	constructor() {
		super();
		this.state = {
            error:null
		};
    }
    
    validateCredentials = (usuario, password) => {
        if (!usuario || !password) {
          return "Datos incorrectos";
        }
    }
    
    signIn = (usuario, password) => {
        const error = this.validateCredentials(usuario, password);
        if (error) {
          return error;
        }
    }
    
     login = async e => {
         const {iniciarSesion} = this.props
        e.preventDefault();
        const usuario = e.target.elements.usuario.value;
        const password = e.target.elements.password.value;
    
        const error = this.signIn(usuario, password);
        if (error) {
          this.setState({
            error
          });
          return false;
        }else{
            const url = URL_API + '/api/usuario/auth'
            await fetch(
                url,{
                method:"POST",
                body: JSON.stringify({
                    usuario: usuario,
                    contrasena: password
                    })
                }
            ).then(response => {
                if(response.status == 200){
                    const json = response.json()
                    .then(myJson =>{
                        debugger
                        console.log(myJson)
                        iniciarSesion(myJson)
                    } )                   
                    this.props.history.push("/about")
                }else{
                    this.setState({ error : "Datos Incorrectos"})
                }
                
            })               
        };
    }

	render() {
    const { error } = this.state;
		return (
            <form onSubmit={this.login}>
                {error && <Error message={error} />}
                <h1>Login</h1>
                <input type="text" placeholder="Usuario" name="usuario" />
                <input type="password" placeholder="Password" name="password" />
                <button type="submit">Login</button>
            </form>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
      iniciarSesion: (datos) => dispatch({ type: INICIAR_SESION, data: datos }),
    };
  };
  
const mapStateToProps = (state) => {
    return {
      usuario: state.user.usuario,
    };
  };
  

export default connect(mapStateToProps,mapDispatchToProps)(Login)