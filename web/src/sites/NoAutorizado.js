import React from "react";

export default class NoAutorizado extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="hero-body">
        <p className="title">No está autorizado</p>
      </div>
    );
  }
}
