import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Error from '../servicios/alertas/Error'
import {INICIAR_SESION} from '../constantes/actionRedux'
import {URL_API} from '../constantes/urlApi'
import NavBar from './import/Navbar'

const datosIngresados = {
    usuario : null,
    contrasena:null
}

 class Login extends React.Component {
	constructor() {
		super();
		this.state = {
            error:null
		};
    }

    ingresoUsuario = (u) =>{
        datosIngresados.usuario =u.target.value
    }
    ingresoPassword = (p) => {
        datosIngresados.contrasena = p.target.value
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
        e.preventDefault();
         const {iniciarSesion} = this.props     
        const usuario = datosIngresados.usuario
        const password =datosIngresados.contrasena
        const error = this.signIn(usuario, password);
        if (error) {
          this.setState({
            error
          });
          return false;
        }else {
            const url = URL_API + '/api/usuario/auth'
            await fetch(
              url, {
              method: "POST",
              body: JSON.stringify({
                usuario: usuario,
                contrasena: password
              })
            }
            ).then(response => {
              if (response.status == 200) {
                const json = response.json()
                  .then(myJson => {
                    iniciarSesion(myJson)
                  })
              } else {
                this.setState({ error: "Datos Incorrectos" })
              }
            })
          };
    }

	render() {
        
    const { error } = this.state;
    const {usuario} = this.props
/*     if(usuario!=null){
        this.props.history.push("/home")
    } */
		return (
            <React.Fragment>
                {usuario}
                {error && <Error message={error} />}
                <h1>Login</h1>
                <input type="text" placeholder="Usuario" onChange ={(u)=>this.ingresoUsuario(u)} />
                <input type="password" placeholder="Password" onChange ={(p)=>this.ingresoPassword(p)} />
            </React.Fragment>

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