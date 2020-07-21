import React from 'react';
import { connect } from 'react-redux';
import Error from '../servicios/alertas/Error'
<<<<<<< HEAD
import {INICIAR_SESION} from '../constantes/actionRedux'
import {URL_API} from '../constantes/urlApi'
import NavBar from './import/Navbar'

const datosIngresados = {
    usuario : null,
    contrasena:null
}
=======
import { INICIAR_SESION } from '../constantes/actionRedux'
import { URL_API } from '../constantes/urlApi'
>>>>>>> ecf41fbe740656e05b7d0bfb0a73c3705a91f45f

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      error: null
    };
  }

  validateCredentials = (usuario, password) => {
    if (!usuario || !password) {
      return "Datos incorrectos";
    }
<<<<<<< HEAD

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
=======
  }

  signIn = (usuario, password) => {
    const error = this.validateCredentials(usuario, password);
    if (error) {
      return error;
>>>>>>> ecf41fbe740656e05b7d0bfb0a73c3705a91f45f
    }
  }

  login = async e => {
    const { iniciarSesion } = this.props
    e.preventDefault();
    const usuario = e.target.elements.usuario.value;
    const password = e.target.elements.password.value;

    const error = this.signIn(usuario, password);
    if (error) {
      this.setState({
        error
      });
      return false;
    } else {
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
              debugger
              console.log(myJson)
              iniciarSesion(myJson)
            })
          this.props.history.push("/about")
        } else {
          this.setState({ error: "Datos Incorrectos" })
        }
<<<<<<< HEAD
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
=======
      })
    };
  }

  render() {
    const { error } = this.state;
    return (
      <div className="hero-body">
        <form onSubmit={this.login}>
          <h1 className="title">Iniciar sesión</h1>
          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Usuario" name="usuario"></input>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input className="input" type="password" placeholder="Contraseña" name="password"></input>
            </div>
          </div>
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary" type="submit">Ingresar</button>
            </div>
          </div>
          {error && <Error message={error} />}
        </form>
      </div>
    );
  }
>>>>>>> ecf41fbe740656e05b7d0bfb0a73c3705a91f45f
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


export default connect(mapStateToProps, mapDispatchToProps)(Login)