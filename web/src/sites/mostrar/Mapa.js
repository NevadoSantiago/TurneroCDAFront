import React from 'react';
import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { GOOGLE_MAPS_API_KEY } from '../../constantes/keys'
class Mapa extends React.Component{
    constructor(props){
      super(); 
    }

    render(){
        return(
        <React.Fragment>
            <div className="hero-body">
            </div>
            <div className="container" style={{ flex: 1, backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginRight: '15px', marginLeft: '15px', marginBottom: '15px' }}>
                <div className="columns">
                    <div className="column" style={{}}>
                        <p className="title">{'Sucursal'}</p>
                        <p className="subtitle">{'Dirección'}</p>
                    </div>
                    <div className="column" style={{ }}>
                        <Map
                            google={this.props.google}
                            zoom={10}
                            initialCenter={{
                                lat: -34.6144934119689,
                                lng: -58.4458563545429
                            }}
                            containerStyle={{ position: 'relative' }}
                            style={{ height: '100%' }}
                            >
                                <Marker name={'Current location'} />
                        </Map>
                    </div>
                </div>
            </div>
        </React.Fragment>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
	return {
		iniciarSesion: (datos) => dispatch({ type: "INICIAR_SESION", data: datos }),
	};
};

const mapStateToProps = (state) => {
	return {
		usuario: state.user.usuario,
		tipoUsuario: state.user.tipoUsuario
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({ apiKey: (GOOGLE_MAPS_API_KEY) })(Mapa))